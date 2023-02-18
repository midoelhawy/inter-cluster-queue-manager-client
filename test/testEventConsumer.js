"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Consumer_1 = require("../src/lib/Consumer");
(async () => {
    const consumer = new Consumer_1.EventConsumer('http://127.0.0.1:3600', {});
    consumer.on("error", (err) => {
        console.error(err);
    });
    consumer.on("open", (e) => {
        console.log(`Connection succussifly established`, e);
    });
    consumer.on("message", (msg) => {
        console.log('new messsage', msg);
    });
    consumer.startConsumeFromTopics("deals");
})();
