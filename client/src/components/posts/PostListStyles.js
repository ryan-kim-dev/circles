import styled from 'styled-components';

export const PostLists = styled.ul`
  border: 1px solid black;
`;

export const PostListItem = styled.li`
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    max-width: 100%;
    margin: auto;
  }
`;

export const PostUserInfo = styled.div`
  width: 100%;
  height: 30px;
  background-color: #fff;
  display: flex;
`;

export const PostUsername = styled.h3``;
export const PostedDate = styled.span`
  color: gray;
`;
