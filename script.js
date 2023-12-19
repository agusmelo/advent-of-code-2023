const fs = require('fs/promises')


// Return games possible with:
// 12 red cubes, 13 green cubes and 14 blue cubes

const main = async (values) => {
    let content = await fs.readFile('./input.txt',{encoding:'utf-8'})
    content = content.split('\r\n')
    let obj = {}
    let game, balls;
    let colors = {} 
    for (let i = 0; i < content.length; i++) {
        [game, balls] = content[i].split(':');
        balls = balls.split(';');
        for (let j = 0; j < balls.length; j++) {
            balls[j] = balls[j].split(',');
            colors[j] = {
                blue: 0,
                green: 0,
                red: 0
            }
            for (let k = 0; k < balls[j].length; k++) {
                balls[j][k] = balls[j][k].trim();
                console.log(balls[j][k])
                if(balls[j][k].indexOf('blue') != -1){
                    colors[j].blue = parseInt(balls[j][k].split(' ')[0])
                }
                else if(balls[j][k].indexOf('green') != -1){
                    colors[j].green = parseInt(balls[j][k].split(' ')[0])
                }
                else{
                    colors[j].red = parseInt(balls[j][k].split(' ')[0])
                }   
            }
            if(values.blue < colors[j].blue || values.green < colors[j].green || values.red < colors[j].red){
                obj[game.split(' ')[1]] = null;
            }
            console.log(colors[j])
            console.log(values)
        }
        if(obj[game.split(' ')[1]] !== null){
            obj[game.split(' ')[1]] = colors;
        }
        else{
            delete obj[game.split(' ')[1]]
        }
        
    }
    console.log(Object.keys(obj).reduce((p,c)=> parseInt(p) + parseInt(c) ));
}
main({blue: 14, green: 13, red: 12})
