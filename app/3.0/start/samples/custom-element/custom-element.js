import {Element as PolymerElement} from 'https://unpkg.com/@polymer/polymer@3.0.0-pre.7/polymer-element.js'

// Define the class for a new element called custom-element
class CustomElement extends PolymerElement {
  
  constructor() {
    super();
    this.textContent = 'I\'m a custom-element.';
  }
}
// Register the new element with the browser
customElements.define('custom-element', CustomElement);

/*
  If you’re familiar with your browser’s developer tools, try printing the
  custom element’s `tagName` property to the console. 
  Hint: add `console.log(this.tagName);` to the constructor method!
*/