import * as M from './calc.js';
import * as D from './draw.js';
import {ferramenta} from './setup.js';

export var corridors = [];

//Elemento para a pré visualização do corredor
export var corridorGhost = {
    //posições iniciais e finais do corredor
    clicks: undefined,
    //Posição atual do mouse
    temp: M.vector2('zero'),
    //Tamanho atual do corredor em relação ao mouse
    size: {
        w: 0,
        h: 0
    },
    //Desenha o corredor
    render: ()=>{
        //Se ja tiver clicado a primeira vez
        if(corridorGhost.clicks != undefined){
            D.drawRect(
                'rgb(170, 170, 170)',
                corridorGhost.clicks[0].x,
                corridorGhost.clicks[0].y,
                corridorGhost.temp.x - corridorGhost.clicks[0].x,
                corridorGhost.temp.y - corridorGhost.clicks[0].y
            )
        }
    }
};

export class Corridor{

    constructor(start, end){

        this.start = start;
        this.end = end;

        this.size = {
            x: this.start.x,
            y: this.start.y,
            w: this.end.x - this.start.x,
            h: this.end.y - this.start.y
        }

        this.color = 'black';

    }

    render(){
        D.drawRect(this.color, this.size)        
    }

    static random(){
        corridors.push(new Corridor(M.vector2("random"), M.vector2("random")))
    }

    static findCorridor(point){

        //Itera sob todos os corredores existentes
        for(let i = 0; i < corridors.length; i++){

            //teste de colisão
            if(M.collision('point_rect', point, corridors[i].size)){
                return i
            }


        }

        return undefined

    }

}


document.addEventListener('mousedown', (e)=>{
    
    if(ferramenta == 'none'){
        
        let index = Corridor.findCorridor(M.vector2(e.clientX, e.clientY));

        if(index != undefined){

            corridors[index].color = 'red'

        } else {

            console.log('Nenhum corredor nesta posição.')

        }

    }

})



document.addEventListener('mousedown', (e)=>{

    //Se a ferramenta de criação de retangulos estiver selecionada
    if(ferramenta == "corridorCreator"){
        //No primeiro clique
        if(corridorGhost.clicks == undefined){
            //Inicia 
            corridorGhost.clicks = [];
            //Guarda o local do primeiro clique
            corridorGhost.clicks.push(M.vector2(e.clientX, e.clientY))
            //Para o codigo
            return
        }

        //No segundo clique
        //Guarda a posição do segundo clique
        corridorGhost.clicks.push(M.vector2(e.clientX, e.clientY))
        
        //Ordena os verticies para poder calcular as colisões futuramente

        //Se o X do primeiro for maior que o X do segundo
        if(corridorGhost.clicks[0].x > corridorGhost.clicks[1].x){
            
            let temp = corridorGhost.clicks[0].x

            corridorGhost.clicks[0].x = corridorGhost.clicks[1].x
            corridorGhost.clicks[1].x = temp
        
        }

        //Se o Y do primeiro for maior que o Y do segundo
        if(corridorGhost.clicks[0].y > corridorGhost.clicks[1].y){
            
            let temp = corridorGhost.clicks[0].y

            corridorGhost.clicks[0].y = corridorGhost.clicks[1].y
            corridorGhost.clicks[1].y = temp
        
        }

        corridors.push(new Corridor(corridorGhost.clicks[0], corridorGhost.clicks[1]))
    
        //Reseta o contador de cliques
        corridorGhost.clicks = undefined
        corridorGhost.temp = M.vector2('zero')
        corridorGhost.size.w = 0
        corridorGhost.size.h = 0
    
    }
    
})

document.addEventListener('mousemove', (e)=>{

    //Se a ferramenta de criação de corredores estiver selecionada
    if(ferramenta == "corridorCreator"){
        //Se o primeiro clique ja tiver acontecido
        if(corridorGhost.clicks != undefined){
            
            //Atualiza a posição de onde será criado o corredor
            corridorGhost.temp = M.vector2(e.clientX, e.clientY)

        }
    }

})