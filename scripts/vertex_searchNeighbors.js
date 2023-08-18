import * as M from './calc.js';

import { vertex } from "./rect_vertex.js";

function areNeighbors(i, j){

    let calculateCoeficientAngular = (a, b)=>{

        let deltaY = b.y - a.y
        let deltaX = b.x - a.x

        if(deltaX == 0|| deltaY == 0){

            return 0

        } else {

            return deltaY / deltaX

        }

    }

    let a = vertex[i].convertToVector()
    let b = vertex[j].convertToVector()

    //Se A estiver alinhado com B
    if(calculateCoeficientAngular(a, b) == 0){
        
        //Impede que o ponto inicial seja o mesmo que o final
        if(!a.equalsTo(b)){

            //A tem que ser MENOR que B para o teste se está entre eles funcionar
            if(a.x > b.x){

                let tem = a.x

                a.x = b.x
                b.x = tem

            }

            if(a.y > b.y){

                let tem = a.y

                a.y = b.y
                b.y = tem

            }

            //Itera sob todos os pontos existentes
            for(let i = 0; i < vertex.length; i++){

                let c = vertex[i].convertToVector()

                //Impede que o ponto atual seja igual a A e B
                if(!a.equalsTo(c) && !b.equalsTo(c)){

                    //Se os 3 pontos estiverem alinhados
                    if(calculateCoeficientAngular(a, c) == 0 &&
                    calculateCoeficientAngular(b, c) == 0){
                    
                        //Se C está ENTRE A e B
                        if(M.collision('point_rect', c, new M.Rect(a.x, a.y, b.x - a.x, b.y - a.y))){

                            return false

                        }

                    }
                
                }

            }

            //Se não houver ninguem entre eles
            return true

        }
    } else {

        //Se A e B não estiverem alinhados
        return false
    }

}

class Edge{

    constructor(index, vector, distance){

        this.index = index;
        this.vector = vector;
        this.distance = distance;

    }

}

export function initNeighbors(){

    for(let i = 0; i < vertex.length; i++){

        for(let j = 0; j < vertex.length; j++){
            
            if(i != j){
    
                if(areNeighbors(i, j)){
    
                    vertex[i].neigh.push(new Edge(j, vertex[j].convertToVector(), M.distance(vertex[i].convertToVector(), vertex[j].convertToVector())))
    
                }
    
            }
    
        }
    
    }

}