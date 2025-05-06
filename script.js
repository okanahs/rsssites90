const CORS_PROXY = "https://api.allorigins.win/get?url=";

const categorias = {
  globo: {
    name: "Globo",
    feeds: ["https://g1.globo.com/rss/g1/"]
  },
  ge: {
    name: "GE",
    feeds: ["https://ge.globo.com/rss/ultimas/"]
  },
  omelete: {
    name: "Omelete",
    feeds: ["https://www.omelete.com.br/rss"]
  },
  parana: {
    name: "Google News - Paraná Clube",
    feeds: ["https://news.google.com/rss/search?q=Paran%C3%A1+Clube&hl=pt-BR&gl=BR&ceid=BR:pt-419"]
  },
  saopaulo: {
    name: "Google News - São Paulo FC",
    feeds: ["https://news.google.com/rss/search?q=S%C3%A3o+Paulo+Futebol+Clube&hl=pt-BR&gl=BR&ceid=BR:pt-419"]
  },
  somospfc: {
    name: "SomosPFC",
    feeds: ["https://somospfc.com/feed/"]
  }
};

function fetchFeeds(categoriaId, urls) {
  const container = document.querySelector(`#${categoriaId} .feed-container`);
  urls.forEach(url => {
    fetch(CORS_PROXY + encodeURIComponent(url))
      .then(response => response.json())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const items = xml.querySelectorAll("item");

        const ul = document.createElement("ul");

        for (let i = 0; i < Math.min(5, items.length); i++) {
          const item = items[i];
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = item.querySelector("link").textContent;
          a.textContent = item.querySelector("title").textContent;
          a.target = "_blank";
          li.appendChild(a);
          ul.appendChild(li);
        }

        container.appendChild(ul);
      })
      .catch(error => {
        container.innerHTML = `<p style="color:red;">Erro ao carregar feed.</p>`;
        console.error("Erro ao carregar feed:", url, error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  for (const [categoriaId, categoria] of Object.entries(categorias)) {
    fetchFeeds(categoriaId, categoria.feeds);
  }
});
