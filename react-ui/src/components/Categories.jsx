import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  width: 95%;
  padding: 20px;
  margin: 0px 30px;
  justify-content: space-evenly;
`;

const Categories = () => {
  return (
    <Container>
      {categories.map(item => (
          <CategoryItem item={item} key={item.id}/>
      ))}
    </Container>
  );
}

export default Categories;