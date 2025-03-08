import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import MenuCard from "../components/menucard";
import "./Menu.css";

const Menu = () => {
  const scrollRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState(""); 

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

  const fetchComments = async (foodId) => {
    try {
      const response = await axios.get(`http://localhost:4004/api/posts/${foodId}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        await axios.post(`http://localhost:4004/api/posts/${selectedItem.id}/comments`, {
          content: newComment,
        });
        setNewComment(""); 
        fetchComments(selectedItem.id); 
      } catch (err) {
        console.error("Failed to add comment:", err);
      }
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = isMobile ? 200 : 300;
      current.scrollTo({
        left:
          current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    fetchComments(item.id); 
  };
  
  const closeModal = () => {
    setSelectedItem(null);
    setComments([]); 
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Today's Available Foods</h1>

      {loading ? (
        <p className="menu-loading">Loading...</p>
      ) : error ? (
        <p className="menu-error">{error}</p>
      ) : (
        <div className="menu-scroll-container">
          <button
            onClick={() => scroll("left")}
            className="menu-scroll-button left"
            aria-label="Scroll left"
          >
            <FaChevronLeft size={24} />
          </button>

          <motion.div
            ref={scrollRef}
            className="menu-items-container"
            whileTap={{ cursor: "grabbing" }}
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
              <p className="menu-no-items">
                No food available at the moment.
              </p>
            )}
          </motion.div>

          <button
            onClick={() => scroll("right")}
            className="menu-scroll-button right"
            aria-label="Scroll right"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      )}

      {selectedItem && (
        <div className="menu-modal">
          <div className="menu-modal-content">
            <button
              onClick={closeModal}
              className="menu-modal-close"
              aria-label="Close modal"
            >
              ✖
            </button>
            <img
              src={selectedItem.imageURL}
              alt={selectedItem.title}
              className="menu-modal-image"
            />
            <div className="menu-modal-details">
              <h2 className="menu-modal-title">{selectedItem.title}</h2>
              <p className="menu-modal-description">{selectedItem.description}</p>
              <div className="menu-modal-actions">
                <div className="menu-modal-action-buttons">
                  <button className="menu-modal-button">
                    Like
                  </button>
                  <button className="menu-modal-button">
                    Comment
                  </button>
                </div>
                <span className="menu-modal-cart">
                  Add to Cart
                </span>
              </div>
            </div>

            <div className="menu-modal-comments">
              <h3>Comments</h3>
              {comments.length > 0 ? (
                <div className="menu-modal-comment-list">
                  {comments.map((comment, index) => (
                    <div key={index} className="menu-modal-comment">
                      <p className="menu-modal-comment-author">{comment.author}</p>
                      <p className="menu-modal-comment-text">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="menu-modal-no-comments">No comments yet.</p>
              )}
              <div className="menu-modal-comment-form">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="menu-modal-comment-input"
                />
                <button onClick={addComment} className="menu-modal-comment-submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
