import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { register } from '../redux/apiCalls';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(90, 90, 90, 0.5), 
        rgba(90, 90, 90, 0.5)
    ), url("https://i.pinimg.com/originals/4c/a6/ac/4ca6acedc271603e4fa1837e169e49b1.jpg") center;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 30%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    padding: 20px 30px;
`;

const Form = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;

const Input = styled.input`
    flex: 1;
    margin: 10px 0px;
    padding: 10px;
    width: 100%;
    font-size: 14px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    margin: 10px 0px;
`;

const Agreement = styled.p`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    background-color: #d13b15;
    border: none;
    color: white;
    padding: 7px 60px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.5s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const ResponseText = styled.span`
    color: red;
    margin: 10px 0px;
    animation: shake 0.7s;

    @keyframes shake {
        10%, 90% {
            transform: translate(-1px);
        }
        20%, 80% {
            transform: translate(2px);
        }
        30%, 50%, 70% {
            transform: translate(-4px);
        }
        40%, 60% {
            transform: translate(4px);
        }
    }
`;

const SuccessMessage = styled.div`
`;

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [response, setResponse] = useState("");
    
    const handleRegister = (e) => {
        // CHECK FOR EMPTY BOXES
        const entries = [ firstname, lastname, username, email, password, confirmPassword ];
        for (let i = 0; i < entries.length; i++) {
            if(entries[i] === "") {
                setResponse("Can't leave an entry box empty.");
                return null;
            }
        }
        
        // VERIFY PASSWORDS MATCH
        if(password !== confirmPassword) {
            setResponse("Passwords don't match!");
            return null;
        }
        
        e.preventDefault();
        register({ firstname, lastname, username, email, password });
        setResponse("success");
    };

    return (
        <Container>
            { (response !== "success") 
            ?   <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form>
                        <Input placeholder="First name" onChange={(e) => setFirstname(e.target.value)}></Input>
                        <Input placeholder="Last name" onChange={(e) => setLastname(e.target.value)}></Input>
                        <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Input>
                        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)}></Input>
                        <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></Input>
                        <Input placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)}></Input>
                        <Agreement>
                            By creating an account, I consent to the processing of my personal
                            data in accordance with the <b>PRIVACY POLICY</b>
                        </Agreement>
                        <Button onClick={handleRegister}>CREATE</Button>
                        {response && <ResponseText>{response}</ResponseText>}
                    </Form>
                </Wrapper>
            
            :   <Wrapper>
                    <SuccessMessage>Welcome to your account!</SuccessMessage>
                    <SuccessMessage>You will need to log in on return.</SuccessMessage>
                    <Link to={"/"}>
                        <SuccessMessage>Redirect to the homepage by clicking here!</SuccessMessage>
                    </Link>
                </Wrapper>
            }
        </Container>
    );
}

export default Register;