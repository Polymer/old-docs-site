---
title: App storage
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

The app storage family of elements gives you a new set of tools for managing data in your app. The
initial set includes ready-made elements for integrating with Firebase and PouchDB.

## Firebase integration

The Firebase 3.0.0 SDK supports a new set of Firebase elements, built with app storage, called
[PolymerFire](https://github.com/Firebase/PolymerFire). These elements make critical
Firebase SDK integrations such as app initialization, user authentication, and database access
declarative, and easier than ever before.

### Offline data mirroring

The [`<app-indexeddb-mirror>`](https://www.webcomponents.org/element/PolymerElements/app-storage/app-indexeddb-mirror)
element provides a read-only mirror of a database like Firebase. This ensures that
users will have access to their personal data even when there is no network available.

Firebase is resilient to temporary losses of network connectivity—like when a user suddenly goes
through a tunnel while using your Firebase app. Firebase continues to work and update the server as
soon it reconnects to the network. But there are other offline cases that Firebase—and other popular
storage layers—don’t handle very well, like when a user starts the app while offline.

## PouchDB Elements

The Polymer [`app-pouchdb`](https://www.webcomponents.org/element/PolymerElements/app-pouchdb) component
contains elements for PouchDB document access, database querying, synchronization across local and
remote databases and even user authentication with a remote CouchDB instance. Since PouchDB can
automatically synchronize data with a local IndexedDB database, it has
never been easier to add offline-first data access to your progressive web app.
