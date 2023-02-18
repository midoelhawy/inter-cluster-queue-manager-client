"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Publisher_1 = require("../src/lib/Publisher");
(async () => {
    const publisher = new Publisher_1.EventPublisher('http://127.0.0.1:3600');
    while (true) { // only for test
        try {
            await publisher.publish("deals", {
                user: +(Math.random() * 1000).toFixed(),
                status: "open",
                extra: {
                    boh: true
                }
            });
            console.log("Ok");
        }
        catch (err) {
            console.error("Error while sending event");
        }
        // waite for some time before sending new event to debug 
        await new Promise((resolve, reject) => {
            setTimeout(resolve, +(Math.random() * 5000).toFixed());
        });
    }
})();
