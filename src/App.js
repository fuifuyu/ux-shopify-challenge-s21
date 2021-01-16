import "./App.css";
import { SearchBar } from "./components/search-bar";
import React from "react";
import { Banner } from "./components/banner";
import { Nominations } from "./components/nominations";
import { getMovieResult } from "./helper/content";

let timer = null;
function App() {
  let [titleText, setTitleText] = React.useState("");
  let [yearText, setYearText] = React.useState("");
  let [movieResult, setMovieResult] = React.useState({
    Error: "Please enter a movie title.",
  });
  let bannerRef = React.createRef();

  function onTitleInput(e) {
    const query = e.target.value;
    setTitleText(query);
    search(query, yearText);
  }
  function onYearInput(e) {
    const query = e.target.value;
    setYearText(query);
    search(titleText, query);
  }
  async function search(title, year = "") {
    clearTimeout(timer);
    //Don't wait for the user to finish typing
    if (title.length > 3 && (year.length == 0 || year.length > 3)) {
      setMovieResult(await getMovieResult(title, year));
    } else
      timer = setTimeout(
        async () => setMovieResult(await getMovieResult(title, year)),
        300
      );
  }

  return (
    <div className="page">
      <header className="header">The Shoppies</header>
      <div className="grid grid-cols-2 gap-6">
        <div className="card col-span-2 flex flex-row">
          <SearchBar
            header="Movie title"
            onInput={onTitleInput}
            inputKey="movie-title"
            className="inline-block w-3/4"
          />
          <div className="inline-block w-1/4">
            <div className="ml-4">
              <label htmlFor="movie-year" className="text-sm">
                Year
              </label>
              <input
                className="block w-full border focus:outline-none focus:ring rounded p-input"
                id="movie-year"
                placeholder="Year"
                onInput={onYearInput}
              />
            </div>
          </div>
        </div>
        <Nominations
          movieResult={movieResult}
          searchText={titleText}
          bannerRef={bannerRef}
        />
      </div>
      <Banner ref={bannerRef} />
    </div>
  );
}

export default App;
