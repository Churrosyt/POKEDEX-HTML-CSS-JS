const pokemonList = document.getElementById("pokemonList");
// Onde a lista de pokemon sera exibida
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

//1,2,3,4,5       0-5
//6,7,8,9,10,     5-5
//11,             10 - 5 (remove bottao)

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // fazendo a requisição http para buscar a lista de pekemons
    // [] recebemos a lista em nossas maos

    const newHtml = pokemons
      .map(
        (pokemon) =>
          ` <li class="pokemon ${pokemon.type}" >
               <span class="number">#${pokemon.number}</span>
               <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li> `)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
          </li>`
      )
      .join("");
    // para cada pokemon, tranformamos em uma lista de Li, com o join para juntar tudo.

    // += é para ele receber uma nova lista ao invés de substituir
    pokemonList.innerHTML += newHtml;
    // Finalmente, o HTML gerado é inserido dentro do elemento com o ID "pokemonList".
    //Isso substitui o conteúdo atual do elemento pela nova lista de
    // Pokémon gerada, fazendo com que a lista de Pokémon seja exibida na página.
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  
  offset += limit;

  const qtdRecordsWithNextPage = offset + limit; 
  // Aqui ele recebe o valor maximo de itens carregados

  // se qtd for mais ou igual a max. entra
  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    // new limit = max - off ... sempre ele tera 5 a menos ou outros valores declarados
    loadPokemonItens(offset, newLimit);
    //aqui ele passara um novo argumento para ser carregado mais xxxx itens para funcao loadpokemon
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
