import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Image = styled.img`
    width: 90%;
    height: 90%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: all 0.5s ease;
`;

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;

    &:hover ${Image}{ 
        filter: grayscale(0%);
        transform: scale(1.12);
    }
`;

const Info = styled.p`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: black;
    cursor: pointer;
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Link to={`/products/${item.category}`}>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOW NOW</Button>
        </Info>
        </Link>
    </Container>
  );
}

export default CategoryItem;