const fs = require('fs/promises');

const main = async () =>{
    const rawContent = await fs.readFile('./input.txt',{encoding: 'utf-8'});
    let rows = rawContent.split('\r\n');
    let matrix = [];
    let char, asciiCode;
    let sum = 0;
    let numPointer;
    let currentNum = "";
    let history = [];
    
    for (let i = 0; i < rows.length; i++) {
        matrix[i] = rows[i].split('');  
    }

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            char = matrix[i][j]
            if(isSymbol(char)){
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        if((l != 0 || k!=0)  && i+k >= 0 && i+k < rows.length && j+l >= 0 && j+l < rows[i].length){
                            currentNum = "";
                            if(charIsNumber(matrix[i+k][j+l])){
                                numPointer = [i+k,j+l];
                                while(numPointer[1] >= 0 && matrix[numPointer[0]][numPointer[1]] !== '.' && !isSymbol(matrix[numPointer[0]][numPointer[1]])){
                                    numPointer[1]--;
                                }
                                numPointer[1]++;
                                while(numPointer[1] < rows[i].length && matrix[numPointer[0]][numPointer[1]] !== '.' && !isSymbol(matrix[numPointer[0]][numPointer[1]])){
                                    currentNum += matrix[numPointer[0]][numPointer[1]];
                                    matrix[numPointer[0]][numPointer[1]] = '.';
                                    numPointer[1]++;
                                }
                                console.log(currentNum);
                                history.push(currentNum);
                                sum += parseInt(currentNum);
                            }
                        }
                    } 
                }
            }
        }
    }

    console.log(sum);
    console.log(history[0], history[history.length-1])

}

main()

function isSymbol(char){
    // console.log('test: ', char)
    let asciiCode = char.charCodeAt(0);
    return (asciiCode != 0x2E && (asciiCode >= 0x21 && asciiCode <= 0x2F) || (asciiCode >= 0x3A &&  asciiCode <= 0x40) || (asciiCode >= 0x5B &&  asciiCode <= 0x60) || (asciiCode >= 0x7B &&  asciiCode <= 0x7E));
}

function charIsNumber(char){
    let asciiCode = char.charCodeAt(0);
    return asciiCode >= 0x31 && asciiCode <= 0x39;
}