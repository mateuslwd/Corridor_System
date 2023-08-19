import * as D from './draw.js';

import {Corridor} from './rect_draw.js';
import {Vertex} from './rect_vertex.js';
import { Path } from './a_star.js';

function frame(){

    D.clearFrame();    

    Corridor.render()   
    Vertex.render()

    Path.render()

}

setInterval(frame, 50);