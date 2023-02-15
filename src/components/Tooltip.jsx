export const Tooltip = ({ message, children }) => {
  return (
    <div class="group relative flex">
      {children}
      <span class="absolute top-10 scale-0 transition-all rounded bg-gray-800 dark:bg-white px-1.5 text-sm text-white dark:text-black group-hover:scale-100 ">
        {message}
      </span>
    </div>
  );
};
