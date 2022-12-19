import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { login } from '../redux/apiCalls';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(
        rgba(90, 90, 90, 0.6), 
        rgba(90, 90, 90, 0.6)
    ), url("https://wallpapercave.com/wp/wp4846782.jpg") center;

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

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    margin: 10px 0px;
`;

const Input = styled.input`
    flex: 1;
    margin: 10px 0px;
    padding: 10px;
    width: 100%;
    font-size: 14px;
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
    margin: 10px 0px;

    &:disabled {
        background-color: gray;
        cursor: progress;
    }

    &:hover {
        transform: scale(1.05);
    }
`

const ErrorMessage = styled.span`
    color: red;
    font-weight: 600;
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

const SuccessText = styled.span`
    font-weight: 500;
    font-size: 18px;
`;

const LinkText = styled.a`
    font-size: 12px;
    margin: 10px 0px;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error, currentUser } = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    }

    return (
        <Container error={error}>
            { !currentUser 
            ?   <Wrapper>
                    <Title>SIGN IN</Title>
                    <Form>
                        <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
                        {error && <ErrorMessage>Something went wrong... invalid credentials!</ErrorMessage>}
                        <LinkText>DO NOT YOU REMEMBER THE PASSWORD?</LinkText>
                        <LinkText>CREATE A NEW ACCOUNT</LinkText>
                    </Form>
                </Wrapper>
            
            :   <Wrapper>
                    <SuccessText>Welcome back!</SuccessText>
                    <Link to={"/"}>
                        <SuccessText>Click here to redirect you to the homepage!</SuccessText>
                    </Link>
                </Wrapper>
            }
        </Container>
    );
}

export default Login;