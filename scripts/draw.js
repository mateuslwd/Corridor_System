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