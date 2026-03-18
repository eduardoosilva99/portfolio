//Login Fake// 

const usuarioCorreto = "admin";
const senhaCorreta = "123456";

const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
   const senha = document.getElementById("senha").value;

    if (usuario === usuarioCorreto && senha === senhaCorreta) {
        mensagem.innerHTML = "Login bem-sucedido!";
       mensagem.classList.remove("text-danger");
        mensagem.classList.add("text-success");

        // Redireciona imediatamente
        window.location.href = "pagina.html";
    } else {
        mensagem.innerHTML = "Usuário ou senha incorretos.";
        mensagem.classList.remove("text-success");
        mensagem.classList.add("text-danger");
    }
});

function handleCredentialResponse(response) {

   const data = parseJwt(response.credential);

    console.log("ID:", data.sub);
    console.log("Nome:", data.name);
   console.log("Email:", data.email);
    console.log("Imagem:", data.picture);

    document.getElementById("mensagem").innerHTML =
       "Bem-vindo, " + data.name;
}

// Função para decodificar o token JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
