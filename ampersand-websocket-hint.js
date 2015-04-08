// Copyright (c) 2015 Isode Limited.
// All rights reserved.
// See the LICENSE file for more information.

var setupListeners = function(model) {
  //console.log("Setup Listeners");
  if (!model.websocket || model.ampersandWebsocketHintInit) {
    return;
  }
  model.ampersandWebsocketHintInit = true;
  var self = model;
  var handleMessage = function(message) {
    //console.log("Parsing WS message " + message.data);
    try {
      var data = JSON.parse(message.data);
    }
    catch (err) {
      //console.error("Received bad JSON. " + err);
    }
    var type = data.type;
    if (type != 'ampersand-websocket-hint') {
      //console.log("Skipping non-hint: " + type);
      return;
    }
    var urlRoot = data.urlRoot;
    if (urlRoot != self.urlRoot) {
      //console.log("Skipping different URL: " + urlRoot + " : " + self.urlRoot);
      return;
    }
    //TODO: Abort if data haven't been fetched
    //console.log("Fetching");
    self.fetch();
  };
  model.websocket.addEventListener('message', handleMessage);
};

module.exports = {

  fetchOnWebSocketHints: function(enable) {
    setupListeners(this);
    this.ampersandWebsocketHintEnabled = enable;
  }
};
