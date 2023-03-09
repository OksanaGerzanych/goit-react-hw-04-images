import React from 'react';
import { useEffect} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, Modalka } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({onClose, largeImageURL}) {

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [onClose]);


  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <Modalka>
          <img src={largeImageURL} alt=""/>
        </Modalka>
      </Overlay>,
      modalRoot
    );
  
}
Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
}
