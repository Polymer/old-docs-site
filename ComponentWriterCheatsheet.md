# Component Writer's Cheatsheet

## Basic Component

### custom element
	
*my-element.html*

		<element name="my-element">
			<template>
				This is <b>my-element</b>. There are many like it, but this one is mine.
			</template>
		</element>

*index.html*

		<!DOCTYPE html>
		<html>
		  <head>
		    <script src="../platform/platform.js"></script>
			<link rel="import" href="my-element.html">
		  </head>
		  <body>
			<my-element></my-element>
	      </body>
		</html>

## Toolkit Components

### custom element with Toolkit features

*tk-element.html*

		<element name="tk-element">
			<template>
				This is a <b>tk-element</b>.
			</template>
			<script>
				this.component();
			</script>
		</element>

#### data binding

*tk-element.html*

		<element name="tk-element">
			<template>
				This is a {{owner}}'s <b>tk-element</b>.
			</template>
			<script>
				this.component({
				  owner: "Daniel"
				});
			</script>
		</element>

### public data

*tk-element.html*

		<element name="tk-element" attributes="owner">
			<template>
				This is a {{owner}}'s <b>tk-element</b>.
			</template>
			<script>
				this.component({
				  owner: "Daniel"
				});
			</script>
		</element>

*index.html*

		<!DOCTYPE html>
		<html>
		  <head>
		    <script src="../platform/platform.js"></script>
			<link rel="import" href="tk-element.html">
		  </head>
		  <body>
			<tk-element owner="Yvonne"></tk-element>
			<script>
			  alert(document.querySelector("tk-element").owner); // alerts "Yvonne"
			</script>
	      </body>
		</html>

### event delegation

*tk-element.html*

		<element name="tk-element" attributes="owner">
			<template>
				This is a <span on-click="identifyAction">{{owner}}'s</span> <b>tk-element</b>.
			</template>
			<script>
				this.component({
				  owner: "Daniel",
				  identifyAction: function() {
				    this.alert(this.owner);
				  }
				});
			</script>
		</element>

### arbitrary public API

*tk-element.html*

		<element name="tk-element">
			<template>
				This is a {{owner}}'s <b>tk-element</b>.
			</template>
			<script>
				this.component({
				  alertId: function(inId) {
				    alert(inId);
				  },
				  publish: {
				  	owner: "Daniel"
					identify: function() {
					  this.alertId(this.owner);
					}
				  }
				});
			</script>
		</element>

*index.html*

		<!DOCTYPE html>
		<html>
		  <head>
		    <script src="../platform/platform.js"></script>
			<link rel="import" href="tk-element.html">
		  </head>
		  <body>
			<tk-element owner="Yvonne"></tk-element>
			<script>
			  document.querySelector("tk-element").identify(); // alerts "Yvonne"
			</script>
	      </body>
		</html>