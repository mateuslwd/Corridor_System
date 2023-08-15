import * as D from './draw.js';
import * as M from './calc.js';

import {Corridor, corridors, corridorGhost} from './rect_draw.js';

function frame(){

    D.clearFrame();    

    corridorGhost.render();

    for(let i = 0; i < corridors.length; i++){

        corridors[i].render();

    }

}

setInterval(frame, 50);