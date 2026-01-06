const SearchBar = ({ setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search tracks..."
      className="w-full px-3 py-1.5 text-sm rounded bg-gray-700 text-white focus:outline-none"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;
