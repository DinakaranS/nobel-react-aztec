'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filter = {
  generateLayout: function generateLayout(data) {
    var layout = {
      wrows: [],
      worows: []
    };
    // All Items
    var wrows = _lodash2.default.clone(data);
    // Remove Without Rows
    var worows = _lodash2.default.remove(wrows, function (item) {
      var isLayout = item.layout ? item.layout.row : item.layout;
      return isLayout === undefined;
    });
    layout.worows = worows; // Concat all items without rows
    // All row indices
    var rowIndex = _lodash2.default.map(wrows, 'layout.row');
    var uniqIndex = _lodash2.default.uniq(rowIndex);
    var sortedIndex = _lodash2.default.sortBy(uniqIndex);

    _lodash2.default.each(sortedIndex, function (value) {
      var rows = [];
      _lodash2.default.each(wrows, function (item) {
        if (item.layout) {
          if (item.layout.row === value) {
            rows.push(item);
          }
        }
      });
      layout.wrows.push(rows);
    });

    return layout;
  }
};

module.exports = filter;