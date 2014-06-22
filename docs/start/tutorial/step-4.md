---
layout: default
type: start
navgroup: start
shortname: Start
title: "Step 4: Finishing touches"
subtitle: Your first Polymer application 
---

<link rel="import" href="/elements/side-by-side.html">

<style>
.running-app-frame {
    border: 1px solid #000;
    padding: 0px;
}
pre {
  font-size: 13px !important;
  border: 1px solid #eaeaea !important;
  padding 5px !important;
  margin: 10px 0px !important;
}
side-by-side h4 {
  line-height: 16px;
  margin-top: 0px;
  margin-left: 25px;
}
side-by-side ul {
  -webkit-padding-start: 25px;
}
</style>


## Step 4: Finishing touches

In this section, you'll finish up the app by adding a favorite button to the cards and connecting the tabs to the `<post-list>` control.

In this section you'll learn about:

-   Declarative event handling.
-   Adding properties and methods to the element's prototype.
-   Automatic node finding.

### Edit post-card.html

Open `post-card.html` in your editor and add the `<core-icon>` element:

<side-by-side>
<pre>
&lt;div class="card-header" layout horizontal center>
  &lt;content select="img">&lt;/content>
  &lt;content select="h2">&lt;/content>
&lt;/div>
&lt;strong>
&lt;core-icon-button
  id="favicon"
  icon="favorite"
  on-tap="{%raw%}{{favoriteTapped}}{%endraw%}">
&lt;/core-icon-button>
&lt;/strong>
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
    <li>The <code>on-tap=</code><wbr><code>"&#8288;{%raw%}{{favoriteTapped}}{%endraw%}"</code> attribute specifies a method to call
    on the <code>post-card</code> element when the button is tapped.</li>
  </ul>
</aside>
</side-by-side>

----

Add the `favorite` property and `favoriteTapped` method to the element's   
prototype. 

<side-by-side>
  <pre>
  &lt;script>
  <strong>   
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
      like the <code>attributes</code> attribute shown in Step 3. In this case, the
      <code>favorite</code> property defaults to <code>false</code>, and it <em>reflects</em>, meaning
      the <code>favorite</code> attribute is updated whenever the property value
      changes.</li>
      <li>The <code>favoriteTapped</code> event toggles the state of of the <code>favorite</code>
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

----

Add the following CSS to style the favorite button:

<side-by-side>
  <pre>
  core-icon-button {
    position: absolute;
    top: 3px;
    right: 3px;
  }
  core-icon-button {
    fill: #636363;
  }
  :host([favorite]) core-icon-button {
    fill: #da4336;
  }
  </pre>
  <aside>
    <ul>
      <li>The <code>fill</code> property sets the fill color on the icon.</li>
      <li>The <code>:host([favorite]) core-icon-button</code> selector sets the
      fill color when the <code>favorite</code> attribute is set on the custom element.</li>
    </ul>
  </aside>
</side-by-side>

----

Save `post-card.html`.
   
At this point, you can reload the page and your favorite buttons should 
work, but there are still a few steps left to finish the app.

### Edit index.html

Open `index.html` and update the tab event handler to switch views in 
`<post-list>` when the user switches tabs:

    <script>
    var list = document.querySelector('post-list');
    var tabs = document.querySelector('paper-tabs');

    tabs.addEventListener('core-select', function() {
      list.show = tabs.selected;
    });
    </script>

Save `index.html`.

### Edit post-list.html

Open `post-list.html` in your editor.

Update the template that creates the `<post-card>` elements to wire up the 
favorites:

<side-by-side>
  {% raw %}
  <pre>
    &lt;template repeat="{{post in posts}}">
      &lt;strong>
      &lt;post-card
        favorite="{{post.favorite}}"
        on-favorite-tap="{{handleFavorite}}"
        hidden?="{{show == 'favorites' && !post.favorite}}">
        &lt;/strong>
        &lt;img src="{{post.avatar}}" width="70" height="70">
        &lt;h2>{{post.username}}&lt;/h2>
        &lt;p>{{post.text}}&lt;/p>
      &lt;/post-card>
    &lt;/template>
  </pre>
  {% endraw %}
  <aside>
    <ul>
      <li><code>favorite=<wbr>"&#8288;{%raw%}{{post.favorite}}{%endraw%}"</code> binds the 
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
between the All and Favorites tabs.

----

Add an event handler for the `favorite-tap` event:

<side-by-side>
  <pre>
  &lt;script>
  <strong>
  Polymer({
    handleFavorite: function(event, detail, sender) {
      var post = sender.templateInstance.model.post;
      this.$.service.setFavorite(post.uid, post.favorite);
    }
  });
  </strong>
  &lt;/script>
  </pre>
  <aside>
    <h4>Key information</h4>
    <ul>
      <li><code>sender<wbr>.templateInstance<wbr>.model</code> is a reference to the model data used
      to construct a template instance. In this case, it includes the <code>post</code>
      object used to create a <code>&lt;post-card&gt;</code>, so you can retrieve its ID and
      <code>favorite</code> value.</li>
      <li>Every element in a custom element's shadow DOM that has an <code>id</code>
      attribute is added to the <code>this.$</code> dictionary. This is called
      <a href="http://www.polymer-project.org/docs/polymer/polymer.html#automatic-node-finding">automatic node finding</a>.</li>
      <li>If this was a real social networking service, the <code>setFavorite</code> method
      would persist the change to the server. As is, it doesn't do anything
      other than log a console message.</li>
    </ul>
  </aside>
</side-by-side>

### Finished!

Save `post-list.html` and refresh your page.

That's it &mdash; you're done! With a bit of luck, your application looks like this:

<iframe class="running-app-frame" width="480" height="320" src="/samples/tutorial/finished/index.html">
</iframe>


If your project doesn't look quite right, check your work against the files in the `finished` directory:

-   [`post-card.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/post-card.html)
-   [`post-list.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/post-list.html)
-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/index.html)

### Next

<a href="/docs/start/tutorial/step-5.html">
  <paper-button icon="arrow-forward" label="Step 5: Starting your next project" raisedButton></paper-button>
</a>


