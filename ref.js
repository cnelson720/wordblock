/*
fetch('./words.json').then(res => res.json()).then(data => {

    var word = data.words;

    var vowel = ['a', 'e', 'i', 'o', 'u'];

    var vowelCounter = 0;
    var conCounter = 0;
    var misc = 0;

    var wordCounter = 0;

    for (let i = 0; i < word.length; i++) {
        wordCounter++;
        for (let j = 0; j < word[i].length; j++) {
            
            for (let v = 0; v < vowel.length; v++) {
                
                if(word[i][j] == vowel[v]){
                    vowelCounter++;
                } 
                
            }

            if(!word[i][j].match(/[a-z]/g)){
                misc++;
            } else {
                conCounter++;
            }
        }
    }

    function averageVowel(total, vowels){
        return (vowels / total).toFixed(1);
    }
    function averageConsenant(total, consenants){
        return (consenants / total).toFixed(1);
    }

    console.log(`total words: ${wordCounter} vowels: ${vowelCounter}, consenants: ${conCounter}`);
    console.log(`misc: ${misc}`);
    console.log('average number of vowels: ' + averageVowel(wordCounter, vowelCounter)
    + ', average number of consenants: ' + averageConsenant(wordCounter, conCounter));
});
*/


        