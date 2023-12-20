const fs = require('fs/promises')


// Return games possible with:
// 12 red cubes, 13 green cubes and 14 blue cubes

const main = async (values = {}) => {
    let content = await fs.readFile('./input.txt',{encoding:'utf-8'})
    content = content.split('\r\n')
    let obj = {}
    let game, balls;
    let colors, minColors = []

    // Itera sobre cada linea del input
    for (let i = 0; i < content.length; i++) {
        [game, balls] = content[i].split(':');
        balls = balls.split(';');
        minColors[i] = {
            blue: 0,
            green: 0,
            red: 0
        }
        // Itera sobre cada resultado de sacar pelotas del saco en un mismo game 
        for (let j = 0; j < balls.length; j++) {
            balls[j] = balls[j].split(',');
            colors[j] = {
                blue: 0,
                green: 0,
                red: 0
            }
            // Itera sobre cada color de las pelotas que se sacaron a la vez
            for (let k = 0; k < balls[j].length; k++) {
                balls[j][k] = balls[j][k].trim();
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

            // minColors[i].blue = Math.max(minColors.blue | 0, colors.blue);
            // minColors[i].green = Math.max(minColors.green | 0, colors.green);
            // minColors[i].red = Math.max(minColors.red | 0, colors.red);

            // Se marca el game si tiene mas pelotas de algun color como imposible (null)
            if(Object.keys(values).length !== 0 && (values.blue < colors[j].blue || values.green < colors[j].green || values.red < colors[j].red)){
                obj[game.split(' ')[1]] = null;
            }
        }

        // Si esta marcado => se elimina del resultado
        if(obj[game.split(' ')[1]] !== null){
            obj[game.split(' ')[1]] = colors;
        }
        else{
            delete obj[game.split(' ')[1]]
        }
        
    }
    // Get each key of the object (games' number) and get their sum
    console.log(minColors.reduce( (p,c)=> p + (c.blue*c.green*c.red)))

    return Object.keys(obj).reduce((p,c)=> parseInt(p) + parseInt(c));
}
let result = main({blue: 14, green: 13, red: 12})
console.log(result)


