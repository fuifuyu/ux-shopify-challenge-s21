import "./App.css";
import { SearchBar } from "./components/search-bar";
import React from "react";
import { CardWithList } from "./components/card-with-list";

const emptyQueryResult = { Error: "Please enter a movie title." };
let timer = null;
function App() {
  let [query, setQuery] = React.useState("");
  let [movieResult, setMovieResult] = React.useState(emptyQueryResult);
  let [nomination, setNomination] = React.useState([]);
  function onInput(e) {
    const query = e.target.value;
    setQuery(query);
    search(query);
  }
  function search(title) {
    if (title.length == 0) setMovieResult(emptyQueryResult);
    clearTimeout(timer);
    if (title.length > 3) {
      updateMovieList(title);
    } else timer = setTimeout(() => updateMovieList(title), 300);
  }
  function updateMovieList(title) {
    const url = `http://www.omdbapi.com/?apikey=2c9d4bc7&s=${title}`;
    fetch(url, { method: "GET" }).then((res) =>
      res.json().then((json) => {
        if (json.Error && json.Error != movieResult.Error) {
          if (json.Error == "Incorrect IMDb ID.")
            json.Error = emptyQueryResult.Error;
          setMovieResult(json);
        } else if (json.Response) setMovieResult(json);
      })
    );
  }
  function addNomination(movie) {
    if (nomination.length >= 5) return;
    if (nomination.find((item) => item.imdbID == movie.imdbID) != undefined)
      return;
    setNomination(nomination.concat([movie]));
  }
  function removeNomination(movie) {
    let index = nomination.findIndex((item) => item.imdbID == movie.imdbID);
    nomination.splice(index, 1);
    setNomination([].concat(nomination));
  }

  function movieToContent({ Title, Year, imdbID }) {
    return { key: imdbID, listItem: `${Title} (${Year})` };
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
        <CardWithList
          title={`Results for "${query}"`}
          button={{ text: "Nominate", onClick: addNomination }}
          content={movieResult.Response ? movieResult.Search : []}
          contentFactory={movieToContent}
          emptyMessage={movieResult.Error}
          disableContent={nomination}
          disableAll={nomination.length >= 5}
        />
        <CardWithList
          title="Nominations"
          button={{ text: "Remove", onClick: removeNomination }}
          content={nomination}
          contentFactory={movieToContent}
        />
      </div>
    </div>
  );
}

export default App;
