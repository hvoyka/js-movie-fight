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

  content.innerHTML = "";
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const link = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    link.classList.add("dropdown-item");
    link.innerHTML = `
        <img src="${imgSrc}"/>
       ${movie.Title}`;
    content.appendChild(link);
  }
};

input.addEventListener("input", debounce(onInput, 500));

//close dropdown
document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});
