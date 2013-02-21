# About Toolkit Components

Toolkit components are standard web components that utilize a small library of helper code to reduce boilerplate and automate common actions. Details follow, but here is a quick run-down of the features of Toolkit components:

1. one-step declaration via `component` initializer
2. simplified lifecycle callbacks
3. declarative event-binding for standard and custom events
4. public and protected interfaces
5. declarative binding of data to markup (and to other components)
6. automatic node finding

What follows is a discussion about these features and how to understand usage, starting from the beginning. 

## Component Initializer

#### Component Declaration

In the beginning, standard component declarations look like this:

	<element name="tag-name">
		<template>
			<!-- shadow DOM here -->
		</template>
		<script>
			// lifecycle setup here
		</script>
	<element>
	
#### Component Declaration with component()

The Toolkit kernel (`g-component.html`) is a chunk of code that provides sugaring to make common tasks easier and to be as declarative as possible. In particular, Toolkit supplies the `component` lifecycle initializer:

	<element name="tag-name">
		<template>
			<!-- shadow DOM here -->
		</template>
		<script>
			this.component();
		</script>
	<element>
	
Simply using the `component` initializer prepares this component to use Toolkit conventions.

## Initialization

You can supply a single object-valued argument to `component` to define prototypes (and tell the initializer to do things). In fact, most properties and methods defined in the argument to `component` are used directly in the component's prototype. 

	this.component({
		helloWorld: "Hallo!",
		ready: function() {
			// component is ready now, we can do stuff
		}
	});

In this example, the component has a property _helloWorld_ and a method _ready_. 

Now, as it happens, _ready_ is a method we use to manage the component lifecycle. When a component has finished initializing itself, it calls the _ready_ method automatically (if it exists).

## Event Binding

Toolkit supports scoped declarative binding. This means you can declare event handlers in markup, and the handlers will map events to the component instance receiving the event. Here is an example,

	<element name="tag-name">
		<template>
			<span on-click="helloAction">Hello World</span>
		</template>
		<script>
			this.component({
				helloAction: function(inEvent, inDetail, inSender) {
					confirm("How are you?");
				}
			});
		</script>
	<element>

Some things to notice:

* the event handler attribute looks like _on-_ plus the event name (_on-dash_ syntax). This syntax is intended to be close enough to original HTML syntax to be memorable, while being different enough to avoid confusion.
* the value of an event handler is the string name of a method on the component. Unlike traditional syntax, you cannot put executeable code in the attribute.
* there are arguments to the event handler
	* `inEvent`: the standard event object
	* `inDetail`: convenience form of inEvent.detail
    * `inSender`: reference to the node that declared the handler, this is often different from `inEvent.target` (the lowest node that received the event) and `inEvent.currentTarget` (the component processing the event), so the Toolkit provides it directly.

## Protected vs Public

One important Toolkit convention is that components have both _public_ and _protected_ aspects. The _public_ aspect represents the API that is visible and accessible directly from a component (element) instance. The _protected_ aspect contains the API which users of components shouldn't need to bother with, including event handlers or internal methods.

For example, let's say our design for the _my-tag_ element calls for a method that can turn the element text blue, so a user could do like so:

	myTag = document.querySelector("my-tag");
	myTag.blueify();

The `blueify` method is a part of _my-tag_'s public API. It must be available to end-users on the element instance.

Now, imagine _my-tag_ is also supposed to turn orange if clicked. As part of our set up, we attach a _click_ listener to a method called `clickHandler` which turns the element orange.

In this case, `clickHandler` is not intended to be called by end-users, it's only there to service an event. In this case, `clickHandler` should be part of the protected API. Then the method is not visible on the element instance and calling

	myTag.clickHandler(); // error: undefined function

throws an error.

## Properties and Methods

As we noted, you can supply an object-valued argument to `component`. The rule is: properties and methods supplied to `component` become properties on the *protected* interface.

	this.component({
		clickColor: 'orange',
		clickHandler: function() {
			this.node.style.backgroundColor = this.clickColor;
		}
	});
	
In this example, the component has two protected properties (one is a method). Note that the scope of the method (the `this` value) is the protected scope. This is another rule: from the component's perspective we are always working with the protected scope. It's generally only the user of an instance that needs to deal with the public scope. The exception to this rule is when we need to operate on our node itself, we do this using the `this.node` reference, as shown in the example.

Note: from a node reference, the protected scope is available as `$protected`. So it's possible to violate encapsulation via:

	someNode.$protected.protectedMethod();

