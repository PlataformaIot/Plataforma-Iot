import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import LogoIBTI from '../../assets/Logo-IBTI.png';
import { FaUserCircle } from 'react-icons/fa'

import { Dropdown, Form, Button } from 'react-bootstrap';




export default function Header() {







    return (
        <div className="style">
            <header className="container">
                <Link to="/">
                    <img className="logo" src={LogoIBTI} width="100" height="100" />
                </Link>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaUserCircle size={50} color="#FFF" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>User</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Sair</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </header>
        </div>
    )
}