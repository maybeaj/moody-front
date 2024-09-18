import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;
const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

function PostItem(props) { 
    const navigate = useNavigate();
    const moveHandler = () => {
        navigate(`post/${props.data.id}`);
    }
    return (
        <Wrapper onClick={moveHandler}>
            <TitleText>{props.data.content}</TitleText>
        </Wrapper>
    );
}


export default PostItem ;