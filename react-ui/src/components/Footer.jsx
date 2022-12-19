import React from 'react';
import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
`;

const Left = styled.div`
    flex: 1;
    flex-direction: column;
    display: flex;
    padding: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
`;

const Logo = styled.h1``

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
`;

const Desc = styled.p`
    margin: 20px 0px;

`;

const SocailIconContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=> props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 240px;
    height: 40px;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>COLLIER.</Logo>
                <Desc>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore laudantium natus, possimus quisquam sit id dolore, et distinctio illo veniam illum repellendus tempore beatae, iste ullam quaerat repudiandae dolores vitae?</Desc>
                <SocailIconContainer>
                    <SocialIcon color="3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter/>
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest/>
                    </SocialIcon>
                </SocailIconContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Computers</ListItem>
                    <ListItem>Cameras</ListItem>
                    <ListItem>Mobile Devices</ListItem>
                    <ListItem>Video Games</ListItem>
                    <ListItem>Chargers</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{marginRight:"10px"}}/>
                    Oklahoma City, Oklahoma 73134
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight:"10px"}}/>
                    (918) 867-5309
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{marginRight:"10px"}}/>
                    contact@colli.dev
                </ContactItem>
                <Payment src="https://www.stmalachi.org/wp-content/uploads/2018/08/credit-card-png-hd-major-credit-card-logo-png-clipart-8552.png"/>
            </Right>
        </Container>
    );
}

export default Footer;