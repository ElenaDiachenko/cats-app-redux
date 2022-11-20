export const useOptions = (data, value, label) => {
  const options = [
    { value, label },
    ...data.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];
  return options;
};
