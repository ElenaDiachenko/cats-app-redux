import { useGetBreedListQuery, useGetBreedByIdQuery } from './breedsApiSlice';
import { useGetAllImagesQuery } from './imagesApiSlice';
import {
  useGetAllFavouriteQuery,
  useRemoveFavouriteMutation,
  useAddFavouriteMutation,
} from './favouritesApiSlice';
import {
  useGetVotesQuery,
  useGetDislikesQuery,
  useGetLikesQuery,
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
   useGetDislikesQuery,
  useGetLikesQuery,
  useRemoveVoteMutation,
  useAddVoteMutation,
};
