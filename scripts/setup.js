export const CANVAS = document.getElementById('canvas')
export const C = CANVAS.getContext('2d')

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight * .8;


export var ferramenta = 'corridorCreator';



document.addEventListener('keypress', (e)=>{

    switch(e.key){

        case 'q':
            ferramenta = 'corridorCreator';
            console.log('Ferramenta de criação de corredores selecionada.')
            break
        case 'w':
            ferramenta = 'none';
            console.log('Todas as ferramentas de-selecionadas.')
            break

    }

})