const limit = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
];

const order = [
  { value: 'rand', label: 'Random' },
  { value: 'desc', label: 'Desc' },
  { value: 'asc', label: 'Asc' },
];

const type = [
  { value: 'gif,jpg,png', label: 'All' },
  { value: 'jpg,png', label: 'Static' },
  { value: 'gif', label: 'Animated' },
];

export const selectOptions = { limit, order, type };
