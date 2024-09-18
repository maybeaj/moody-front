import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../api/axios";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    background-color: #ffd700; /* 노란색 */
    color: white; /* 글씨 색상 */
    border: none;
    border-radius: 25px; /* 동글동글한 모서리 */
    padding: 10px 20px; /* 위아래, 좌우 여백 */
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ffc107; /* 호버 시 약간 어두운 노란색 */
    }

    &:active {
        background-color: #ffa000; /* 클릭 시 더 어두운 노란색 */
    }
`;

function ViewPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/mood/select/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [id]);

    const handleEdit = () => {
        navigate(`/update/${id}`); // 수정 페이지로 이동
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await api.delete(`/mood/delete/${id}`);
                alert("게시글이 삭제되었습니다.");
                navigate("/"); // 홈으로 이동
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <Wrapper>
            <h2>{post.mood}</h2>
            <p>{post.content}</p>
            <p>{post.date}</p>
            <Button onClick={handleEdit}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
        </Wrapper>
    );
}

export default ViewPage;