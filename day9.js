const fs = require('fs/promises');

const part = 2;

const main = async () =>{
    let rawData = await fs.readFile('./input.txt',{encoding: 'utf-8'});
    let rows = rawData.split('\r\n').filter( line => line.trim('') !== '');
    let subRows = []
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
        rows[i] = rows[i].split(' ')
        subRows[0] = [...rows[i]].map(Number)
        let j = 1;
        while(!subRows[j-1].every( val => val === 0)){
            subRows[j] = []
            for (let k = 0; k < subRows[j-1].length-1; k++) {
                subRows[j].push(parseInt(subRows[j-1][k+1]) - parseInt(subRows[j-1][k]));
            }
            j++
        }

        if(part === 2 ){
            console.log('PART 2')
            subRows[subRows.length-1].unshift(0)
            // Extrapolacion
            for (let j = subRows.length -2 ; j >= 0 ; j--) {
                subRows[j].unshift(subRows[j][0] - subRows[j+1][0])
            }
            sum += subRows[0][0] 

        }
        else{
            subRows[subRows.length-1].push(0)
            // Extrapolacion
            for (let j = subRows.length -2 ; j >= 0 ; j--) {
                subRows[j].push(subRows[j][subRows[j].length-1] + subRows[j+1][subRows[j+1].length-1])
            }
            sum += subRows[0][subRows[0].length-1] 
        }
        
        
        console.log(subRows[0])
        subRows = [];
    }
    console.log('SUMA: ',sum)
}
main()