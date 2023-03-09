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

// export class App extends Component {
//   state = {
//     textSearch: '',
//     modalImg: '',
//     showModal: false,
//     images: [],
//     page: 1,

//   };

//   handelSubmit = textSearch => {
//     this.setState({ textSearch, page: 1, images: []});
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };
//   getLargeImg = url => {
//     this.toggleModal();
//     this.setState({ modalImg: url });
//   };

//   render() {
//     return (
//       <Layout>
//         <Toaster duration={1500} position="top-right" reverseOrder={false} />
//         <GlobalStyle />
//         <Searchbar onSearch={this.handelSubmit} />
//         <ImageGallery
//           values={this.state.textSearch}
//           onClick={this.getLargeImg}
//         />
//         {this.state.showModal && (
//           <Modal
//             largeImageURL={this.state.modalImg}
//             onClose={this.toggleModal}
//           />
//         )}
//       </Layout>
//     );
//   }
// }
