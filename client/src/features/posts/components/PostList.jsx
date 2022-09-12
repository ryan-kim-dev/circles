import React from 'react';
import { useQuery } from 'react-query';
import { getPosts } from '../../../apis/postApi';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import * as S from './PostListStyles';

function PostList() {
  // const [images, setImages] = useState([]);
  // const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: posts,
  } = useQuery('posts', getPosts);

  // const addPostMutation = useMutation(addPost, {
  //   onSuccess: () => {
  //     // 캐시 무효화하고 다시 Fetch
  //     queryClient.invalidateQueries('posts');
  //   },
  // });

  // const updatePostMutation = useMutation(updatePost, {
  //   onSuccess: () => {
  //     // 캐시 무효화하고 다시 Fetch
  //     queryClient.invalidateQueries('posts');
  //   },
  // });

  // const deletePostMutation = useMutation(deletePost, {
  //   onSuccess: () => {
  //     // 캐시 무효화하고 다시 Fetch
  //     queryClient.invalidateQueries('posts');
  //   },
  // });

  // useEffect(() => {
  //   axios
  //     .get('/api/posts')
  //     .then((response) => setImages(response.data))
  //     .catch((err) => console.log(`${err}`));

  let postlists;
  if (isLoading) {
    postlists = <p>Loading...</p>;
  } else if (isError) {
    postlists = <p>{error.message}</p>;
  } else {
    postlists = posts.map((image) => {
      return (
        <S.PostListItem key={image.key}>
          {/* src가 서버의 이미지 파일 저장 폴더로 접근하는 경로 */}
          <img src={`http://localhost:5000/uploads/${image.key}`} alt="#" />
        </S.PostListItem>
      );
    });
  }

  return <S.PostLists>{postlists}</S.PostLists>;
}

export default PostList;
