let output = '';
const demo = document.querySelector('.main');
const pages_container = document.querySelector('.pagination');

fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=21`)
  .then(response => response.json())
  .then(data => {
    createPages(data.count);
  });
getData(0);

//----------------------getData--------------------------------
function getData(offset_val) {
  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset_val}&limit=21`)
    .then(response => response.json())
    .then(data => {
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
//-----------------------pages------------------------
function createPages(total_data) {
  let createbtn = '';
  total_pages = Math.trunc(total_data / 21);
  for (let i = 1; i <= total_pages; i++) {
    createbtn += `
      <div class="page">${i}</div>
      `;
  }
  pages_container.innerHTML = createbtn;
  const pages = document.querySelectorAll('.page');
  pages[0].classList.add('btn-active');
  Pagination();
}

//---------------------pagination---------------------------

function Pagination() {
  const pages = document.querySelectorAll('.page');
  console.log(pages);
  pages.forEach((entries, index) => {
    entries.addEventListener('click', () => {
      pages.forEach(entry => {
        entry.classList.remove('btn-active');
      });
      entries.classList.add('btn-active');
      let offset_val = 21 * index;
      getData(offset_val);
    });
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

//----------------open and close detail_box-------------------
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
