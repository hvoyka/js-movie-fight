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

const input = document.querySelector("input");
const content = document.querySelector(".dropdown-content");

const onInput = async (event) => {
  const movies = await fetchData(event.target.value);

  for (let movie of movies) {
    const link = document.createElement("a");
    link.classList.add("dropdown-item");
    link.innerHTML = `
        <img src="${movie.Poster}"/>
        <p>${movie.Title}</p>
      `;
    content.appendChild(link);
  }
};

input.addEventListener("input", debounce(onInput, 500));
