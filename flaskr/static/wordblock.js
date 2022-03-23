class Wordblock{
    constructor(output, button){
        this.output = output;
        this.button = button;
    }

    clear(){
        this.output.innerText = '';
    }

    disableAll(){
        for (let i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
    }

    enableAll(){
        for (let i = 0; i < button.length; i++) {
            button[i].disabled = false;
        }
    }
}


const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//buttons
const startButton = document.getElementById('startButton');
const button = document.getElementsByClassName('btn');
const submit = document.getElementById('submit');
const clear = document.getElementById('clear');

//divs
const output = document.getElementById('output');
const gameDiv = document.getElementById('gameArea');
const countDiv = document.getElementById('count');
const scoreDiv = document.getElementById('scoreTemp');
const timerDiv = document.getElementById('countDown');

//scores
let count = parseInt(countDiv.innerText);
let score = parseInt(scoreDiv.innerText);

//gameOver
const gameOverModal = document.getElementById('gameOverModal');
const finalWordScoreText = document.getElementById('wordScoreFinalText');
const finalScoreText = document.getElementById('scoreFinalText');
const finalScore = document.getElementById('score');
const finalWordScore = document.getElementById('wordScore');

//hiscores
const scoreForm = document.getElementById('hiscoresForm');
const elementName = scoreForm.elements[0];
let name = elementName.value;

//game length
let timeLeft = 15;

//list of found words
let foundList = [];

//game object
let game = new Wordblock(output, button);

function requireValue(input){
    return !(input.value.trim() === '');
}

function gameOver(){
    finalWordScoreText.innerText = count;
    finalScoreText.innerText = score;
    finalScore.value = score;
    finalWordScore.value = count;
    gameOverModal.style.display = 'block';

    scoreForm.addEventListener('submit',(e)=>{
        requiredFields.forEach((input) =>{
            valid = valid|requireValue(input.input);
        });
        if (!valid){
            e.preventDefault();
        }
    });
    //location.reload();


}




function randInt(max){
    return Math.floor(Math.random() * max);
}

function getScore(word){
    var pointAmount = 0;

    for (let i = 0; i < word.length; i++) {
        pointAmount++;
    }

    return pointAmount;
}


for (let i in button){
    button[i].innerText = alph[randInt(25)];
}

startButton.addEventListener('click', ()=>{
    gameDiv.style.display = 'block';
    startButton.style.display = 'none';
    let timer = setInterval(function(){
        if(timeLeft <= 0){
            clearInterval(timer);
            timerDiv.innerText = 'Game over!';
            gameOver();
        } else {
            timerDiv.innerText = timeLeft;
        }
        timeLeft -= 1;
    }, 1000);
});

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', ()=>{
        var pressed = button[i].innerText;

        if (output.innerText.length > 15){
            output.style.fontSize = '2rem';
            return;
        }
        
        output.innerText += pressed;
        button[i].disabled = true;
    })
}

submit.addEventListener('click', ()=>{

    fetch('static/words.json').then(res => res.json().then(
        data =>{
            
            for (let i = 0; i < data.words.length; i++) {
                
                if (output.innerText.toLowerCase() == data.words[i]){

                    if(foundList.includes(data.words[i])){
                        console.log('You already found that word!');
                        alert('You already found that word!');
                        game.clear();
                        game.enableAll();
                    } else {

                        foundList.push(data.words[i]);

                        console.log('word matches: ' + data.words[i]);

                        game.clear();
                        game.enableAll();
                        score += getScore(data.words[i]);
                        scoreDiv.innerText = score;
                        console.log('score: ' + score);

                        count++;
                        countDiv.innerText = count;

                        console.log(`Words found: ${count}`);

                        console.log(foundList);
                    }
                }
                
            }
            
        }
    ));
})

clear.addEventListener('click', ()=>{
    game.clear();
    game.enableAll();
})



