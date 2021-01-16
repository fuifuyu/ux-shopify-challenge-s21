import React from "react";
import { CardWithList } from "./card-with-list";
let maxNominationTimer;
export function Nominations({ searchText, movieResult, bannerRef }) {
  let [nomination, setNomination] = React.useState([]);
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
    if (nomination.length >= 4) {
      clearTimeout(maxNominationTimer);
      maxNominationTimer = setTimeout(() => {
        showBanner("You have reached the maximum amount of nominations.");
      }, 1000);
    }
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
  function showBanner(message, success = true) {
    bannerRef.current.showBanner(message, success);
  }
  return (
    <>
      <CardWithList
        title={`Results for "${searchText}"`}
        button={{ text: "Nominate", onClick: addNomination }}
        content={movieResult?.Response ? movieResult.Search : []}
        contentFactory={movieToContent}
        emptyMessage={movieResult?.Error}
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
    </>
  );
}
