import { Component } from 'react';
import { Notify } from 'notiflix';
import s from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchHitsByQuery } from './services/api';








export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
  };


  changeQuery = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1
    });
    
  };


  componentDidUpdate(prevProps, prevState){
    if(this.state.page !== prevState.page || this.state.query!== prevState.query ){
      this.fetchGallery(this.state.query, this.state.page)
    }
  }



  onNextPage = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  async fetchGallery(query, page) {
    try {
      this.setState({ loading: true });
      const response = await fetchHitsByQuery(query, page);
      console.log('API Response:', response); 
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...response],
          showBtn: response.length >= 12
        };
      });
      if (response.length === 0) {
        Notify.failure('No matches found!');
      }
    } catch (error) {
      console.error('API Error:', error);
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
 
  }

  render() {
    const { images, isLoading, showBtn, showModal, largeImageURL } = this.state;

    return (
      <div className={s.App}>
        <Searchbar changeQuery={this.changeQuery} />
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {isLoading && <Loader />}
        {showBtn && <Button onNextPage={this.onNextPage} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
