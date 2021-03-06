import React from 'react'

export default function Navbar() {
    return (
        <header>
            <h1 className="logo">LOGOBAKERY</h1>
            {/* <img className="logo" src="#" alt="logo"/> */}
            <nav>
                <ul className="nav_links">
                    <li><a href="#">คู่มือ</a></li>
                    <li><a href="#">หน่วยการเรียนรู้</a></li>
                    <li><a href="#">ติดต่อเจ้าหน้าที่</a></li>
                    <li><a href="#">เกี่ยวกับเว็บไซต์</a></li>
                </ul>
            </nav>
            <a className="cta" href="#"><button>ติดต่อ</button></a>
        </header>
    )
}
