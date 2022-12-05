export const useOptions = (data, value, label) => {
  if (!data) return;
  const options = [
    { value, label },
    ...data.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];
  return options;
};
