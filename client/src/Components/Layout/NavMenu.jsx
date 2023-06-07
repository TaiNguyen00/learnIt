import React, { useContext, useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse
} from 'mdb-react-ui-kit';

import { Link } from "react-router-dom"
import learnitLogo from "../../Assets/img/learnit.png"
import logout from "../../Assets/img/logout.png"
import { AuthContext } from '../../contexts/authContext';
const NavMenu = () => {
    const [showNavSecond, setShowNavSecond] = useState(false);
    const {authState, logOutUser} = useContext(AuthContext)
    console.log(authState)

    const logOut = () => {
        logOutUser()
    }

    return (
        <MDBNavbar expand='lg' light bgColor='light' className='sticky-top'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'><img src={learnitLogo} alt="" width='50' height='auto' /></MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavSecond(!showNavSecond)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNavSecond} className='justify-content-sm-between'>
                    <MDBNavbarNav>
                        <MDBNavbarLink href='#'><Link to='/home' style={{color: 'rgba(0,0,0,.55)'}}>Dashboard</Link></MDBNavbarLink>
                        <MDBNavbarLink href='#'><Link to='/about' style={{color: 'rgba(0,0,0,.55)'}}>About</Link></MDBNavbarLink>
                    </MDBNavbarNav>
                    <MDBNavbarNav className=' w-auto d-flex align-items-center'>
                        <span style={{width: '250px'}}>Xin chào! {authState.user.username}</span>
                        <MDBNavbarLink onClick={logOut}>
                            <img src={logout} alt="" width='32'/>
                        </MDBNavbarLink>
                    </MDBNavbarNav>
                </MDBCollapse>
        
            </MDBContainer>
        </MDBNavbar>
    )
}
export default NavMenu