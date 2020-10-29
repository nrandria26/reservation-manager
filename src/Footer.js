import React from 'react';
import { Navbar } from 'react-bootstrap';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <Navbar className="col justify-content-between bg-dark">
            <div>
                <Navbar.Brand>
                    <FaFacebook style={{ fill: 'white' }} />
                </Navbar.Brand>
                <Navbar.Brand>
                    <FaLinkedin style={{ fill: 'white' }} />
                </Navbar.Brand>
                <Navbar.Brand>
                    <FaGithub style={{ fill: 'white' }} />
                </Navbar.Brand>
            </div>
            <div>
                <Navbar.Brand className="text-white"><small>Copyright &copy; 2020 Randriamanantena</small></Navbar.Brand>
            </div>
        </Navbar>
    );
}

export default Footer;