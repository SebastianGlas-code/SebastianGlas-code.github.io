const gifts = [
  {
    name: "Cafetera",
    category: "Cocina",
    note: "Modelo a elección (espresso o filtro).",
    link: "" // sin link => aparece como “A elección”
  },
  {
    name: "Juego de vasos",
    category: "Hogar",
    note: "Preferencia vidrio, cantidad a elección.",
    link: ""
  },
  {
    name: "Aspiradora",
    category: "Hogar",
    note: "Con o sin cable, a elección.",
    link: "https://www.mercadolibre.com.ar/" // poné tu link real
  }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const category = document.getElementById("category");

function buildCategories(){
  const cats = ["all", ...new Set(gifts.map(g => g.category))];
  category.innerHTML = cats.map(c => (
    `<option value="${c}">${c === "all" ? "Todas las categorías" : c}</option>`
  )).join("");
}

function cardHTML(g){
  const hasLink = g.link && g.link.trim().length > 0;

  return `
    <article class="card">
      <div class="card-top">
        <h2 class="title">${g.name}</h2>
        <span class="badge">${g.category}</span>
      </div>

      <p class="note">${g.note || ""}</p>

      <div class="actions">
        ${hasLink
          ? `<a class="btn primary" href="${g.link}" target="_blank" rel="noopener">Ver en Mercado Libre</a>`
          : `<span class="btn" title="Sin link">A elección</span>`
        }
      </div>
    </article>
  `;
}

function render(){
  const q = search.value.trim().toLowerCase();
  const cat = category.value;

  const filtered = gifts.filter(g => {
    const matchesText = (g.name + " " + (g.note||"")).toLowerCase().includes(q);
    const matchesCat = (cat === "all") || (g.category === cat);
    return matchesText && matchesCat;
  });

  grid.innerHTML = filtered.map(cardHTML).join("");
}

buildCategories();
render();

search.addEventListener("input", render);
category.addEventListener("change", render);
