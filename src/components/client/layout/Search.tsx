import { FaSearch } from "react-icons/fa";
{/* Test */}
const Search = () => {
  return (
    <div className="">
      <label className="input input-ghost bg-base-300">
        <FaSearch />
        <input type="search" className="grow" placeholder="Search" />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
    </div>
  );
};

export default Search;
