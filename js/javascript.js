document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     1️⃣ ATUALIZAÇÃO AUTOMÁTICA DO ANO
  ========================================================= */
  atualizarAno();

  /* =========================================================
     2️⃣ ALERTA INICIAL (PORTFÓLIO EM CONSTRUÇÃO)
  ========================================================= */
  mostrarAlertaInicial();

  /* =========================================================
     3️⃣ TEIA (tsParticles)
  ========================================================= */
  iniciarTeia();

  /* =========================================================
     4️⃣ BOTÃO VOLTAR AO TOPO
  ========================================================= */
  configurarBotaoTopo();

  /* =========================================================
     5️⃣ FORMULÁRIO DE CONTATO (Formspree)
  ========================================================= */
  configurarFormulario();

  /* =========================================================
     6️⃣ CAMPO TELEFONE (somente números + máscara)
  ========================================================= */
  configurarTelefone();

  /* =========================================================
     7️⃣ MENU ATIVO AUTOMÁTICO
  ========================================================= */
  configurarMenuAtivo();

  /* =========================================================
     8️⃣ ENVIO PARA WHATSAPP (opcional)
  ========================================================= */
  configurarEnvioWhatsApp();
});

/* =========================================================
   FUNÇÕES
========================================================= */

// 1️⃣ Atualiza o ano automaticamente no rodapé
function atualizarAno() {
  const anoSpan = document.getElementById("ano-atual");
  if (anoSpan) anoSpan.textContent = new Date().getFullYear();
}

// 2️⃣ Mostra alerta inicial (construção/aviso)
function mostrarAlertaInicial() {
  const alerta = document.getElementById("alerta");
  if (alerta) {
    alerta.style.display = "block";
    alerta.style.opacity = "1";
  }
}

// 3️⃣ Inicializa efeito de partículas com tsParticles
function iniciarTeia() {
  if (!window.tsParticles) return;

  const teia = document.createElement("div");
  teia.id = "teia";
  Object.assign(teia.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none"
  });
  document.body.appendChild(teia);

  tsParticles.load("teia", {
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 1, out_mode: "out" }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.7 } } }
    },
    retina_detect: true
  });
}

// 4️⃣ Configura o botão voltar ao topo
function configurarBotaoTopo() {
  const botaoTopo = document.getElementById("backToTop");
  if (!botaoTopo) return;

  window.addEventListener("scroll", () => {
    botaoTopo.style.display = window.scrollY > 200 ? "block" : "none";
  });

  botaoTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 5️⃣ Configura envio de formulário para Formspree
function configurarFormulario() {
  const form = document.getElementById("pedidoForm"); // seu formulário
  if (!form) return;

  const alerta = document.createElement("div");
  alerta.className = "alerta";
  alerta.style.display = "none";
  document.body.appendChild(alerta);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      nome: form.nome.value,
      email: form.email?.value || "",
      telefone: form.telefone.value,
      mensagem: form.pedido.value
    };

    fetch("https://formspree.io/f/meeeeedo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          mostrarAlerta(alerta, "✅ Mensagem enviada com sucesso!");
          form.reset();
        } else {
          mostrarAlerta(alerta, "⚠️ Erro ao enviar a mensagem.");
        }
      })
      .catch(() => mostrarAlerta(alerta, "⚠️ Erro ao enviar a mensagem."));
  });
}

// Mostra alertas dinâmicos
function mostrarAlerta(alerta, mensagem) {
  alerta.textContent = mensagem;
  alerta.style.display = "block";
  alerta.style.opacity = "1";
  setTimeout(() => {
    alerta.style.opacity = "0";
    setTimeout(() => (alerta.style.display = "none"), 500);
  }, 5000);
}

// 6️⃣ Configura máscara do telefone
function configurarTelefone() {
  const telefoneInput = document.getElementById("telefone");
  if (!telefoneInput) return;

  telefoneInput.addEventListener("input", e => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? '-' + x[3] : ''}`;
  });
}

// 7️⃣ Configura menu ativo automaticamente
function configurarMenuAtivo() {
  const links = document.querySelectorAll(".navbar-nav .nav-link");
  const paginaAtual = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === paginaAtual || (paginaAtual === "" && href === "index.html"));
  });
}

// 8️⃣ Configura envio do pedido para WhatsApp
function configurarEnvioWhatsApp() {
  const form = document.getElementById("pedidoForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    // Pega todos os campos
    const nome = form.nome.value;
    const telefone = form.telefone.value;
    const endereco = form.endereco.value;
    const bairro = form.bairro.value;
    const pagamento = form.pagamento.value;
    const pedido = form.pedido.value;

    const acompanhamentos = Array.from(form.querySelectorAll(".acompanhamento:checked"))
      .map(cb => cb.value)
      .join(", ");

    const total = form.total.value;

    // Monta a mensagem para WhatsApp
    let mensagem = `📌 *Novo Pedido*\n\n`;
    mensagem += `👤 Nome: ${nome}\n`;
    mensagem += `📱 WhatsApp: ${telefone}\n`;
    mensagem += `🏠 Endereço: ${endereco}\n`;
    mensagem += `📍 Bairro: ${bairro}\n`;
    mensagem += `🍨 Acompanhamentos: ${acompanhamentos || "Nenhum"}\n`;
    mensagem += `💰 Total: ${total}\n`;
    mensagem += `💳 Forma de Pagamento: ${pagamento}\n`;
    mensagem += `📝 Pedido: ${pedido}\n`;

    // Codifica para URL
    const numeroWhats = "5561994298990"; // Coloque seu número aqui
    const url = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
  });
}
