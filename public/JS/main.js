// import {choiceType} from './choiceType.js'; 
// console.log(choiceType);
import {choices} from './choices.js'; 
import {positions} from './positions.js'; 


// ajout joueurs
let namePlayer1
let namePlayer2
let activePlayer
let inactivePlayer
addNames.addEventListener('click',function(){ // écoute du champ
  // console.log(player1.value)
  namePlayer1 = player1.value;
  namePlayer2 = player2.value;
  activePlayer=namePlayer1
  inactivePlayer=namePlayer2
  activeName.innerHTML=activePlayer
  // console.log(namePlayer1);
  // console.log(namePlayer2);
});
// Modif active player
function switchPlayer() {
  console.log(activePlayer)
  if(activePlayer==namePlayer1) {
    activePlayer=namePlayer2
    inactivePlayer=namePlayer1
  }else{
    activePlayer=namePlayer1
    inactivePlayer=namePlayer2
  }
  activeName.innerHTML=activePlayer
}
// btn Modif active player
activeName.addEventListener('click',function(){
  switchPlayer()
})


// Result
// random
function getRandomInd(max) {
  return Math.floor(Math.random() * max);
}
// change text
function changeUser(e) {
  return e.replace('$inactivePlayer', inactivePlayer).replace('$activePlayer', activePlayer).replace('$hPlayer', namePlayer1).replace('$fPlayer', namePlayer2)
}
// lvl used
function triLvl(){
  let lvlChoice = document.querySelector('input[name=select-lvl]:checked').value;
  return choices.filter(choice=>choice.lvl===lvlChoice)
}
// affichage du resultat
resultBtn.addEventListener('click',function(){ // écoute du champ
  let aLvl=triLvl()
  let choiceTypeInd=getRandomInd(aLvl.length)
  if(!boxAll.checked) {
    let box=[]; // tableau pour les valeurs des boxs checked
    const inputs= document.querySelectorAll('input[name=optbox]:checked');
    inputs.forEach(i => box.push(i.value));
    // console.log(box);
    let res=[]; // tableau pour les descriptions
    // console.log(box.includes(choices.options));
    aLvl.forEach(e=> {if(box.includes(e.options)){res.push(e)}});
    const resLength= res.length
    if(resLength) {
      let randomId=getRandomInd(resLength)
      let changeText=changeUser(res[randomId].description)
      // console.log(choiceTypeInd);
      document.getElementById('result').innerHTML = changeText;
      tset(res[randomId].time);
    }else{
      document.getElementById('result').innerHTML = "choisir une option";
      tset('0');
    }
  } else {
    let changeTextAll=changeUser(aLvl[choiceTypeInd].description)
    document.getElementById('result').innerHTML = changeTextAll;
    tset(aLvl[choiceTypeInd].time);
  }
});


// positions
positionBtn.addEventListener('click',function(){ // écoute du champ
  console.log(positions)
  let box=[]; // tableau pour les valeurs des boxs checked
  const inputs= document.querySelectorAll('input[name=optbox]:checked');
  inputs.forEach(i => box.push(i.value));
  let res=[]; // tableau pour les descriptions
  positions.forEach(e=> {if(box.includes(e.options)){res.push(e)}});
  const resLength= res.length
  console.log(resLength)
  if(resLength) {
    let randomId=getRandomInd(resLength)
    document.getElementById('result').innerHTML=res[randomId].img
    // let changeText=changeUser(res[randomId].description)
    // console.log(choiceTypeInd);
    // document.getElementById('result').innerHTML = changeText;
    tset(res[randomId].time);
  }else{
    document.getElementById('result').innerHTML = "choisir une option";
    tset('0');
  }
  // console.log(namePlayer1);
  // console.log(namePlayer2);
});


// Timer
// sound
const audio = new Audio('/public/sound/audio1.mp3');
// show timer
function tset(a) {
  timerElement.innerText = `${a}`;
}
// use timer
const timerElement = document.getElementById("timer")
timerBtn.addEventListener('click',function(){ // écoute du champ
  let temps=timerElement.textContent
  // console.log(temps)
  if (isNaN(temps) || temps<1) {
    timerElement.innerText = "0"
  }else{
    let timer = setInterval(() => {
      let minutes = parseInt(temps / 60, 10)
      let secondes = parseInt(temps % 60, 10)
    
      minutes = minutes < 10 ? "0" + minutes : minutes
      secondes = secondes < 10 ? "0" + secondes : secondes
    
      timerElement.innerText = `${minutes}:${secondes}`
      // temps = temps <= 0 ? clearInterval(timer) : temps - 1
      if (temps<1) {
        clearInterval(timer);
        audio.play();
        switchPlayer()
      }else{
        temps = temps - 1
        console.log(temps)
      }
    }, 100)
  }
  console.log("temps")
});

// Modif Timer
modifTimerBtn.addEventListener('click',function(){
  tset(modifTimer.value)
})





// const lvl = [lvl1.value,lvl2.value,lvl3.value,lvl4.value,lvl5.value];
// const options = [opt1.value,opt2.value,opt3.value,opt4.value,opt5.value];

// // choiceType
// let choiceTypeM=choiceType.slice(0);// Dupliquer le tableau pour tirages avec suppression
// var huitAleatoires=[];
// // Pousser un élément de rang aléatoire dans le tableau tant sa longuer est inférieure à 8
// while (choiceType.length<8) huitAleatoires.push(choiceTypeM.splice(Math.floor(Math.random()*participantsRestants.length),1)[0]);
// console.log(huitAleatoires)
// choiceTypeBtn.addEventListener('click',function(){ // écoute du champ
//   console.log('fcsce')
//   let choiceTypeInd=getRandomInd(choiceType.length)
//   document.getElementById('choice-type').innerHTML = choiceType[choiceTypeInd];
// });

