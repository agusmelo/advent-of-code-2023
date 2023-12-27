const fs = require('fs/promises');

const TYPES = {
    fiveOfKind: 1,
    fourOfKind: 2,
    fullHouse: 3,
    threeOfKind: 4,
    twoPair: 5,
    onePair: 6,
    highCard: 7,
}

const CARD_ORDER = {'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'T':10,'J':11,'Q':12,'K':13,'A':14}

const main = async ()=>{
    let rawData = await fs.readFile('input.txt',{encoding:'utf-8'});
    let obj = {}
    let arr = rawData.split('\r\n').filter( line => line.trim('') !== '');
    arr =arr.map(elem => {
        let aux = elem.split(' ');
        let count = {}
        let hand = aux[0].split('');
        for (const card of hand) {
            count[card] = (count[card] || 0) + 1;
        }
        let uniqueLabel = new Set(aux[0].split(''));
        switch (uniqueLabel.size) {
            case 1:
                aux[2] = TYPES.fiveOfKind;
                break;

            case 2: // fourOfAKind || fullHouse
                if(Object.values(count).some((elem) => elem === 4)){
                    aux[2] = TYPES.fourOfKind;
                }
                else{
                    aux[2] = TYPES.fullHouse;
                }
                break;

            case 3: // threeOfKind || twoPair
                if(Object.values(count).some((elem) => elem === 3)){
                    aux[2] = TYPES.threeOfKind;
                }
                else{
                    aux[2] = TYPES.twoPair;
                }
                break;

            case 4:
                aux[2] = TYPES.onePair;
                break; 

            case 5:
                aux[2] = TYPES.highCard;
                break;   

            default:
                break;
        }
        return {
            hand: aux[0],
            bid: aux[1],
            type: aux[2]
        }
    });
    arr.sort((a,b) => {
        if(a.type !== b.type){
            return a.type - b.type
        }
        else{
            let i = 0;
            while(i < 5){
                console.log(`Comparing ${a.hand[i]} amd ${b.hand[i]}`)
                console.log(CARD_ORDER[a.hand[i]] > CARD_ORDER[b.hand[i]]  ? a.hand[i] : b.hand[i] )
                if(CARD_ORDER[a.hand[i]] < CARD_ORDER[b.hand[i]]){
                    return 1;
                }
                else if(CARD_ORDER[a.hand[i]] > CARD_ORDER[b.hand[i]]){
                    return -1
                }
                i++;
            }
            return 0;
        }
    });
    let sum = 0;
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        sum += parseInt(arr[i].bid)*(arr.length - i);
    }
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].hand,arr[i].bid, arr.length - i );
    }
    
    console.log(sum)


}
main()