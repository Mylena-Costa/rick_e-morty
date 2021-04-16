const $personagemList = document.getElementById("lista-personagens");
const $loadMoreBtn = document.getElementById("load-more");

let offset =  1, limit = 14;

const getElement = document.querySelector.bind(document);
const searchInput = getElement('.search-input'),
      searchSelect = getElement('.search-select'),
      searchButton = getElement('.search-button');

async function getCharList(info) {
  for(let index = 0; index <= info.limit; index++) {
    const data = await fetch(`https://rickandmortyapi.com/api/character/${index + info.offset}`).then(res => res.json());

    const charInfo = {
      name: data.name,
      number: data.id,
      photo: data.image,
      gender: data.gender,
      species: data.species,
      status: data.status
       }

    addPersonagemOnDomList(charInfo);

  }
}

async function requestCharInfo(name) {
  await fetch("https://rickandmortyapi.com/api/character/?name=" + name)
   
    .then(response => response.json())
    .then(data => {
      personagem = data;
    })
    
    .catch(err => console.log(err));

    card = `
    <div class="personagem-picture">
      <img src="${personagem.image}" alt="Imagem de ${personagem.name}">
    </div>
    <div class="personagem-info">
        <h1 class="name">${personagem.name}</h1>
        <font class="number">Nº ${personagem.id} - Gênero: ${personagem.gender}</font>
        <h3 class="status">Status: ${personagem.status}</h3>
        <h3 class="Espécie">Espécie: ${personagem.species}</h3>   
        </div>`;
  return card;
}


async function getCharSearch(pesquisa) {
  for(let index = 0; index <= info.limit; index++) {
    const data = await fetch(`https://rickandmortyapi.com/api/character/?${pesquisa}`).then(res => res.json());

    const charInfo = {
      name: data.name,
      number: data.id,
      photo: data.image,
      gender: data.gender,
      species: data.species,
      status: data.status,
      pagina: data.pages
    }
       
      
    (charInfo);

       
       
  }
}


function generatePersonagemCard(personagem) {

    return `
    <div class="card-container">
      <span class="char-number">#${personagem.number}</span>
      <img src="${personagem.photo}" alt="${personagem.name}">

      <h2 class="char-nome">${personagem.name}</h2>
      <h2 class="char-name">Gênero:${personagem.gender}</h2>
      <h2 class="char-name">Espécie:${personagem.species}</h2>
      <h2 class="char-name">Status:${personagem.status}</h2>
    
    </div>
    `
   }


function addPersonagemOnDomList(personagem) {
  $personagemList.innerHTML += generatePersonagemCard(personagem);
}

function loadMorePersonagems() {
  offset+= limit + 1;
  getCharList({offset, limit});
}

var pagina  = 1;

window.addEventListener("load", () => getCharList({offset, limit}));

window.addEventListener("scroll", () => {
  if(document.body.offsetHeight < window.innerHeight + window.scrollY) {
    loadMorePersonagems();
  }
});

searchButton.addEventListener('click', event => {
  event.preventDefault();
  //$personagemList.innerHTML ='' ;
  nome = searchInput.value.toLowerCase();
  selecao = searchSelect.value;
  
  if((nome!="") && (selecao!="")) {
    getCharSearch("name="+nome+"&"+selecao);
  }
  
  if(nome!="") {
    getCharSearch("name="+nome);
  }

  pesquisa = searchInput.value.toLowerCase();
  getCharSearch(pesquisa);

  // Reseta o efeito fade removendo a classe fade
  setTimeout(() => {
    container.classList.remove('fade');
  }, 300);
});

///////////////////////////

