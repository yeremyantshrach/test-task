import { api } from './api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://6396aee2a68e43e41808fa18.mockapi.io/api/',
});

export interface IPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  postText: string;
  postImage: string;
  createdAt: string;
}
export const postsApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], { page: number }>({
      query: ({ page }) => ({
        url: `/posts`,
        params: { page, limit: 5, completed: false },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getPostById: builder.query<IPost, { postId: string }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}`,
      }),
    }),
    searchPostByName: builder.query<IPost[], { search: string }>({
      query: ({ search }) => ({ url: '/posts', params: { search } }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useSearchPostByNameQuery } = postsApi;
