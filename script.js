let gameArea = document.querySelector(".gameArea")
let player = document.querySelector(".playerCar")
let scoreDisplay = document.querySelector(".score")

let lane = 1
let lanes = [40,145,250]

let speed = 5
let score = 0
let gameRunning = false

function startGame(){

document.getElementById("startScreen").style.display="none"

gameRunning=true

createEnemy()

gameLoop()

}

function restartGame(){

location.reload()

}

function createEnemy(){

let enemy = document.createElement("img")

enemy.src="enemy-car.png"

enemy.classList.add("enemy")

let randomLane = Math.floor(Math.random()*3)

enemy.style.left = lanes[randomLane]+"px"

enemy.style.top="-120px"

gameArea.appendChild(enemy)

}

function moveEnemy(){

let enemies=document.querySelectorAll(".enemy")

enemies.forEach(function(e){

let top=e.offsetTop

top+=speed

e.style.top=top+"px"

if(top>650){

e.remove()

createEnemy()

score+=10

}

if(isCollide(player,e)){

gameOver()

}

})

}

function isCollide(a,b){

let aRect=a.getBoundingClientRect()

let bRect=b.getBoundingClientRect()

return !(

aRect.bottom < bRect.top ||
aRect.top > bRect.bottom ||
aRect.right < bRect.left ||
aRect.left > bRect.right

)

}

function gameLoop(){

if(!gameRunning) return

moveEnemy()

score++

scoreDisplay.innerHTML="Score: "+score

requestAnimationFrame(gameLoop)

}

function gameOver(){

gameRunning=false

alert("Game Over! Score: "+score)

document.getElementById("restart").style.display="block"

}

document.addEventListener("keydown",function(e){

if(e.key==="ArrowLeft"){

lane--

if(lane<0) lane=0

player.style.left=lanes[lane]+"px"

}

if(e.key==="ArrowRight"){

lane++

if(lane>2) lane=2

player.style.left=lanes[lane]+"px"

}

if(e.key==="Shift"){

nitroBoost()

}

})

function nitroBoost(){

speed=12

let flame=document.createElement("img")

flame.src="nitro.png"

flame.classList.add("nitro")

player.appendChild(flame)

setTimeout(()=>{

speed=5

flame.remove()

},2000)

}

document.getElementById("left").onclick=()=>{

lane--

if(lane<0) lane=0

player.style.left=lanes[lane]+"px"

}

document.getElementById("right").onclick=()=>{

lane++

if(lane>2) lane=2

player.style.left=lanes[lane]+"px"

}

document.getElementById("nitro").onclick=nitroBoost
