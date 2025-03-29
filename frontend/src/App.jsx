import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx'
import Comparison from './pages/comparison/Comparison.jsx';
import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import { createBrowserRouter, RouterProvider , Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import CompanyHome from './pages/companyHome/CompanyHome.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <SignUp />
      </div>
    ),
  },
  {
    path: "/comparison/:packageId",
    element: (
      <div>
        <Navbar />
        <Comparison />
        <Footer />
      </div>
    ),
  },
  {
    path: "/companyHome",
    element: (
      <div>
        <Navbar />
        <CompanyHome />
        <Footer />
      </div>
    ),
  }
]);

function App() {

  const {authUser} = useAuthContext();

  return (
      <div>
        <RouterProvider router={router} />
        <Toaster/>
      </div>
  )
}

export default App
