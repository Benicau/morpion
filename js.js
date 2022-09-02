// declaration
let scorePlayer1=0
let scorePlayer2=0

const spanPlayer1 = document.querySelector(".joueurX")
const spanPlayer2 = document.querySelector(".joueurO")

spanPlayer1.innerHTML=scorePlayer1
spanPlayer2.innerHTML=scorePlayer2

const statut = document.querySelector("h2")
let jeuActif = true
let joueurPlay = "X"
let etatJeu = ["","","","","","","","",""]


const conditionsVictoire = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]

  
]


//message
const gagne = () => `Le joueur ${joueurPlay} a gagné`
const egalite = () => "Egalité"
const tour = () => `C'est au tour du joueur ${joueurPlay}`
statut.innerHTML = tour()
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClick))
document.querySelector("#replay").addEventListener("click", replay)

function gestionClick () {
  // on repupère l'index
  const indexCase =  parseInt(this.dataset.index)
  // console.log(indexCase)
  if(etatJeu[indexCase] !== "" || !jeuActif){
    return
  }
  etatJeu[indexCase] = joueurPlay
  this.innerHTML = joueurPlay
  verifWin()
 // console.log(etatJeu)
}
function verifWin()
{
  let tourWin = false
  let i =1
  for(let conditionVictoire of conditionsVictoire )
  {
    let val1 = etatJeu[conditionVictoire[0]]
    let val2 = etatJeu[conditionVictoire[1]]
    let val3 = etatJeu[conditionVictoire[2]] 
    if(val1 === "" || val2 ===""||  val3 ==="")
    {
     
      continue
      
    }
    if(val1 === val2 && val2 === val3 )
    {
      tourWin = true
      if(val1==="X")
      {
        scorePlayer1=scorePlayer1+1
        spanPlayer1.innerHTML=scorePlayer1
      }
      else
      {
        scorePlayer2=scorePlayer2+1
        spanPlayer2.innerHTML=scorePlayer2
      }
      break
    }  
  }
  if (tourWin){
    statut.innerHTML = gagne ()
    jeuActif = false
    return
  }

  if(!etatJeu.includes(""))
  {
    statut.innerHTML = egalite ()
    jeuActif = false
    return
  }
  joueurPlay = joueurPlay === "X" ? "O" : "X"
  statut.innerHTML = tour()
}

function replay(){
  joueurPlay= "X"
  jeuActif = true
  etatJeu = ["","","","","","","","",""]
  statut.innerHTML = tour()
  document.querySelectorAll(".case").forEach(cell => cell.innerHTML="")

}