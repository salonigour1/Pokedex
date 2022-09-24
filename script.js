console.log('heyy');
let output = '';
const demo = document.querySelector('.main');
function getData() {
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
    .then(response => response.json())
    .then(data => {
      console.log(data.results);
      for (let i = 0; i < data.results.length; i++) {
        let item = data.results;
        let name = 'yomo';
        let url = item[i].url;
        output += ` 
        <div class="card">
          <p>${item[i].name}</p>
          <button onclick="moreDetails('${url}')">More details</button>
        </div>
      `;
      }
      demo.innerHTML = output;
    });
}
let output_card;
function moreDetails(url) {
  const detail_card = document.querySelector('.details');

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let img_url = data['sprites']['front_shiny'];
      output_card = ` 
        <div class="cross"><ion-icon name="close-outline"></ion-icon></div>
        <h1>${data.name}</h1>
          <img src="${img_url}" />
          <p class="pokemon height">height : ${data.height} meter</p>
          <p class="pokemon weight">weight : ${data.weight} pound</p>
          <p class="pokemon moves">Total moves : ${data.moves.length}</p>
        `;
      //   console.log(output_card);
      detail_card.innerHTML = output_card;

      openClose();
    });
}
getData();
//----------------open and close detail box-------------------
function openClose() {
  const box = document.querySelector('.details');
  console.log(box);
  const conatiner = document.querySelector('.container');
  box.classList.add('active');
  conatiner.classList.add('overlay');
  const cut = document.querySelector('.cross');
  cut.addEventListener('click', () => {
    box.classList.remove('active');
    conatiner.classList.remove('overlay');
  });
}
