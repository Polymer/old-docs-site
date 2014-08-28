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
