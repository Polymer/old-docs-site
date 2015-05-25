---
layout: default
type: start
shortname: Start
title: "Step 4: Finishing touches"
subtitle: Your first Polymer application
---

<link rel="import" href="../../../elements/side-by-side.html">

<link rel="stylesheet" href="tutorial.css">

<style>
.unquote-link {
  max-width: 360px;
}
.unquote-image {
  background-image: url(/images/tutorial/finished.png);
  background-size: cover;
  background-position: top;
  width: 360px;
  height: 320px;
  border: 1px solid black;
}
</style>

## Step 4: Finishing touches

In this section, you'll finish up the app by adding a favorite button to the cards and connecting the tabs to the `<post-list>` control.

In this section you'll learn about:

-   Declarative event handling.
-   Adding properties and methods to the element's prototype.
-   Automatic node finding.

### Edit post-card.html

Open `post-card.html` in your editor and add the
<code><a href="../../elements/core-icon-button.html">&lt;core-icon-button></a></code>
element:

<side-by-side>
<pre>
&lt;div class="card-header" layout horizontal center>
  &lt;content select="img">&lt;/content>
  &lt;content select="h2">&lt;/content>
&lt;/div>
<strong class="highlight nocode">
&lt;core-icon-button
  id="favicon"
  icon="favorite"
  on-tap="{%raw%}{{favoriteTapped}}{%endraw%}">
&lt;/core-icon-button>
</strong>
&lt;content>&lt;/content>
</pre>
<aside>
  <h4>Key information</h4>
  <ul>
    <li>As the name implies, <code>&lt;core-icon-button&gt;</code> creates a button with an
    embedded icon. {{site.project_title}} includes several sets of
    scalable icons.</li>
    <li>The <code>icon="favorite"</code> attribute selects the heart icon from the
    default icon set.</li>
    <li>The <code>on-tap=</code><wbr><code>"{%raw%}{{favoriteTapped}}{%endraw%}"</code> attribute specifies a method to call
    on the <code>post-card</code> element when the button is tapped.</li>
  </ul>
</aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add the `favorite` property and `favoriteTapped` method to the element's
prototype.

<side-by-side>
<pre>
&lt;script><strong class="highlight nocode">
Polymer({
  publish: {
    favorite: {
      value: false,
      reflect: true
    }
  },
  favoriteTapped: function(event, detail, sender) {
    this.favorite = !this.favorite;
    this.fire('favorite-tap');
  }
});</strong>
&lt;/script>
</pre>
  <aside>
    <ul>
      <li>The <code>publish</code> object is another way to specify published properties,
      like the <code>attributes</code> attribute shown in Step 3. Here the
      <code>favorite</code> property defaults to <code>false</code>, and it <em>reflects</em>, meaning
      the <code>favorite</code> attribute is updated in the DOM whenever the property value
      changes.</li>
      <li>The <code>favoriteTapped</code> event toggles the state of the <code>favorite</code>
      property (<code>this.favorite</code>), and also fires a custom event, using the
      built in <code>fire</code> method. (<code>fire</code> is one of several utility methods
      {{site.project_title}} adds to the prototype of every custom element.)</li>
    </ul>
  </aside>
</side-by-side>

The net result of these changes is that when the favorite button is
tapped, the favorite property is updated and its corresponding attribute
is set or unset.

Right now, there's no visual indication that the button is pressed.

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add the following CSS to style the favorite button:

<side-by-side>
<pre><strong class="highlight nocode">
core-icon-button {
  position: absolute;
  top: 3px;
  right: 3px;
  color: #636363;
}
:host([favorite]) core-icon-button {
  color: #da4336;
}</strong>
&lt;/style>
</pre>
  <aside>
    <ul>
      <li>The <code>color</code> property sets the fill color on the icon.</li>
      <li>The <code>:host([favorite])</code> <code>core-icon-button</code> selector sets the
      fill color when the <code>favorite</code> attribute is set on the custom element.</li>
    </ul>
  </aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Save `post-card.html`.

At this point, you can reload the page and your favorite buttons should
work, but there are still a few steps left to finish the app.

### Edit index.html

Open `index.html` and update the tab event handler to switch views in
`<post-list>` when the user switches tabs:

