import * as D from './draw.js';

import {Corridor} from './rect_draw.js';
import {Vertex} from './rect_vertex.js';

function frame(){

    D.clearFrame();    

    Corridor.render()

    Vertex.render()

}

setInterval(frame, 50);