export const usePagination = (data, limit, currentPage) => {
  const indexOfLastPost = currentPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentShownElements = data.slice(indexOfFirstPost, indexOfLastPost);
  return currentShownElements;
};
