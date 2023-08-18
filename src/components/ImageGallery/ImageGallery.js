import { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import { getImage } from 'api/getDataImage';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button';
import ImageGalleryStyle from './ImageGallery.module.css';

const Status = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    status: Status.INIT,
  };

  async componentDidMount() {
    this.setState({ status: Status.LOADING });

    try {
      const data = await getImage(this.props.value);
      this.setState({ images: data, status: Status.SUCCESS });
    } catch {
      this.setState({ status: Status.ERROR });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      const newData = await getImage(this.props.value);
      this.setState({ images: newData });
    }

    if (
      prevState.page !== this.state.page &&
      prevProps.value === this.props.value
    ) {
      const newPage = await getImage(this.props.value, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...newPage],
      }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status, images } = this.state;

    return (
      <>
        {status === Status.ERROR && <p>ERROR</p>}

        {(status === Status.LOADING || status === Status.INIT) && <Loader />}

        {status === Status.SUCCESS && (
          <ul className={ImageGalleryStyle.imageGallery}>
            {images?.map(item => {
              return (
                <ImageGalleryItem
                  key={item.webformatURL}
                  url={item.webformatURL}
                  onClick={this.props.onClick}
                  bigImage={item.largeImageURL}
                />
              );
            })}
          </ul>
        )}
        {images.length >= 12 && <Button onClick={this.handleLoadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
