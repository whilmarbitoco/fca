const fs = require("fs");
const login = require("fca-unofficial");

login(
  { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
  (err, api) => {
    if (err) return console.error(err);

    api.setOptions({ listenEvents: true, logLevel: "silent" });

    var stopListening = api.listenMqtt((err, event) => {
      if (err) return console.error(err);

      switch (event.type) {
        case "message":
          let msg = event.body;
          
          if (msg === "$status") {
            api.sendMessage("System Online", event.threadID);
          }
          
          break;
        case "event":
          console.log(event);
          break;
      }
    });
  }
);
