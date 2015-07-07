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
  var totalSolutions = 0;

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
                totalSolutions++;
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
  console.log("Found " + totalSolutions + " solutions...only returning 1");
  solution = solutionMatrix;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  
  var rookTree = generateRooksTree(n);
  // console.log(rookTree);

  var traverse = function(tree){
    if(tree.children.length > 0){
      for(var i = 0; i<tree.children.length; i++){
        traverse(tree.children[i]);
      }
    } else {
      solutionCount++;
    }
  }
  traverse(rookTree);
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


window.generateRooksTree = function(n){
  var Tree = function(value, colArray){
    var newTree = {};
    newTree.value = value;
    newTree.colArray = colArray;
    newTree.children = [];
    
    return newTree;
  }

  var buildTree = function(tree){
    if(tree.children.length !== 0){
      for(var i=0;i<tree.children.length;i++){
        buildTree(tree.children[i]);
      }
    }else{
      //
      for(var i=0;i<tree.colArray.length;i++){
        var newColArray = tree.colArray.slice(0);
        newColArray.splice(i, 1);
        var newChild = Tree(tree.colArray[i], newColArray);
        tree.children.push(newChild);
      }
    }
  }

  var colArray = [];
  for(var i=0;i<n;i++){
    colArray.push(i);
  }
  var rookTree = Tree(null, colArray);
  for(var i=0;i<n;i++){
    buildTree(rookTree);
  }

  return rookTree;
}
