var gameOfLife = {
  width: 12,
  height: 12,
  stepInterval: null,

  createAndShowBoard: function () {
    // create <table> element


    var goltable = document.createElement("tbody");

    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);

    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  newBoard: function () {
    clearInterval(gameOfLife.stepInterval);
    var elements = document.getElementsByTagName('td');

    for(var i = 0; i < elements.length; i++){
      elements[i].setAttribute('data-status', 'dead');
      elements[i].className = 'dead';
    }
  },

  randomGenerator: function () {
    gameOfLife.newBoard();
    clearInterval(gameOfLife.stepInterval);
    var elements = document.getElementsByTagName('td');
    var arr = ['dead','alive'];
    var aliveSquares = Math.ceil(elements.length * .2);
    for(var i = 0; i < aliveSquares; i++){
      var aliveCell = Math.ceil(Math.random()*elements.length);
      elements[aliveCell].setAttribute('data-status', 'alive');
      elements[aliveCell].className = 'alive';
    }
  },

  setupBoardEvents: function() {

    var onCellClick = function () {

      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };

    var elements = document.getElementsByTagName('td');

    for(var i = 0; i < elements.length; i++){
      elements[i].onclick = onCellClick;
    }


  },



  step: function () {


    var elements = document.getElementsByTagName('td');

    var newElementsArray = checkNeighborStatus(elements);


    function deadAliveNeighbors(element){
      var deadCount = 0
      var aliveCount = 0;
      var currInd = element.id.split("-");
      for(var row = -1; row < 2; row ++){
        for(var col = -1; col < 2; col ++){
          if (row === 0 && col === 0) {
            continue;
          }
          var row1 = parseInt(currInd[0]) + row;
          var col1 = parseInt(currInd[1]) + col;
          var idStr = (row1) + "-" + (col1);
          currNeighbor = document.getElementById(idStr);
          if (!currNeighbor) {
            continue;
          }
          var neighborStatus = currNeighbor.getAttribute('data-status');
          if (neighborStatus === 'dead') {
            deadCount += 1;
          }
          else {
            aliveCount += 1;
          }
        }
      }
      var totalStatusCount = [aliveCount, deadCount];
      return totalStatusCount;
    }

    function checkNeighborStatus(){
      var nextStatus = [];
      for(var i = 0; i < elements.length; i++){

        var whatever = deadAliveNeighbors(elements[i]);
        if(elements[i].getAttribute('data-status') === 'dead'){
          if (whatever[0] === 3) {
            nextStatus.push('alive');
          }
          else {
            nextStatus.push('dead');
          }
        }
        else {
          if (whatever[0] === 2 || whatever[0] === 3) {
            nextStatus.push('alive');
          }
          else if (whatever[0] < 2) {
            nextStatus.push('dead');
          }
          else {
            nextStatus.push('dead');
          }
          nextStatus;
        }
      }
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('data-status', nextStatus[i]);
        elements[i].className = nextStatus[i];
      }
    }
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game.
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors

  },

  
  enableAutoPlay: function () {
    gameOfLife.stepInterval = setInterval(gameOfLife.step, 200);

  }

};

  var stepButton = document.getElementById('step_btn')
  var clearButton = document.getElementById('clear_btn')
  var playButton = document.getElementById('play_btn')
  var randomButton = document.getElementById('reset_btn')

  playButton.addEventListener('click', gameOfLife.enableAutoPlay);
  stepButton.addEventListener('click', gameOfLife.step)
  clearButton.addEventListener('click', gameOfLife.newBoard)
  randomButton.addEventListener('click', gameOfLife.randomGenerator)
  gameOfLife.createAndShowBoard();
