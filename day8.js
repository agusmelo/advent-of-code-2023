const fs = require('fs/promises');


const main = async () =>{
    const rawData = await fs.readFile('./input.txt', {encoding:'utf-8'});
    let directions, rawNodes;
    [directions, ...rawNodes] = rawData.split('\r\n').filter( line => line.trim('') !== '');
    // AAA = (BBB, CCC) -> nodes['AAA'] = {left: 'BBB', right:'CCC'}
    let nodes = {}; // nodes: [{right:char, left:char}]
    let aux;
    for (let i = 0; i < rawNodes.length; i++) {
        aux = rawNodes[i].split('=');
        aux[0] = aux[0].trim(); // key
        aux[1] = aux[1].replace('(','').replace(')','').split(',');
        aux[1][0] = aux[1][0].trim(); // value left
        aux[1][1] = aux[1][1].trim(); // value right 
        nodes[aux[0]] = {
            right: aux[1][1],
            left: aux[1][0]
        }
    }
    console.log(nodes)
    let stepPointer = 0;
    let currentNode = 'AAA'; // First node
    while(currentNode !== 'ZZZ'){
        console.log(currentNode);
        
        switch (directions[stepPointer % directions.length]) {
            case 'R':
                currentNode = nodes[currentNode].right  
                break;
        
            case 'L':
                currentNode = nodes[currentNode].left
                break;

            default:
                break;
        }
        stepPointer++;
    }
    console.log(stepPointer);

}
main()