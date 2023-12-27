const fs = require('fs/promises');
/*
v = 1ms*buttonPressTime
d = (totalTime-buttonPressTime) *v
*/
const main = async (part = 1)=>{
    let rawContent = await fs.readFile('./input.txt',{encoding:'utf-8'});
    let rows = rawContent.split('\r\n').filter( line => line.trim('') !== '');
    let times = rows[0].split(':')[1].trim().split(/\s+/);
    let distances = rows[1].split(':')[1].trim().split(/\s+/);

    if(part === 2){
        times = [times.reduce((a,b)=> a+b)]
        distances = [distances.reduce((a,b)=> a+b)]
    }

    console.log(times, distances)
    let vel, winningChance, acc;
    let myDistances = [];
    let currentDistance = [];
    for (let i = 0; i < times.length; i++) {
        winningChance = 0;
        for (let j = 0; j <= times[i]; j++) {
            vel = j;
            currentDistance[i] = (times[i] - j)* vel
            if(currentDistance[i] > distances[i]){    
                myDistances.push(currentDistance[i]);
                winningChance++;
            }
        }
        if(acc === undefined){
            acc = winningChance
        }
        else{
            acc *= winningChance
        }
    }
    console.log(acc)
}

main();