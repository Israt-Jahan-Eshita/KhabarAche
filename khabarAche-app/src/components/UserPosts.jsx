import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../components/menucard";
import { useLocation } from 'react-router-dom';
import './UserPosts.css'; 

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  console.log("👤 Received userId from URL:", userId);

  useEffect(() => {
    if (!userId) {
      console.warn("⚠️ No userId provided in URL, skipping API call.");
      setLoading(false);
      return;
    }

    const fetchUserPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("📡 Fetching posts for userId:", userId);
        const response = await axios.get(`http://localhost:4004/api/posts?userId=${userId}`);

        console.log("✅ API Response:", response.data);

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid data format received.");
        }

        setUserPosts(response.data);
      } catch (err) {
        console.error("❌ API Error:", err);
        setError("Failed to load user posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  useEffect(() => {
    console.log("🔄 Updated userPosts state:", userPosts);
  }, [userPosts]);

  return (
    <div className="user-posts-container">
      <h1 className="user-posts-title">
        {loading ? "Loading..." : userPosts.length > 0 ? "Your Posts" : "No Posts Available"}
      </h1>

      {loading ? (
        <p className="user-posts-loading">Loading...</p>
      ) : error ? (
        <p className="user-posts-error">{error}</p>
      ) : (
        <div className="user-posts-grid">
          {userPosts.map((post) => (
            <MenuCard
              key={post._id}
              img={post.imageURL}
              title={post.title}
              value={post.price ? `$${post.price}` : "Free"}
              description={post.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
