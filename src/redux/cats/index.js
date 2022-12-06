import { useGetBreedListQuery, useGetBreedByIdQuery } from './breedsApiSlice';
import { useGetAllImagesQuery } from './imagesApiSlice';
import {
  useGetAllFavoriteQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,
} from './favoritesApiSlice';
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
  useGetAllFavoriteQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,
  useGetVotesQuery,
  useGetDislikesQuery,
  useGetLikesQuery,
  useRemoveVoteMutation,
  useAddVoteMutation,
};
