import React from 'react';
import PostList from '../features/posts/components/PostList';
import { Layout } from '../GlobalStyle';

function Home() {
  return (
    <Layout>
      <PostList />
    </Layout>
  );
}

export default Home;
