// . -> empty space
// # -> galaxy

const { Console } = require("console");
const {readFileSync, writeFileSync} = require("fs");

const part = 2;



const getModifiers = (space)=>{
    let row = [];
    let column = [];
    let bannedColumns = new Set();
    space.forEach((spaceRow, i) =>{
        if (spaceRow.split('').every((char)=>char === '.')){
            row[i] = true;
        }
        else{
            row[i] = false;
        }
        const regex = RegExp(/#/,'g');
        let match = regex.exec(spaceRow);
        while(match){
            bannedColumns.add(match.index);
            match = regex.exec(spaceRow);
        }
    })
    for (let i = 0; i < space.length; i++) {
        if(bannedColumns.has(i)){
            column[i] = false;
        }
        else{
            column[i] = true;
        }
    }
    
    return [row,column]
}


/**
 * @param {string[]} spaceMatrix
 * @return {string[]}
 */
const expandSpace = (spaceMatrix)=>{
    let expandedSpace = [];
    let bannedColumns = new Set();
    let validColumns = [];
    spaceMatrix.forEach((row) =>{
        expandedSpace.push(row);
        if (row.split('').every((char)=>char === '.')){
            expandedSpace.push(row);
        }
        const regex = RegExp(/#/,'g');
        let match = regex.exec(row);
        while(match){
            bannedColumns.add(match.index);
            match = regex.exec(row);
        }
    })
    
    for(let i = 0; i < expandedSpace[0].length; i++){
        if(!bannedColumns.has(i)) 
            validColumns.push(i);
    }

    validColumns.forEach((i,acc)=>{
        expandedSpace.forEach((row, j)=>{
            expandedSpace[j] = row.substring(0,i+acc) + '.' + row.substring(i+acc);
        })
    })
    
    return expandedSpace;
}


/**
 * @param {string[]} spaceMatrix
 * @return {object[]}
 */
const findGalaxies = (space)=>{
    let coordinates = [];
    const regex = RegExp(/#/,'g');
    let match;
    for(let i = 0; i < space.length; i++){
        match = regex.exec(space[i]);
        while(match){
            coordinates.push({x:i,y:match.index});
            match = regex.exec(space[i]);
        }
    }
    return coordinates;
}


/**
 * @param {number}
 * @param {number}  
 * @return {object[]}
 */
const calculateDistance = (pointA,pointB)=>{
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
}


const calculateDistanceWModifiers = (pointA,pointB,rowMod,columnMod)=>{
    let xFinish = pointA.x < pointB.x ? pointB.x : pointA.x ;
    let xStart = pointA.x < pointB.x ? pointA.x : pointB.x ;
    let xSum = 0;
    for(let i =  xStart ;i < xFinish; i++){
        xSum += rowMod[i] ? 1000000 : 1;
    }
    let yFinish = pointA.y < pointB.y ? pointB.y : pointA.y ;
    let yStart = pointA.y < pointB.y ? pointA.y : pointB.y ;
    let ySum = 0;
    // console.log(xStart,xFinish,yStart,yFinish)
    for(let i =  yStart ;i < yFinish; i++){
        ySum += columnMod[i] ? 1000000: 1;
    }
    
    // console.log(xSum,ySum)
    return xSum + ySum;
}

const main = () =>{
    const rawData = readFileSync('./input.txt',{encoding: 'utf-8'});
    let spaceMatrix = rawData.split('\r\n');
    if(part === 1){
        let newSpace = expandSpace(spaceMatrix);
        let galaxiesMap = findGalaxies(newSpace);
        let sum = 0;
        for (let i = 0; i < galaxiesMap.length-1; i++) {
            for (let j = i+1; j < galaxiesMap.length; j++) {
                sum += calculateDistance(galaxiesMap[i],galaxiesMap[j]);
            }
        }
    }
    if(part === 2){
        let rowMod,columnMod;
        let sum2=0;
        [rowMod,columnMod] = getModifiers(spaceMatrix);
        let galaxiesMap = findGalaxies(spaceMatrix);
        console.log(rowMod,columnMod)
        for (let i = 0; i < galaxiesMap.length-1; i++) {
            for (let j = i+1; j < galaxiesMap.length; j++) {
                sum2 += calculateDistanceWModifiers(galaxiesMap[i],galaxiesMap[j],rowMod,columnMod);
                
            }
        }
        console.log(sum2)
    }
    
}
main();