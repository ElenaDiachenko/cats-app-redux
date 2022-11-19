// import { useGetBreedsQuery } from '../redux/breed/breedsApiSlice';

export const useOptions = (data, value, label) => {
  //   const { data, error, isLoading } = useGetBreedsQuery();

  const options = [
    { value, label },
    ...data.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];
  return options;
};
