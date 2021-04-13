import React from 'react';
import { Link } from 'react-router-dom';
import './css/Nav.css';

const Nav = () =>{
    return(
        <div className="Navbar">
                    <h1>Socialogy</h1>
                    <ul>
                        <li><Link style={{textDecoration:'none',color:'white'}} to={`/`}>Sign Up</Link></li>
                        <li><Link style={{textDecoration:'none',color:'white'}} to={`/signin`}>Sign In</Link></li>
                    </ul>
                </div>    
    );
}
export default Nav;