/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

Polymer('greeting-tag', {
  ready: function() {
    this.salutations = [
      {what: 'Hello', who: 'World'},
      {what: 'Goodbye', who: 'DOM APIs'},
      {what: 'Hello', who: 'Declarative'},
      {what: 'Goodbye', who: 'Imperative'}
    ];
    this.alternates = ['Hello', 'Hola', 'Howdy'];
    this.current = 0;
  },     
  updateModel: function() {
    this.current = (this.current + 1) % this.alternates.length;
    this.salutations[0].what = this.alternates[this.current];
  }
});
