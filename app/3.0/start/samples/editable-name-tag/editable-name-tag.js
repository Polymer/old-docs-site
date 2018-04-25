import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-input/iron-input.js';

class EditableNameTag extends PolymerElement {
  static get properties () {
    return {
      owner: {
        type: String,
        value: 'Daniel'
      }
    };
  }
  static get template () {
    return html`
      <!-- bind to the 'owner' property -->
      <p>This is <b>[[owner]]</b>'s name-tag element.</p>

      <!-- iron-input exposes a two-way bindable input value -->
      <iron-input bind-value="{{owner}}">
        <!--
          TODO: Edit the placeholder text to see two-way data
          binding at work.
        -->
      <input is="iron-input" placeholder="Your name here...">
      </iron-input>
    `;
  }
}

customElements.define('editable-name-tag', EditableNameTag);