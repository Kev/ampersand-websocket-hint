# ampersand-websocket-hint

Websocket mixin to allow servers to hint that models and collections have
been updated, and the client can refresh them.

Upon receiving a hint from the server, an Ampersand model that has this
mixin will check if the hint refers to the URL used by this model and if
so will check if it is currently caching data; if it is, it'll refresh
it from the server asynchronously. This means that unfetched models won't
trigger unnecessary traffic (TODO - currently fetches always).

## install

```
npm install ampersand-websocket-hint
```

## example


```javascript
var Model = require('ampersand-model');
var WebSocketHint = require('ampersand-websocket-hint');

var HintedModel = Model.extend(WebSocketHint, {
	props: {
		name: 'string'
	},
	url: '/api/hinted-model'
});

var ws = new WebSocket('ws://...');
var model = new HintedModel();
model.websocket = ws;
model.fetch();

model.fetchOnWebSocketHints(true); // Start listening to change hints
/* Now when the websocket receives a message saying that /api/hinted-model
  has updated, `model` will fetch the new data.
 */
model.fetchOnWebSocketHints(false); // Stop listening

```

## API reference

First do whatever connection and authentication is needed for the websocket to be ready to receive updates over.
Once the websocket is connected, set a reference in the model with `model.websocket = ws`. Fetch the model as usual with `model.fetch()`,
and call `model.fetchOnWebSocketHints(true)` to start fetching the data once hints are received over the websocket.

## Message formats

The websocket messages received need to be JSON, and need to fit this format:

```javascript
{
  type: 'ampersand-websocket-hint',
  url: '/api/hinted-model'
}
```
