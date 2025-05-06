const feeds = [
  { name: "Globo", url: "https://g1.globo.com/rss/g1/" },
  { name: "GE", url: "https://ge.globo.com/rss/ultimas/" },
  { name: "Omelete", url: "https://www.omelete.com.br/rss" },
  { name: "Google News - Brasil", url: "https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSkwyMHZNREYwTmpKMkVnVndkQzFDVWlnQVAB?hl=pt-BR&gl=BR&ceid=BR:pt-419" },
  { name: "Google News - Tecnologia", url: "https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSkwyMHZNREU1YlRReUVnVndkQzFDVWlnQVAB?hl=pt-BR&gl=BR&ceid=BR:pt-419" },
  { name: "SomosPFC", url: "https://somospfc.com/feed/" }
];

// Usa um proxy público para evitar problemas de CORS
const CORS_PROXY = "https://api.allorigins.win/get?url=";

function loadFeeds() {
  feeds.forEach(feed => {
    fetch(CORS_PROXY + encodeURIComponent(feed.url))
      .then(response => response.json())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const items = xml.querySelectorAll("item");

        const container = document.getElementById("feeds-container");
        const feedDiv = document.createElement("div");
        feedDiv.classList.add("feed");

        const title = document.createElement("h2");
        title.textContent = feed.name;
        feedDiv.appendChild(title);

        const ul = document.createElement("ul");

        for (let i = 0; i < Math.min(5, items.length); i++) {
          const item = items[i];
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = item.querySelector("link").textContent;
          a.target = "_blank";
          a.textContent = item.querySelector("title").textContent;
          li.appendChild(a);
          ul.appendChild(li);
        }

        feedDiv.appendChild(ul);
        container.appendChild(feedDiv);
      })
      .catch(error => {
        console.error("Erro ao carregar feed:", feed.name, error);
      });
  });
}

document.addEventListener("DOMContentLoaded", loadFeeds);
