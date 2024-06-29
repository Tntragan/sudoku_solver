class SudokuSolver {

  validate(puzzleString) {
    if (!puzzleString) {
      return "Required field missing";
    }
    if (puzzleString.length != 81) {
      return "Expected puzzle to be 81 characters long";
    }
    if (/[^1-9\.]/g.test(puzzleString)) {
      return "Invalid characters in puzzle";
    }
    const board = this.stringToBoard(puzzleString);
    const solvedBoard = this.solveSudoku(board);
    if (!solvedBoard) {
      return "Puzzle cannot be solved";
    }
    return "valid";
  }

  validateCoordinate(puzzleString, coordinate, num) {
    if (!puzzleString || !coordinate || !num) {
      return "Required field(s) missing";
    }
    if (!/[a-zA-Z]+/g.test(coordinate) || !/[0-9]+/g.test(coordinate)) {
      return "Invalid coordinate";
    }
    const row = coordinate.match((/[a-zA-Z]+/g))[0];
    const column = coordinate.match(/[0-9]+/g)[0];
    if (coordinate.length !== 2 || row.length !== 1 || column.length !== 1) {
      return "Invalid coordinate";
    }
    if (!/[a-iA-I]/g.test(row) || column == 0) {
      return "Invalid coordinate";
    }
    if (/[^1-9\.]/g.test(puzzleString)) {
      return "Invalid characters in puzzle";
    }
    if (puzzleString.length != 81) {
      return "Expected puzzle to be 81 characters long";
    }
    if (!/[1-9]/.test(num) || num.length != 1) {  // num < 1 || num > 9
      return "Invalid value";
    }
    const board = this.stringToBoard(puzzleString);
    const solvedBoard = this.solveSudoku(board);
    if (!solvedBoard) {
      return "Puzzle cannot be solved";
    }
    return "valid";
  }

  checkPlacement(puzzleString, coordinate, value) {
    const row = coordinate.match(/[a-zA-Z]/g)[0] //.toUpperCase().replace(/[A-Z]/g, m => m.charCodeAt() - 65);
    const column = (coordinate.match(/[1-9]/g)[0]); // - 1
    const checkRow = this.checkRowPlacement(puzzleString, row, column, value);
    const checkCol = this.checkColPlacement(puzzleString, row, column, value);
    const checkRegion = this.checkRegionPlacement(puzzleString, row, column, value);
    if (checkRow && checkCol && checkRegion) {
      return true;
    }
    return false;
  }

  checkBadLocation(puzzleString, coordinate, value) {
    const row = coordinate.match(/[a-zA-Z]/g)[0] //.toUpperCase().replace(/[A-Z]/g, m => m.charCodeAt() - 65);
    const column = (coordinate.match(/[1-9]/g)[0]); // - 1
    const checkRow = this.checkRowPlacement(puzzleString, row, column, value);
    const checkCol = this.checkColPlacement(puzzleString, row, column, value);
    const checkRegion = this.checkRegionPlacement(puzzleString, row, column, value);
    let falseReturn = [];
    if (!checkRow) {
      falseReturn.push("row");
    }
    if (!checkCol) {
      falseReturn.push("column");
    }
    if (!checkRegion) {
      falseReturn.push("region");
    }
    return falseReturn;
  }
  checkRowPlacement(puzzleString, row, column, value) {
    const puzzle = this.stringToBoard(puzzleString);
    row = row.toUpperCase().replace(/[A-Z]/g, m => m.charCodeAt() - 65); // test
    column = column - 1; // test
    if (puzzle[row][column] == value) {
      puzzle[row][column] = 0;
    }
    for (let i = 0; i < 9; i++) {
      if (puzzle[row][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const puzzle = this.stringToBoard(puzzleString);
    row = row.toUpperCase().replace(/[A-Z]/g, m => m.charCodeAt() - 65); // test
    column = column - 1; // test
    if (puzzle[row][column] == value) {
      puzzle[row][column] = 0;
    }
    for (let i = 0; i < 9; i++) {
      if (puzzle[i][column] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const puzzle = this.stringToBoard(puzzleString);
    row = row.toUpperCase().replace(/[A-Z]/g, m => m.charCodeAt() - 65); // test
    column = column - 1; // test
    if (puzzle[row][column] == value) {
      puzzle[row][column] = 0;
    }
    for (let i = 0; i < 9; i++) {
      if (puzzle[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(column / 3) + i % 3] == value) {
        return false;
      }
    }
    return true;
  }

  stringToBoard(puzzleString) {
    const SIZE = 9; // Standard size of a sudoku board is 9x9
    const board = [];
    const newString = puzzleString.replace(/\./g, '0');

    // Split the string into rows for the Sudoku board
    for (let row = 0; row < SIZE; row++) {
      const start = row * SIZE;
      const end = start + SIZE;
      board[row] = newString.substring(start, end).split('');
    }
    return board;
  }

  isSafe(board, row, col, num) {
    // Check if 'num' is not in the current row, column and 3x3 sub-grid
    for (let x = 0; x < 9; x++) {
      if (board[row][x] == num || board[x][col] == num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] == num) {
        return false;
      }
    }
    return true;
  }

  solveSudoku(board) {
    if (board.constructor !== Array) {
      board = this.stringToBoard(board);
    }
    let row = -1;
    let col = -1;
    let isEmpty = true;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] == 0) {
          row = i;
          col = j;
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) {
        break;
      }
    }

    // No empty space left
    if (isEmpty) {
      return true;
    }

    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (this.solveSudoku(board)) {
          return true;
        }
        board[row][col] = 0; // Undo the move
      }
    }

    return false; // Trigger backtracking
  }

  // Utility function to print the board
  makeFinishedString(board) {
    let solution = "";
    for (let r = 0; r < 9; r++) {
      for (let d = 0; d < 9; d++) {
        solution += board[r][d];
      }
    }
    return solution;
  }

  completeSudoku(puzzleString) {
    if (this.validate(puzzleString) != "valid") {
      return false;
    }
    const board = this.stringToBoard(puzzleString);
    const solvedBoard = this.solveSudoku(board);
    const solution = this.makeFinishedString(board);
    return solution;
  }
}


module.exports = SudokuSolver;
