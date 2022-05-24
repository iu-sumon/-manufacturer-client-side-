
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllParts from './Pages/Home/AllParts';
import Blogs from './Pages/Blogs/Blogs';
import Dashboard from './Pages/Dashboard/Dashboard';
import Portfolio from './Pages/Portfolio/Portfolio';
import NotFound from './Pages/NotFound/NotFound';
import PurchasePage from './Pages/PurchasePage/PurchasePage';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-parts" element={<AllParts />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/purchasePage/:id" element={<PurchasePage/>} />


        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
