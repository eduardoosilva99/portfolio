function setAno() {
    const anoAtual = new Date().getFullYear();
    document.getElementById("ano-atual").textContent = anoAtual;
}

// Chamar a função assim que a página carregar
window.onload = setAno;


// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {
  const alerta = document.getElementById('alerta');

  // Exibe o alerta com a animação de piscar assim que a página carrega
  alerta.style.display = 'block'; // Exibe o alerta
  alerta.style.opacity = 2; // Garante que o alerta esteja visível

  // Após 6 segundos, o alerta desaparecerá automaticamente
  //setTimeout(function() {
    //alerta.style.display = 'none';  // Esconde o alerta
  //}, 60000);  // 6000 milissegundos = 6 segundos (tempo total do piscar)
});


// Cria o elemento div que vai conter a teia
const teia = document.createElement("div");
teia.id = "teia";

// Aplica os estilos direto no JS
Object.assign(teia.style, {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "-1",
  pointerEvents: "none"
});

// Espera o DOM carregar antes de rodar
document.addEventListener("DOMContentLoaded", function () {
  // Cria a div da teia
  const teia = document.createElement("div");
  teia.id = "teia";

  // Aplica os estilos
  Object.assign(teia.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none",
  });

  document.body.appendChild(teia);

  // Inicializa o tsparticles
  tsParticles.load("teia", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        out_mode: "out",
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.7,
          },
        },
      },
    },
    retina_detect: true,
  });
});