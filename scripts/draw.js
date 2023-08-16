import {C} from './setup.js'

export function clearFrame(){

    C.clearRect(0, 0, window.innerWidth, window.innerHeight);

}

export function rect(color, ...size){

    switch(size.length){

        case 1:
            C.beginPath();
            C.fillStyle = color;
            C.rect(size[0].x, size[0].y, size[0].w, size[0].h);
            C.fill();
            C.closePath();
            break;
        //argumentos separados
        case 4:
            C.beginPath();
            C.fillStyle = color;
            C.rect(size[0], size[1], size[2], size[3]);
            C.fill();
            C.closePath();
            break;

    }

}

export function circle(color, size, ...pos){

    switch(pos.length){

        //Se estiver em formato de vetor
        case 1:
            C.beginPath();
            C.fillStyle = color;
            C.arc(pos[0].x, pos[0].y, size, 0, Math.PI * 2);
            C.fill();
            C.closePath();
            break;
        //Se foram passados separadamente
        case 2:
            C.beginPath();
            C.fillStyle = color;
            C.arc(pos[0], pos[1], size, 0, Math.PI * 2);
            C.fill();
            C.closePath();
            break;
        default:
            console.log(`Formato de cordenadas não aceito.`);        
            break
    
    }

}

export function line(color, width, ...args){

    switch(args.length){

        //Se receber 1 linha
        case 1:
            break
        //Se receber 2 pontos
        case 2:
            C.beginPath();
            C.strokeStyle = color;
            C.lineWidth = width;
            C.moveTo(args[0].x, args[0].y);
            C.lineTo(args[1].x, args[1].y);
            C.stroke();
            C.closePath();
            break
        //Se receber 4 argumentos separados
        case 4:
            break

    }

}