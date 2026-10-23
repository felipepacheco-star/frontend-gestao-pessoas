// ===== CADASTRO (POST) =====
const API = "http://localhost:3000/pessoas";

const form = document.getElementById("form-cadastro");
const msg = document.getElementById("mensagem");

// Mostra a mensagem na tela ("sucesso" fica verde, "erro" fica vermelho)
function mostrar(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // não deixa a página recarregar

  // 1) Pegar os dados do formulário
  const nome = document.getElementById("nome").value.trim();
  const idade = Number(document.getElementById("idade").value);

  // 2) Validar antes de enviar
  if (nome === "") return mostrar("Informe o nome.", "erro");
  if (!Number.isInteger(idade) || idade <= 0) return mostrar("Informe uma idade válida.", "erro");

  // 3) Enviar para a API
  try {
    const resposta = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade }),
    });
    const dados = await resposta.json();

    if (!resposta.ok) throw new Error(dados.erro || "Erro ao cadastrar.");

    mostrar("✅ " + dados.mensagem, "sucesso");
    form.reset();
  } catch (erro) {
    mostrar("❌ Erro: " + erro.message, "erro"); // inclui API fora do ar
  }
});
