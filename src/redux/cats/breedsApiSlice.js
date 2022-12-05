import { apiSlice } from '../apiSlice';

export const breedsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBreedList: builder.query({
      query: () => `breeds`,
      providesTags: ['Breeds'],
    }),
  }),
});

export const { useGetBreedListQuery } = breedsApiSlice;
