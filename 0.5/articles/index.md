---
layout: default
type: guide
shortname: Docs
title: Articles
subtitle: Core concepts of build apps on top of Polymer and web components

add_permalinks: false
---

{% for p in site.pages %}

{% unless p.draft %}

{% if p.article %}

{% assign pubdate = p.article.published | date: "%Y-%m-%d" %}
{% assign updated = p.article.updated | date: "%Y-%m-%d" %}
{% assign author = site.data.authors[p.article.author] %}

{::options parse_block_html="true" /}
<div class="article">
## [{{ p.title }}]({{ p.url }})

<!-- <span class="tags">
{% for tag in p.tags %}<span>{{ tag }}</span>{% endfor %}
</span> -->

<div class="byline"><a href="https://plus.google.com/{{author.gplus}}" target="blank_">{{author.full_name}}</a>, <time pubdate datetime="{{pubdate}}">{{p.article.published | date: "%B %Y"}}</time>
{% if p.article.updated %}(updated <time datetime="{{updated}}">{{updated}}</time>){% endif %}
</div>

<summary>{{p.article.description}}
</summary>

</div>
{% endif %}

{% endunless %}

{% endfor %}

<div style="margin-top:5em;">
_Have an idea for an article? [Suggest it](https://github.com/Polymer/docs/issues/new)!_
</div>
