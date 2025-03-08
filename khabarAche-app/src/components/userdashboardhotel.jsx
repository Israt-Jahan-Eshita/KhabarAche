import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/userdashboard.css";
import "boxicons/css/boxicons.min.css";
import logo from "../assets/logo.png";
import heroImage from "../assets/heroImage.png";
import axios from "axios";

const UserDashboardHotel = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postData, setPostData] = useState({
    email: "",
    title: "",
    description: "",
    price: "",
    address: "",
    additional: "",
    imageURL: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleCreatePost = () => setIsPostModalOpen(true);
  const handleCloseModal = () => setIsPostModalOpen(false);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitPost = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      let imageURL = "";

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const uploadResponse = await axios.post(
          "http://localhost:4004/api/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        imageURL = uploadResponse.data.imageURL;
      }

      const postResponse = await axios.post(
        "http://localhost:4004/api/posts",
        { ...postData, imageURL },
        { headers: { "Content-Type": "application/json" } }
      );

      if (postResponse.status === 200) {
        alert("Post Created Successfully!");
        handleCloseModal();
      }
    } catch (err) {
      console.error("Post error:", err);
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      Object.values(postData).every((field) => field.trim() !== "") ||
      selectedFile !== null
    );
  };

  return (
    <div className="userdashboard">
      <input type="checkbox" id="sidebar-toggle" />

      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-flex">
            <img src={logo} height="100px" width="70px" alt="Logo" />
            <div className="brand-icons">
              <span className="bx bx-bell"></span>
              <span
                className="bx bx-user-circle user-icon"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              ></span>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <button onClick={handleCreatePost}>Create Post</button>
                  <Link to="/report">Report</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sidebar-main">
          <div className="sidebar-user">
            <img src={heroImage} alt="Hotel" />
            <div>
              <h3>{user.username || "User name"}</h3>
              <span>{user.email || "User email"}</span>
            </div>
          </div>

          <div className="sidebar-menu">
            <div className="menu-head">
              <span>Dashboard</span>
            </div>
            <ul>
              <Link to="/Homepage">
                <span className="bx bx-home-smile">
                  <span className="bxx"> Home</span>
                </span>
              </Link>
              <Link to="/mypost">
                <span className="bx bx-line-chart">
                  <span className="bxx"> Finance</span>
                </span>
              </Link>
              <Link to={`/UserPosts?userId=${user.id}`}>
                <span className="bx bx-pie-chart">
                  <span className="bxx"> My Posts</span>
                </span>
              </Link>
            </ul>

            <div className="menu-head">
              <span>Applications</span>
            </div>
            <ul>
              <li>
                <a href="#">
                  <span className="bx bx-calendar"></span> Calendar
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="bx bx-user"></span> Contacts
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="bx bx-shopping-bag"></span> Followers
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="bx bx-envelope"></span> Mailbox
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="main-content">
        <header>
          <div className="menu-toggle">
            <label htmlFor="sidebar-toggle">
              <span className="bx bx-menu"></span>
            </label>
          </div>
          <div className="header-icons">
            <span className="bx bx-search"></span>
            <span className="bx bx-bookmark"></span>
            <span className="bx bx-message"></span>
          </div>
        </header>

        <main>
          <div className="page-header">
            <div>
              <h1>Analytics Dashboard</h1>
              <a href="#">Monitor your donation</a>
            </div>
            <div className="header-actions">
              <button>
                <span className="bx bx-file-export"></span> Complaint Box
              </button>
              <button>
                <span className="bx bx-cog"></span> Settings
              </button>
            </div>
          </div>

          <div className="cards">
            {[
              {
                title: "Donation",
                count: 17,
                desc: "Till now you have encountered 17 donations",
              },
              {
                title: "Purchases",
                count: 5,
                desc: "Till now you have got 5 purchased donations",
              },
              {
                title: "Pending-Purchases",
                count: 12,
                desc: "Till now you have 12 units of donations pending",
              },
            ].map((card, index) => (
              <div className="card-single" key={index}>
                <div className="card-flex">
                  <div className="card-info">
                    <div className="card-head">
                      <span>{card.title}</span>
                      <small>Number of {card.title.toLowerCase()}</small>
                    </div>
                    <h2>{card.count}</h2>
                    <small>{card.desc}</small>
                  </div>
                  <div className="card-chart">
                    <span className="bx bx-line-chart"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="jobs-grid">
            <div className="analytics-card">
              <div className="analytics-head">
                <h3>Actions needed</h3>
                <span className="bx bx-dots-horizontal-rounded"></span>
              </div>
              <div className="analytics-chart">
                <div className="chart-circle">
                  <h1>74%</h1>
                </div>
                <div className="analytics-note">
                  <small>
                    You have the ability to download PDF files that contain
                    details or records of the donations you have made.
                  </small>
                </div>
              </div>
              <div className="analytics-btn">
                <button>Download PDF</button>
              </div>
            </div>

            <div className="jobs">
              <h2>
                Donate{" "}
                <small>
                  See all donation orders{" "}
                  <span className="bx bx-right-arrow-alt"></span>
                </small>
              </h2>
              <div className="table-responsive">
                <table width="100%">
                  <tbody>
                    {[
                      { name: "Rafy Bhuiyan", status: "donated" },
                      { name: "Israt Jahan", status: "donate" },
                      { name: "Jerin Neon", status: "donated" },
                      { name: "Abdur Rahman", status: "donate" },
                    ].map((donor, index) => (
                      <tr key={index}>
                        <td>
                          <div>
                            <span
                              className={`indicator ${
                                index % 2 === 0 ? "" : "even"
                              }`}
                            ></span>
                          </div>
                        </td>
                        <td>
                          <div>{donor.name}</div>
                        </td>
                        <td>
                          <div>Menu</div>
                        </td>
                        <td>
                          <div>Description</div>
                        </td>
                        <td>
                          <div>
                            <button>{donor.status}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>

            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={postData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={postData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            ></textarea>

            <label className="block mb-2">Price:</label>
            <input
              type="text"
              name="price"
              value={postData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Address:</label>
            <input
              type="text"
              name="address"
              value={postData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Additional:</label>
            <textarea
              name="additional"
              value={postData.additional}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            ></textarea>

            {error && <div className="text-red-500">{error}</div>}

            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPost}
                disabled={isSubmitting || !isFormValid()}
                className={`px-4 py-2 rounded border transition-all duration-300 ${
                  isSubmitting || !isFormValid()
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      <label htmlFor="sidebar-toggle" className="userdashboard-label"></label>
      <footer>
        <h3>&copy; All Rights Reserved</h3>
      </footer>
    </div>
  );
};

export default UserDashboardHotel;
