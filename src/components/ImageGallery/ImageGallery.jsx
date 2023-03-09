import { fetchImage } from 'Services/Api'; 
import React, { useState, useEffect } from 'react';
import { Gallery } from './ImageGallery.styled';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { ButtonLoadMore } from 'components/Button/Button';



export function ImageGallery({onClick, values}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  //const [loadMore, setLoadMore] = useState(false);


  useEffect(() => {
    if (!values) {
      return;
    }
    setImages([]);
    setPage(1);
    setLoading(true);
    fetchImage(values, page)
      .then(responseImages => 
        {setImages(prevImages => [...prevImages, ...responseImages.hits])},
      )
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false);

      });
  }, [values, page])

  const handleLoadMore = () => {
     
     setPage(prevPage => prevPage + 1);
   //console.log("prevPage", prevPage)
     //console.log(page)
     
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
        {images.length !== 0 && (
          <ButtonLoadMore onClick={handleLoadMore} />
        )}
        {loading && <Loader />}
      </>
    );
  
}

// export class ImageGallery extends Component {
//   state = {
//     images: [],
//     loading: false,
//     error: null,
//     page: 1,
//     loadMore: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.values !== this.props.values) {
//       this.setState({ images: [], page: 1 });
//       this.getImages();
//     }
//     if (prevState.page !== this.state.page) {
//       this.getImages();
//     }
//   }

//   getImages = () => {
//     this.setState({ loading: true });
//     fetchImage(this.props.values, this.state.page)
//       .then(images => {
//         this.setState({ images: [...this.state.images, ...images.hits] });
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => {
//         this.setState({ loading: false });
//       });
//   };

//   handleLoadMore = () => {
//     this.setState(prevPage => ({
//       page: prevPage.page + 1,
//     }));
//   };

//   render() {
//     const {error, images, loading} = this.state
//     return (
//       <>
//         <Gallery>
//           {error && <h2>{error.message}</h2>}
//           {images.length > 0 &&
//             images.map(image => {
//               return (
//                 <ImageGalleryItem
//                   key={image.id}
//                   image={image}
//                   onClick={this.props.onClick}
//                 />
//               );
//             })}
//         </Gallery>
//         {images.length !== 0 && (
//           <ButtonLoadMore onClick={this.handleLoadMore} />
//         )}
//         {loading && <Loader />}
//       </>
//     );
//   }
// }
