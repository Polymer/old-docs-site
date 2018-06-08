/*
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/iron-doc-viewer/default-theme.js';
import '@polymer/iron-doc-viewer/iron-doc-element.js';
import '@polymer/iron-doc-viewer/iron-doc-class.js';
import '@polymer/iron-doc-viewer/iron-doc-mixin.js';
import '@polymer/iron-doc-viewer/iron-doc-namespace.js';
import '@polymer/iron-doc-viewer/iron-doc-module.js';
import '@polymer/iron-doc-viewer/iron-doc-behavior.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<style is="custom-style" include="iron-doc-default-theme"></style>`;

document.head.appendChild($_documentContainer.content);
