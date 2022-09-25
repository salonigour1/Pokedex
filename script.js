let output = '';
const demo = document.querySelector('.main');
const pages = document.querySelectorAll('.page');
getData(0);
Pagination();

//---------------------pagination---------------------------
function Pagination() {
  pages.forEach((entries, index) => {
    entries.addEventListener('click', () => {
      removeActiveBtn();
      entries.classList.add('btn-active');
      let offset_val = 15 * index;
      getData(offset_val);
    });
  });
  function removeActiveBtn() {
    pages.forEach((entry, index) => {
      entry.classList.remove('btn-active');
    });
  }
}
//----------------------getData--------------------------------
function getData(offset_val) {
  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset_val}&limit=15`)
    .then(response => response.json())
    .then(data => {
      demo.innerHTML = '';
      output = '';
      for (let i = 0; i < data.results.length; i++) {
        let item = data.results;
        let url = item[i].url;
        output += ` 
        <div class="card">
          <p>${item[i].name}</p>
          <button onclick="moreDetails('${url}')">More details</button>
        </div>
      `;
      }
      demo.innerHTML = '';
      demo.innerHTML = output;
    });
}

//---------------------more details card-----------------------------------------
let output_card;
function moreDetails(url) {
  const detail_card = document.querySelector('.details');

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let img_url = data['sprites']['front_shiny'];
      output_card = ` 
        <div class="cross"><ion-icon name="close-outline"></ion-icon></div>
        <h1>${data.name}</h1>
          <img src="${img_url}" />
          <p class="pokemon height">height : ${data.height} meter</p>
          <p class="pokemon weight">weight : ${data.weight} pound</p>
          <p class="pokemon moves">Total moves : ${data.moves.length}</p>
        `;
      detail_card.innerHTML = output_card;
      openClose();
    });
}

//----------------open and close detail box-------------------
function openClose() {
  const box = document.querySelector('.details');
  const conatiner = document.querySelector('.container');
  box.classList.add('active');
  conatiner.classList.add('overlay');
  const cut = document.querySelector('.cross');
  cut.addEventListener('click', () => {
    box.classList.remove('active');
    conatiner.classList.remove('overlay');
  });
}
