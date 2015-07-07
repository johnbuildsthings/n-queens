/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n, startTuple) {
  var solution = undefined; //fixme
  // make new empty board of size n
    // create place piece function to place peices on board
      // loop through matrix to find empty place
      // place piece if space is empty
      // run col and row conflict checks
        // if tests pass 
        // if piece placed is === to n solution found
        // otherwise recursive call to place pieces function with updated board 

  var board = new Board({n:n});
  
  var placedPieces = 0;
  var solutionMatrix;

  var placePiece = function(board, firstPlacement){
    var rows = board.rows();
    if(firstPlacement){
      board.togglePiece(startTuple[0], startTuple[1]);
      placedPieces++;
      if(placedPieces === n){
        solutionMatrix = board.rows();
      }else{
        placePiece(board, false);
      }
    }else{
      for(var i = 0; i < rows.length; i++){
        for(var x = 0; x < rows.length; x++){
          if(rows[i][x] !== 1){
            board.togglePiece(i,x);
            if(!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()){
              placedPieces++;
              if(placedPieces === n){
                solutionMatrix = board.rows();
              } else{
                placePiece(board, false);
              }
            } else{
              board.togglePiece(i, x);
            }
            
          }
        }
      }
    }

  };
  if(startTuple !== undefined){
    placePiece(board, true);
  }else{
    placePiece(board, false);
  }
  solution = solutionMatrix;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutions = [];
  for(var i=0;i<n;i++){
    for(var y=0;y<n;y++){
      var solution = findNRooksSolution(n, [i,y]);
      if(solution !== undefined){

        var solutionFound = false;
        var flattened = solution.reduce(function(a, b) {
          return a.concat(b);
        });
        flattened = flattened.join('');

        for(var j=0;j<solutions.length;j++){        
          if(flattened === solutions[j]){
            solutionFound = true;
          }
        }
        if(!solutionFound){
          solutions.push(flattened);
          solutionCount++;
        }
        
      }
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
