import styled from 'styled-components';
import PostItem from './PostItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

     & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function PostList(props) {
    const data = Array.isArray(props.data) ? props.data : [];
    
    return (
        <Wrapper>
            {data.map((post) => (
                <PostItem key={post.id} data={post} />
            ))}
        </Wrapper>
    );
}

export default PostList ;