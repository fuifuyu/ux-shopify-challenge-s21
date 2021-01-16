import "./App.css";
import { SearchBar } from "./components/search-bar";
import React from "react";
import { CardWithList } from "./components/card-with-list";
import { Banner } from "./components/banner";

const emptyQueryResult = { Error: "Please enter a movie title." };
let timer = null;
function App() {
  let [query, setQuery] = React.useState("");
  let [movieResult, setMovieResult] = React.useState(emptyQueryResult);
  let [nomination, setNomination] = React.useState([]);
  let bannerRef = React.createRef();

  function showBanner(message, success = true) {
    bannerRef.current.showBanner(message, success);
  }
  function onInput(e) {
    const query = e.target.value;
    setQuery(query);
    search(query);
  }
  function search(title) {
    if (title.length == 0) setMovieResult(emptyQueryResult);
    clearTimeout(timer);
    if (title.length > 3) {
      getMovieResult(title).then((res) => setMovieResult(res));
    } else
      timer = setTimeout(
        () => getMovieResult(title).then((res) => setMovieResult(res)),
        300
      );
  }
  async function getMovieResult(title) {
    const url = `http://www.omdbapi.com/?apikey=2c9d4bc7&s=${title}`;
    let res = await fetch(url, { method: "GET" });
    let json = await res.json();
    if (json.Error && json.Error != movieResult.Error) {
      if (json.Error == "Incorrect IMDb ID.")
        json.Error = emptyQueryResult.Error;
      return json;
    } else if (json.Response) return json;
    return movieResult;
  }
  function addNomination(movie) {
    if (nomination.length >= 5) {
      showBanner("You can only nominate up to 5 movies.", false);
      return;
    }
    if (nomination.find((item) => item.imdbID == movie.imdbID) != undefined) {
      showBanner("You already nominated this movie.", false);
      return;
    }
    showBanner("You have successfully nominate this movie.");
    setNomination(nomination.concat([movie]));
  }
  function removeNomination(movie) {
    let index = nomination.findIndex((item) => item.imdbID == movie.imdbID);
    if (index != -1) {
      nomination.splice(index, 1);
      setNomination([].concat(nomination));
      showBanner("You have remove this movie from your nomination list.");
    }
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
          ordered={true}
          contentFactory={movieToContent}
          emptyMessage="No movie is added."
        />
      </div>
      <Banner ref={bannerRef} />
    </div>
  );
}

export default App;
