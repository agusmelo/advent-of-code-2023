const fs = require('fs/promises');

class myMap {
    constructor(name, map){
        this.name = name;
        this.map = map;
    }

}


const main = async ()=>{
    let rawContent = await fs.readFile('./input.txt',{encoding:'utf-8'});
    let rows = rawContent.split('\r\n').filter( line => line.trim('') !== '');
    let objectOfMaps = {};
    let mapName = '';
    let seeds = rows[0].split(':')[1].trim().split(' ');
    let source, destination;
    let minLocation;
    rows.forEach( row =>{
        if(row.endsWith(':')){
            mapName = row.replace(':','').trim();
            objectOfMaps[mapName] = [];
        }
        else{
            if(mapName){
                objectOfMaps[mapName].push(row.split(' ').map(Number));
            }
        }
    })
    for(const seed of seeds){
            destination = seed;
            offset = 0;
        for(const name in objectOfMaps){
            source = destination;
            let i = 0;
            let rangeFound = false
            while(i < objectOfMaps[name].length && !rangeFound){
                if((objectOfMaps[name][i][1] <= source) && (source <= objectOfMaps[name][i][1] + objectOfMaps[name][i][2])){
                    offset = source - objectOfMaps[name][i][1];
                    destination = objectOfMaps[name][i][0] + offset;
                    rangeFound = true;
                }
                i++;
            }
            if (!rangeFound){
                destination = source;
            }
        }
        minLocation = minLocation === undefined ? destination : Math.min(minLocation, destination);
    }
    console.log(minLocation)
}
main();