
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/navbar';
import Landing from './pages/landing';
import ProductsPage from './pages/productsPage';
import InfoPage from './pages/infoPage'
import Footer from './components/footer';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Landing />} />
          <Route path="/Products" element={<ProductsPage />} />
          <Route path="/WhoWeAre" element={<InfoPage />} />
          

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/Home" replace />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
