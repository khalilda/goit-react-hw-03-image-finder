import React, { Component } from 'react';
import PropTypes from "prop-types";

import s from './Searchbar.module.css';

export class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const query = e.target.search.value;
    this.props.changeQuery(query);;
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button__label}>Search</span>
          </button>
          <input
            className={s.SearchForm__input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  changeQuery: PropTypes.func,
};
