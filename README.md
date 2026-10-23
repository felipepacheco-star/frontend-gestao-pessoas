# Front-End – Sistema de Gestão de Pessoas

**Atividade 08 – Consumindo o Back-End no Front-End – CRUD**

| | |
|---|---|
| **Professor** | Vitor Lima Santana |
| **Aluno(a)** | [Felipe Gonçalves Pacehco] |
| **Disciplina** | Programação Back-End |

## 1. Objetivo

Aplicação Front-End em HTML, CSS e JavaScript que consome uma API REST em Node.js, Express e MySQL/MariaDB. O foco é o cadastro de pessoas com o método HTTP `POST`, a função `fetch()` e o tratamento de erros com `async/await` e `try/catch`. Também foram implementadas a listagem, a edição e a exclusão.

## 2. Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Fetch API, async/await, try/catch)
- Node.js e Express (Back-End)
- MySQL/MariaDB (banco de dados)

## 3. Estrutura do projeto

```text
frontend-gestao-pessoas/
│
├── index.html        # listagem (e exclusão)
├── cadastro.html     # formulário de cadastro
├── editar.html       # formulário de edição
│
├── css/
│   └── style.css
│
├── js/
│   ├── listar.js     # GET /pessoas e DELETE /pessoas/:id
│   ├── cadastro.js   # POST /pessoas
│   └── editar.js     # GET /pessoas/:id e PUT /pessoas/:id
│
├── img/              # capturas de tela
└── README.md
```

## 4. Funcionalidades

| Método | Rota | Funcionalidade | Arquivo |
|---|---|---|---|
| GET | `/pessoas` | Listar pessoas | `listar.js` |
| GET | `/pessoas/:id` | Consultar pessoa | `editar.js` |
| POST | `/pessoas` | Cadastrar pessoa | `cadastro.js` |
| PUT | `/pessoas/:id` | Atualizar pessoa | `editar.js` |
| DELETE | `/pessoas/:id` | Excluir pessoa | `listar.js` |

## 5. Implementação do POST

O arquivo `js/cadastro.js`:

1. escuta o evento `submit` do formulário (`addEventListener`) e chama `preventDefault()` para a página não recarregar;
2. lê e valida `nome` (não vazio) e `idade` (inteiro entre 0 e 130) antes de enviar;
3. dentro de `try/catch`, faz `fetch("http://localhost:3000/pessoas", { method: "POST", ... })` com o cabeçalho `Content-Type: application/json` e o corpo `JSON.stringify({ nome, idade })`;
4. verifica `resposta.ok`: se for falso, lança um erro com a mensagem devolvida pela API;
5. exibe na tela uma mensagem de sucesso (com o ID gerado) ou de erro, inclusive quando a API está fora do ar.

## 6. Como executar

### Back-End

1. Fazer o Fork do repositório do professor: https://github.com/VitorLimaSantana/ProjetoFullStack
2. Clonar o seu fork:
   ```bash
   git clone https://github.com/SEU-USUARIO/ProjetoFullStack.git
   cd ProjetoFullStack
   ```
3. Instalar as dependências:
   ```bash
   npm install
   ```
4. Criar o banco executando o conteúdo de `db.sql` no MySQL/MariaDB.
5. Conferir o arquivo `.env` (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`) com os dados do seu banco.
6. Iniciar a API:
   ```bash
   npm start
   ```
   Devem aparecer `Servidor rodando na porta 3000` e `Banco conectado!`. A API fica em `http://localhost:3000`.

### Front-End

1. Abrir esta pasta no Visual Studio Code.
2. Verificar se o Back-End está funcionando.
3. Executar `index.html` com o Live Server.
4. Acessar a página **Cadastrar**.
5. Cadastrar uma pessoa.
6. Conferir na listagem (ou no banco: `SELECT * FROM pessoas;`) se o registro foi salvo.

## 7. Como o Front-End se comunica com o Back-End

```text
Navegador (HTML/CSS/JS)  ──fetch (JSON)──▶  API Express (:3000)  ──SQL──▶  MySQL/MariaDB
        ◀──── resposta JSON ────────────          ◀── resultado ──────
```

- O Front-End roda no navegador (Live Server, geralmente porta 5500) e a API em outra origem (`localhost:3000`). O Back-End usa o middleware `cors()`, que autoriza essas requisições.
- Os dados do formulário são enviados em **JSON** e a API os lê com `express.json()`.
- A API executa o `INSERT` no banco e responde `201` com `{ "mensagem": "Pessoa cadastrada!", "id": ... }`. Em caso de falha, responde `500` com `{ "erro": ... }`.
- O Front-End lê a resposta e mostra a mensagem correspondente ao usuário.

## 8. Evidências

**Imagem 1 – Tela de listagem**

![Listagem](img/01-listagem.png)

**Imagem 2 – Formulário de cadastro**

![Formulário](img/02-formulario.png)

**Imagem 3 – Cadastro funcionando**

![Cadastro funcionando](img/03-cadastro-funcionando.png)

**Imagem 4 – Registro inserido no banco de dados**

![Banco de dados](img/04-banco-de-dados.png)

## 9. Repositórios

- Back-End (Fork): [https://github.com/felipepacheco-star/ProjetoFullStack.git]
- Front-End: [https://github.com/felipepacheco-star/frontend-gestao-pessoas.git]

## 10. Conclusão do aluno

[Escreva sua conclusão aqui, com suas palavras: como funciona a comunicação Front-End/Back-End, a finalidade do POST, por que usar async/await e try/catch e quais dificuldades você encontrou.]

--- Como funciona a comunicação entre o Front-End e o Back-End?
O Front-End é a parte que aparece no navegador, tipo o formulário. O Back-End é a API em Node.js que fica ligada no computador e conversa com o banco de dados. Quando eu preencho o formulário e clico em cadastrar, o JavaScript usa o fetch() e manda os dados em JSON pra API. A API salva no banco e devolve uma resposta. Aí o Front-End lê essa resposta e mostra na tela se deu certo ou deu erro.

Qual é a finalidade do método POST?
O POST serve pra mandar dados novos pro servidor. No caso, pra cadastrar uma pessoa. O GET só busca o que já existe, e o POST cria um registro novo no banco. Os dados vão dentro da requisição e não aparecem na URL.

Por que utilizamos async/await e try/catch?
Pedir uma coisa pra API demora um pouco porque depende da rede e do banco. O async/await faz o código esperar a resposta chegar sem travar a página. Já o try/catch pega os erros. Se a API estiver desligada o programa não quebra. O catch pega o erro e mostra uma mensagem pro usuário.

Quais dificuldades eu encontrei durante a atividade?
A primeira foi que o Git não estava instalado e o terminal dava erro quando eu tentava clonar o repositório. Tive que instalar e abrir o terminal de novo. Também estava rodando o comando na pasta System32 e precisei mudar pra uma pasta minha. Outra dificuldade foi entender que a mensagem "Não foi possível conectar à API" não era problema do Front-End. Era o Back-End que estava desligado e eu precisava rodar o npm start e deixar o terminal aberto. Por fim tive que ajustar o .env com os dados do meu banco pra API conectar. Depois de resolver isso tudo eu entendi melhor como o Front-End, a API e o banco funcionam juntos.

**Créditos** — Professor responsável: Vitor Lima Santana · Desenvolvido por: [Nome do aluno]

*Atividade 08 – Desenvolvimento Web e Consumo de APIs REST*
