import { useGetBreedListQuery, useGetBreedByIdQuery } from './breedsApiSlice';
import { useGetAllImagesQuery } from './imagesApiSlice';
import {
  useGetAllFavouriteQuery,
  useRemoveFavouriteMutation,
  useAddFavouriteMutation,
} from './favouritesApiSlice';
import {
  useGetVotesQuery,
  useRemoveVoteMutation,
  useAddVoteMutation,
} from './votesApiSlice';

export {
  useGetBreedListQuery,
  useGetBreedByIdQuery,
  useGetAllImagesQuery,
  useGetAllFavouriteQuery,
  useRemoveFavouriteMutation,
  useAddFavouriteMutation,
   useGetVotesQuery,
  useRemoveVoteMutation,
  useAddVoteMutation,
};
