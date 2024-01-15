const {readFileSync, writeFileSync} = require('fs')

const getEdges = (rows, explored, nodePosX, nodePosY) => {
    let validEdges = [];
    //Left
    if(nodePosY-1 >= 0 && ['-','F','L'].includes(rows[nodePosX][nodePosY-1]) && !explored[nodePosX][nodePosY-1])
        validEdges.push({x:nodePosX, y:nodePosY-1})
    //Down
    if(nodePosX+1 <rows.length && ['|','J','L'].includes(rows[nodePosX+1][nodePosY]) && !explored[nodePosX+1][nodePosY])
        validEdges.push({x:nodePosX+1, y:nodePosY})
    //Right
    if(nodePosY+1 < rows[nodePosX].length && ['-','J','7'].includes(rows[nodePosX][nodePosY+1]) && !explored[nodePosX][nodePosY+1])
        validEdges.push({x:nodePosX, y:nodePosY+1})
    //Up
    if(nodePosX-1 >= 0 && ['|','F','7'].includes(rows[nodePosX-1][nodePosY])&& !explored[nodePosX-1][nodePosY])
        validEdges.push({x:nodePosX-1, y:nodePosY})
    
    return validEdges;
}

const bfs = (rows, start) => {
    let layers = [[]]; // {x,y}
    let explored = [[]];
    let adyNodes;
    let parent = {};
    for (let i = 0; i < rows.length; i++) { 
        explored[i] = new Array(rows[i].length).fill(false);
    }
    explored[start.x][start.y] = true;
    layers[0] = [start]
    parent[`${start.x}${start.y}`] = null;
    
    let i = 0
    while(layers[i].length > 0){
        layers[i+1] = [];
        for (let v of layers[i]) {
            adyNodes = getEdges(rows,explored,v.x,v.y);
            for ( let key in  adyNodes ) {
                if(!explored[adyNodes[key].x][adyNodes[key].y]){
                    explored[adyNodes[key].x][adyNodes[key].y] = true;
                    parent[`${adyNodes[key].x}${adyNodes[key].y}`] = v;
                    console.log(rows[v.x][v.y], `(${v.x},${v.y})`);
                    rows[v.x] = rows[v.x].substring(0,v.y) + i + rows[v.x].substring(v.y+1);
                    layers[i+1].push(adyNodes[key]);    
                }
            }
        }
        i++; 
    }
    return [layers,parent];
}


const main = () => {
    
    let rawData = readFileSync('./input.txt',{encoding: 'utf-8'});
    let rows = rawData.split('\r\n');
    let start = {x:-1, y: -1};
    let i = 0;
    let aux = -1;
    // Finding the start point
    while( i < rows.lenght || aux === -1) {
        aux = rows[i].indexOf('S');
        if(start.y === -1){
            start.x = i;
            start.y = aux;
        }
        i++;
    }
    
    //BFS
    let layers, parent;
    [layers, parent] = bfs(rows, start)
    console.log(layers.length-2); // Substract 2 to get the last index
    let polarity = false;
    let count = 0;
    let subcount = 0;
    let test = ''
    let startPointer = -1;
    let finishPointer = -1;
    for (let i = 0; i < rows.length; i++) {
        subcount = 0;
        polarity = false;
        startPointer = -1;
        finishPointer = -1;
        for (let j = 0; j < rows[i].length; j++){
            if(parent.hasOwnProperty(`${i}${j}`) && rows[i][j] === '-'){
                polarity = !polarity;
            }
            else if(parent.hasOwnProperty(`${i}${j}`) && ['|','J','7','F','L'].includes(rows[i][j])){
                polarity = !polarity;
                count += subcount;
                if(startPointer != -1 && subcount != 0){
                    rows[i] = rows[i].substring(0,startPointer+1) + 'I'.repeat(j -startPointer-1) + rows[i].substring(j);
                }
                subcount = 0;
                startPointer = j;
            }
            else if(polarity && !parent.hasOwnProperty(`${i}${j}`)){
                subcount++;
            }
            test += polarity ? '1':'0';
        }
        test +='\n'
        // count += subcount;
    }
    console.log(test)
    console.log(count)
    console.log(rows.join('\n'));
    

    
}

main()

