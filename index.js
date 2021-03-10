const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "b9a1a463",
      s: searchTerm,
    },
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};
const root = document.querySelector("#root");
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const content = document.querySelector(".results");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const link = document.createElement("a");
    link.classList.add("dropdown-item");
    link.innerHTML = `
        <img src="${movie.Poster}"/>
       ${movie.Title}`;
    content.appendChild(link);
  }
};

input.addEventListener("input", debounce(onInput, 500));
