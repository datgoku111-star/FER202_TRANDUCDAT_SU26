// src/App.jsx
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';
import RegistrationForm from './components/RegistrationForm';
import MyModal from './components/MyModal';

function App() {
  function RegistrationWrapper() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalBody, setModalBody] = useState('');

    const handleRegister = (payload) => {
      // payload contains username, email, password (already validated in form)
      setModalBody('Đăng ký thành công!');
      setShowModal(true);
      // optionally: store user/session here
    };

    const handleClose = () => {
      setShowModal(false);
      navigate('/posts');
    };

    return (
      <>
        <RegistrationForm onRegister={handleRegister} onCancel={() => navigate('/posts')} />
        <MyModal show={showModal} onClose={handleClose} title="Đăng ký" body={modalBody} />
      </>
    );
  }

  return (
    <BrowserRouter>
      {/* Navbar luôn hiển thị ở mọi trang */}
      <AppNavbar />

      {/* Định nghĩa các route */}
      <Routes>
        <Route path='/'          element={<RegistrationWrapper />} />
        <Route path='/posts'     element={<PostList />} />
        <Route path='/posts/:id' element={<PostDetail />} />
        <Route path='/about'     element={<About />} />
        <Route path='*'          element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
