
# Polymer documentation style guide

This extremely brief style guide records some style decisions
we've made in the course of developing these docs.

There are counterexamples for each of these rules in the existing docs.
We aim to follow them as much as possible for new docs, and update old docs
as we revise them.

## Language

Most tech writing style guides discuss these points in more detail.

Use the active voice.

-   Good. Polymer upgrades the element when you add it to the document.
-   Avoid. The element is upgraded when you add it to the document.

Use the present tense whenever possible.

-   Good. Clicking the element starts an animation.
-   Avoid. Clicking the element will start an animation.

Address the user in the second person ("you" not "we").

-   Good. You can use any web server to serve your elements.
-   Avoid. We can use any web server to serve our elements.

-   Good. First, edit the `index.html` file.
-   Avoid. Let's reload the page to see the changes.

In direct instructions and procedures, omit the "you":

-   Good. Click **Save**.
-   Avoid. Next you click **Save**.

Use gender-neutral language. Don't use gender-specific pronouns unless you're
referring to someone of a specific gender.

You can use "they" as a singular pronoun, or rewrite to avoid using a pronoun.


## Link text

Use descriptive link text. When cross-referencing sections in the doc, include
the section title, in sentence case.

    See [Observe added and removed children](/link/).

Avoid unqualified inline links such as:

    In this case, you need to [notify the data binding system](link).

Use unqualified inline links only for links where the linked resource is the
**definitive definition of the term** (for example, API reference page for a
method).

    To update custom properties dynamically, call
    [updateStyles](/{{{polymer_version_dir}}}/api/Polymer.Base#method-updateStyles).

When linking off-site, it should be clear that the link goes off site. For some
documents (like web standards) this may be clear enough from the title.

-   Good: See the
    [Gold standard checklist for web components](https://github.com/webcomponents/gold-standard/wiki)
    on GitHub.
-   Good. Defined in the
    [Shadow DOM specification](https://www.w3.org/TR/shadow-dom/).
-   Avoid. Use `Polymer.dom(event)` to simulate
    [event retargeting](https://www.w3.org/TR/shadow-dom/#event-retargeting).
-   Avoid. Polymer elements use the
    [mediator pattern](https://en.wikipedia.org/wiki/Mediator_pattern).


## Titles and headings

Use heading levels H2, H3 and H4 for content. H1 is reserved for the page title.
Try not to skip heading levels (so H4s should be nested under an H3, not
directly under an H2).

Document titles and section headings should be in sentence case.

-   Good: ## Create a new element
-   Avoid: ## Create a New Element

For task sections, use 2nd person imperative verbs, not gerunds.

-   Good: ## Observe DOM changes
-   Avoid: ## Observing DOM changes

For concepts sections, favor noun titles instead of verb titles.

-    Good: ## Data binding
-    Avoid: ## Understanding data binding

When linking to a section, add an ID on the heading to produce a stable URL
instead of relying on an auto-generated fragment based on the current link text.

    ## Data binding {#data-binding}
    
Avoid adding extra emphasis to heading text (bold, code font, and so on):

-   Good: `## Using the MutableData mixin`
-   Avoid ```## Using the `MutableData` mixin```


## Formatting

We write docs in Markdown. We use the `markdown-it` processor with the
`markdown-it-attrs` plugin.

Use backticks or `<code>` for inline code. Don't use code font in headings.

### Formatting API names

Set API names in code font—this includes JavaScript classes, attributes,
properties, methods, and event names.

For methods, omit the parenthesis unless you're specifying arguments.

-   Good: Call `render` to force a synchronous refresh.
-   Avoid: Call `render()` to force a synchronous refresh.


### Formatting element names

For non-type-extension elements, use code font and angle brackets:

-   Good: The `<iron-icon>` element ...
-   Avoid: The `iron-icon` element ...

For type-extension elements, don't add brackets around the element name.
Instead, use the bare element name:

-   Good: A `custom-style` element ...
-   Avoid: A `<custom-style>` element ...

To be extra clear, show both the base tag name and the `is=""` attribute
enclosed in brackets:

-   Good: A `<style is="custom-style">` element ...

### Placeholders

Use `<var>` for placeholders, for example in syntax summaries:

    <code>Polymer.dom(<var>parent</var>).children</code>

Yeah, it's HTML. Markdown, sadly, doesn't handle this formatting well.

### Formatting code samples

Use fenced code samples for code that should have syntax highlighting.

    ```
    console.log('Nifty, huh?');
    ```

A language annotation is optional. Only add a language if the site highlights
a given sample incorrectly.

    ``` js
    Polymer({ is: 'some-thing' });
    ```

To avoid highlighting, you can use an indented code block, or add the
`nohighlight` attribute to an HTML `<code>` element.

To label a code example (for example, with a filename or the word "Example"), use a
paragraph with the `caption` class added:

    Example { .caption }

    ```
    some interesting code here
    ```


### Formatting notes/admonitions/callouts/pretty boxes

Call them what you will. Use the `alert` and <code>alert-<var>type</var></code>
classes to identify an alert, where <code><var>type</var></code> is one of:

*   `success`/`tip`. A tip, shortcut, or extra tidbit of information that may
     not be directly related to the current topic. Usually in a tutorial.
*   `info`. Introduces a note or sidebar related to the current topic.
*   `warning`. Warns about a potential issue, antipattern, or unintended
    consequence.

When possible, introduce an admonition with a _specific, descriptive_ run-in
heading, not a generic label like **Warning** or **Note**. Especially important
for warnings.

Example:

    **Don't feed the lions.** They might get used to it.
    {.alert .alert-warning}

Use admonitions sparingly. More than one per section can be distracting and
break up the text flow. In any case, two alerts should never appear next to each
other without an intervening paragraph.

### Formatting lists

Line up list text at a 4 space indent. This isn't necessary for markdown, but it
keeps the source easy to read and makes it easy to figure out the correct indent
level for follow-on paragraphs and code blocks, which _do_ have to be indented.


    *   This is the first line of
        a multi-line list item.

        This is a second paragraph for a
        list item.

    *   This is the next list item.

        ```
        <!-- a code sample associated with a list item is fenced,
             at the same indent level, or -->
        ```

           <!--  indented an additional four spaces -->


## Text wrapping

Please set your text editors to wrap text at 100 characters and trim trailing
whitespace. This makes it easier to review pull requests on GitHub.

