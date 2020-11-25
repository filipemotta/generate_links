import React from 'react';
import {Logo, HeaderContainer} from './styles';
import LogoImg from '../../assets/logo.jpg'

function Header(props) {
    return (
    <>
    <HeaderContainer>
        <Logo src= {LogoImg} alt="Generate Links" />
    <p>{props.children}</p>
    </HeaderContainer>
    </>
    )
}

export default Header;