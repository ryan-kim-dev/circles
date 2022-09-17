import React from 'react';
import PostList from '../components/posts/PostList';
import { Layout } from '../GlobalStyle';

function Home() {
  return (
    <Layout>
      <PostList />
    </Layout>
  );
}

export default Home;
