import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 border-t border-blue-800 text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        <div className="mb-4 md:mb-0">
          <div className="flex">
          <img
          src="/Logo.png" 
          alt="Cura Logo"
          className="h-12 w-12 object-contain"
        />
          <h5 className="text-4xl mb-3 font-bold mt-1 ml-1">Cura</h5>
          </div>
          <p className="text-sm">
            Building innovative solutions for a better future. Stay connected for updates and offers.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link 
            to="/" 
            className="font-medium text-lg text-white hover:text-blue-200"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="font-medium text-lg text-white hover:text-blue-200"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="font-medium text-lg text-white hover:text-blue-200"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="mt-4 border-t border-blue-800 pt-4 text-center">
        <p className="text-sm">
          &copy; 2025 Cura. All rights reserved. Made with ❤️ by <Link to="/" className="underline hover:text-blue-200">Cura Team</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
