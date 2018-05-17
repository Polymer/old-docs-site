import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';

class ParentElement extends PolymerElement {
  static get properties() {
    return {
      mySlots: {
        type: Array
      }
    };
  }
  static get template() {
    return html`
      <style>
        div {
          background-color: antiquewhite;
          border: 1px solid;
          padding: 10px;
          margin: 5px;
        }
        div.red {
          background-color: mistyrose;
        }
        div.blue {
          background-color: aliceblue;
        }
        div.green {
          background-color: lightgreen;
        }
      </style>

      <div>
        <slot id="slot1" name="slot1"></slot>
      </div>
      
      <div>
        <slot id="slot2" name="slot2"></slot>
      </div>
      
      <div>
        <slot id="slot3" name="slot3"></slot>
      </div>
      
      <div class=blue>
        <p>[[outputMessage]]</p>
        <p><button on-click="getInfo">Get slot info</button></p>
        <p>I have the following slots:</p>
        <template is="dom-repeat" items=[[mySlots]]>
          <p>[[item]] contains: [[computeNode(item)]] </p>
        </template>
      </div>
    `;
  }
  ready() {
    super.ready();
    this.shadowRoot.querySelectorAll('slot').forEach(slot => slot.addEventListener('slotchange', e => this._handleSlotChange(e)))
    
    this._observer = new PolymerFlattenedNodesObserver(this.$.slot1, (info) => {
      this._processNewNodes(info.addedNodes);
      this._processRemovedNodes(info.removedNodes);
    });
  }
  _processNewNodes(info){
    console.log('_processNewNodes');
    console.log(info);
  }
  _processRemovedNodes(info) {
    console.log('_processRemovedNodes');
    console.log(info);
  }
  _handleSlotChange(e) {
    console.log(e.type, 'detected');
  }
  computeNode(item) {
    var assignedNodes = this.$[item].assignedNodes();
    return(assignedNodes[0].name);
  }
  getInfo() {
    this.mySlots = Object.keys(this.$);
  }
}
// Register the new element with the browser
customElements.define('parent-element', ParentElement);
