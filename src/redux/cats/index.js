import { useGetBreedListQuery, useGetBreedByIdQuery } from './breedsApiSlice';
import { useGetAllImagesQuery } from './imagesApiSlice';
import {
  useGetAllFavoriteQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,
} from './favoritesApiSlice';
import {
  useGetVotesQuery,
  useRemoveVoteMutation,
  useAddVoteMutation,
} from './votesApiSlice';

export {
  useGetBreedListQuery,
  useGetBreedByIdQuery,
  useGetAllImagesQuery,
  useGetAllFavoriteQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,
  useGetVotesQuery,
  useRemoveVoteMutation,
  useAddVoteMutation,
};
