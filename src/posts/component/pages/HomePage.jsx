import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PostList from '../list/PostList';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Header = styled.header`
    position: sticky;
    top: 0;
    background: white;
    padding: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 24px;
`;

const SubHeader = styled.div`
    margin: 8px 0;
    font-size: 14px;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const Button = styled.button`
    background-color: #FFD700; /* 노란색 */
    color: white; /* 글씨 색상 */
    border: none;
    border-radius: 25px; /* 동글동글한 모서리 */
    padding: 10px 20px; /* 위아래, 좌우 여백 */
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FFC107; /* 호버 시 약간 어두운 노란색 */
    }

    &:active {
        background-color: #FFA000; /* 클릭 시 더 어두운 노란색 */
    }
`;

function HomePage() {
    const [list, setList] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            const response = await api.get("mood/list");
            setList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Wrapper>
            <Header>
                <Title>MOOD-DIARY: MOODY</Title>
                <SubHeader>
                    <Button onClick={() => navigate("/")}>Home</Button>
                    <Button onClick={() => navigate("/calendar")}>Calendar</Button>
                    <Button onClick={() => navigate("/write")}>Write</Button>
                </SubHeader>
            </Header>
            <Container>
            <PostList data={list}/>
            </Container>
        </Wrapper>
    );
}

export default HomePage;