<pre>
&lt;script>
var tabs = document.querySelector('paper-tabs');
<strong class="highlight nocode">var list = document.querySelector('post-list');

tabs.addEventListener('core-select', function() {
  list.show = tabs.selected;
});</strong>
&lt;/script>
</pre>

Save `index.html`.

### Edit post-list.html

Open `post-list.html` in your editor.

Update the template that creates the `<post-card>` elements to wire up the
favorites:

<side-by-side>
  {% raw %}
<pre>
  &lt;template repeat="{{post in posts}}">
    <strong class="highlight nocode">
    &lt;post-card
      favorite="{{post.favorite}}"
      on-favorite-tap="{{handleFavorite}}"
      hidden?="{{show == 'favorites' && !post.favorite}}"></strong>
      &lt;img src="{{post.avatar}}" width="70" height="70">
      &lt;h2>{{post.username}}&lt;/h2>
      &lt;p>{{post.text}}&lt;/p>
    &lt;/post-card>
  &lt;/template>
</pre>
  {% endraw %}
  <aside>
    <ul>
      <li><code>favorite=<wbr>"{%raw%}{{post.favorite}}{%endraw%}"</code> binds the
      card's <code>favorite</code> value to the
      value in the array owned by the <code>&lt;post-service&gt;</code>.</li>
      <li>The <code>on-favorite-tap</code> attribute sets up a handler for the
      <code>favorite-tap</code> event fired by the <code>&lt;post-card&gt;</code>.</li>
      <li>The <code>hidden?=</code><wbr><code>"{%raw%}{{}}{%endraw%}"</code> expression is special syntax for a boolean
      attribute, which sets the attribute if the binding expression
      evaluates to true. </li>
    </ul>
  </aside>
</side-by-side>

The binding expression for `hidden` actually does the work of switching
between the All and Favorites tabs. The `hidden` attribute is a
standard HTML5 attribute. The default {{site.project_title}} style sheet includes
a rule to style `hidden` as `display: none` for those browsers that don't support
`hidden` natively.

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

Add an event handler for the `favorite-tap` event to `post-list.html`:

<side-by-side>
<pre>
&lt;script>
<strong class="highlight nocode">Polymer({
  handleFavorite: function(event, detail, sender) {
    var post = sender.templateInstance.model.post;
    this.$.service.setFavorite(post.uid, post.favorite);
  }
});
</strong>&lt;/script>
</pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li><code>sender<wbr>.templateInstance<wbr>.model</code> is a reference to the model data used
      to construct a template instance. In this case, it includes the <code>post</code>
      object used to create a <code>&lt;post-card&gt;</code>, so you can retrieve its ID and
      <code>favorite</code> value.</li>
      <li><code>this.$.service</code> returns a reference to the <code>&lt;post-service&gt;</code> element.
      Every element in a custom element's shadow DOM that has an <code>id</code>
      attribute is added to the <code>this.$</code> dictionary. This is called
      <a href="../../polymer/polymer.html#automatic-node-finding">automatic node finding</a>.</li>
      <li>If this was a real social networking service, the <code>setFavorite</code> method
      would persist the change to the server. As is, it doesn't do anything
      other than log a console message.</li>
    </ul>
  </aside>
</side-by-side>

### Finished!

Save `post-list.html` and refresh your page.

That's it &mdash; you're done! With a bit of luck, your application looks like this:

<figure layout vertical center>
  <a href="https://polymer-tut.appspot.com/" class="unquote-link">
    <div class="unquote-image"></div>
  </a>
  <figcaption>
    Click screenshot for demo
  </figcaption>
</figure>

If your project doesn't look quite right, check your work against the files in the `finished` directory:

-   [`post-card.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/post-card.html)
-   [`post-list.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/post-list.html)
-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/index.html)

### Start your next project

Ready to start a project of your own? Install some {{site.project_title}} components and get to work!

<div layout horizontal justified class="stepnav">
<a href="step-3.html">
  <paper-button><core-icon icon="arrow-back"></core-icon>Step 3: Using data binding</paper-button>
</a>
<a href="../getting-the-code.html#installing-components">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Installing components</paper-button>
</a>
</div>