To make a `blueify` method that is callable on the node (public), we _publish_ the method.

	this.component({
		clickColor: 'orange',
		clickHandler: function() {
			this.node.style.backgroundColor = this.clickColor;
		},
		publish: {
			blueColor: 'blue',
			blueify: function() {
				this.node.style.color = this.blueColor;
			}
		}
	});

Things to remember about `publish`:

1. There can be only one `publish` block per definition.
2. Published properties are actually stored on the **protected** prototype, then they are forwarded to the public prototype. In other words, `blueColor` is different from `clickColor` only because there is a public getter/setter pair to access it.
3. Published methods still operate in protected scope: the properties you can access via `this` are no different from methods declared outside the publish block. 

We've tried to include all the details here, but the bottom line is simple: when building components, use `this` naturally and declare properties and methods as you like. Then, if you happen to create API you want to make public, you just move it into the `publish` block.
	
## Data Binding

Toolkit components make their properties directly available for data binding. Most simply, you can reference a property directly in your markup (using _mustache_ notation):

	<element name="name-tag">
		<template>
			Hello! My name is {{myName}}
		</template>
		<script>
			this.component({
				publish: {
					myName: "Scott"
				}
			});
		</script>
	<element>
	
This element renders like so

	Hello! My name is Scott
	
and changes to the `myName` property are automatically reflected in the DOM.

Because we declared `myName` in the publish block, we can mess with the property directly on a _name-tag_ instance. E.g.

	nameTag.myName = "Frankie";
	
and now the display shows

	Hello! My name is Frankie

We can bind to most elements of markup (except tag names!). E.g.

	<element name="name-tag">
		<template>
			Hello! My name is <span style="color:{{nameColor}}">{{myName}}</span>
		</template>
		<script>
			this.component({
				publish: {
					myName: "Scott",
					nameColor: "orange"
				}
			});
		</script>
	<element>	

## Attributes and Properties

Another Toolkit convention is that public properties are settable by attribute. For example, we could deploy the `name-tag` example above like this:

	<name-tag myname="Steve" namecolor="tomato"></name-tag>

When the `name-tag` is created, or when the attributes change value, those attributes values are reflected into their matching properties. Remember, only _public_ properties are settable via attribute.

#### Attributes Attribute

Because of the importance of being able to set public properties via attribute, Toolkit supports declaring public properties directly on the element tag via the _attributes_ attribute. 

Alternate `name-tag` declaration:

	<element name="name-tag" attributes="myName nameColor">
		<template>
			Hello! My name is <span style="color:{{nameColor}}">{{myName}}</span>
		</template>
		<script>
			this.component({
				nameColor: "orange"
			});
		</script>
	<element>	
 
In this case, `name-tag` declares two attributes, which is semantically the same as declaring them in a publish block. The one difference is that properties declared as attributes default to 'undefined' unless defaults are set in the prototype (as done for _nameColor_ above).

#### Binding and Custom Attributes

Toolkit makes it possible to bind references between components via attributes. Generally, attributes are only string-valued, so the binding engine interprets reference bindings specially (in particular, interrogating an attribute for a bound dreference property will just return the binding expression [the mustache]).

Let's modify our `name-tag` to take a record instead of individual properties.

	<element name="name-tag" attributes="person">
		<template>
			Hello! My name is <span style="color:{{person.nameColor}}">{{person.name}}</span>
		</template>
		<script>
			this.component({
				person: {
					name: "Scott",
					nameColor: "orange"
				}
			});
		</script>
	<element>

Now, imagine we make a new component called 'visitor-creds' that uses `name-tag`:

	<element name="visitor-creds">
		<template>
			<name-tag person="{{person}}"></name-tag>
		</template>
		<script>
			this.component({
				person: {
					name: "Scott",
					nameColor: "orange"
				}
			});
		</script>
	<element>

When I make an instance of `visitor-creds`, it's `person` object is bound to the `name-tag` instance, so now both components are using the same `person` object.

## Automatic Node Finding

Another useful feature of Toolkit is node reference marshalling. Every node in a component's shadow DOM that is tagged with an _id_ attribute is automatically referenced in the `this.$` hash. 

Given

	<template>
		<input id="nameInput">
	</template>

We can write code like so:

	<script>
		this.component({
			logNameValue: function() {
				console.log(this.$.nameInput.value);
			}
		});
	</script>

As described, a reference to the `<input>` node is available in `this.$` hash mapped to the given id (*nameInput*, in this case).
