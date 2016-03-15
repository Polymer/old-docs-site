---
layout: default
type: article
shortname: Docs
title: Articles
subtitle: Core concepts of build apps on top of Polymer and web components

add_permalinks: false
---

{% assign articles = (site.pages | where:"article",true %}
{% assign sorted_pages = articles | sort: 'published' | reverse %}

{% for p in sorted_pages %}

{% unless p.draft %}

{% if p.article %}

{% assign pubdate = p.published | date: "%Y-%m-%d" %}
{% assign updated = p.updated | date: "%Y-%m-%d" %}
{% assign author = site.data.authors[p.author] %}
{% assign collaborator = site.data.authors[p.collaborator] %}
{% assign polymer_version = p.polymer_version %}

{::options parse_block_html="true" /}
<div class="article">
{% if polymer_version %}
<span class="forversion">Polymer v{{polymer_version}}</span>
{% endif %}
## [{{ p.title }}]({{ p.url }})



<!-- <span class="tags">
{% for tag in p.tags %}<span>{{ tag }}</span>{% endfor %}
</span> -->

<div class="byline author">
<a href="https://plus.google.com/{{author.gplus}}?rel=author" target="blank_">![{{author.full_name}} profile pic]({{author.profile_pic}} "{{author.full_name}}")</a> 
  <a href="https://plus.google.com/{{author.gplus}}" target="blank_">{{author.full_name}}</a>

{% if collaborator %}
and <a href="https://plus.google.com/{{collaborator.gplus}}?rel=author" target="blank_">![{{collaborator.full_name}} profile pic]({{collaborator.profile_pic}} "{{collaborator.full_name}}")</a>
<a href="https://plus.google.com/{{collaborator.gplus}}" target="blank_">{{collaborator.full_name}}</a>
{% endif %}

, <time pubdate datetime="{{pubdate}}">{{p.published | date: "%B %Y"}}</time>

{% if p.updated %}(updated <time datetime="{{updated}}">{{updated}}</time>){% endif %}
</div>

<p>{{p.description}}</p>

</div>
{% endif %}

{% endunless %}

{% endfor %}

<div style="margin-top:5em;">
_Have an idea for an article? [Suggest it](https://github.com/Polymer/docs/issues/new?labels=article)!_
</div>
