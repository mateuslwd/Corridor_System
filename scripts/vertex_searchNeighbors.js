import * as M from './calc.js'
import {vertex} from './rect_vertex.js';
import {corridors} from './rect_draw.js';

//Confere se duas linhas se cruzam
//Deus queira que eu nunca precise fazer Debug dessa função 
function doLinesIntersect(line1, line2) {

    const det = (line1.start.x - line1.end.x) * (line2.start.y - line2.end.y) - (line1.start.y - line1.end.y) * (line2.start.x - line2.end.x);

    //Se as linhas forem paralelas
    if (det === 0) {
        //Não se cruzam
        return false;
    }

    let x =
        ((line1.start.x * line1.end.y - line1.start.y * line1.end.x) * (line2.start.x - line2.end.x) - (line1.start.x - line1.end.x) * (line2.start.x * line2.end.y - line2.start.y * line2.end.x)) / det;
    let y =
        ((line1.start.x * line1.end.y - line1.start.y * line1.end.x) * (line2.start.y - line2.end.y) - (line1.start.y - line1.end.y) * (line2.start.x * line2.end.y - line2.start.y * line2.end.x)) / det;

    if (
        x >= Math.min(line1.start.x, line1.end.x) &&
        x <= Math.max(line1.start.x, line1.end.x) &&
        y >= Math.min(line1.start.y, line1.end.y) &&
        y <= Math.max(line1.start.y, line1.end.y) &&
        x >= Math.min(line2.start.x, line2.end.x) &&
        x <= Math.max(line2.start.x, line2.end.x) &&
        y >= Math.min(line2.start.y, line2.end.y) &&
        y <= Math.max(line2.start.y, line2.end.y)
    ) {
        return new M.vector2(x, y);
    }

    return false;

}

//Confere se uma linha cruza com os lados de um retangulo
function doLineCrossRect(line, rect){

    let sides = []
    let intersections = []

    //left
    sides.push(new M.Line(rect.x, rect.y, rect.x, rect.y + rect.h))
    //right
    sides.push(new M.Line(rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h))  
    //up
    sides.push(new M.Line(rect.x, rect.y, rect.x + rect.w, rect.y))
    //down
    sides.push(new M.Line(rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h))

    sides.forEach(side => {
        let point = doLinesIntersect(line, side); 
        if(point){
            intersections.push(point)
        }
        if(intersections.length == 2){
            return intersections;
        }
    })

    return intersections;

}

//Confere se uma linha cruza no mesmo lugar em dois retangulos diferentes
function doLineCrossCorridors(line){

    let totalColisions = []

    for(let i = 0; i < corridors.length; i++){

        let intersections = doLineCrossRect(line, corridors[i].size);

        if(intersections.length > 0){

            for(let j = 0; j < intersections.length; j++){

                totalColisions.push(intersections[j])

            }

        }

    }

    //Remove pontos duplicados da lista
    for(let i = 0; i < totalColisions.length; i++){

        for(let j = 0; j < totalColisions.length; j++){

            if(i != j){

                if(totalColisions[i].equalsTo(totalColisions[j])){
                    totalColisions.splice(i, 1)
                    totalColisions.splice(j - 1, 1)
                }

            }

        }

    }

    //Se houver apenas uma colisão
    if(totalColisions.length == 1){

        //Testa se o ponto da colisão é igual a A ou B
        if(totalColisions[0].equalsTo(line.start) || totalColisions[0].equalsTo(line.end)){

            return true

        }

    }

    //Se não sobrar pontos duplicados, quer dizer que a linha se mantem dentro dos corredores
    if(totalColisions.length == 0){
        return true
    } else {
        return false
    }
    
}

//Confere se há algum ponto entre os pontos A e B
function doPointInLine(a, b){

    let calculateCoeficientAngular = (a, b)=>{

        let deltaY = b.y - a.y
        let deltaX = b.x - a.x

        if(deltaX == 0|| deltaY == 0){

            return 0

        } else {

            return deltaY / deltaX

        }

    }

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

        for(let i = 0; i < vertex.length; i++){

            let c = vertex[i].convertToVector()

            if(!a.equalsTo(c) && !b.equalsTo(c)){

                //Se os 3 pontos estiverem alinhados
                if(calculateCoeficientAngular(a, b) == 0 &&
                calculateCoeficientAngular(a, c) == 0){
                
                    //Se T está ENTRE A e B
                    if(M.collision('point_rect', c, new M.Rect(a.x, a.y, b.x - a.x, b.y - a.y))){

                        return true

                    }

                } else {

                    /*
                    Para coorredores diagonais
                    é preciso calcular a formula geral da reta
                    e então resolver a formula usando o ponto em questão
                    para descobrir se o ponto está na linha
                    funcionalidade a ser adicionada quando corredores diagonais forem permitidos
                    */

                }
            
            }

        }

        return false

    }

}

//Checa sa A é vizinho de B
function checkIfIsNeighbor(a, b){

    if(!doPointInLine(a, b) && doLineCrossCorridors(new M.Line(a.x, a.y, b.x, b.y))){
        return true
    } else {
        return false
    }

}

export function startNeighList(){
    for(let i = 0; i < vertex.length; i++){

        for(let j = 0; j < vertex.length; j++){
    
            if(i != j){
    
                let a = vertex[i].convertToVector()
                let b = vertex[j].convertToVector()
    
                if(checkIfIsNeighbor(a, b)){
    
                    vertex[i].neigh.push(j)
                    vertex[j].neigh.push(i)
    
                }
    
            }
    
        }
    
    }
}