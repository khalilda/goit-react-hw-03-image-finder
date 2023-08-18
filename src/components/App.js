import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    isOpenModal: false,
    searchValue: 'wave',
    currentImage: null,
  };

  toggleModal = event => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
    }));
  };

  openModal = largeImage => {
    this.setState({
      currentImage: largeImage,
      isOpenModal: true,
    });
  };

  handleSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    const { isOpenModal, currentImage } = this.state;
    return (
      <main>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery value={this.state.searchValue} onClick={this.openModal} />
        {isOpenModal && (
          <Modal onClose={this.toggleModal} currentImage={currentImage} />
        )}
      </main>
    );
  }
}
