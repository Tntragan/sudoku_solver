const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    test('Handle a valid puzzle string of 81 characters', function () {
        let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        assert.equal(solver.completeSudoku(string), '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
    });

    test('Handle a puzzle string with invalid characters', function () {
        let string = "p.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        assert.equal(solver.completeSudoku(string), false);
    });

    test('Handle a puzzle string that is not 81 characters', function () {
        let string = "...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        assert.equal(solver.completeSudoku(string), false);
    });

    test('Handle a valid row placement', function () {
        let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let row = 'a';
        let column = '1';
        let value = '7';
        assert.equal(solver.checkRowPlacement(puzzle, row, column, value), true);
    });

    test('Handle an invalid row placement', function () {
        let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let row = 'a';
        let column = 1;
        let value = 1;
        assert.equal(solver.checkRowPlacement(puzzle, row, column, value), false);
    });

    test('Handle a valid column placement', function () {
        let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let row = 'a';
        let column = 1;
        let value = 7;
        assert.equal(solver.checkColPlacement(puzzle, row, column, value), true);
    });

    test('Handle an invalid column placement', function () {
        let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let row = 'a';
        let column = 1;
        let value = 1;
        assert.equal(solver.checkColPlacement(puzzle, row, column, value), false);
    });

    test('Handle a valid region placement', function () {
        let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let row = 'a';
        let column = 1;
        let value = 7;
        assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), true);
    });

    test('Handle an invalid region placement', function () {
        let puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        let row = 'a';
        let column = 1;
        let value = 2;
        assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), false);
    });

    test('Valid puzzle strings pass the solver', function () {
        let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        assert.equal(solver.solveSudoku(string), true);
    })

    test('Invalid puzzle strings fail the solver', function () {
        let puzzleString = "..2..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        assert.equal(solver.solveSudoku(puzzleString), false);
    });

    test('Solver returns the expected solution for an incomplete puzzle', function () {
        let string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        assert.equal(solver.completeSudoku(string), '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
    })
});
