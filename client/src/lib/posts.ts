import api from './api';

export interface Post {
  _id: string;
  content: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
}

export interface CreatePostResponse {
  post: Post;
}

export interface GetPostsResponse {
  posts: Post[];
}

export const createPost = async (content: string, token: string): Promise<CreatePostResponse> => {
  const res = await api.post<CreatePostResponse>(
    '/posts',
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getPosts = async (): Promise<GetPostsResponse> => {
  const res = await api.get<GetPostsResponse>('/posts');
  return res.data;
};