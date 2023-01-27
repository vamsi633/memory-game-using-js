const tilesContainer=document.querySelector(".tiles");
const colors=["aqua","aquamarine","crimson","blue","dodgerblue","gold","greenyellow","teal"];
const colorsPickList=[...colors,...colors];
const tileCount=colorsPickList.length;


function buildTile(color){
    const element=document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color",color);
    element.setAttribute("data-revealed","false");



    element.addEventListener("click",()=>{

        const revealed=element.getAttribute("data-revealed");


        if(awaitingEndOfMove || revealed===true || element===activeTile){
            return;
        }

        element.style.backgroundColor=color;

        if(!activeTile){
            activeTile=element;
            
            return;
        }

        const colorToMatch=activeTile.getAttribute("data-color");

        if(colorToMatch==color){

            activeTile.setAttribute("data-revealed","true");
            element.setAttribute("data-revealed","true");

            awaitingEndOfMove=false;
            activeTile=null;
            revealedCount+=2;


            if(revealedCount==tileCount){
                alert("You win Refresh to play again");
            }

            return;
        }

        awaitingEndOfMove=true;

        setTimeout(()=>{
            element.style.backgroundColor=null;
            activeTile.style.backgroundColor=null;

            awaitingEndOfMove=false;
            activeTile=null;
        },1000);
    });

    return element;
    
}
//game state
let revealedCount=0;
let activeTile=null;
let awaitingEndOfMove=false; //this is waiting for tails to reverse after user gussed it wrong

for(let i=0;i<tileCount;i++){
    const randomIndex=Math.floor(Math.random()*colorsPickList.length);
    const color=colorsPickList[randomIndex];

    const tile=buildTile(color);

    colorsPickList.splice(randomIndex,1); //if we do this the color will in that index will not be available to pick in the next loop i value . so we can avoid a color coming more than 2 time. 2 times is possible because array has eacg color stored 2 times with different indexes.

    tilesContainer.appendChild(tile);
}


