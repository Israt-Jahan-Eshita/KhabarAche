// UserPosts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:4003/api/posts/user/${userId}`); // Adjust URL if needed
        setPosts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>My Posts</h2>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id} className="border p-4 mb-4 rounded">
            <h3>{post.title}</h3>
            <p>{post.description}</p>

          </div>
        ))
      ) : (
        <p>No posts found for this user.</p>
      )}
    </div>
  );
};

export default UserPosts;
