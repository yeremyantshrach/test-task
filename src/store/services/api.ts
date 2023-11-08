import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.henrikdev.xyz/',
});
export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['leaderboards'],
  endpoints: () => ({}),
});
