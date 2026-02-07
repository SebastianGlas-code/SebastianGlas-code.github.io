import {
  collection,
  doc,
  onSnapshot,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

/* =========================
   1) TU LISTA DE REGALOS
   - Todos deben tener id único
   - link "" => “A elección”
   ========================= */
const gifts = [
  {
    id: "1",
    name: "Licuadora",
    category: "Cocina",
    note: "",
    link: "https://www.mercadolibre.com.ar/licuadora-oster-classic-blst4655-125-l-700w-con-jarra-de-vidrio/p/MLA17734241?pdp_filters=item_id%3AMLA2087405052#polycard_client=wishlist&wid=MLA2087405052&sid=bookmarks"
  },
  {
    id: "2",
    name: "Batidora",
    category: "Cocina",
    note: "",
    link: "https://www.mercadolibre.com.ar/batidora-de-mano-oster-2600-color-negro-frecuencia-50-hz/p/MLA9257704?pdp_filters=item_id%3AMLA906302912#polycard_client=wishlist&wid=MLA906302912&sid=bookmarks"
  },
  {
    id: "3",
    name: "Microondas",
    category: "Cocina",
    note: "",
    link: ""
  },
  {
    id: "4",
    name: "Tetera",
    category: "Cocina",
    note: "",
    link: "https://articulo.mercadolibre.com.ar/MLA-913730485-tetera-pava-de-porcelana-con-filtro-infusor-disenos-_JM?searchVariation=184517282211#polycard_client=wishlist"
  },
  {
    id: "5",
    name: "Tetera 2",
    category: "Cocina",
    note: "",
    link: "https://www.mercadolibre.com.ar/tetera-hierro-fundido-dsaza-verde-600cc-con-infusor-acero/p/MLA42498082?pdp_filters=item_id%3AMLA2489475920#polycard_client=wishlist&wid=MLA2489475920&sid=bookmarks"
  },
  {
    id: "6",
    name: "Ollas",
    category: "Cocina",
    note: "",
    link: ""
  },
  {
    id: "7",
    name: "Conservadora chica",
    category: "Exterior",
    note: "O bolsito termico",
    link: ""
  },
  {
    id: "8",
    name: "Lona para parque / playa",
    category: "Exterior",
    note: "",
    link: ""
  },
  {
    id: "9",
    name: "Mesita plegable patio",
    category: "Exterior",
    note: "",
    link: ""
  },
  {
    id: "11",
    name: "Sillones camping 2",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/sillon-director-plegable-camping-funda-porta-vaso-color-gris/p/MLA55866370?pdp_filters=item_id%3AMLA2363105494#polycard_client=wishlist&wid=MLA2363105494&sid=bookmarks"
  },
  {
    id: "12",
    name: "Sillones playa",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/sillon-bajo-playero-reposera-camping-playa-apoya-brazo-color-crema/p/MLA52892540?pdp_filters=item_id%3AMLA2186725032#polycard_client=wishlist&wid=MLA2186725032&sid=bookmarks"
  },  
  {
    id: "13",
    name: "Reposera",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/reposera-silla-alta-exahome-aluminio-playa-camping-plegable-blanco-ultra-liviana/p/MLA39952900?pdp_filters=item_id%3AMLA1896416688#polycard_client=wishlist&wid=MLA1896416688&sid=bookmarks"
  },
  {
    id: "14",
    name: "Fundas sillon bkf",
    category: "Exterior",
    note: "",
    link: "https://articulo.mercadolibre.com.ar/MLA-835768276-tapizado-de-lona-cruda-para-sillon-bkf-marca-calma-chicha-_JM#polycard_client=wishlist"
  },
  {
    id: "15",
    name: "Plantas aromaticas",
    category: "Exterior",
    note: "",
    link: ""
  },
  {
    id: "16",
    name: "Sombrilla",
    category: "Exterior",
    note: "",
    link: "https://www.mercadolibre.com.ar/sombrilla-jardin-grande-lateral-3m-reforzada-color-taupe-liso/p/MLA58175144#polycard_client=recommendations_home_navigation-recommendations&reco_backend=machinalis-homes-univb-equivalent-offer&wid=MLA2400120902&reco_client=home_navigation-recommendations&reco_item_pos=1&reco_backend_type=function&reco_id=545c92a7-9473-428f-98b2-41ef7ad72f52&sid=recos&c_id=/home/navigation-recommendations/element&c_uid=bfb53f6f-0207-4cd2-a9c1-6246dd6d6940"
  },
  {
    id: "17",
    name: "Sombrilla Playera",
    category: "Exterior",
    note: "",
    link: ""
  },
  {
    id: "18",
    name: "Cubre cama verano",
    category: "Habitacion",
    note: "Queen size, verde musgo o gris",
    link: "https://articulo.mercadolibre.com.ar/MLA-1576893965-cubrecama-de-verano-queen-con-fundas-bordado-mantra-_JM?searchVariation=192734071871#polycard_client=wishlist"
  },  
  {
    id: "20",
    name: "Sabanas",
    category: "Habitacion",
    note: "Queen size",
    link: ""
  }
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const category = document.getElementById("category");

/* =========================
   2) FIRESTORE (estado compartido)
   ========================= */
const db = window.db;
const statusMap = new Map(); // id -> { bought: bool, by: string, ts: number }

// escucha en tiempo real toda la colección "gifts"
onSnapshot(collection(db, "gifts"), (snap) => {
  statusMap.clear();
  snap.forEach(d => statusMap.set(d.id, d.data()));
  render();
});

async function toggleBought(id) {
  const st = statusMap.get(id) || { bought: false };
  const nextBought = !st.bought;

  // Mensaje distinto según el estado
  const msg = nextBought
    ? "¿Confirmás este regalo?\n\nUna vez marcado, todos lo verán como comprado."
    : "¿Querés desmarcar este regalo como comprado?";

  if (!confirm(msg)) {
    return; // el usuario canceló
  }

  await setDoc(
    doc(db, "gifts", String(id)),
    {
      bought: nextBought,
      ts: Date.now()
    },
    { merge: true }
  );
}



/* =========================
   3) UI (categorías / filtro / render)
   ========================= */
function buildCategories() {
  const cats = ["all", ...new Set(gifts.map(g => g.category).filter(Boolean))];

  category.innerHTML = cats.map(c => (
    `<option value="${escapeHtml(c)}">${c === "all" ? "Todas las categorías" : escapeHtml(c)}</option>`
  )).join("");
}

function cardHTML(g) {
  const hasLink = g.link && g.link.trim().length > 0;

  const st = statusMap.get(String(g.id)) || { bought: false };
  const bought = !!st.bought;
  const byText = (st.by && st.by.length) ? ` • por ${escapeHtml(st.by)}` : "";

  return `
    <article class="card">
      <div class="card-top">
        <h2 class="title">${escapeHtml(g.name)}</h2>
        <span class="badge">${escapeHtml(g.category || "")}</span>
      </div>

      <p class="note">${escapeHtml(g.note || "")}</p>

      <div class="actions">
        ${hasLink
          ? `<a class="btn btn-ml-soft" href="${g.link}" target="_blank" rel="noopener">
            <img src="assets/ml.png" alt="ML" class="ml-icon">
            Mercado Libre
            </a>`
          : `<span class="btn btn-neutral" title="Sin link">A elección</span>`
        }


        <button 
          class="btn ${bought ? "btn-bought" : "primary"}" 
          data-buy="${escapeHtml(String(g.id))}">
          ${bought ? "Comprado ✅" : "Marcar como comprado"}
        </button>
        
      </div>
    </article>
  `;
}

function render() {
  const q = (search.value || "").trim().toLowerCase();
  const cat = category.value || "all";

  const filtered = gifts.filter(g => {
    const text = `${g.name || ""} ${g.note || ""} ${g.category || ""}`.toLowerCase();
    const matchesText = text.includes(q);
    const matchesCat = (cat === "all") || (g.category === cat);
    return matchesText && matchesCat;
  });

  grid.innerHTML = filtered.map(cardHTML).join("");

  // wire botones
  document.querySelectorAll("[data-buy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.buy;
      await toggleBought(id);
      // render lo dispara onSnapshot, igual no molesta:
      // render();
    });
  });
}

// helper simple para evitar romper HTML si alguien pone caracteres raros
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

// init
buildCategories();
render();
search.addEventListener("input", render);
category.addEventListener("change", render);
