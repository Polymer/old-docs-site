/*
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

/**
 * This element supports a subset of the features of the google-map element v2.x.
 * Namely, the fluid attribute and videoId/list properties are supported.
 */

class GoogleYoutube extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      :host([fluid]) {
        width: 100%;
        max-width: 100%;
        position: relative;
      }

      #container {
        width: 480px;
        height: 270px;
        max-width: 100%;
        max-height: 100%;
      }

      :host([fluid]) #container {
        width: 100%;
        height: auto;
        padding-top: 56.25%;
      }

      #iframe {
        width: 100%;
        height: 100%;
      }

      :host([fluid]) #iframe {
        vertical-align: bottom;
        position: absolute;
        top: 0px;
        left: 0px;
      }
    </style>
    <div id="container">
      <iframe id="iframe" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    `;
  }

  static get properties() {
    return {
      videoId: {
        type: String,
      },

      list: {
        type: String,
      }
    };
  }

  static get observers() {
    return ['_updateIframeSrc(videoId, list)'];
  }

  _updateIframeSrc(videoId, list) {
    if (list) {
      this.$.iframe.src = `https://www.youtube.com/embed/${videoId || ''}?list=${list}`;
    } else if (videoId) {
      this.$.iframe.src = `https://www.youtube.com/embed/${videoId}`;
    }
  }
}

customElements.define('google-youtube', GoogleYoutube);
