export function vector2(...args){

    //Se os valores recebidos forem um objeto
    if(args[0].x != undefined && args[0].y != undefined){

        return {x: args[0].x, y: args[0].y}

    } else {

        switch(args.length){
            //Foi passado um array
            case 1:
                return {x: args[0][0], y:args[0][0]}
            //Foi passado valores individuais
            case 2:
                return {x: args[0], y: args[1]}
            //ERRO
            default:
                console.log("Quantidade de argumentos inválida")
                break;
        }

    }

    switch(args[0]){

        case 'random':
            return {x: randomMinMax(0, window.innerWidth), y: randomMinMax(0, window.innerHeight)}
        case 'zero':
            return {x: 0, y: 0}
        default:
            console.log(`O formato de dados (${args[0]}) recebidos não é aceito.`)
            break;

    }

}

export function distance(a, b){

    return Math.sqrt(Math.pow(b.x - a.x ,2) + Math.pow(b.y - a.y ,2));

}

export function collision(type, a, b){

    switch(type){

        case 'point_rect':
            let point = a;
            let rect = b;
            
            if(point.x >= rect.x && point.x <= rect.x + rect.w &&
               point.y >= rect.y && point.y <= rect.y + rect.h){
                return true
            } else {
                return false
            }
        default:
            console.log(`Teste de colisão ${type} desconhecido.`);
            break;

    }

}

export function randomMinMax(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}