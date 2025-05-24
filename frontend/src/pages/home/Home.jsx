import { useState, useEffect } from "react";
import PackageCard from "../../components/PackageCard";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DoctorPic from "../../../public/Doctor.jpg";
import Thumb from "../../../public/thumb.jpg";
import partner from "../../../public/partner.jpg";
import {
  FaVials,
  FaXRay,
  FaUserMd,
  FaLeaf,
  FaDna,
  FaFilePrescription,
} from "react-icons/fa";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testName, setTestName] = useState("Loading...");
  const [packages, setPackages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const services = [
    {
      icon: <FaVials size={40} />,
      title: "Blood Tests",
      offer: "Up to 60% off",
      bg: "bg-blue-100",
    },
    {
      icon: <FaXRay size={40} />,
      title: "X-Rays, Scans and MRI Tests",
      offer: "Up to 70% off",
      bg: "bg-purple-100",
    },
    {
      icon: <FaUserMd size={40} />,
      title: "Doctor & Diet Consultations",
      offer: "Up to 75% off",
      bg: "bg-pink-100",
    },
    {
      icon: <FaLeaf size={40} />,
      title: "Herbved+ Supplements",
      offer: "Flat 55% off",
      bg: "bg-indigo-100",
    },
    {
      icon: <FaDna size={40} />,
      title: "Genetic Testing",
      offer: "Up to 70% off",
      bg: "bg-pink-200",
    },
    {
      icon: <FaFilePrescription size={40} />,
      title: "Upload Prescription",
      offer: "",
      bg: "bg-blue-200",
    },
  ];

  const slides = [
    { id: 1, src: "/4.png", alt: "4" },
    { id: 2, src: "/3.jpg", alt: "3" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide === slides.length - 1) {
        setIsTransitioning(false);
        setCurrentSlide(0);
      } else {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? packages.length - 3 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= packages.length - 3 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const fetchTestName = async () => {
      try {
        const response = await fetch("/api/auth/package-categories");
        const data = await response.json();
        setTestName(data.name || "Full Body Checkup");
      } catch (error) {
        console.error("Error fetching test name:", error);
        setTestName("Full Body Checkup");
      }
    };
    fetchTestName();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/auth/packages");
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-dropdown")) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className={`bg-white min-h-screen ${!isMobile ? 'mt-14' : ''}`}>
      {/* Carousel Section */}
      <div className="relative w-full h-[180px] sm:h-[260px] md:h-[300px]">
        <div className="relative w-full h-full overflow-hidden">
          <div
            className={`flex ${
              isTransitioning ? "transition-transform duration-500" : ""
            }`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex-none w-full h-[200px] sm:h-[300px] md:h-[400px] relative"
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-contain px-4"
                />
              </div>
            ))}
          </div>          
        </div>
      </div>

      {/* Coloured Line */}
      {/* <div className="w-full h-2 bg-gradient-to-r from-green-400 to-orange-400" /> */}

        {/* Search Bar */}
<div className="w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%] mx-auto px-4 mt-3">
  <div className="py-6 md:py-10 bg-white">
    <div className="relative search-dropdown">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">
          <input
            type="text"
            placeholder="Search for items..."
            className="flex-1 px-4 py-3 text-base text-gray-900 placeholder-gray-600 bg-white border border-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={searchTerm}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="sm:ml-3 px-4 py-3 sm:px-5 sm:py-3 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition flex items-center justify-center"
          >
            <FaSearch className="text-lg" />
          </button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute z-[9999] left-0 right-0 top-full mt-3 bg-white border border-gray-200 rounded-xl shadow-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[400px]">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Popular Test
            </h3>
            {[
              "COMPLETE BLOOD COUNT",
              "Liver Function Test",
              "RA Test",
              "Vitamin B12",
            ].map((test, index) => (
              <p
                key={index}
                className="text-sm text-gray-700 cursor-pointer hover:text-green-600"
                onClick={() => {
                  setSearchTerm(test);
                  setShowSuggestions(false);
                  navigate(`/search?query=${encodeURIComponent(test)}`);
                }}
              >
                {test}
              </p>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Popular Packages
            </h3>
            {[
              "Healthians Winter Wellness Package",
              "Swasth Bharat Non Fasting Package",
              "Healthy India 2025 Full Body Checkup",
            ].map((pkg, index) => (
              <p
                key={index}
                className="text-sm text-gray-700 cursor-pointer hover:text-green-600"
                onClick={() => {
                  setSearchTerm(pkg);
                  setShowSuggestions(false);
                  navigate(`/search?query=${encodeURIComponent(pkg)}`);
                }}
              >
                {pkg}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</div>



      {/* Services Section */}
      <div className="w-full mb-10">
  <div className=" px-7 md:px-16 bg-white">
    <div
      className="flex gap-6 overflow-x-auto items-stretch p-4"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Hide scrollbar for WebKit */}
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      {services.map((service, index) => (
        <div
          key={index}
          className={`relative group flex flex-col items-center justify-center rounded-3xl p-6 w-52 min-h-64 shrink-0 bg-white hover:scale-105 transition-transform duration-300 ease-in-out shadow-md hover:shadow-xl border border-transparent hover:border-blue-400`}
        >
          <div className="mb-3 text-blue-700 group-hover:text-blue-900 transition-colors duration-300 text-3xl">
            {service.icon}
          </div>

          {service.offer && (
            <div className="text-sm font-semibold text-teal-600 group-hover:text-emerald-600 transition duration-300 mb-1">
              {service.offer}
            </div>
          )}

          <div className="text-center text-gray-700 font-semibold text-sm group-hover:text-black transition-colors duration-300">
            {service.title}
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-cyan-300 opacity-0 group-hover:opacity-40 rounded-3xl blur-lg z-[-1] transition duration-300"></div>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* Full Body Comparison Section */}
<div className="bg-white py-4 flex flex-col items-center">
  <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#333] mt-4 mb-10">
    {testName}
  </h2>

  <div className="relative w-full">
    {!isMobile && (
      <button
        className="absolute left-5 sm:left-10 top-1/2 transform -translate-y-1/2 bg-white p-3 sm:p-5 text-lg sm:text-2xl rounded-full shadow-lg hover:bg-orange-300 transition z-10"
        onClick={handlePrev}
      >
        <FaArrowLeft />
      </button>
    )}

    <div
      className={`w-full ${
        isMobile
          ? "flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-4"
          : "flex flex-wrap sm:flex-nowrap gap-8 sm:gap-12 justify-center items-center"
      }`}
    >
      {packages.length > 0 ? (
        isMobile ? (
          packages.map((pkg) => (
            <div key={pkg._id} className="snap-center shrink-0 min-w-[85%]">
              <PackageCard
                key={pkg._id}
                packageId={pkg._id}
                companyId={pkg.companyId}
                packageName={pkg.name}
                testCount={pkg.noOfTests}
                tests={pkg.tests}
                bestPrice={pkg.bestPrice}
                category={pkg.packageCategory}
              />
            </div>
          ))
        ) : (
          packages
            .slice(currentIndex, currentIndex + 3)
            .map((pkg) => (
              <PackageCard
                key={pkg._id}
                packageId={pkg._id}
                companyId={pkg.companyId}
                packageName={pkg.name}
                testCount={pkg.noOfTests}
                tests={pkg.tests}
                bestPrice={pkg.bestPrice}
                category={pkg.packageCategory}
              />
            ))
        )
      ) : (
        <p className="text-[#333]">Loading packages...</p>
      )}
    </div>

    {!isMobile && (
      <button
        className="absolute right-5 sm:right-10 top-1/2 transform -translate-y-1/2 bg-white p-3 sm:p-5 text-lg sm:text-2xl rounded-full shadow-lg hover:bg-orange-300 transition z-10"
        onClick={handleNext}
      >
        <FaArrowRight />
      </button>
    )}
  </div>
</div>


      {/* Why Choose Cura Section */}
      <div className="bg-white py-14 flex flex-col items-center">
        <div className="bg-gradient-to-r from-green-100 to-orange-100 py-12 px-4 sm:px-8 md:px-16 rounded-xl shadow-inner mb-10 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-10">
            Why Choose Cura?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <img
                src={DoctorPic}
                alt="Expert Doctors"
                className="w-14 h-14 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Expert Verified Packages
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                All health packages are curated and reviewed by certified
                medical professionals.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <img
                src={Thumb}
                alt="Best Prices"
                className="w-14 h-14 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Best Prices & Offers
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Get exclusive discounts and compare prices from top providers
                instantly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <img
                src={partner}
                alt="Lab Tieups"
                className="w-14 h-14 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Top Lab Partners
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We partner with trusted diagnostic labs to ensure accuracy and
                timely results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
