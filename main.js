const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");

form.addEventListener("submit", (eventoEnviar) => {
  eventoEnviar.preventDefault();
  //   (eventoEnviar.target[0].value); - busca pela dado de acordo posição dentro do array
  //   (eventoEnviar.target.elements["nome"].value); - busca pelo dado de acordo com a tag dentro do objeto

  criaElemento(
    eventoEnviar.target.elements["nome"].value,
    eventoEnviar.target.elements["quantidade"].value
  );
});

function criaElemento(nome, quantidade) {
  const novoItem = document.createElement("li"); // cria um novo elemento do tipo lista
  novoItem.classList.add("item"); // informa que o novo elemento é semelhante aos da classe 'item'

  const quantidadeItem = document.createElement("strong");
  quantidadeItem.innerHTML = quantidade;

  novoItem.appendChild(quantidadeItem);
  novoItem.innerHTML += nome;
  lista.appendChild(novoItem);
  console.log(novoItem);
}

// innerHTML - cria um novo objeto
// appendChild - cria um filho para um objeto já criado
