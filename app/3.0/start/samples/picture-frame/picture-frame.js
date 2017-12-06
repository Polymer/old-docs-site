import {Element as PolymerElement} from "https://unpkg.com/@polymer/polymer@3.0.0-pre.1/polymer-element.js"

//export const html = Polymer.html

class PictureFrame extends PolymerElement {
  static get template() {
    return `
    <!-- scoped CSS for this element -->
    <style>
      div {
        display: inline-block;
        background-color: #ccc;
        border-radius: 8px;
        padding: 4px;
      }
    </style>
    <!-- 
    TODO: Try adding other HTML elements to the DOM template
    to see how they are positioned relative to the distributed
    child nodes.
    -->
    <div>
      <!-- any children are rendered here -->
      <slot></slot>
    </div>
    `;
  }  
}
customElements.define('picture-frame', PictureFrame);