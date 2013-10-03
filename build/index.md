---
layout: default
title: Build status

add_permalinks: false
---

This is a snapshot of each repository. See {{site.project_title}}'s [build waterfall](http://build.chromium.org/p/client.polymer/) for everything.

{% raw %}
<polymer-element name="projects-list">
  <template>
    <style>
      #repobuildlist {
        list-style: none;
      }
    </style>
    <ul id="repobuildlist">
      <template repeat="{{repos}}">
        <li>
          <h4>{{}}</h4>
          <buildbot-list project="{{}}"></buildbot-list>
        </li>
      </template>
    </ul>
  </template>
  <script>
    Polymer('projects-list', {
      applyAuthorStyles: true,
      created: function() {
        this.repos = [
          'polymer',
          'platform',
          'ShadowDOM',
          'CustomElements',
          'HTMLImports',
          'PointerEvents',
          'PointerGestures',
          'web-animations-js',
          'TemplateBinding',
          'NodeBind',
          'observe-js',
          'polymer-expressions'
        ];
      }
    });
  </script>
</polymer-element>
{% endraw %}

<projects-list></projects-list>

_iOS testing provided by [Browserstack](http://www.browserstack.com/)._
