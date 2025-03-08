import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import MenuCard from "../components/menucard";

const Menu = () => {
  const scrollRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:4004/api/posts");
        setFoodItems(response.data);
      } catch (err) {
        setError("Failed to load available foods.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();


    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };


    handleResize();


    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = isMobile ? 200 : 300;
      current.scrollTo({
        left: current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="flex flex-col lg:px-20 sm:px-10">
      <h1 className="font-semibold text-center text-4xl mt-24 mb-8">
        Today's Available Foods
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="relative bg-white p-10 rounded-lg shadow-lg">
          <button
            onClick={() => scroll("left")}
            className="hover:bg-black transition absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-lg p-3 rounded-full shadow-lg z-10"
            aria-label="Scroll left" 
          >
            <FaChevronLeft size={24} />
          </button>

          <motion.div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto flex-nowrap scrollbar-hide px- py-2 rounded-lg"
            whileTap={{ cursor: "grabbing" }}
            style={{ scrollBehavior: "smooth" }}
          >
            {foodItems.length > 0 ? (
              foodItems.map((item, index) => (
                <MenuCard
                  key={index}
                  img={item.imageURL}
                  title={item.title}
                  value={item.price ? `$${item.price}` : "Free"}
                  description={item.description}
                  onClick={() => openModal(item)}
                />
              ))
            ) : (
              <p className="text-center w-full text-lg text-gray-500">
                No food available at the moment.
              </p>
            )}
          </motion.div>

          <button
            onClick={() => scroll("right")}
            className="hover:bg-black transition absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg p-3 rounded-full shadow-lg z-10"
            aria-label="Scroll right" // Accessibility
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg lg:w-3/5 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-gray-900 flex flex-col lg:flex-row items-center lg:items-start relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 transition"
              aria-label="Close modal" 
            >
              ✖
            </button>
            <img
              src={selectedItem.imageURL}
              alt={selectedItem.title}
              className="sm:w-2/5 md:w-2/3 lg:w-1/3 rounded-md"
            />
            <div className="lg:ml-6 mt-4 lg:mt-0 flex flex-col">
              <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
              <p className="text-white mt-2">{selectedItem.description}</p>
              <div className="flex justify-between items-center gap-4 mt-4">
                <div className="flex gap-2">
                  <button className="px-3 text-sm border-2 border-black bg-transparent hover:text-orange-500 transition-all rounded-lg">
                    Like
                  </button>
                  <button className="px-3 text-sm border-2 border-black bg-transparent hover:text-orange-500 transition-all rounded-lg">
                    Comment
                  </button>
                </div>
                <span className="border-2 border-black bg-black text-white hover:text-orange-500 transition-all cursor-pointer p-2 rounded-lg">
                  Add to Cart
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
