import './App.scss';

import postsFromServer from './api/posts.json';
import commentsFromServer from './api/comments.json';
import usersFromServer from './api/users.json';

import { PostList } from './components/PostList/PostList';

function GetUserById(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function GetCommentsById(postId) {
  const result = commentsFromServer.reduce((acc, comment) => {
    if (comment.postId === postId) {
      acc.push(comment);
    }

    return acc;
  }, []);

  if (result.length === 0) {
    return null;
  }

  return result;
}

export const posts = postsFromServer.map(post => ({
  ...post,
  user: GetUserById(post.userId),
  comments: GetCommentsById(post.id),
}));

export const App = () => (
  <section className="App">
    <h1 className="App__title">Static list of posts</h1>
    <PostList posts={posts} />
  </section>
);
