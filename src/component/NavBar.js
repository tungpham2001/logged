import React, { useState } from 'react';
import {
    FaHome,
    FaUserAlt,
    FaBook,
	FaCog,
	FaAngleDoubleLeft,
	FaAngleDoubleRight,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import Logo from "../images/logged.jpg";


const NavBar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);

    const toggle = () => setIsOpen (!isOpen);

    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<FaHome/>
        },
        {
            path:"/profile",
            name:"Your Profile",
            icon:<FaUserAlt/>
        },
        {
            path:"/log",
            name:"Log Board",
            icon:<FaBook/>
        },
        {
            path:"/setting",
            name:"Setting",
            icon:<FaCog/>
        },
    ]
    return (
        <div className="container">
           	<div style={{width: isOpen ? "calc(100vw / 7)" : "calc(100vw / 20)"}} className="sidebar">
               	<div className="top_section">
					<div>
						{isOpen && (
							<img
								style={{ 
									display: isOpen ? "block" : "none",
									width: "100%",
            						height: "auto",
								}}
								className="logo"
								src={Logo}
								alt="Logo"
							/>
						)}
				   	</div>
					   	<div style={{ marginLeft: isOpen ? "1vw" : "0.88vw" }} className="bars">
							{isOpen ? (
								<FaAngleDoubleLeft onClick={toggle} />
							) : (
								<FaAngleDoubleRight onClick={toggle} />
							)}
						</div>
               	</div>
			   	<div className="page_section">
					{
						menuItem.map((item, index)=>(
							<NavLink to={item.path} key={index} className="link" activeclassName="active">
								<div className="link_content">
									<div className="icon">{item.icon}</div>
									<div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
								</div>
							</NavLink>
						))
					}
			   	</div>
           	</div>
           	<main>{children}</main>
        </div>
    );
};

export default NavBar;