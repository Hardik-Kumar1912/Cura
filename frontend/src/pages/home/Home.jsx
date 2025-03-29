import React, { useState, useEffect } from "react";
import PackageCard from "../../components/PackageCard";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testName, setTestName] = useState("Loading...");
  const [packages, setPackages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    { id: 1, src: "/New Crousal.jpg", alt: "1" },
    { id: 2, src: "/crousal2.jpg", alt: "2" },
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

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      {/* Carousel Section */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[350px]">
        <div className="relative w-full h-full overflow-hidden">
          <div
            className={`flex ${isTransitioning ? "transition-transform duration-500" : ""}`}
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
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Search Bar Positioned Over Carousel */}
          <div
            className={`absolute top-1/2 ${
              isMobile ? "left-1/2" : "left-[40%] sm:left-[35%] md:left-[30%]"
            } transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] md:w-2/5`}
          >
            <div className="relative bg-white p-4 rounded-xl shadow-md">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-600 bg-white border border-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
                <button className="ml-3 px-5 py-3 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-gradient-to-r from-green-400 to-orange-400" />

      {/* Section Below Carousel with White Background and Green-Orange Accents */}
      <div className="bg-white py-8 flex flex-col items-center mb-10">
        {/* Accent stripe */}
        

        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#333] mt-4 mb-10">
          {testName}
        </h2>

        <div className="relative w-full flex flex-col sm:flex-row justify-center items-center">
          {/* Arrows for Larger Screens Only */}
          {!isMobile && (
            <button
              className="absolute left-5 sm:left-10 bg-white p-3 sm:p-5 text-lg sm:text-2xl rounded-full shadow-lg hover:bg-orange-300 transition"
              onClick={handlePrev}
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Packages Slider */}
          <div className="flex flex-wrap sm:flex-nowrap gap-8 sm:gap-12 overflow-hidden w-full max-w-4xl justify-center items-center">
            {packages.length > 0 ? (
              isMobile
                ? packages.map((pkg) => (
                    <PackageCard
                      key={pkg._id}
                      packageId={pkg._id}
                      packageName={pkg.name}
                      testCount={pkg.noOfTests}
                      tests={pkg.tests}
                      bestPrice={pkg.bestPrice}
                      className="w-full sm:w-auto"
                    />
                  ))
                : packages.slice(currentIndex, currentIndex + 3).map((pkg) => (
                    <PackageCard
                      key={pkg._id}
                      packageId={pkg._id}
                      packageName={pkg.name}
                      testCount={pkg.noOfTests}
                      tests={pkg.tests}
                      bestPrice={pkg.bestPrice}
                      className="w-full sm:w-auto"
                    />
                  ))
            ) : (
              <p className="text-[#333]">Loading packages...</p>
            )}
          </div>

          {!isMobile && (
            <button
              className="absolute right-5 sm:right-10 bg-white p-3 sm:p-5 text-lg sm:text-2xl rounded-full shadow-lg hover:bg-orange-300 transition"
              onClick={handleNext}
            >
              <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
