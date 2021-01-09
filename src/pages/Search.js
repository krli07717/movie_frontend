import React, { useState } from "react";
import Collection from "../components/Collection";
import Button from "../components/Button";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [query, setQuery] = useState("");
  const [submit, setSubmit] = useState("");

  const onInputChange = (event) => {
    let input = encodeURIComponent(event.target.value);
    setQuery(input);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmit(query);
  };

  return (
    <div className="container">
      <div>
        <form className="search_form" action="" onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            placeholder="搜尋.."
            onChange={(e) => onInputChange(e)}
          />
          <Button type="submit">
            <FaSearch size="15" />
          </Button>
        </form>
      </div>
      {/* the following condition prevents Collection/ from rendering at first */}
      {submit && (
        <Collection
          key={submit}
          collectionName={""}
          collectionAPI={"SEARCH"}
          searchQuery={submit}
        />
      )}
    </div>
  );
}

export default Search;
