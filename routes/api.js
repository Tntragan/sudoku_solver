'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      const isValid = solver.validateCoordinate(puzzle, coordinate, value);
      if (isValid !== "valid") {
        return res.json({ error: isValid });
      }
      const check = solver.checkPlacement(puzzle, coordinate, value);
      const badLocation = solver.checkBadLocation(puzzle, coordinate, value);
      if (check) {
        return res.json({ valid: check });
      }
      return res.json({ valid: check, conflict: badLocation });
    });

  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      const isValid = solver.validate(puzzle);
      if (isValid !== "valid") {
        return res.json({ error: isValid });
      }
      const solution = solver.completeSudoku(puzzle);
      if (solution.error) {
        return res.json(solution);
      }
      return res.json({ solution });
    });
};
