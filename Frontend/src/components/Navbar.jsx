import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cart/cartSlice";
import { useState, useEffect } from "react";

import Swal from 'sweetalert2';

const Navbar = ( { count } ) => {
  const { currentUser, logout } = useAuth(null);

  const [photoURL, setPhotoURL] = useState(null);
  useEffect(() => {
    if (currentUser?.providerData[0]?.photoURL) setPhotoURL(currentUser.providerData[0].photoURL)
    
    if (currentUser?.providerData[0]?.providerId === "password") {
      setPhotoURL("https://cdn-icons-png.freepik.com/512/7053/7053329.png");
    } else if (currentUser?.providerData[0]?.providerId === "google.com") {
      setPhotoURL(currentUser.providerData[0].photoURL);
    }
  }, [currentUser]);


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  
  const handleLogOut = () => {
    logout();
    navigate("/");
    dispatch( clearCart() );
    setIsDropdownOpen(!isDropdownOpen);
    Toast.fire({
      icon: "success",
      title: `${currentUser.providerData[0].email} Logged Out Successfully`
    });
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = [
    {name: 'Orders', href: '/orders'},
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Logout', href: '/logout'},
  ]

  return(
    <nav className="flex justify-between items-center h-[7.5vh] w-[100vw] fixed top-0 px-10 bg-white z-10">
        <div className="left flex w-[16vw] justify-between">
            <Link to="/">
              <svg className="mt-2.5 hover:scale-115" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={16} strokeDashoffset={16} d="M5 21h14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"></animate></path><path strokeDasharray={14} strokeDashoffset={14} d="M5 21v-13M19 21v-13"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="14;0"></animate></path><path strokeDasharray={28} strokeDashoffset={28} d="M2 10l10 -8l10 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.6s" values="28;0"></animate></path></g></svg> 
            </Link>
            {/* <div className="searchbar-div mt-1 bg-gray-300 w-[16vw] flex justify-evenly p-[5px] rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={40} strokeDashoffset={40} d="M10.76 13.24c-2.34 -2.34 -2.34 -6.14 0 -8.49c2.34 -2.34 6.14 -2.34 8.49 0c2.34 2.34 2.34 6.14 0 8.49c-2.34 2.34 -6.14 2.34 -8.49 0Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="40;0"></animate></path><path strokeDasharray={12} strokeDashoffset={12} d="M10.5 13.5l-7.5 7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0"></animate></path></g></svg>
              <input className="w-[12vw] focus:outline-none" type="text" name="searchbar" id="searchbar" placeholder="What are you looking for?"/>
            </div> */}
            <div className="store-name-div mt-1 bg-gray-300 w-[12vw] flex justify-evenly p-[5px] rounded-md font-bold text-xl">
              <p type="text" name="store-name" id="store-name">SKY Book Store</p>
            </div>
        </div>

        <div className={`right flex w-[8vw] justify-between`}>
          { currentUser && ( <button onClick={ () => setIsDropdownOpen(!isDropdownOpen) } className="hover:scale-115 cursor-pointer w-[30px] h-[30px]">
          { currentUser
          ? <img src={photoURL} alt="pfp" referrerPolicy="no-referrer" />
          : <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={20} strokeDashoffset={20} d="M12 5c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="20;0"></animate></path><path strokeDasharray={36} strokeDashoffset={36} d="M12 14c4 0 7 2 7 3v2h-14v-2c0 -1 3 -3 7 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.5s" values="36;0"></animate></path></g></svg> }
          </button> ) }
          {
            isDropdownOpen && (
              <ul className="border-2 border-yellow-400 w-[7vw] h-[12vh] flex flex-col justify-between absolute top-[7vh] right-[16vh]">
                {
                  navigation.map( (item, index) => (
                    item.href === "/logout" 
                    ? <button key={index} onClick={handleLogOut} className="cursor-pointer text-start">
                        <li className="w-full hover:bg-yellow-400 cursor-pointer pl-2" key={index}>{item.name}</li>
                      </button>
                    : <Link key={index} to={item.href}>
                        <li className="w-full hover:bg-yellow-400 cursor-pointer pl-2" key={index}>{item.name}</li>
                      </Link>
                  ) )
                }
              </ul>
            )
          }

          {/* { currentUser && <button onClick={handleLogOut} className="w-[4.5vw] bg-red-500 text-white font-bold flex justify-center items-center rounded-md py-1 hover:scale-110 cursor-pointer"> Logout </button>} */}
          
          {/* <svg  className="mt-1" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeDasharray={32} strokeDashoffset={32} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0"></animate></path></svg> */}
          
          <Link to="/cart">
            <div className="cart-div w-[5vw] bg-yellow-400 flex justify-center items-center rounded-md py-1 hover:scale-115">
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#000" d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4M4 5h10.7l-1.1 4l-8.4.9z"/></svg>
              <span className="font-bold"> {count} </span>
            </div>
          </Link>
        </div>
    </nav>
  );
};

export default Navbar;