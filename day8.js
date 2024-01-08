const fs = require('fs/promises');

const part = 2;

const mcd = (a, b) => b === 0 ? a : mcd(b, a % b);

const mcm =  (a, b) => {
    if (b === 0) return 0;
    return a * b / mcd(a, b);
};



const rawNodesToObject = (rawNodes)=>{
    let nodes = {};
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
    return nodes;
}

const transverseMap = (startingNode, directions, nodes) => {
    let stepPointer = 0;
    let currentNodes =  Array.isArray(startingNode) ? [...startingNode] : [startingNode];
    while(!currentNodes.every( (value ) => value[value.length-1] === 'Z')){
        switch (directions[stepPointer % directions.length] ) {
            case 'R':
                currentNodes.forEach((elem, index, self)=>{
                    self[index] = nodes[elem].right;
                })
                break; 
            case 'L':
                currentNodes.forEach((elem, index, self)=>{
                    self[index] = nodes[elem].left;
                })
                break;

            default:
                throw Error('Invalid direction');
                break;
        }
        stepPointer++;
        // console.log(currentNodes)
    }
    return stepPointer;
}
const main = async () =>{
    console.time()
    const rawData = await fs.readFile('./input.txt', {encoding:'utf-8'});
    let directions, rawNodes;
    [directions, ...rawNodes] = rawData.split('\r\n').filter( line => line.trim('') !== '');
    let nodes = rawNodesToObject(rawNodes);

    let startnigNodes;
    if(part === 1){
        startnigNodes = ['AAA'];
        console.log(transverseMap(startnigNodes, directions, nodes));
    }
    else{
        startnigNodes = Object.keys(nodes).filter( (elem) => {
            return elem[elem.length-1] === 'A';
        })
        let arrayOfSteps = [];
        startnigNodes.forEach((elem)=>{
            arrayOfSteps.push(transverseMap(elem, directions, nodes));
        })
        let minSteps = arrayOfSteps.reduce((prev,curr)=>{
            return mcm(prev,curr);
        })
        console.log(minSteps);
    }
}
main()