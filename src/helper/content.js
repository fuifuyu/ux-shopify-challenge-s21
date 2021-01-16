export async function getMovieResult(title, year = "") {
  if (title.length == 0) return { Error: "Please enter a movie title." };
  const url = `http://www.omdbapi.com/?apikey=2c9d4bc7&s=${title}&y=${year}`;
  let res = await fetch(url, { method: "GET" });
  let json = await res.json();
  if (json.Error) {
    if (json.Error == "Incorrect IMDb ID.")
      json.Error = "Please enter a movie title.";
  }
  return json;
}
