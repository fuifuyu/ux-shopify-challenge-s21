import "./App.css";
import { SearchBar } from "./components/search-bar";
import React from "react";
import { Banner } from "./components/banner";
import { Nominations } from "./components/nominations";
import { getMovieResult } from "./helper/content";

let timer = null;
function App() {
  let [searchText, setSearchText] = React.useState("");
  let [movieResult, setMovieResult] = React.useState({
    Error: "Please enter a movie title.",
  });
  let bannerRef = React.createRef();

  function onInput(e) {
    const query = e.target.value;
    setSearchText(query);
    search(query);
  }
  async function search(title) {
    clearTimeout(timer);
    //Don't wait for the user to finish typing
    if (title.length > 3) {
      setMovieResult(await getMovieResult(title));
    } else
      timer = setTimeout(
        async () => setMovieResult(await getMovieResult(title)),
        300
      );
  }

  return (
    <div className="page">
      <header className="header">The Shoppies</header>
      <div className="grid grid-cols-2 gap-6">
        <div className="card col-span-2">
          <SearchBar
            header="Movie title"
            onInput={onInput}
            inputKey="movie-title"
          />
        </div>
        <Nominations
          movieResult={movieResult}
          searchText={searchText}
          bannerRef={bannerRef}
        />
      </div>
      <Banner ref={bannerRef} />
    </div>
  );
}

export default App;
