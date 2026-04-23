// ===================== CARROSSEL =====================
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const items = document.querySelectorAll(".item");
const dots = document.querySelectorAll(".dot");

let active = 0;
const total = items.length;
let timer;

function update(direction) {
  document.querySelector(".item.active").classList.remove("active");
  document.querySelector(".dot.active").classList.remove("active");

  if (direction > 0) {
    active = active + 1;
    if (active === total) active = 0;
  } else if (direction < 0) {
    active = active - 1;
    if (active < 0) active = total - 1;
  }

  items[active].classList.add("active");
  dots[active].classList.add("active");
}

timer = setInterval(() => {
  update(1);
}, 5000);

prevButton.addEventListener("click", () => {
  clearInterval(timer);
  update(-1);
  timer = setInterval(() => {
    update(1);
  }, 5000);
});

nextButton.addEventListener("click", () => {
  clearInterval(timer);
  update(1);
  timer = setInterval(() => {
    update(1);
  }, 5000);
});

// ===================== FIX: SAIBA MAIS COM PRODUTO DIRETO =====================
// Cada botão passa o produto diretamente, sem depender do item ativo
function saibaMaisProduto(produto) {
  // Vai para a seção de produtos
  const secao = document.getElementById("produtos");
  if (secao) secao.scrollIntoView({ behavior: "smooth" });

  // Destaca o card correspondente e abre o modal
  setTimeout(() => {
    const card = document.getElementById("card-" + produto);
    if (card) {
      card.classList.add("highlight-card");
      setTimeout(() => card.classList.remove("highlight-card"), 1000);
    }
    openModal(produto);
  }, 600);
}

// Mantido por compatibilidade (caso haja chamadas antigas)
function saibaMaisAtivo() {
  const itemAtivo = document.querySelector(".item.active");
  const produto = itemAtivo ? itemAtivo.getAttribute("data-produto") : null;
  if (produto) saibaMaisProduto(produto);
}

// ===================== SCROLL SUAVE =====================
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ===================== REVEAL ON SCROLL =====================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 100);
      }
    });
  },
  { threshold: 0.1 }
);

reveals.forEach((el) => observer.observe(el));

// ===================== ANIMAÇÃO BARRAS COMPOSIÇÃO =====================
const compObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".comp-fill").forEach((fill) => {
          fill.classList.add("animated");
        });
      }
    });
  },
  { threshold: 0.3 }
);

const composicao = document.querySelector(".composicao-wrap");
if (composicao) compObserver.observe(composicao);

