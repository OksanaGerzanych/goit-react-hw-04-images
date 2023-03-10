import { fetchImage } from 'Services/Api';
import React, { useState, useEffect } from 'react';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { ButtonLoadMore } from 'components/Button/Button';

export function ImageGallery({ onClick, values }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  // const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!values) {
      return;
    }
    // if (values !== values) {
    //   setImages([]);
    //   setPage(page);
    // }
    console.log(values)
    

    setLoading(true);
    fetchImage(values, page)
      .then(responseImages => {
        setImages(prevImages => [...prevImages, ...responseImages.hits]);
      })
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false);
      });
  }, [values, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Gallery>
        {error && <h2>{error.message}</h2>}
        {images.length > 0 &&
          images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={onClick}
              />
            );
          })}
      </Gallery>
      {images.length !== 0 && <ButtonLoadMore onClick={handleLoadMore} />}
      {loading && <Loader />}
    </>
  );
}

ImageGallery.propTypes = {
  onClick: PropTypes.func,
  values: PropTypes.string,
}