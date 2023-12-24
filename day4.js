const fs = require('fs/promises');

const main = async ()=>{
    let rawContent = await fs.readFile('./input.txt',{encoding:'utf-8'});
    let rows = rawContent.split('\r\n');
    console.log(rows)
    let results = []
    let sumOfPoints = 0
    
    /*
    results[i] = {
        winningNumbers:[int]
        myNumbers:Set[int]
        points: int
    }
    */

    for (let i = 0; i < rows.length; i++) {
        results [i+1] = {};
        results[i+1].winningNumbers = undefined;
        results[i+1].myNumbers = undefined;

        [results[i+1].winningNumbers, results[i+1].myNumbers] = rows[i].split(':')[1].split('|');
        results[i+1].winningNumbers = results[i+1].winningNumbers.trim();
        results[i+1].myNumbers = results[i+1].myNumbers.trim();

        results[i+1].myNumbers = new Set(results[i+1].myNumbers.split(/\s+/));
        results[i+1].winningNumbers = results[i+1].winningNumbers.split(/\s+/); 
        results[i+1].points = 0;

        for (let j = 0; j < results[i+1].winningNumbers.length; j++) {
            if(results[i+1].myNumbers.has(results[i+1].winningNumbers[j])){
                if(results[i+1].points === 0){
                    results[i+1].points = 1;
                }
                else{
                    results[i+1].points *= 2;
                }
            }
        }
        sumOfPoints += results[i+1].points;
        console.log(results[i+1]);
    }
    console.log(sumOfPoints);    
}
main();
