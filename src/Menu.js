import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from './logo.svg';
import { BsPersonLinesFill, BsPersonPlusFill } from 'react-icons/bs';
import { BiCalendar, BiCalendarPlus } from "react-icons/bi";
import { FaStore, FaStoreAlt } from 'react-icons/fa';

const Menu = () => {
    return (
        <Navbar className="col" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <a href="/clients">
                    <img alt="" src={logo} width="50" height="50" className="d-inline-block align-top" />
                </a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Clients" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/clients"><span><BsPersonLinesFill /></span> Liste des clients</NavDropdown.Item>
                        <NavDropdown.Item href="/add-client"><span><BsPersonPlusFill /></span> Création d'une fiche client</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Réservations" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/reservations"><span><BiCalendar /></span> Liste des réservations</NavDropdown.Item>
                        <NavDropdown.Item href="/add-reservation"><span><BiCalendarPlus /></span> Réservation d'une table</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Restaurants" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/restaurants"><span><FaStore /></span> Liste des restaurants</NavDropdown.Item>
                        <NavDropdown.Item href="/add-restaurant"><span><FaStoreAlt /></span> Ajout d'un restaurant</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menu;