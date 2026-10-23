const API = "http://localhost:3000/pessoas";

const id = new URLSearchParams(location.search).get("id"); 
const form = document.getElementById("form-editar");
const msg = document.getElementById("mensagem");

function mostrar(texto, tipo) {
  msg.textContent = texto;
  msg.className = tipo;
}

async function carregar() {
  try {
    const resposta = await fetch(`${API}/${id}`);
    const pessoa = await resposta.json();
    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("idade").value = pessoa.idade;
  } catch (erro) {
    mostrar("❌ Não foi possível carregar a pessoa.", "erro");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const idade = Number(document.getElementById("idade").value);

  if (nome === "") return mostrar("Informe o nome.", "erro");
  if (!Number.isInteger(idade) || idade <= 0) return mostrar("Informe uma idade válida.", "erro");

  try {
    const resposta = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade }),
    });
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro || dados.mensagem);
    mostrar("✅ " + dados.mensagem, "sucesso");
  } catch (erro) {
    mostrar("❌ Erro: " + erro.message, "erro");
  }
});

carregar();
