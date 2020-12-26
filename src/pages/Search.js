import React, { useState } from "react";
import Collection from "../components/Collection";

function Search() {
  const [query, setQuery] = useState("");
  const [submit, setSubmit] = useState("");

  const handleInputChange = (event) => {
    let input = encodeURIComponent(event.target.value);
    setQuery(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(query);
  };

  return (
    <div>
      <h3>Search!</h3>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="search.."
          onChange={(e) => handleInputChange(e)}
        />
        <input type="submit" value="go" />
      </form>
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
