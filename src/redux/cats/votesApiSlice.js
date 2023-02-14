import { apiSlice } from '../apiSlice';

export const votesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getVotes: builder.query({
      query: ({ userId, limit }) => ({
        url: `/votes?sub_id=${userId}&limit=${limit}&order=DESC`,
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Votes', id })),
              { type: 'Votes', id: 'LIST' },
            ]
          : ['Votes'],
    }),
    addVote: builder.mutation({
      query: body => ({
        url: `/votes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Votes', id: 'LIST' }],
    }),
    removeVote: builder.mutation({
      query: id => ({
        url: `/votes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Votes', id }],
    }),
  }),
});

export const { useGetVotesQuery, useRemoveVoteMutation, useAddVoteMutation } =
  votesApiSlice;
