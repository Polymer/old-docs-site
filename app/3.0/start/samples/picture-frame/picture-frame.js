import {PolymerElement, html} from "@polymer/polymer/polymer-element.js"

class PictureFrame extends PolymerElement {
  static get template() {
    return html`
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