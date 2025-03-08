import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../components/menucard";
import { useLocation, useNavigate } from 'react-router-dom';
import './UserPosts.css';

const UserPosts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    
    const queryParams = new URLSearchParams(location.search);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userEmail = queryParams.get('userEmail') || storedUser?.email;

    console.log("👤 Retrieved userEmail:", userEmail);

    useEffect(() => {
        if (!userEmail) {
            console.warn("⚠️ No userEmail provided.");
            setError("User email not found. Please log in again.");
            setLoading(false);
            return;
        }

        const fetchUserPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("📡 Fetching posts for:", userEmail);
                const response = await axios.get(`http://localhost:4004/api/posts?email=${userEmail}`);

                console.log("✅ API Response:", response.data);

                if (!Array.isArray(response.data) || response.data.length === 0) {
                    throw new Error("No posts found for this user.");
                }

                setUserPosts(response.data);
            } catch (err) {
                console.error("❌ API Error:", err);
                setError("Failed to load user posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [userEmail]);

    return (
        <div className="user-posts-container">
            <button className="back-button" onClick={() => navigate(-1)}>
  <span>&larr;</span>  
</button>

            
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
