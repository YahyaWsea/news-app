import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';


export default function NavBar(props) {

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.pathname = "/login";
    }
    return (
        <>
            <Navbar expand="lg" variant="dark" className={styles.navbar}>
                <Navbar.Brand as={Link} to="/" >
                    <img src="/images/logo192.png" alt="logo" className={styles.logo} />
                    <span className={styles.title}>News</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" className={styles.link} >  Home </Nav.Link>
                        <Nav.Link as={Link} to="/sources" className={styles.link}>Sources</Nav.Link>
                    </Nav>

                    <Nav.Link as={Link} onClick={handleLogout} className={styles.link} > Logout </Nav.Link>

                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
