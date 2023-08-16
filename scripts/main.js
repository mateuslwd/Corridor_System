import * as D from './draw.js';

import {Corridor} from './rect_draw.js';
import {Vertex, vertex} from './rect_vertex.js';

function frame(){

    D.clearFrame();    

    Corridor.render()

    for(let i = 0; i < vertex.length; i++){

        let a = vertex[i].convertToVector()

        for(let j = 0; j < vertex[i].neigh.length; j++){

            let b = vertex[vertex[i].neigh[j]].convertToVector();

            D.line('yellow', 6, a, b)

        }


    }

    Vertex.render()

}

setInterval(frame, 50);