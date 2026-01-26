const gifts = [
  {
    name: "Licuadora",
    category: "Cocina",
    note: "",
    link: "https://www.mercadolibre.com.ar/licuadora-oster-classic-blst4655-125-l-700w-con-jarra-de-vidrio/p/MLA17734241?pdp_filters=item_id%3AMLA2087405052#polycard_client=wishlist&wid=MLA2087405052&sid=bookmarks"
  },
  {
    name: "Batidora",
    category: "Cocina",
    note: "",
    link: "https://www.mercadolibre.com.ar/batidora-de-mano-oster-2600-color-negro-frecuencia-50-hz/p/MLA9257704?pdp_filters=item_id%3AMLA906302912#polycard_client=wishlist&wid=MLA906302912&sid=bookmarks"
  },
  {
    name: "Microondas",
    category: "Cocina",
    note: "",
    link: ""
  },
  {
    name: "Tetera",
    category: "Cocina",
    note: "",
    link: "https://articulo.mercadolibre.com.ar/MLA-913730485-tetera-pava-de-porcelana-con-filtro-infusor-disenos-_JM?searchVariation=184517282211#polycard_client=wishlist"
  },
  {
    name: "Ollas",
    category: "Cocina",
    note: "",
    link: ""
  },
  {
    name: "Televisor",
    category: "Living",
    note: "",
    link: ""
  },
  {
    name: "Conservadora chica",
    category: "Exterior",
    note: "O bolsito termico",
    link: ""
  },
  {
    name: "Lona para parque / playa",
    category: "Exterior",
    note: "",
    link: ""
  },
  {
    name: "Mesita plegable patio",
    category: "Exterior",
    note: "",
    link: ""
  },
  {
    name: "Sillones camping",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/silla-sillon-camping-playa-x-2-plegable-director-reforzado-color-gris/p/MLA35402894?pdp_filters=item_id%3AMLA1820710714#polycard_client=wishlist&wid=MLA1820710714&sid=bookmarks"
  },  {
    name: "Sillones camping 2",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/sillon-director-plegable-camping-funda-porta-vaso-color-gris/p/MLA55866370?pdp_filters=item_id%3AMLA2363105494#polycard_client=wishlist&wid=MLA2363105494&sid=bookmarks"
  },
  {
    name: "Sillones playa",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/sillon-bajo-playero-reposera-camping-playa-apoya-brazo-color-crema/p/MLA52892540?pdp_filters=item_id%3AMLA2186725032#polycard_client=wishlist&wid=MLA2186725032&sid=bookmarks"
  },  {
    name: "Reposera",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/reposera-silla-alta-exahome-aluminio-playa-camping-plegable-blanco-ultra-liviana/p/MLA39952900?pdp_filters=item_id%3AMLA1896416688#polycard_client=wishlist&wid=MLA1896416688&sid=bookmarks"
  },
  {
    name: "Fundas sillon bkf",
    category: "Exterior",
    note: "",
    link: "https://articulo.mercadolibre.com.ar/MLA-835768276-tapizado-de-lona-cruda-para-sillon-bkf-marca-calma-chicha-_JM#polycard_client=wishlist"
  },
  {
    name: "Plantas aromaticas",
    category: "Exterior",
    note: "",
    link: ""
  },
  {
    name: "Sombrilla",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/sombrilla-jardin-grande-lateral-3m-reforzada-color-taupe-liso/p/MLA58175144#polycard_client=recommendations_home_navigation-recommendations&reco_backend=machinalis-homes-univb-equivalent-offer&wid=MLA2400120902&reco_client=home_navigation-recommendations&reco_item_pos=1&reco_backend_type=function&reco_id=545c92a7-9473-428f-98b2-41ef7ad72f52&sid=recos&c_id=/home/navigation-recommendations/element&c_uid=bfb53f6f-0207-4cd2-a9c1-6246dd6d6940"
  },
  {
    name: "Sombrilla Playera",
    category: "Exterior",
    note: "",
    link: ""
  },
  {
    name: "Cubre cama verano",
    category: "Habitacion",
    note: "Queen size, verde musgo o gris",
    link: "https://articulo.mercadolibre.com.ar/MLA-1576893965-cubrecama-de-verano-queen-con-fundas-bordado-mantra-_JM?searchVariation=192734071871#polycard_client=wishlist"
  },  
  {
    name: "Cubre cama verano 2",
    category: "Habitacion",
    note: "Queen size, salvia, vison, tostado",
    link: "https://www.mercadolibre.com.ar/cubrecama-queen-size-verano-bitono-micromatelaseado-235x240-color-look-salvia-lisa/p/MLA43432445?pdp_filters=item_id%3AMLA2414120690#polycard_client=wishlist&wid=MLA2414120690&sid=bookmarks"
  },
  {
    name: "Sabanas",
    category: "Habitacion",
    note: "Queen size",
    link: ""
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
