import React, { useRef, useEffect, useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import PropTypes from 'prop-types';
import "../components/menuCard.css"; 

const MenuCard = ({ img, title, value, description, onClick }) => {
  const titleRef = useRef(null);
  const [needsEllipsis, setNeedsEllipsis] = useState(false);

  useEffect(() => {
    const checkTitleOverflow = () => {
      if (titleRef.current) {
        setNeedsEllipsis(titleRef.current.scrollWidth > titleRef.current.clientWidth);
      }
    };

    checkTitleOverflow();
    window.addEventListener("resize", checkTitleOverflow);
    return () => window.removeEventListener("resize", checkTitleOverflow);
  }, [title]);

  

  return (
    <div className="menu-card">
      <div onClick={onClick} className="menu-card-image">
        <img
          className="menu-card-image-img"
          src={img || "https://via.placeholder.com/150"}
          alt={title || "No Title"}
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
      </div>

      <div className="menu-card-content">
        <div className="menu-card-header">
          <h3
            className="menu-card-title"
            ref={titleRef}
          >
            {title || "No Title Available"}
            {needsEllipsis && "..."}
          </h3>
          {value === "Free" ? (
            <span className="menu-card-value-free">Free</span>
          ) : (
            <span className="menu-card-value">{value}</span>
          )}
        </div>

        <p className="menu-card-description">
          {description || "No description available"}
        </p>

        <div className="menu-card-actions">
          <button className="menu-card-button" aria-label="Like">
            Like
          </button>
          
          <span className="menu-card-cart" aria-label="Add to cart">
            <FaShoppingCart size={20} />
          </span>
        </div>
      </div>


     
    </div>
  );
};

MenuCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func
};

MenuCard.defaultProps = {
  img: "https://via.placeholder.com/150",
  title: "No Title",
  value: "Free",
  description: "No description available",
  onClick: () => {}
};

export default MenuCard;
