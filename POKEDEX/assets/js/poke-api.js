//Criando um objeto
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    
}

// Criando Função
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url) // buscando a lista de pokemond
  .then((response) => response.json()) // convertendo esta lista para Json
  .then((jsonBody) => jsonBody.results) // pegando a lista que e os nossos pokemons
  .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
                 // transformando a lista(pokemons) em uma nova lista de promessas do detalhes do pokemon
  .then((detailRequests) => Promise.all(detailRequests)) // esperando todas terminar  
  .then((pokemonsDetails) => pokemonsDetails)            
};

