const {readFileSync} = require('fs')

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
    // let parent = {};
    for (let i = 0; i < rows.length; i++) { 
        explored[i] = new Array(rows[i].length).fill(false);
    }
    explored[start.x][start.y] = true;
    layers[0] = [start]
    // parent[`${start.x}${start.y}`] = null;
    
    let i = 0
    while(layers[i].length > 0){
        layers[i+1] = [];
        for (let v of layers[i]) {
            adyNodes = getEdges(rows,explored,v.x,v.y);
            for ( let key in  adyNodes ) {
                if(!explored[adyNodes[key].x][adyNodes[key].y]){
                    explored[adyNodes[key].x][adyNodes[key].y] = true;
                    // parent[`${adyNodes[key].x}${adyNodes[key].y}`] = v;
                    layers[i+1].push(adyNodes[key]);
                }
            }
        }
        i++; 
    }
    return layers;
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
    console.log(bfs(rows, start).length-2); // Substract 2 to get the last index
}

main()

