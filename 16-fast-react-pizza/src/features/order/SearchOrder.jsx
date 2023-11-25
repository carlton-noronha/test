import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order#"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="focus:ring-5 w-28 rounded-full bg-yellow-200 px-4 py-2 text-sm transition-all duration-500 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-60 sm:focus:w-72"
      />
    </form>
  );
};

export default SearchOrder;
