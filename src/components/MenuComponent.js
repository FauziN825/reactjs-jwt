import React, { Fragment, useContext, useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button
  } from 'reactstrap';
import { AuthContext } from '../App';

export default function MenuComponent() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const {state, dispatch}  = useContext(AuthContext)

    
    return (
    <div>
    <Navbar className="navbar-dark bg-dark" expand="md">

            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                <NavLink href="/menu1/">Menu 1</NavLink>
                </NavItem>
            </Nav>
            <NavbarText>
                <Button color="default" onClick={() => {
                    dispatch({
                        type: "LOGOUT"
                    })
                }} >
                    {state.isAuthenticated && (
                        <NavLink>Logout</NavLink>
                     )}

                </Button>

            </NavbarText>
            </Collapse>
        </Navbar>
    </div>
    

    )
}
