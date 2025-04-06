import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

// Wait for full page load
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // ⏳ Delay for 2 seconds before hiding (adjust as needed)
    setTimeout(() => {
      preloader.classList.add("hidden"); // fade out
      setTimeout(() => {
        preloader.remove(); // remove after transition
      }, 500); // match fade-out duration in CSS
    }, 2000); // 👈 2 seconds delay here
  }
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
)
