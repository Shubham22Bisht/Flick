import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import newLogo from "../../assets/newLogo.png";
import noUser from "../../assets/noUser.png";
import { googleAuthProvider,auth} from "../../firebaseCongif";
import {signInWithPopup,signOut} from "@firebase/auth";

export const Header = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        const name = res?.user?.displayName;
        const email = res?.user?.email;
        const profilePic = res?.user?.photoURL;
        localStorage.setItem("name",name);
        localStorage.setItem("email",email);
        localStorage.setItem("profilePic",profilePic);
        localStorage.setItem("isAuth",true);
        window.location.pathname="/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signUserOut=()=>{
    signOut(auth).then((res)=>{
      setIsAuth(false);
      localStorage.clear();
    }).catch((err)=>{
      console.log(err);
    })
  }

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY,isAuth]);

  const searchQueryHandler = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type == "movie") {
      navigate("/explore/movie");
    } else if (type == "tv") {
      navigate("/explore/tv");
    } else if (type == "actors") {
      navigate("/person/popular");
    }

    setMobileMenu(false);
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={newLogo} alt="" />
          <span className="logoText">Flick</span>
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("tv");
            }}
          >
            TV Shows
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("actors");
            }}
          >
            Actors
          </li>
          <li className="menuItem">
            <HiOutlineSearch
              onClick={() => {
                openSearch();
              }}
            />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={() => openSearch()} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or web series..."
                onKeyUp={searchQueryHandler}
                onChange={(event) => setQuery(event.target.value)}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
      {!isAuth ? (
        <button type="button" className="login-with-google-btn"
        onClick={signInWithGoogle} >
        Sign in
      </button>
      ) : (
          <div className="userProfile">
          <img className="profile"  src={localStorage.getItem("profilePic") || noUser}/>
          <button className="log-out" onClick={()=>{
            signUserOut();
            
          }}>SignOut</button>
          </div> 
      )}
    </header>
  );
};
