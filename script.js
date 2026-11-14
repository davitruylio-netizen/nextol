
const products = [
  {
    id: 1,
    name: "NEXTOL Space Dodge",
    category: "Jogos",
    icon: "🚀",
    description: "Desvie dos obstáculos e sobreviva no espaço.",
    status: "Em desenvolvimento",
    details: "Um jogo arcade espacial com controles simples, desafios progressivos e pontuação."
  },
  {
    id: 2,
    name: "NEXTOL Pixel Adventure",
    category: "Jogos",
    icon: "⚔️",
    description: "Uma aventura de plataforma em pixel art.",
    status: "Em breve",
    details: "Explore cenários, enfrente inimigos e descubra novos níveis."
  },
  {
    id: 3,
    name: "NEXTOL Survival",
    category: "Jogos",
    icon: "🌲",
    description: "Explore, sobreviva e evolua.",
    status: "Em planejamento",
    details: "Um projeto de sobrevivência com coleta de recursos e exploração."
  },
  {
    id: 4,
    name: "Coleção Visual",
    category: "Artes",
    icon: "🎨",
    description: "Artes e recursos visuais digitais.",
    status: "Em breve",
    details: "Uma coleção de materiais gráficos para projetos criativos."
  },
  {
    id: 5,
    name: "NEXTOL Tools",
    category: "Ferramentas",
    icon: "⚙️",
    description: "Ferramentas digitais para facilitar tarefas.",
    status: "Em planejamento",
    details: "Pequenos utilitários digitais desenvolvidos pela NEXTOL."
  },
  {
    id: 6,
    name: "Pixel Resources",
    category: "Recursos",
    icon: "🧩",
    description: "Recursos para criação de jogos.",
    status: "Em breve",
    details: "Materiais para quem desenvolve jogos e experiências digitais."
  }
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter");
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");

let activeFilter = "Todos";

function renderProducts() {
  const search = searchInput.value.toLowerCase().trim();

  const filtered = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      activeFilter === "Todos" ||
      product.category === activeFilter;

    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-art">${product.icon}</div>
      <div class="product-info">
        <small>${product.category}</small>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>${product.status}</p>
        <button type="button" data-open="${product.id}">
          VER DETALHES ↗
        </button>
      </div>
    </article>
  `).join("");

  emptyMessage.hidden = filtered.length > 0;

  grid.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", () => {
      openProduct(Number(button.dataset.open));
    });
  });
}

function openProduct(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  modalBody.innerHTML = `
    <div class="product-art">${product.icon}</div>
    <p>${product.category}</p>
    <h2>${product.name}</h2>
    <p>${product.details}</p>
    <p><strong>Status:</strong> ${product.status}</p>
    <p>Este projeto faz parte do catálogo NEXTOL.</p>
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("modalClose")
  .addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

searchInput.addEventListener("input", renderProducts);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderProducts();
  });
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.category;

    filterButtons.forEach(item => {
      item.classList.toggle(
        "active",
        item.dataset.filter === activeFilter
      );
    });

    renderProducts();
    document.getElementById("catalogo").scrollIntoView({
      behavior: "smooth"
    });
  });
});

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});

renderProducts();

