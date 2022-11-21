export const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};
