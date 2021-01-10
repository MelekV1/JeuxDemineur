document.addEventListener('DOMContentLoaded',()=>{
  const grid = document.querySelector('.grid');
  let width = 10;
  let squares = []
  let bombAmount = 20;
  let isGameOver = false;
  let flags=0
  //create Board
  function createBoard(){
    //get shuffled game array with random bombsArray
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width*width - bombAmount).fill('valid')
    const gameArray= emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort( ()=>Math.random()-0.5)

    for(let i = 0 ; i< width*width ; i++){
      const square = document.createElement('div')
      square.setAttribute('id',i)
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      //normalclick
      square.addEventListener('click',function(e){
        click(square)
      })
      //rightclick
      square.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(square)
      }
    }

    //add numbers to the board
    for (let i = 0; i < squares.length; i++) {
      let total=0
      const isLefty  = (i%width ===0)
      const isRighty = (i%width ===width - 1)

      if(squares[i].classList.contains('valid')){
        //Bomb can be :
        //UpRight
        if( i > 9 && !isRighty && squares[i +1 -width].classList.contains('bomb')) total ++
        //Up
        if (i > 9 && squares[i -width].classList.contains('bomb')) total ++
        //UpLeft
        if (i > 9 && !isLefty && squares[i -1 -width].classList.contains('bomb')) total ++
        //Left
        if (i > 0 && !isLefty && squares[i -1].classList.contains('bomb')) total ++
        //DownRight
        if (i < 89 && !isRighty && squares[i +1 +width].classList.contains('bomb')) total ++
        //Down
        if (i < 90 && squares[i +width].classList.contains('bomb')) total ++
        //DownLeft
        if (i < 89 && !isLefty && squares[i -1 +width].classList.contains('bomb')) total ++
        //Right
        if (i < 99 && !isRighty && squares[i +1].classList.contains('bomb')) total ++

        squares[i].setAttribute('data',total)
        //console.log(squares[i])
      }
    }

  }

  createBoard();
  //add flags
  function addFlag(square){
    if(isGameOver)return
    if(!square.classList.contains('checked') && (flags< bombAmount) ){
      if(!square.classList.contains('flag')){
        square.classList.add('flag')
        square.innerHTML = ' 🚩'
        flags ++
        checkForWin()
      }else{
        square.classList.remove('flag')
        square.innerHTML = ''
        flags --
      }
    }
  }


  //Click square function
  function click(square){
    let currentId = square.id
    if (isGameOver) return
    if(square.classList.contains('checked') || square.classList.contains('flag') ) return
    //click on a bomb
    if(square.classList.contains('bomb')){
      GameOver(square)
      return
    }else{
      //click on Valid grid
      let total = square.getAttribute('data')
      if(total !=0){
        square.classList.add('checked')
        square.innerHTML = total
        return
      }
      checkSquare(square,currentId)
    }
    square.classList.add('checked')
  }
  //checking the neighboring squares
  function checkSquare(square ,currentId){
    const isLefty = (currentId % width ===0 )
    const isRighty = (currentId%width === width -1)
    setTimeout( ()=>{
      if(currentId >0 && !isLefty){
        const newId = squares[parseInt(currentId) -1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if(currentId >9 && !isRighty){
        const newId = squares[parseInt(currentId) +1 - width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if(currentId >9){
        const newId = squares[parseInt(currentId) -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if(currentId > 9 && !isLefty){
        const newId = squares[parseInt(currentId) -width-1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if(currentId <90 ){
        const newId = squares[parseInt(currentId) + width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if(currentId <99 && !isRighty){
        const newId = squares[parseInt(currentId)+1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if(currentId <88 && !isRighty){
        const newId = squares[parseInt(currentId) +width+1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if(currentId <98 && !isLefty){
        const newId = squares[parseInt(currentId) +width -1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    },10)

  }
  //Game OVer notif
  function GameOver(square){
    console.log("Boom ! GameOver")
    isGameOver = true

    //show ALL the bombs
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '💣'
      }
    })

  }

  //check for win
  function checkForWin() {
    ///simplified win argument
  let matches = 0

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches ++
      }
      if (matches === bombAmount) {
        result.innerHTML = 'YOU WIN!'
        isGameOver = true
      }
    }
  }


})
