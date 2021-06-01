const cells = document.querySelectorAll('.cell')
const resetBtn = document.getElementById('btn')
const player = document.querySelector('.players-turn')
const currentGame = document.querySelector('.current-game')
const endGameContainer = document.querySelector('.end-game')
const endGameMsg = document.querySelector('.end-game-msg')
const newGameBtn = document.getElementById('new-game-btn')

let gamestate = ['','','','','','','','','']

let currentPlayer = 'X'

const changePlayer = () => {
    if (currentPlayer === 'X'){
        currentPlayer = 'O'
    }else if (currentPlayer === 'O'){
        currentPlayer = 'X'
    }

    Player()
    
}

const handleCellClick = (event,index) => {
    const clickedCell = event.target;
    clickedCellIndex = index
    
    if (gamestate[clickedCellIndex]!=='') {
        console.log('nope')
        return;
    }
    
    
    handlePlayedCell(clickedCell, clickedCellIndex)

}

const handlePlayedCell = (clickedCell,clickedCellIndex)  => {
    gamestate[clickedCell] = currentPlayer;
    gamestate[clickedCellIndex]=currentPlayer
    clickedCell.textContent = currentPlayer;
    
    

    
    resultCheck()
    changePlayer()

   console.log(gamestate)
}


const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const resultCheck = () => {
    let gameWon = false;
    for (let i = 0; i<=7; i++) {
        const winningCondition = winningConditions[i];
        let a = gamestate[winningCondition[0]];
        let b = gamestate[winningCondition[1]];
        let c = gamestate[winningCondition[2]];

        if (a === ''|| b == ''|| c===''){
            continue;
        }
        if ( a ===b && b === c) {
            gameWon = true;
            break
        }

    }


   

    if (gameWon) {
        endGameContainer.hidden = false
        endGameMsg.textContent = `Congratulations, player ${currentPlayer} won!`
        currentGame.hidden = true
        return
    }else if (!gameWon && !gamestate.includes('')) {
        endGameContainer.hidden = false
        endGameMsg.textContent = `It's a tie! try again`
        currentGame.hidden = true
        return
    }
}



const Player = () =>{
    player.textContent = `Player ${currentPlayer}'s turn`
}




const newGame = () => {

    gamestate = ['','','','','','','','','']
    cells.forEach((cell)=>{
        cell.textContent = '';
    })
    currentPlayer = 'X'
    endGameContainer.hidden = true;
    currentGame.hidden = false
    Player()
}

newGame()



cells.forEach((cell,index)=>{
    cell.addEventListener('click',()=>handleCellClick(event,index))
})
resetBtn.addEventListener('click',newGame)
newGameBtn.addEventListener('click',newGame)