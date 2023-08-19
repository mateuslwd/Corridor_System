export const CANVAS = document.getElementById('canvas')
export const C = CANVAS.getContext('2d')

CANVAS.width = window.innerWidth
CANVAS.height = window.innerHeight

var bG = CANVAS.getBoundingClientRect();

export function mouseCanvasPosition(e){

    let offSetX = bG.left;
    let offSetY = bG.top;

    let canvasX = e.clientX - offSetX;
    let canvasY = e.clientY - offSetY;

    let canvasWidth = CANVAS.width;
    let canvasHeight = CANVAS.height;

    let canvasSizeX = (canvasX / bG.width) * canvasWidth
    let canvasSizeY = (canvasY / bG.height) * canvasHeight

    return [canvasSizeX, canvasSizeY]

}

//console.log(CANVAS.offsetHeight)
export function changeTool(tool){
    ferramenta = tool
}

export var ferramenta = undefined;