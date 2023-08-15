import {C} from './setup.js'

export function clearFrame(){

    C.clearRect(0, 0, window.innerWidth, window.innerHeight);

}

export function drawRect(color, ...size){

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