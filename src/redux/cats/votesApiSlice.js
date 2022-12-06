import { apiSlice } from '../apiSlice';

export const votesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVotes: builder.query({
      query: (userId) => ({
        url: `/votes?sub_id=${userId}&limit=10&order=DESC`,
      }),
      providesTags: [{ type: 'Votes', id: 'LiST' }],
    }),
    getDislikes: builder.query({
      query: (userId) => ({
        url: `/votes?sub_id=${userId}`,
        transformResponse(response) {
          return {
            response: response.filter((item) => item.value === -1),
          };
        },
      }),
      providesTags: [{ type: 'Votes', id: 'LiST' }],
    }),
    getLikes: builder.query({
      query: (userId) => ({
        url: `/votes?sub_id=${userId}`,
        transformResponse(response) {
          return {
            response: response.filter((item) => item.value === 1),
          };
        },
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

export const {
  useGetVotesQuery,
  useGetDislikesQuery,
  useGetLikesQuery,
  useRemoveVoteMutation,
  useAddVoteMutation,
} = votesApiSlice;
