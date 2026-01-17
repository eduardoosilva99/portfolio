document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     VARIÁVEIS GLOBAIS
  ================================ */
  let precoBase = 0;
  let produtoAtual = "";

  const modalEl = document.getElementById("modalProduto");
  const modal = modalEl ? new bootstrap.Modal(modalEl) : null;

  const campoPedido = document.getElementById("pedido");
  const campoTotalPedido = document.getElementById("total");
  const produtoOriginal = campoPedido?.value || "";

  /* ===============================
     BOTÃO COMPRAR (CARDÁPIO)
  ================================ */
  document.querySelectorAll(".comprar-btn").forEach(btn => {
    btn.addEventListener("click", () => {

      const produto = btn.dataset.produto;
      const preco = parseFloat(btn.dataset.preco) || 0;
      if (!produto || !preco) return;

      if (!modal) {
        window.location.href =
          `facapedido.html?produto=${encodeURIComponent(produto)}&total=${preco.toFixed(2)}`;
        return;
      }

      produtoAtual = produto;
      precoBase = preco;

      const produtoNomeEl = document.getElementById("produto-nome");
      if (produtoNomeEl) produtoNomeEl.innerText = produto;

      const qtdEl = document.getElementById("quantidade");
      const tamanhoEl = document.getElementById("tamanho");

      if (qtdEl) qtdEl.value = 1;
      if (tamanhoEl) tamanhoEl.value = 0;

      document.querySelectorAll(".extra").forEach(e => e.checked = false);

      calcularTotalModal();
      modal.show();
    });
  });

  /* ===============================
     CALCULAR TOTAL (MODAL)
  ================================ */
  function calcularTotalModal() {
    const qtdEl = document.getElementById("quantidade");
    const tamanhoEl = document.getElementById("tamanho");
    const totalModalEl = document.getElementById("totalModal");

    if (!qtdEl || !tamanhoEl || !totalModalEl) return;

    const qtd = parseInt(qtdEl.value, 10) || 1;
    const tamanho = parseFloat(tamanhoEl.value) || 0;

    let extras = 0;
    document.querySelectorAll(".extra:checked").forEach(e => {
      extras += parseFloat(e.value) || 0;
    });

    const total = (precoBase + tamanho + extras) * qtd;
    totalModalEl.innerText = total.toFixed(2);
  }

  ["quantidade", "tamanho"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", calcularTotalModal);
  });

  document.querySelectorAll(".extra")
    .forEach(e => e.addEventListener("change", calcularTotalModal));

  /* ===============================
     FINALIZAR PEDIDO (MODAL)
  ================================ */
  const btnFinalizarModal = document.getElementById("btnFinalizarPedido");

  if (btnFinalizarModal) {
    btnFinalizarModal.addEventListener("click", () => {

      const produtoNomeEl = document.getElementById("produto-nome");
      const qtdEl = document.getElementById("quantidade");
      const tamanhoEl = document.getElementById("tamanho");
      const totalModalEl = document.getElementById("totalModal");

      if (!produtoNomeEl || !qtdEl || !tamanhoEl || !totalModalEl) return;

      const extras = Array.from(document.querySelectorAll(".extra:checked"))
        .map(cb => document.querySelector(`label[for="${cb.id}"]`)?.innerText)
        .filter(Boolean);

      const url = new URL("siteacai/facapedido.html", window.location.origin);
      url.searchParams.set("produto", produtoNomeEl.innerText);
      url.searchParams.set("quantidade", qtdEl.value);
      url.searchParams.set("tamanho", tamanhoEl.selectedOptions[0].text);
      url.searchParams.set("extras", extras.join(", "));
      url.searchParams.set("total", totalModalEl.innerText);

      window.location.href = url.toString();
    });
  }

  /* ===============================
     RECEBE DADOS VIA URL (FACAPEDIDO)
  ================================ */
  const params = new URLSearchParams(window.location.search);

  if (campoPedido) {
    let texto = params.get("produto") || "";
    if (params.get("tamanho")) texto += ` - Tamanho: ${params.get("tamanho")}`;
    if (params.get("extras")) texto += ` - Extras: ${params.get("extras")}`;
    if (params.get("quantidade")) texto += ` - Qtd: ${params.get("quantidade")}`;
    campoPedido.value = texto;
  }

  if (campoTotalPedido && params.get("total")) {
    campoTotalPedido.value = Number(params.get("total"))
      .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  /* ===============================
     MÁSCARA DE TELEFONE
  ================================ */
  const telefoneInput = document.getElementById("telefone");
  if (telefoneInput) {
    telefoneInput.addEventListener("input", e => {
      let x = e.target.value.replace(/\D/g, '')
        .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2]
        ? x[1]
        : `(${x[1]}) ${x[2]}${x[3] ? '-' + x[3] : ''}`;
    });
  }

  /* ===============================
     LIMITE DE ACOMPANHAMENTOS
  =============================== */
  const maxAcompanhamentos = 5;
  document.querySelectorAll(".acompanhamento").forEach(cb => {
    cb.addEventListener("change", () => {
      const selecionados = document.querySelectorAll(".acompanhamento:checked");
      if (selecionados.length > maxAcompanhamentos) {
        cb.checked = false;
        alert(`Máximo de ${maxAcompanhamentos} acompanhamentos.`);
        return;
      }

      const lista = Array.from(selecionados).map(el => el.value).join(", ");

      if (campoPedido) {
        // Pega o pedido original sem os acompanhamentos
        let textoBase = campoPedido.value.split(" - Acompanhamentos:")[0];

        campoPedido.value = lista
          ? `${textoBase} - Acompanhamentos: ${lista}.`
          : `${textoBase}.`;
      }
    });
  });

});

/* ===============================
    ENVIO PARA WHATSAPP
 ================================ */
const pedidoForm = document.getElementById("pedidoForm");
pedidoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita reload da página

  // Pegando todos os campos
  const nome = document.getElementById("nome")?.value || "";
  const telefone = document.getElementById("telefone")?.value || "";
  const endereco = document.getElementById("endereco")?.value || "";
  const bairro = document.getElementById("bairro")?.value || "";
  const pagamento = document.getElementById("pagamento")?.value || "";
  const pedido = document.getElementById("pedido")?.value || "";
  const total = document.getElementById("total")?.value || "";

  const acompanhamentos = Array.from(document.querySelectorAll(".acompanhamento:checked"))
    .map(cb => cb.value)
    .join(", ") || "Nenhum";

  // Monta a mensagem
  let mensagem = `📦 *Novo Pedido*\n\n`;
  mensagem += `👤 *Nome:* ${nome}\n`;
  mensagem += `📱 *Telefone / WhatsApp:* ${telefone}\n`;
  mensagem += `🏠 *Endereço:* ${endereco}\n`;
  mensagem += `🗺️ *Bairro:* ${bairro}\n`;
  mensagem += `🍓 *Acompanhamentos:* ${acompanhamentos}\n`;
  mensagem += `💰 *Total:* ${total}\n`;
  mensagem += `💳 *Forma de Pagamento:* ${pagamento}\n`;
  mensagem += `📝 *Pedido:* ${pedido}`;

  // Número do WhatsApp (adicione seu número com DDI e DDD)
  const numeroWhats = "5561994298990";

  // Link do WhatsApp
  const urlWhats = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${encodeURIComponent(mensagem)}`;

  // Abre o WhatsApp
  window.open(urlWhats, "_blank");
});

/* ===============================
   BOTÃO SUBIR NO SITE
=============================== */
window.addEventListener("scroll", function () {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return;

  if (window.scrollY > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

const backToTop = document.getElementById("backToTop");
if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}