import React, { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSearch }) {
  const [imgName, setImgName] = useState('');

  const imgNameChange = event => {
    setImgName(event.target.value.toLowerCase());
  };

  const handelSubmit = event => {
    event.preventDefault();
    if (imgName.trim() === '') {
      toast.error('Please enter your search query :)');
      return;
    }
    onSearch(imgName);
    setImgName('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handelSubmit}>
        <SearchFormButton type="submit">
          <FcSearch />
          <SearchFormButtonLabel></SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="imgName"
          autocomplete="off"
          value={imgName}
          onChange={imgNameChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func,
};
