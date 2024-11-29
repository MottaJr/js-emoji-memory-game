/*const emojis = [
  "🐱",
  "🐱",
  "🦝",
  "🦝",
  "🦊",
  "🦊",
  "🐶",
  "🐶",
  "🐵",
  "🐵",
  "🦁",
  "🦁",
  "🐯",
  "🐯",
  "🐮",
  "🐮",
];*/

const imagens = [
  "alegria.png",
  "alegria.png",
  "ansiedade.png",
  "ansiedade.png",
  "inveja.png",
  "inveja.png",
  "medo.png",
  "medo.png",
  "nojinho.png",
  "nojinho.png",
  "raiva.png",
  "raiva.png",
  "tristeza.png",
  "tristeza.png",
  "vergonha.png",
  "vergonha.png"
];
let openCards = [];

let shuffleImagens = imagens.sort(() => (Math.random() > 0.5 ? 2 : -1));

let gameOver = false;  // Estado que indica se o jogo foi vencido ou não

const modal = document.querySelector("dialog");

for (let i = 0; i < imagens.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  //box.innerHTML = shuffleImagens[i];

  // Criar o elemento <img> e configurar a imagem
  let img = document.createElement("img");
  img.src = `./src/images/${shuffleImagens[i]}`; // Caminho para as imagens
  img.alt = shuffleImagens[i]; // Usando o nome da imagem como texto alternativo

  box.appendChild(img);
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  /* Aqui foi criado uma condição para que após a vitória ou um item 
  já já tiver sido clicado, impedir qualquer interção*/
  if (gameOver || this.classList.contains("boxMatch") || this.classList.contains("boxOpen")) return;

  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(openCards);
}

function playSound(audioName) { //adiciona audios no jogo
  let audio = new Audio(`./src/audios/${audioName}.mp3`);
  audio.volume = 0.3;
  audio.play();
}

function abrirModal() {
  modal.show()
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");

    playSound("acerto"); //audio de acerto
  } else {
    playSound("errou"); //audio de erro
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === imagens.length) {

    playSound("vitoria"); //audio de vitoria

    //Abre modal de vitória
    abrirModal();

    if (gameOver) return; //informa que o jogo foi vencido
  }
}
