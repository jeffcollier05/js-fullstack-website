import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/apiCalls';

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.button`
  font-weight: bold;
  border: none;
  font-size: 32px;
  font-weight: 600;
  background-color: transparent;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const AuthButton = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 650;
  cursor: pointer;
`;

const Navbar = () => {
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  const { currentUser, navbarText} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    console.log(navbarText);
    if (!currentUser) {
      navigate("/login")
    } else if(currentUser) {
      logout(dispatch);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input/>
            <Search style={{color:"gray", fontSize:16}}/>
          </SearchContainer>
        </Left>
        <Center>
          <Link to={"/"}>
            <Logo>
              COLLIER.  
            </Logo>
          </Link>
        </Center>
        <Right>
          <AuthButton onClick={() => navigate("/register")}>Register?</AuthButton>
          <AuthButton onClick={handleLoginClick}>{navbarText}</AuthButton>
          <Link to={"/cart"}>
            <MenuItem>
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingCartOutlined/>
              </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;