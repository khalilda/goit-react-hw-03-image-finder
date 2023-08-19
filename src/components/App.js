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
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1
    });
    
  };


  componentDidUpdate(prevProps, prevState){
    if(this.state.page !== prevState.page || this.state.query!== prevState.query ){
      fetch()
    }
  }



  // componentDidUpdate = async (prevProps, prevState) => {
  //   console.log('componentDidUpdate called');
  
  //   const prevQuery = prevState.query;
  //   const searchQuery = this.state.query;
  //   const prevPage = prevState.page;
  //   const nextPage = this.state.page;
  
  //   if (prevQuery !== searchQuery || prevPage !== nextPage) {
  //     console.log('Fetching new data');
  //     this.fetchGallery(this.state.query, this.state.page);
  //   }
  // };
  // componentDidUpdate = async (prevProps, prevState) => {
  //   const prevQuery = prevState.query;
  //   const searchQuery = this.state.query;
  //   const prevPage = prevState.page;
  //   const nexPage = this.state.page;

  //   if (prevQuery !== searchQuery || prevPage !== nexPage) {
  //     this.loadResult();
  //   }
  // };

  // onSubmit = e => {
  //   e.preventDefault();
  //   this.setState({
  //     query: e.target.search.value,
  //     isLoading: true,
  //     images: [],
  //   });
  //   this.fetchGallery(e.target.search.value, this.state.page);
  // };

  onNextPage = () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.fetchGallery(this.state.query, this.state.page + 1);
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
