import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { LOGIN_STATUS, USER_LEVEL, ACCESS_TOKEN, USER_NAME, server } from '../../Constants'

import { useRecoilValue, useRecoilState } from 'recoil';
import { loginAtom, userAtom } from '../../store';

const Navbar2 = ( props ) => {

    const [Burger, setBurger] = useState(false)

    function changeHandler() {
        localStorage.removeItem(LOGIN_STATUS);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER_LEVEL);
        localStorage.removeItem(USER_NAME);
        props.history.push("/")
     };

    const loginStatus = () => {
        const status = localStorage.getItem(LOGIN_STATUS)
        if (status) {
            return true
        } else {
            return false
        }
    }

    const userLevel = () => {
        const level = localStorage.getItem(USER_LEVEL)
        if ( level === "2" ) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        loginStatus()
        userLevel()
    }, []);

    const toggleBurger = () => {
        Burger ? setBurger(false) : setBurger(true)
        const navLinks = document.querySelectorAll('.nav_links li')
        navLinks.forEach((link, index) => {
            if (Burger) {
                link.style.animation = ``
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
            }
        })
    }

    return (
        <nav>
            <div className={`burger ${Burger && "toggle"}`} onClick={() => toggleBurger()}>
                <div className="line1 line"></div>
                <div className="line2 line"></div>
                <div className="line3 line"></div>
            </div>
            <div className="logo">
                <Link to="/"><h1>Start basic</h1></Link>
            </div>
            <ul className={`nav_links ${Burger && "nav-active"}`}>
                <li><Link to="/">หน้าแรก</Link></li>
                <li><a href="#">คู่มือ</a></li>
                <li><a href="#">หน่วยการเรียนรู้</a></li>
                <li><Link to="/contact">ติดต่อ</Link></li>
                { userLevel() && <li><Link to="/admin">Admin</Link></li> }
            </ul>
            { !loginStatus() ? 
            <button className="button" onClick={() => props.setShowModel(true) } >Login</button>
            : <button className="button" onClick={() => changeHandler()} >Logout</button> }
        </nav>
    )
}

export default withRouter(Navbar2);