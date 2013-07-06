---
layout: default
title: Articles

add_permalinks: false
---

{% for p in site.pages %}
{% if p.article %}

{% assign pubdate = p.article.published | date: "%Y-%m-%d" %}
{% assign updated = p.article.updated | date: "%Y-%m-%d" %}
{% assign author = site.authors[p.article.author] %}

{::options parse_block_html="true" /}
<div class="article">
#### [{{ p.title }}]({{ p.url }})

<!-- <span class="tags">
{% for tag in p.tags %}<span>{{ tag }}</span>{% endfor %}
</span> -->

<div class="byline"><a href="https://plus.google.com/{{author.gplus}}" target="blank_">{{author.full_name}}</a>, <time pubdate datetime="{{pubdate}}">{{p.article.published | date: "%B %Y"}}</time>
{% if p.article.updated %}(updated <time datetime="{{updated}}">{{p.article.updated | date: "%B %Y"}}</time>){% endif %}
</div>

<summary>{{p.article.description}}</summary>

</div>
{% endif %}
{% endfor %}
