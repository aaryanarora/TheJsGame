document.addEventListener('DOMContentLoaded',()=>{

const grid = document.querySelector('.grid');
const width = 8;
const squares = [];
let score = 0;
let scoreDisplay = document.getElementById('score');
const candyColors = [

    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
]

//Creating the Board
function createBoard(){

    for(let i = 0; i< width*width;i++) {

        const square = document.createElement('div');
        square.setAttribute('draggable',true);
        square.setAttribute('id',i);
        let randomColor = Math.floor(Math.random() * candyColors.length);
        square.style.backgroundColor = candyColors[randomColor];
        grid.appendChild(square);
        squares.push(square);
    }


}
createBoard();


//Dragging Part

let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;
squares.forEach(square => square.addEventListener('dragstart',dragStart));
squares.forEach(square => square.addEventListener('dragend',dragEnd));
squares.forEach(square => square.addEventListener('dragover',dragOver));
squares.forEach(square => square.addEventListener('dragenter',dragEnter));
squares.forEach(square => square.addEventListener('dragleave',dragLeave));
squares.forEach(square => square.addEventListener('drop',dragDrop));

function blank()
{
    for(let i =0 ;i<width*width;i++)
    {
        if(squares[i].style.backgroundColor === 'white')
        {
            squares[i].setAttribute('draggable',false);
        }
        else
        {
            squares[i].setAttribute('draggable',true);
        }
    }
}

function dragStart(){
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
}

function dragOver(e){
    
    e.preventDefault();
}

function dragEnter(e){

    e.preventDefault();
    
}

function dragLeave(){
    
}
function dragDrop(){

    colorBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    
}
function dragEnd(){
    
    //valdating to only adjacent moves

    let validMoves = [

        squareIdBeingDragged -1,    // left one
        squareIdBeingDragged -width, //top one (as width here is 8)
        squareIdBeingDragged +1, //right one
        squareIdBeingDragged +width //bottom one (as width here is 8)
    ]

    let validMove = validMoves.includes(squareIdBeingReplaced); //if where put is valid store true

    if(squareIdBeingReplaced && validMove)
    {
        squareIdBeingReplaced = null;
    }
    else if(squareIdBeingReplaced && !validMove)
    {
        //Dont swap color i.e they get back original colours
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
    else 
    {
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
}

//drop boxes 
function moveDown(){

    for(i = 0;i < 55;i++)//as start from 2nd row as dropping down so 
    {
        if(squares[i + width].style.backgroundColor === 'white')
        {
            squares[i+width].style.backgroundColor = squares[i].style.backgroundColor;//replace by above ones
            squares[i].style.backgroundColor = 'white'; // make above ones blank

            // const firstRow = [0,1,2,3,4,5,6,7];
            // const isFirstRow = firstRow.includes(i); // returns true if first row
            // if(isFirstRow && squares[i].style.backgroundColor === 'white')
            // {
            //     let randomColor = Math.floor(Math.random() * candyColors.length)
            //     squares[i].style.backgroundColor = candyColors[randomColor];//give random colour to blank spaces
            // }
        }
    }
}




//Matching boxes when same

//checking for 4 

function checkRowForFour(){

    for(i = 0;i<60;i++){
    
        let rowOfFour = [i, i+1, i+2,i+3]
        let decidedColor = squares[i].style.backgroundColor; //The matching color
        const isBlank = squares[i].style.backgroundColor === 'white'//for blank colors ie aleady matched
    
        const notValid = [5,6,7,13,14,15,21,22,29,30,31,37,38,39,45,46,47,53,54,55]; // remove the adjacent row matching with 2 columns (edge problem)
        if(notValid.includes(i)) continue;
        if(rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank))
        {
            score += 4;
            scoreDisplay.innerHTML = score;
            
            rowOfFour.forEach(index => {
               
                squares[index].style.backgroundColor = 'white' //if matched make them blank
            })
        }
    }
    }
    
    checkRowForFour();
    
    function checkColumnForFour(){
    
        for(i = 0;i<39;i++){
        
            let columnOfFour = [i, i+width, i+width*2, i+width*3];
            let decidedColor = squares[i].style.backgroundColor; //The matching color
            const isBlank = squares[i].style.backgroundColor === 'white'//for blank colors ie aleady matched
        
            if(columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank))
            {
                score += 4;
                scoreDisplay.innerHTML = score;
                columnOfFour.forEach(index => {
                    
                    squares[index].style.backgroundColor = 'white' //if matched make them blank
                })
            }
        }
        }
        
        checkColumnForFour();

//checking for 3

function checkRowForThree(){

for(i = 0;i<61;i++){

    let rowOfThree = [i, i+1, i+2]
    let decidedColor = squares[i].style.backgroundColor; //The matching color
    const isBlank = squares[i].style.backgroundColor === 'white'//for blank colors ie aleady matched

    const notValid = [6,7,14,15,22,30,31,38,39,46,47,54,55]; // remove the adjacent row matching with 2 columns (edge problem)
    if(notValid.includes(i)) continue;
    if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank))
    {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach(index => {
            
            squares[index].style.backgroundColor = 'white' //if matched make them blank
        })
    }
}
}

checkRowForThree();

function checkColumnForThree(){

    for(i = 0;i<47;i++){
    
        let columnOfThree = [i, i+width, i+width*2];
        let decidedColor = squares[i].style.backgroundColor; //The matching color
        const isBlank = squares[i].style.backgroundColor === 'white'//for blank colors ie aleady matched
    
        if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank))
        {
            score += 3;
            scoreDisplay.innerHTML = score;
            columnOfThree.forEach(index => {
                
                squares[index].style.backgroundColor = 'white' //if matched make them blank
            })
        }
    }
    }
    
    checkColumnForThree();
window.setInterval(function(){ //to keep running every 100 mili sec
    blank();
    checkRowForThree();   
    checkColumnForThree();
    checkRowForFour();
    checkColumnForFour();
    moveDown();

},100);

})