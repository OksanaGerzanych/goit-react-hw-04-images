import React, { useState } from 'react';

import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';

import { Searchbar } from './Searchbar/Searchbar';
import { Layout } from './Layout';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export function App() {
  const [textSearch, setTextSearch] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handelSubmit = textSearch => {
    setTextSearch(textSearch);
    
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };
  const getLargeImg = url => {
    toggleModal();
    setModalImg(url);
  };

  return (
    <Layout>
      <Toaster duration={1500} position="top-right" reverseOrder={false} />
      <GlobalStyle />
      <Searchbar onSearch={handelSubmit} />
      <ImageGallery values={textSearch} onClick={getLargeImg} />
      {showModal && <Modal largeImageURL={modalImg} onClose={toggleModal} />}
    </Layout>
  );
}
