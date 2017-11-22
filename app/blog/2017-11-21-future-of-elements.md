---
title: The future of elements
---

If you've seen Steve's [talk](https://www.youtube.com/watch?v=rvpJ5O0W_6A) from the Polymer Summit, you know that there's a bunch of changes planned for the Polymer Elements, such as performance improvements, smaller APIs and re-designing with extensibility in mind. We're very excited about this, but we're still in the early days of trying to figure out the exact shape of our elements.  We'll let you know as soon as that plan is ready!


## In the meantime, what about the existing elements? 

We get asked a lot why we haven't ported any of the Polymer Elements to "pure" 2.0, class-based elements. If you've opened a PR to do this, we've probably closed it. We also realize that we didn't actually write down a detailed reasoning for this anywhere, so here it is!

Most of the current elements were originally written almost 3 years ago. Since then we've learned a lot about what our customers need, what works well and what doesn't. The suite of elements would look very different if it were written today. As a result, we decided it was time for a significant rewrite—one that would make the elements lighter, faster and more flexible, but also result in breaking changes to features and APIs.

Before proceeding with this rewrite, though, we needed to give users of Polymer and the elements a smooth upgrade path from Polymer 1.0 to Polymer 2.0 and 3.0. 

With this in mind, the 2.0 release of the elements was designed to be a minimally breaking release, bridging Polymer 1.0 and 2.0, and making it easy for users to update their applications.

For the same reason, the 3.0 release of the elements, in parallel with Polymer 3, will be just an automatically transformed ES6 module version of the existing elements. This automatic transformation won't make any functional changes to the elements code.

We'll continue to support our existing 2.x and 3.x elements as we plan and work on our next-generation elements. When the new elements ship, you'll be able to use them in your Polymer 3.x applications in place of or alongside existing Polymer 3.x elements.

## So really, no class-style elements?

Maintenance is a significant amount of work for the comparatively small team that works on elements. By keeping the existing elements in hybrid format and using Polymer modulizer for automatic conversion to the 3.x format, we can support three versions of Polymer from a single codebase, while we spend our time working on new elements.

We're convinced that this is the right plan to get the Polymer community successfully through the important 2.0 and 3.0 transitions while charting a course toward significantly better elements in the near future. However, as some of you have pointed out, it does mean that we're in a bit of an awkward in-between phase for the moment, with no "canonical" class-based version of the current elements.

While we agree that's unfortunate, we don't think the benefits of such a version justify the costs. The purpose of releasing a class-based version of the current elements would be to deliver better loading performance and an updated example of best practices in element development – but we believe that the next-generation elements will achieve both of these goals much more effectively, and that our limited resources are therefore better spent on developing these new elements. 

## Looking to the future

Rethinking the elements means being able to design elements that can take advantage of ES6 class inheritance, simplifying our most complex element sets and reducing duplicated code. It means making elements that are designed to be extended. It means tuning elements to take advantage of the best practices for performance, accessibility, and maintainability we've discovered over the last three years. It means reducing the incremental cost of adding a single element to your application.

We're really excited about our next-generation elements. We hope you are, too! Stay tuned here for future announcements.

