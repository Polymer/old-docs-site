---
title: Polymer Summit 2017 Speaker Spotlight: Chad Killingsworth, Jack Henry & Associates
---

Chad builds modern online banking experiences with Polymer. We chatted about componentized web app development and the importance of powerful theming capabilities.

**How did you first start using Polymer?**

I had watched with interest as the project developed for years, mainly from Google I/O presentations. But I didn't actually start using it until the summer after 1.0 was released with the note that it was production ready. I was starting up a major new project and was looking for a new stack to write it in. Polymer seemed to be the best fit.

My company has mobile banking apps which are fully themed for each financial institution. Our apps have been sold to hundreds of US banks. We began a new product which was the web-based equivalent: fully themeable and branded online banking as a modern single page application.

**What was it about Polymer that made it seem like a good fit?**

We were interested in writing a code base which could be maintained for 10+ years--and that's very challenging when you look at the average lifespan of a modern JS framework.

We chose Polymer for the UI layer because of how close it was to the actual platform APIs and the convergence we saw among browser manufacturers towards those APIs.

**How important to your clients is changing and developing the theming and branding of a site? Are you able to do this quickly?**

Extremely quickly--and it's very important.

The theming is all tightly coupled to the same theming variables that our mobile clients already used. 

The ability to not only get rid of, but realizing you don't need a CSS preprocessor is fabulous. CSS variables and shadow DOM give you everything you need to build a highly themeable app.

**How does developing with Web Components change the way you control the look and feel of an app?**

Being able to write self contained UI elements and interactions completely changes how you view development. You begin breaking your app up into distinct blocks and suddenly wonder why you ever wrote applications any other way.

However having HTML, CSS and JS mixed in the same file is extremely challenging for most build tools. Especially if your project doesn't fit the exact model of the Polymer build tools.

So my team has spent a large amount of time bridging the gap between Polymer and the rest of the JS ecosystem.

**Could you mention a couple of things that were rewarding and other things that were more challenging about the process of building from scratch with Polymer?**

On the UI components Polymer is highly maintainable because the styles that affect the DOM are maintained right next to the actual logic and HTML.

The goal is to have small modular change-outs. The migration path from Polymer 1 to Polymer 2 has been ideal because we can run the old style syntax alongside the new without having to have a huge rollout.

For frameworks that embed HTML into their JS, it's always a concern that to make HTML or style changes requires a full JavaScript engineer. That's not been true of Polymer at all.

One of the biggest challenges was automated browser testing. When we started, almost nobody used native Shadow DOM (it was opt-in for Polymer). With Shadow DOM enabled, it was extremely difficult to test components since standard testing frameworks were not built with that in mind. We had to figure out and solve the problem all on our own.

**Have you found that your development workflows or organizational mindset had to change dramatically with a new way of thinking about development?**

We have definitely had to figure out how much logic should be embedded into any one component vs using some kind of outside library. We've gone back and forth on where we think that line is for maintainability. Limiting the length of the JavaScript in any one component is pretty key.

**What excites you most about Progressive Web Apps?**

As I watch the trend of users to install and utilize fewer apps, having a web-based app that provides all of the same functionality as a native app is exciting. For us having mature native apps, it's been fun to develop a web-based version that will soon have feature parity--including with features that were once not even possible for a browser such as push notifications.

**How would you make the Web better?**

That's easy: JavaScript modules. We're now 2 years past the formalization of the ES2015 spec and browsers have just barely begun to support them. The pace towards support has moved a glacial speed which has been frustrating. In addition, developers have openly embraced the ability to resolve modules from the Node ecosystem, but browsers use a different algorithm. This struggle between the algorithm that build tools use and browsers use hasn't been fun for developers who feel very much caught in the middle.

**What’s an example of working in the web dev community that delights you?**

One of the challenges is the wide variety of developer skillsets and abilities. You can have a designer who just starts tinkering with HTML and CSS in the same group as a true JavaScript engineer who is architecting large, scalable applications that have to perform well in a large variety of conditions.

As a Engineering manager, that makes hiring very challenging!

But I love the speed at which a new participant into that community can actively contribute and build something truly usable. However at the same time I feel like the knowledge required to be at that top tier of developer is increasing so fast that we are leaving a large set of developers behind.

Being able to make visual changes to the app without having to be deeply involved in the JavaScript is one of the greatest benefits of Polymer. Because you are working with HTML and CSS directly and changes are isolated to that component alone, it's easy for someone who specializes in HTML/CSS to make visual corrections or changes without having to really know the framework internals or interfere with the business logic.

**Just two more questions for you: 1. What is your favourite food and 2. What are you looking forward to in your visit to Copenhagen?**

1. I'm not much of a favorites type of person--I get bored with the same thing over and over. Anything quality I enjoy.

2. I love traveling, so I'm always looking forward to seeing a new place. But I'm also very excited to spend in-person time with the Google developers I collaborate with so frequently.

-----

This year's summit takes place August 22–23 at [Lokomotivværkstedet](http://www.lvcph.dk/index-eng.html) in beautiful downtown [Copenhagen, Denmark](https://goo.gl/maps/pgFPsEkRRcS2).

Like previous years, we'll have talks and codelabs from the Polymer team, plus food, fun, and plenty of space for informal conversations.

Tickets are free! [Register on the Polymer Summit 2017 website](https://summit.polymer-project.org/).

If you can't make it to Copenhagen, don't worry. The talks will be livestreamed and recorded for later, and the codelabs will be available online so you can try them out from anywhere.

Follow us on Twitter [@polymer](https://twitter.com/polymer) for regular updates.