// ===================== MODAL =====================
const modais = {
  balance: {
    tag: "Lançamento",
    nome: "BioGut Balance Microbiota",
    img: "./imagem/biogut.png",
    descricao:
      "Suplemento probiótico de alta performance desenvolvido com biotecnologia moderna para equilíbrio completo da microbiota intestinal de cães e gatos.",
    composicao: [
      "Lactobacillus acidophilus (4 x 10⁹ UFC)",
      "Bifidobacterium longum (2 x 10⁹ UFC)",
      "Lactobacillus rhamnosus (1 x 10⁹ UFC)",
      "Frutooligossacarídeos (FOS) — 200mg",
      "Enzimas digestivas (protease, amilase, lipase)",
      "Vitamina B12 — 5mcg",
      "Zinco quelado — 10mg",
    ],
    specs: [
      { label: "Formato", valor: "Cápsulas" },
      { label: "Quantidade", valor: "30 cápsulas" },
      { label: "Peso líquido", valor: "60g" },
      { label: "Para", valor: "Cães e Gatos" },
      { label: "Dosagem", valor: "1 cápsula/dia" },
      { label: "Validade", valor: "24 meses" },
    ],
    diferenciais:
      "Fórmula com 10 cepas probióticas selecionadas, garantindo colonização eficaz do intestino. Sem glúten, sem lactose, sem corantes artificiais. Produzido em instalações certificadas pelo MAPA.",
  },
  nutri: {
    tag: "Ração Premium",
    nome: "BioGut Nutri — Ração Funcional",
    img: "./imagem/nutri.png",
    descricao:
      "Ração completa e balanceada desenvolvida para oferecer nutrição de alto padrão com suporte funcional ativo ao organismo do seu pet.",
    composicao: [
      "Frango desidratado (proteína principal)",
      "Arroz integral e batata-doce (carboidratos complexos)",
      "Óleo de salmão (Omega-3 e Omega-6)",
      "Probióticos encapsulados",
      "Prebióticos (FOS e MOS)",
      "Mix de vitaminas A, D, E, K, B-complex",
      "Minerais quelados (zinco, ferro, manganês)",
    ],
    specs: [
      { label: "Formato", valor: "Ração seca" },
      { label: "Tamanhos", valor: "1kg / 5kg / 10kg" },
      { label: "Proteína bruta", valor: "Min. 28%" },
      { label: "Para", valor: "Cães e Gatos" },
      { label: "Dosagem", valor: "Conforme peso" },
      { label: "Validade", valor: "18 meses" },
    ],
    diferenciais:
      "Fórmula livre de corantes artificiais, conservantes e subprodutos de baixa qualidade. Grânulos de tamanho adaptado para cães e gatos de todos os portes e idades.",
  },
  chew: {
    tag: "Diversão Saudável",
    nome: "Petiscos BioIntestinais",
    img: "./imagem/chew.png",
    descricao:
      "Suplementação intestinal em formato de petisco mastigável saboroso. A forma mais gostosa de cuidar da saúde do seu pet.",
    composicao: [
      "Frango liofilizado (sabor natural)",
      "Inulina (prebiótico natural)",
      "Lactobacillus acidophilus (2 x 10⁸ UFC por unidade)",
      "Papaína (enzima digestiva)",
      "Extrato de aloe vera",
      "Vitamina E — 15mg",
      "Manteiga de amendoim natural",
    ],
    specs: [
      { label: "Formato", valor: "Petisco mastigável" },
      { label: "Quantidade", valor: "30 unidades" },
      { label: "Peso líquido", valor: "90g" },
      { label: "Para", valor: "Cães e Gatos" },
      { label: "Dosagem", valor: "1-2 unidades/dia" },
      { label: "Validade", valor: "12 meses" },
    ],
    diferenciais:
      "Formato prático e palatável, aceito por mais de 95% dos pets em testes. Sem açúcar adicionado, sem xilitol, sem conservantes artificiais. Embalagem com fecho zip para manter a frescura.",
  },
};

function openModal(produto) {
  const data = modais[produto];
  if (!data) return;

  document.getElementById("modalContent").innerHTML = `
    <h2>${data.nome}</h2>
    <span class="modal-tag">${data.tag}</span>
    <img src="${data.img}" alt="${data.nome}" class="modal-img" />
    <div class="modal-section">
      <h4>Sobre o produto</h4>
      <p>${data.descricao}</p>
    </div>
    <div class="modal-section">
      <h4>Especificações</h4>
      <div class="modal-specs-grid">
        ${data.specs
          .map(
            (s) => `
          <div class="modal-spec">
            <span>${s.label}</span>
            <strong>${s.valor}</strong>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    <div class="modal-section">
      <h4>Composição</h4>
      <ul>
        ${data.composicao.map((c) => `<li>${c}</li>`).join("")}
      </ul>
    </div>
    <div class="modal-section">
      <h4>Diferenciais</h4>
      <p>${data.diferenciais}</p>
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===================== FORMULÁRIO =====================
function enviarFormulario(e) {
  e.preventDefault();
  const success = document.getElementById("formSuccess");
  success.style.display = "block";
  e.target.reset();
  setTimeout(() => {
    success.style.display = "none";
  }, 4000);
}
