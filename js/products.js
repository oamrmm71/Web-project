const defaultProducts = [
  {
    id: "1",
    name: "Premium Puffer Jacket",
    category: "Jackets",
    gender: "men",
    price: 179,
    description: "Oversized premium puffer with quilted paneling.",
    colors: [
      { name: "Black", hex: "#000000", photo: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=900" }
    ],
    sizes: [
      { name: "S", qty: 8 },
      { name: "M", qty: 10 }
    ]
  },
  {
    id: "2",
    name: "Bomber Set",
    category: "Sets",
    gender: "women",
    price: 189,
    description: "Streetwear bomber set.",
    colors: [
      { name: "Olive", hex: "#556b2f", photo: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900" }
    ],
    sizes: [
      { name: "S", qty: 5 },
      { name: "M", qty: 6 }
    ]
  }
];

let products = JSON.parse(localStorage.getItem("styleeProducts")) || defaultProducts;

/* PRODUCTS PAGE */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const category = document.getElementById("categoryFilter")?.value || "all";
  const gender = document.getElementById("genderFilter")?.value || "all";

  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search)) &&
    (category === "all" || p.category === category) &&
    (gender === "all" || p.gender === gender)
  );

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.colors[0].photo}" onclick="openProduct('${p.id}')">
      <div class="product-body">
        <p class="category">${p.category}</p>
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
      </div>
    </div>
  `).join("");
}

function openProduct(id) {
  window.location.href = "product-details.html?id=" + id;
}

/* DETAIL PAGE */
function renderDetail() {
  const container = document.getElementById("detailPage");
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const product = products.find(p => p.id === id);

  if (!product) return;

  container.innerHTML = `
    <div class="detail-layout">
      <img class="detail-image" src="${product.colors[0].photo}">
      <div class="detail-card">
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <h2>$${product.price}</h2>
      </div>
    </div>
  `;
}

/* INIT */
renderProducts();
renderDetail();