import * as M from './calc.js';
import * as D from './draw.js';

import {startNeighList} from './vertex_searchNeighbors.js'

import {corridors} from "./rect_draw.js";

export class Vertex{

    constructor(point){

        this.x = point.x;
        this.y = point.y;

        this.neigh = [];

    }

    render(){

        D.circle('red', 7, this.x, this.y);

    }

    static atualizaVerticies(){

        vertex = [];

        let precision = 1

        //Itera sob todos os corredores
        for(let i = 0; i < corridors.length; i++){

            let checkWhoIsColliding = (...args)=>{

                let box = new M.Rect(args)
    
                //Itera sob todos os corredores novamente
                for(let j = 0; j < corridors.length; j++){

                    //Evita teste a colisão com ele mesmo
                    if(i != j){

                        //Sai do loop se for o fim do corredor
                        if(M.collision('rect_rect', box, corridors[j].size)){

                            return j                        

                        }

                    }

                }

            }

            //Se for um corredor vertical
            if(corridors[i].direction == 'vertical'){

                //###!!!### Talves de pra transformar isso em funções, e precisa reescrever os calculos para ficar mais legivel

                //#region TOP
                let topColidedWith = checkWhoIsColliding(
                    corridors[i].size.x,
                    corridors[i].size.y - precision,
                    corridors[i].size.w,
                    precision
                )
                
                if(topColidedWith == undefined){
                    vertex.push(new Vertex(new M.vector2(corridors[i].size.x + corridors[i].size.w / 2, corridors[i].size.y)))
                } else {
                    vertex.push(new Vertex(new M.vector2(corridors[i].size.x + corridors[i].size.w / 2, 
                                                     corridors[topColidedWith].size.y + corridors[topColidedWith].size.h / 2)))
                }
                //#endregion

                //#region BOT
                let botColidedWith = checkWhoIsColliding(
                    corridors[i].size.x,
                    corridors[i].size.y + corridors[i].size.h,
                    corridors[i].size.w,
                    precision
                )
                
                if(botColidedWith == undefined){
                    vertex.push(new Vertex(new M.vector2(corridors[i].size.x + corridors[i].size.w / 2, corridors[i].size.y + corridors[i].size.h)))
                } else {
                    vertex.push(new Vertex(new M.vector2(corridors[i].size.x + corridors[i].size.w / 2,
                                                     corridors[botColidedWith].size.y + corridors[botColidedWith].size.h / 2)))    
                }
                //#endregion

            } else {

                //#region LEFT
                let leftCollidedWith = checkWhoIsColliding(
                    corridors[i].size.x - precision,
                    corridors[i].size.y,
                    precision,
                    corridors[i].size.h
                )
                
                if(leftCollidedWith == undefined){
                    vertex.push(new Vertex(new M.vector2(corridors[i].size.x, corridors[i].size.y + corridors[i].size.h / 2)))
                } else {
                    vertex.push(new Vertex(new M.vector2(corridors[leftCollidedWith].size.x + corridors[leftCollidedWith].size.w / 2, corridors[i].size.y + corridors[i].size.h / 2)))
                }
                //#endregion

                //#region 
                let rightCollidedWith = checkWhoIsColliding(
                    corridors[i].size.x + corridors[i].size.w,
                    corridors[i].size.y,
                    precision,
                    corridors[i].size.h
                )
                
                if(rightCollidedWith == undefined){
                    vertex.push(new Vertex(new M.vector2(corridors[i].size.x + corridors[i].size.w, corridors[i].size.y + corridors[i].size.h / 2)))
                } else {
                    vertex.push(new Vertex(new M.vector2(
                        corridors[rightCollidedWith].size.x + corridors[rightCollidedWith].size.w / 2,
                        corridors[i].size.y + corridors[i].size.h / 2
                    )))
                }
                //#endregion

            }

        }

        startNeighList()

    }

    convertToVector(){

        return new M.vector2(this.x, this.y)

    }

    static render(){

        for(let i = 0; i < vertex.length; i++){
            vertex[i].render();
        }

    }
        
}

export var vertex = [];