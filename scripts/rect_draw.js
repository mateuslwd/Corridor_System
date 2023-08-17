import * as M from './calc.js';
import * as D from './draw.js';
import {ferramenta} from './setup.js';
import { Vertex } from './rect_vertex.js';

export var corridors = [];

//Elemento para a pré visualização do corredor
var corridorGhost = {
    //posições iniciais e finais do corredor
    clicks: undefined,
    //Posição atual do mouse
    temp: new M.vector2('zero'),
    //Tamanho atual do corredor em relação ao mouse
    size: {
        w: 0,
        h: 0
    },
    //Desenha o corredor
    render: ()=>{
        //Se ja tiver clicado a primeira vez
        if(corridorGhost.clicks != undefined){
            D.rect(
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

        this.direction = this.size.w > this.size.h ? 'horizontal' : 'vertical';

        this.color = 'black';

    }

    render(){
        D.rect(this.color, this.size)        
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

    static render(){

        corridorGhost.render();

        for(let i = 0; i < corridors.length; i++){

            corridors[i].render();

        }

    }

}

//TEMPORARIO APENAS TESTE
corridors.push(new Corridor(new M.vector2(50, 50), new  M.vector2(150, 300)))
corridors.push(new Corridor(new M.vector2(150, 150), new M.vector2(500, 250)))
corridors.push(new Corridor(new M.vector2(300, 10), new M.vector2(400, 150)))
corridors.push(new Corridor(new M.vector2(150, 100), new M.vector2(300, 140)))
Vertex.atualizaVerticies();

document.addEventListener('mousedown', (e)=>{
    
    if(ferramenta == 'none'){
        
        let index = Corridor.findCorridor(new M.vector2(e.clientX, e.clientY));

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
            corridorGhost.clicks.push(new M.vector2(e.clientX, e.clientY))
            //Para o codigo
            return
        }

        //No segundo clique
        //Guarda a posição do segundo clique
        corridorGhost.clicks.push(new M.vector2(e.clientX, e.clientY))

        //O primeiro clique tem que ser o mais perto de zero

        if(corridorGhost.clicks[0].x > corridorGhost.clicks[1].x){

            let temp = corridorGhost.clicks[0].x

            corridorGhost.clicks[0].x = corridorGhost.clicks[1].x
            corridorGhost.clicks[1].x = temp

        }

        if(corridorGhost.clicks[0].y > corridorGhost.clicks[1].y){

            let temp = corridorGhost.clicks[0].y

            corridorGhost.clicks[0].y = corridorGhost.clicks[1].y
            corridorGhost.clicks[1].y = temp

        }

        corridors.push(new Corridor(corridorGhost.clicks[0], corridorGhost.clicks[1]))
    
        //Reseta o contador de cliques
        corridorGhost.clicks = undefined
        corridorGhost.temp = new M.vector2('zero')
        corridorGhost.size.w = 0
        corridorGhost.size.h = 0
    
        //Atualiza lista de pontos
        Vertex.atualizaVerticies()

    }
    
})

document.addEventListener('mousemove', (e)=>{

    //Se a ferramenta de criação de corredores estiver selecionada
    if(ferramenta == "corridorCreator"){
        //Se o primeiro clique ja tiver acontecido
        if(corridorGhost.clicks != undefined){
            
            //Atualiza a posição de onde será criado o corredor
            corridorGhost.temp = new M.vector2(e.clientX, e.clientY)

        }
    }

})