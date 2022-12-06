import { apiSlice } from '../apiSlice';

export const votesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVotes: builder.query({
      query: (userId) => ({
        url: `/votes?sub_id=${userId}&limit=10&order=DESC`,
      }),
      providesTags: [{ type: 'Votes', id: 'LiST' }],
    }),
    addVote: builder.mutation({
      query: (body) => ({
        url: `/votes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Votes', id: 'LiST' }],
    }),
    removeVote: builder.mutation({
      query: (id) => ({
        url: `/votes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Votes', id: 'LiST' }],
    }),
  }),
});

export const { useGetVotesQuery, useRemoveVoteMutation, useAddVoteMutation } =
  votesApiSlice;
