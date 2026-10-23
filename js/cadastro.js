const API = "http://localhost:3000/pessoas";

const form = document.getElementById("form-cadastro");
const msg = document.getElementById("mensagem");

function mostrar(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault(); 


  const nome = document.getElementById("nome").value.trim();
  const idade = Number(document.getElementById("idade").value);


  if (nome === "") return mostrar("Informe o nome.", "erro");
  if (!Number.isInteger(idade) || idade <= 0) return mostrar("Informe uma idade válida.", "erro");


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
    mostrar("❌ Erro: " + erro.message, "erro"); 
  }
});
