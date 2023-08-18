import { Component } from 'react';
import SearchbarStyle from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';
import { PropTypes } from 'prop-types';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  hanleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <header className={SearchbarStyle.searchbar}>
        <form className={SearchbarStyle.searchForm} onSubmit={this.hanleSubmit}>
          <button type="submit" className={SearchbarStyle.searchFormButton}>
            <span className={SearchbarStyle.searchFormButtonLabel}>
              <FiSearch />
            </span>
          </button>

          <input
            className={SearchbarStyle.searchFormInput}
            type="text"
            name="value"
            autoComplete="off"
            autoFocus
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
