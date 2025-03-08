import React, { useRef, useEffect, useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

const MenuCard = ({ img, title, value, description, onClick }) => {
  const titleRef = useRef(null);
  const [needsEllipsis, setNeedsEllipsis] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, {
        id: Date.now(),
        text: newComment,
        author: "User",
        timestamp: new Date().toLocaleString()
      }]);
      setNewComment("");
    }
  };

  return (
    <div className="lg:w-1/4 md:w-1/2 sm:w-full bg-white p-4 rounded-lg shadow-lg cursor-pointer border border-gray-200 flex flex-col h-[500px] max-h-[500px]">

      <div onClick={onClick} className="border-4 border-gray-300 rounded-xl overflow-hidden">
        <img
          className="rounded-xl w-full h-[200px] object-cover"
          src={img ? img : "https://via.placeholder.com/150"}
          alt={title || "No Title"}
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
      </div>

      <div className="p-3 mt-4 flex flex-col flex-grow">
        <div className="flex flex-row justify-between items-center">
          <h3
            className="font-semibold text-lg whitespace-nowrap overflow-hidden text-ellipsis"
            ref={titleRef}
            style={{ maxWidth: "70%" }}
          >
            {title || "No Title Available"}
            {needsEllipsis && "..."}
          </h3>
          {value === "Free" ? (
            <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              Free
            </span>
          ) : (
            <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {value}
            </span>
          )}
        </div>

        <p className="text-gray-700 mt-2 text-sm overflow-hidden line-clamp-7">
          {description || "No description available"}
        </p>

        <div className="flex justify-center items-center gap-4 mt-auto">
          <button className="px-3 text-sm border border-gray-400 bg-transparent hover:text-orange-500 transition-all rounded-lg">
            Like
          </button>
          <button 
            onClick={() => setShowComments(true)}
            className="px-3 text-sm border border-gray-400 bg-transparent hover:text-orange-500 transition-all rounded-lg"
          >
            Comment
          </button>
          <span className="border border-gray-400 hover:text-orange-500 transition-all cursor-pointer p-2 rounded-lg">
            <FaShoppingCart size={20} />
          </span>
        </div>
      </div>


      {showComments && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">

            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Comments</h2>
              <button 
                onClick={() => setShowComments(false)}
                className="p-2 hover:text-gray-600"
                aria-label="Close comments"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleCommentSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  aria-label="Write a comment"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
