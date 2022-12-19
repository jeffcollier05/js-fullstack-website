import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";

const Container = styled.div`
`;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`;

const Select = styled.select`
    margin-right: 20px;
    padding: 10px;
`;

const Option = styled.option`
`;

const ProductList = () => {
    const location = useLocation();
    const category = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({});
    
    // FILTER PRODUCTS USING DROPDOWNS
    const handleFilters = (e) => {
        const value = e.target.value.toLowerCase();
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    return (
        <Container>
            <Announcement/>
            <Navbar/>
            <Title>{category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="priceRange" onChange={handleFilters}>
                        <Option >No filter</Option>
                        <Option>$0-$99</Option>
                        <Option>$100-$199</Option>
                        <Option>$200-$499</Option>
                        <Option>$500+</Option>
                    </Select>
                    <Select name="productState" onChange={handleFilters}>
                        <Option >No filter</Option>
                        <Option>Physical</Option>
                        <Option>Digital</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort}/>
            <Newsletter/>
            <Footer/>
        </Container>
    );
}

export default ProductList;