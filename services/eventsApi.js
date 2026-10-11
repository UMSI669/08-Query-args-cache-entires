import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TRACKS = ['Product', 'Design', 'Engineering', 'Leadership'];

function normalizeEvent(post) {
  if (!post || typeof post.id === 'undefined' || !post.title) {
    return null;
  }
  const id = Number(post.id);
  return {
    id: String(post.id),
    title: post.title,
    description: post.body || 'No additional session details were provided.',
    speaker: `Guest speaker ${post.userId || 1}`,
    track: TRACKS[(id - 1) % TRACKS.length] || 'Product',
    time: `${String(9 + ((id - 1) % 8)).padStart(2, '0')}:00`,
  };
}

export function isValidEventId(eventId) {
  return typeof eventId === 'string' && /^[1-9]\d*$/.test(eventId);
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'posts?_limit=8',
      transformResponse: (posts) => (Array.isArray(posts) ? posts.map(normalizeEvent).filter(Boolean) : []),
      keepUnusedDataFor: 300,
    }),
    getEvent: builder.query({
      query: (eventId) => `posts/${encodeURIComponent(eventId)}`,
      transformResponse: normalizeEvent,
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventQuery } = eventsApi;
