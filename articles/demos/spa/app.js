(function() {
"use strict";

var DEFAULT_ROUTE = 'one';

var template = document.querySelector('#t');

template.pages = [
  {name: 'Single', hash: 'one'},
  {name: 'page', hash: 'two'},
  {name: 'app', hash: 'three'},
  {name: 'using', hash: 'four'},
  {name: 'Polymer', hash: 'five'},
];

template.addEventListener('template-bound', function(e) {
  this.$.keys.target = document;

  // Allow selecting pages by num keypad. Dynamically add
  // [1, template.pages.length] to key mappings.
  var keys = Array.apply(null, template.pages).map(function(x, i) {
    return i + 1;
  }).reduce(function(x, y) {
    return x + ' ' + y;
  });

  this.$.keys.keys += ' ' + keys;

  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
});

template.arrowHandler = function(e, detail, sender) {

  // Select page by num key. 
  var num = parseInt(detail.key);
  if (!isNaN(num) && num <= this.pages.length) {
    this.$.pages.selectIndex(num - 1);
    return;
  }

  switch (detail.key) {
    case 'left':
    case 'up':
      this.$.pages.selectPrevious();
      break;
    case 'right':
    case 'down':
      this.$.pages.selectNext();
      break;
    case 'space':
      detail.shift ? this.$.pages.selectPrevious() : this.$.pages.selectNext();
      break;
  }
};

template.cyclePages = function(e, detail, sender) {
  // If we've already hit the last page, loop back to the first.
  if (sender.selectedIndex == sender.items.length - 1) {
    sender.selectedIndex = -1;
  }
  sender.selectNext();
};

template.menuItemSelected = function(e, detail, sender) {
  if (detail.isSelected) {
    this.$ && this.$.scaffold.closeDrawer();
  }
};

})();