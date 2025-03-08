import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isHotelLogin, setIsHotelLogin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setIsHotelLogin(user.isHotelLogin || false); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); 
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const navItems = [
    { label: "Home", href: "/Homepage" },
    { label: "Hotels", href: "#" },
    { label: "Testimonials", href: "#" },
    { label: "Account", href: !isLoggedIn ? "/loginpage" : isHotelLogin ? "/userdashboardhotel" : "/userdashboard" },
  ];

  return (
    <nav className="sticky z-30 h-20 backdrop-blur-lg border-b border-neutral-600/60">
      <div className="container px-10 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <img src={logo} height="100px" width="70px" alt="Logo" />
            </Link>
            <span className="text-xl tracking-tight bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
              KHABAR_ACHE?
            </span>
          </div>

         
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href} className="hover:text-orange-500 transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout} 
                className="py-2 px-3 border rounded-md hover:text-orange-500 transition flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link to="/loginpage" className="py-2 px-3 border rounded-md hover:text-orange-500 transition">
                  Log In
                </Link>
                <Link to="/registerpage" className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md hover:text-black transition">
                  Create an account
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} aria-label="Toggle navigation">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <Link to={item.href} className="hover:text-orange-500 transition" onClick={toggleNavbar}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex space-x-6">
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout} 
                  className="py-2 px-3 border rounded-md hover:text-orange-500 transition flex items-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link to="/loginpage" className="py-2 px-3 border rounded-md hover:text-orange-500 transition">
                    Log In
                  </Link>
                  <Link to="/registerpage" className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md hover:text-black transition">
                    Create an account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
