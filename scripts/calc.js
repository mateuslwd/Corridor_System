import * as D from './draw.js'
import {C} from './setup.js';

export class vector2{

    constructor(...args){

        //Se os valores recebidos forem um objeto
        if(args[0].x != undefined && args[0].y != undefined){

            this.x = args[0].x
            this.y = args[0].y

        } else {

            switch(args.length){
                //Foi passado um array
                case 1:
                    this.x = args[0][0];
                    this.y = args[0][1];
                    break
                //Foi passado valores individuais
                case 2:
                    this.x = args[0];
                    this.y = args[1];
                    break
                default:
                    //Testa outros casos
                    switch(args[0]){

                        case 'random':
                            this.x = randomMinMax(0, window.innerWidth)
                            this.y = randomMinMax(0, window.innerHeight)
                            break
                        case 'zero':
                            this.x = 0
                            this.y = 0
                            break
                        default:
                            console.log(`O formato de dados (${args}) recebidos não é aceito.`)
                            break;
            
                    }
                    break;
            }

        }

    }

    equalsTo(b){

        if(this.x == b.x && this.y == b.y){
            return true
        } else {
            return false
        }

    }

    distanceTo(b){

        return Math.sqrt(Math.pow(b.x - this.x ,2) + Math.pow(b.y - this.y ,2))

    }

    angleTo(b){

        return Math.atan2(b.y - this.y, b.x - this.x) * (180 / Math.PI)

    }

    radTo(b){

        return Math.atan2(b.y - this.y, b.x - this.x)

    }

    print(){

        console.log(`X: ${this.x}, Y: ${this.y}.`)

    }

    draw(color, size){

        D.circle(color, size, this.x, this.y)

    }

}

export function angle(a, b){

    return Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI)

}

export function rad(a, b){

    return Math.atan2(b.y - a.y, b.x - a.x)

}

export class Rect{

    constructor(...args){

        switch(args.length){

            case 1:
                this.x = args[0][0];
                this.y = args[0][1];
                this.w = args[0][2];
                this.h = args[0][3];
                break
            case 4:
                this.x = args[0];
                this.y = args[1];
                this.w = args[2];
                this.h = args[3];
                break
            default:
                console.log('Formato não aceito')
                break

        }

    }

    draw(color){

        D.rect(color, this.x, this.y, this.w, this.h);

    }

}

export class Line{

    constructor(...args){

        switch(args.length){

            case 2:
                this.start = args[0];
                this.end   = args[1];
                break
            case 4:
                this.start = new vector2(args[0], args[1]);
                this.end   = new vector2(args[2], args[3]);
                break
            default:
                console.log('Formato de argumentos inválidos.')
            
        }

    }

    draw(color, width){

        C.beginPath();
        C.strokeStyle = color;
        C.lineWidth = width;
        C.moveTo(this.start.x, this.start.y);
        C.lineTo(this.end.x, this.end.y);
        C.stroke();
        C.closePath();

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
        case 'rect_rect':

            if(a.x < b.x + b.w && a.x + a.w > b.x &&
               a.y < b.y + b.h && a.y + a.h > b.y){
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