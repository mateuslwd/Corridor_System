import * as D from './draw.js';
import * as M from './calc.js';

import {Corridor} from './rect_draw.js';
import {Vertex, vertex, Point} from './rect_vertex.js';
import { Path, paths } from './a_star.js';

paths.push(new Path(new M.vector2(20, 20), new M.vector2(600, 200)))

function frame(){

    D.clearFrame();    

    Corridor.render()   
    Vertex.render()

    Path.render()

}

setInterval(frame, 50);