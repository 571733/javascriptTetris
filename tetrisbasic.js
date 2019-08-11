let canvas;
let ctx;
let gameBoardArrayHeight = 20;
let gameBoardArrayWidth = 12;
let score = 0;
let level = 1;
let winOrLoose = "Playing";
let tetrisLogo;
let startX = 4;
let startY = 0;
let coordinateArray = [...Array(gameBoardArrayHeight)].map(e => Array(gameBoardArrayWidth).fill(0));
let currentTetromino = [[1,0], [0,1], [1,1], [2,1]];

let tetrominos = [];
let tetrominoColors = ['purple', 'cyan', 'blue', 'orange', 'green', 'red'];

let curTetrominoColor;
let gameBoardArray = [...Array(gameBoardArrayHeight)].map(e => Array(gameBoardArrayWidth).fill(0));

let stoppedShapeArray = [...Array(gameBoardArrayHeight)].map(e => Array(gameBoardArrayWidth).fill(0));

let DIRECTON = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};
let direction;

class Coordinates{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

document.addEventListener('DOMContentLoaded', SetupCanvas);

function CreateCoordArray(){
    let i = 0, j = 0;
    for(let y = 9; y <= 446; y +=23){
        for(let x = 11; x <= 264; x += 23){
            coordinateArray[i][j] = new Coordinates(x,y);
            i++;
        }
        j++;
        i = 0;
    }
}

function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 936;
    canvas.height = 956;

    ctx.scale(2,2);

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(8, 8, 280, 462);

tetrisLogo = new Image(161, 54);
tetrisLogo.onload = DrawTetrisLogo;
tetrisLogo.src = "tetrislogo.jpg";

ctx.fillStyle = 'black';
ctx.font = '21px Arial';

ctx.fillText("SCORE", 300, 98);
ctx.strokeRect(300, 107, 161, 24);
ctx.fillText(score.toString(), 310, 127);

ctx.fillText("LEVEL", 300, 157);
ctx.strokeRect(300, 171, 161, 24);
ctx.fillText(level.toString(), 310, 190);

ctx.fillText("WIN / Loose", 300, 221);
ctx.fillText(winOrLoose, 310, 261);
ctx.strokeRect(300, 232, 161, 95);

ctx.fillText("CONTROLS", 300, 354);
ctx.strokeRect(300, 366, 161, 104);
ctx.font = '19px Arial';
ctx.fillText("A: Move left", 310, 388);
ctx.fillText("D: Move right", 310, 413);
ctx.fillText("S: Move down", 310, 438);
ctx.fillText("E: Rotate Right", 310, 463);


    document.addEventListener('keydown', HandleKeyPress);
    CreateTetrominos();
    CreateTetromino();

    CreateCoordArray();
    DrawTetromino();
}

function DrawTetrisLogo(){
    ctx.drawImage(tetrisLogo, 300, 8, 161, 54);
}


function DrawTetromino(){
    for (let i = 0; i< currentTetromino.length; i++){
        let x = currentTetromino[i][0] + startX;
        let y = currentTetromino[i][1] + startY;
        gameBoardArray[x][y] = 1;
        let coorX =coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = curTetrominoColor;
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}
function HandleKeyPress(key){
    if (key.keyCode === 65){
        direction = DIRECTON.LEFT;
        if (!hittingTheWall()){
            DeleteTetromino();
            startX--;
            DrawTetromino(); 
        }
        
    }else if(key.keyCode === 68){
        direction = DIRECTON.RIGHT;
        if (!hittingTheWall()){
        DeleteTetromino();
        startX++;
        DrawTetromino();
        }
    }else if(key.keyCode === 83){
        MoveTetrominoDown();

    }
}

function MoveTetrominoDown(){
    direction = DIRECTON.DOWN;
    if(!CheckForVerticalCollision){
        DeleteTetromino();
        startY++;
        DrawTetromino();
    }
}

function DeleteTetromino(){
    for(let i = 0; i<currentTetromino.length; i++){
        let x = currentTetromino[i][0] + startX;
        let y = currentTetromino[i][1] + startY;
        gameBoardArray[x][y] = 0;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = 'white';
        ctx.fillRect(coorX, coorY, 21, 21);

    }
}

function CreateTetrominos(){
    tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
    tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);
    tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
    tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);
    tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
    tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);
    tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
}

function CreateTetromino(){
    let randomTetromino = Math.floor(Math.random() * tetrominos.length);
    currentTetromino = tetrominos[randomTetromino];
    curTetrominoColor = tetrominoColors[randomTetromino];
}

function hittingTheWall(){
    for (let i = 0; i< currentTetromino.length; i++){
        let newX = currentTetromino[i][0] + startX;
        if (newX <=0 && direction === DIRECTON.LEFT){
            return true;
        }
     else if (newX >=11 && direction === DIRECTON.RIGHT){
         return true;
     }
} return false;
}

