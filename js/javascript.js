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
  setTimeout(function() {
    alerta.style.display = 'none';  // Esconde o alerta
  }, 6000);  // 6000 milissegundos = 6 segundos (tempo total do piscar)
});