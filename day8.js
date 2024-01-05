const fs = require('fs/promises');


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
                console.log('ANTES:  ', currentNodes);
                currentNodes.forEach((elem, index, self)=>{
                    self[index] = nodes[elem].right;
                })
                console.log('DESPUES:  ', currentNodes)
                break;
        
            case 'L':
                console.log('ANTES:  ', currentNodes)
                currentNodes.forEach((elem, index, self)=>{
                    self[index] = nodes[elem].left;
                })
                console.log('DESPUES:  ', currentNodes)
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
    const rawData = await fs.readFile('./input.txt', {encoding:'utf-8'});
    let directions, rawNodes;
    [directions, ...rawNodes] = rawData.split('\r\n').filter( line => line.trim('') !== '');
    let nodes = rawNodesToObject(rawNodes);

    let startnigNodes = ['AAA']
    if(true){
        startnigNodes = Object.keys(nodes).filter( (elem) => {
            return elem[elem.length-1] === 'A';
        })
    }
    console.log(transverseMap(startnigNodes, directions, nodes));

}
main()