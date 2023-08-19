import * as M from './calc.js'
import * as D from './draw.js'
import { vertex , Point, Vertex} from './rect_vertex.js'
import { CANVAS, mouseCanvasPosition, ferramenta } from './setup.js'

function lowestF(open){

    let temp = [...open]
    temp.sort((a, b) => a - b)
    
    return temp[0]

}

function findInList(item, list){

    for(let i = 0; i < list.length; i++){

        if(list[i] === item){
            return i
        }

    }

    return false

}

function removeFromList(item, list){

    for(let i = list.length - 1; i >= 0 ; i--){

        if(list[i] === item){
            list.splice(i, 1)
        }

    }

}

export class Path{

    constructor(start, end){

        this.start = start
        this.end = end

        this.path = []

        this.a_star()

    }

    a_star(){

        Vertex.atualizaVerticies()

        let start_point = new Point(this.start, 'green');
        let start_vertex = start_point.closest;
        let start_vector = start_vertex.convertToVector()

        let end_point = new Point(this.end, 'red');
        let end_vertex = end_point.closest;
        let end_vector = end_vertex.convertToVector()

        //Copia os valores dos vertex
        let map = [...vertex]

        //Adiciona os valores a copia dos objetos
        map.forEach(pos => {
            pos.f = 0;
            pos.g = 0;
            pos.h = 0;
        });

        //Adiciona a openList o vertex Inicial
        let open = [map[start_point.closest.index]]
        let closed = []

        let path = [];

        while(open.length > 0){    

            //current tem que ser o vertex com o menor F em openList
            let current_vertex = lowestF(open)
            let current_vector = current_vertex.convertToVector()

            //Se current for igual ao destino
            if(current_vector.equalsTo(end_vector)){

                let temp = current_vertex;

                while(temp.p != undefined){
                    path.unshift(temp)
                    temp = temp.p
                }

                path.unshift(start_vertex)

                this.path = path;

            }

            //Remove da lista de abertos
            removeFromList(current_vertex, open)
            //Adiciona a lista de já caminhados
            closed.push(current_vertex)

            //Para cada vizinho de current
            current_vertex.neigh.forEach(neigh => {
                
                if(neigh.index != start_vertex.index){

                    let neigh_vertex = map[neigh.index];

                    //Acontece de validar o vertex inicial
                    //Não sei se isso é um problema

                    //Se este vizinho não estiver na closedList
                    if(!findInList(neigh_vertex, closed)){
                        //Distancia de onde estou, até este vizinho
                        let tempG = current_vertex.g + neigh.distance

                        //Se o vizinho estiver na openList
                        if(findInList(neigh_vertex, open)){

                            //Se o caminho até aqui for menor do que antes
                            if(tempG < neigh_vertex.g){

                                //Atualiza o valor no mapa
                                map[neigh.index].g = tempG

                            }

                        } else {
                            
                            //Atualiza o valor no mapa
                            map[neigh.index].g = tempG
                            open.push(map[neigh.index])
                        
                        }

                        //Novo valor de H
                        //HEURISTIC
                        
                        let index = neigh.index;

                        map[index].h = neigh.vector.distanceTo(end_vector)
                        map[index].f = map[index].g + map[index].h;
                        map[index].p = current_vertex

                    }

                }

            });

        }

    }

    render(){

         for(let i = 0; i < this.path.length -1 ; i++){

            let a = this.path[i].convertToVector()
            let b = this.path[i + 1].convertToVector()

            D.line('rgba(0, 0, 255, .5)', 6, a, b)

        }

    }

    static atualiza(){

        for(let i = 0; i < paths.length; i++){

            paths[i].a_star();

        }

    }

    static render(){

        for(let i = 0; i < paths.length; i++){
            paths[i].render()
        }

    }

}

export var paths = []

let vertex1;
let vertex2;

CANVAS.addEventListener('mousedown', (e)=>{

    if(ferramenta == "path"){

        if(vertex1 == undefined){

            vertex1 = new M.vector2(...mouseCanvasPosition(e))
            return
    
        }
    
        vertex2 = new M.vector2(...mouseCanvasPosition(e))

        //Faz o que precisa fazer
        paths = []

        
        paths.push(new Path(vertex1, vertex2))

        vertex1 = undefined   
        vertex2 = undefined

    }

})