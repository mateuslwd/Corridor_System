import {changeTool} from '../scripts/setup.js';

var bar = document.getElementById('ferramentas')

function de_selectAll(){

    for (let child of bar.children) {
        child.classList.remove('t_selected')
    }

}

function select(tool,  element){

    //Se ja estiver selecionada, de-seleciona
    if(element.target.classList.contains('t_selected')){
    
        element.target.classList.remove('t_selected')
        changeTool(undefined)
        return

    }

    //se não de-seleciona todos e seleciona a atual
    de_selectAll()

    element.target.classList.add('t_selected')

    changeTool(tool)

}

for(let i = 0; i < 5; i++){

    let element = document.createElement('li')

    //Adiciona a classe button
    element.classList.add('button')
    element.id = i
    
    //Comportamente para mouse entra
    element.addEventListener('mouseenter', (e)=>{
        
        let last_index = parseInt(e.target.id) - 1;

        //checa se existe um elemento anterior
        if(last_index >= 0){
            bar.children[last_index].classList.add('t_semi-hover')
        }

        e.target.classList.add('t_hover')  

        let next_index = parseInt(e.target.id) + 1;

        //checa se existe um proximo elemnto
        if(next_index < bar.children.length){
            bar.children[next_index].classList.add('t_semi-hover')
        }

    })

    //Comportamento mouse sai
    element.addEventListener('mouseleave', (e)=>{

        let last_index = parseInt(e.target.id) - 1;

        //checa se existe um elemento anterior
        if(last_index >= 0){
            bar.children[last_index].classList.remove('t_semi-hover')
        }

        e.target.classList.remove('t_hover')  

        let next_index = parseInt(e.target.id) + 1;

        //checa se existe um proximo elemnto
        if(next_index < bar.children.length){
            bar.children[next_index].classList.remove('t_semi-hover')
        }

    })

    //Comportamento quando clicar
    switch(i){

        case 0: //corredores
            element.addEventListener('mousedown', (e)=>{

                select('corridorCreator', e);

            })
            break
        case 1: //Caminhos
            element.addEventListener('mousedown', (e)=>{

                select('path', e);

            })
            break

    }

    bar.appendChild(element)

}