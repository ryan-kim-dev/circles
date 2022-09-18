import React from 'react';
import PostList from '../components/posts/PostList';
import Header from '../components/Common/Header';
import { Container } from '../GlobalStyle';

function Home() {
  return (
    <Container>
      <Header />
      <PostList />
    </Container>
  );
}

export default Home;
