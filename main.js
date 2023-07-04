const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []; // verifica se o array possui dados e os recupera senão cria array vazio

itens.forEach((elemento) => {
  criaElemento(elemento);
});

form.addEventListener("submit", (eventoEnviar) => {
  eventoEnviar.preventDefault();
  const nome = eventoEnviar.target.elements["nome"];
  const quantidade = eventoEnviar.target.elements["quantidade"];
  const verificaItem = itens.find((elemento) => elemento.nome === nome.value);
  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (verificaItem) {
    itemAtual.id = verificaItem.id;
    atualizaElemento(itemAtual);
    itens[itens.findIndex((elemento) => elemento.id === verificaItem.id)] =
      itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
    criaElemento(itemAtual);
    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens)); // o localstorage só lê texto, então usar o metodo JSON.stringifi para realizar a conversão
  (nome.value = ""), (quantidade.value = "");
});

function criaElemento(item) {
  const novoItem = document.createElement("li"); // cria um novo elemento do tipo lista
  novoItem.classList.add("item"); // informa que o novo elemento é semelhante aos da classe 'item'

  const quantidadeItem = document.createElement("strong");
  quantidadeItem.innerHTML = item.quantidade;
  quantidadeItem.dataset.id = item.id;

  novoItem.appendChild(quantidadeItem);
  novoItem.innerHTML += item.nome;
  novoItem.appendChild(botaoDeletar(item.id));
  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

function botaoDeletar(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";
  elementoBotao.addEventListener("click", function () {
    deletarElemento(this.parentNode, id);
  });
  return elementoBotao;
}

function deletarElemento(tag, id) {
  tag.remove();
  itens.splice(
    itens.findIndex((elemento) => elemento.id === id),
    1
  );
  localStorage.setItem("itens", JSON.stringify(itens));
}
