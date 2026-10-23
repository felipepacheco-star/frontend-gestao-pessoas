// ===== LISTAGEM (GET) e EXCLUSÃO (DELETE) =====
const API = "http://localhost:3000/pessoas";

const tabela = document.getElementById("tabela-pessoas");
const msg = document.getElementById("mensagem");

async function listar() {
  try {
    const resposta = await fetch(API);
    const pessoas = await resposta.json();

    tabela.innerHTML = "";
    for (const p of pessoas) {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${p.id}</td>
        <td></td>
        <td>${p.idade}</td>
        <td class="acoes">
          <a class="botao pequeno secundario" href="editar.html?id=${p.id}">Editar</a>
          <button class="botao perigo" onclick="excluir(${p.id})">Excluir</button>
        </td>`;
      linha.children[1].textContent = p.nome; // textContent = mais seguro
      tabela.appendChild(linha);
    }
  } catch (erro) {
    msg.textContent = "❌ Não foi possível conectar à API.";
    msg.className = "erro";
  }
}

async function excluir(id) {
  if (!confirm("Excluir esta pessoa?")) return;
  await fetch(`${API}/${id}`, { method: "DELETE" });
  listar(); // atualiza a tabela
}

listar();
