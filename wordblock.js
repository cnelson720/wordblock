class Wordblock{
    constructor(output){
        this.output = output;
    }

    clear(){
        this.output.innerText = '';
        countDiv.innerText = '0';
    }
}


const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const button = document.getElementsByClassName('btn');
const output = document.getElementById('output');
const submit = document.getElementById('submit');
const clear = document.getElementById('clear');
const countDiv = document.getElementById('count');
let count = parseInt(countDiv.innerText);

let foundList = [];

let game = new Wordblock(output);

function randInt(max){
    return Math.floor(Math.random() * max);
}


for (let i in button){
    button[i].innerText = alph[randInt(25)];
}

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', ()=>{
        var pressed = button[i].innerText;

        if (output.innerText.length > 16){
            return;
        }
        
        output.innerText += pressed;
    })
}

submit.addEventListener('click', ()=>{

    fetch('./words.json').then(res => res.json().then(
        data =>{

            for (let i = 0; i < data.words.length; i++) {
                
                if (output.innerText.toLowerCase() == data.words[i]){

                    for (let j = 0; j < foundList.length; j++) {
                        if(foundList[j] == data.words[i]){
                            console.log('already found');
                        }
                    }

                    console.log('word matches: ' + data.words[i]);
                    game.clear();
                    
                    
                    count++;
                    countDiv.innerText = count;

                    foundList.push(data.words[i]);

                    console.log(`Words found: ${count}`);
                    console.log(foundList);

                }
                
            }

        }
    ));
})

clear.addEventListener('click', ()=>{
    game.clear();
})