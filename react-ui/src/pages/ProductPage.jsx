import React, { useEffect, useState } from 'react';
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { publicRequest } from '../requestMethods';
import { useLocation } from 'react-router-dom';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const Container = styled.div`
`;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;

`;

const ImageContainer = styled.div`
  width: 100%;
  flex: 1;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: contain;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  display: flex;
  background-color: white;
  border: 2px solid teal;
  height: 40px;
  font-weight: 700;
  padding: 15px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0f8f8;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // GETS PRODUCT FROM DATABASE ON LOAD
  useEffect(() => {
      const getProduct = async () => {
          try{
              const res = await publicRequest.get(`/product/find/${id}`);
              setProduct(res.data);
          } catch(err) {
            console.log(err);
          }
      };
      getProduct();
  }, [id]);
  
  // ITEM QUANTITY COUNTER
  const handleQuantity = (e) => {
    if(e === "add") {
      setQuantity(quantity + 1);
    } else if (e === "remove" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // ADD ITEM TO CART USING REDUX
  const handleAddItem = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  //SCROLLS TO TOP OF PAGE ON LOAD
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <ImageContainer>
          <Image src={product.img}/>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("remove")}/>
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("add")}/>
            </AmountContainer>
            <Button onClick={() => handleAddItem()}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter/>
      <Footer/>
    </Container>
  );
}

export default Product;