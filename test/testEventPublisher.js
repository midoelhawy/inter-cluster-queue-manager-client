"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Publisher_1 = require("../src/lib/Publisher");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const publisher = new Publisher_1.EventPublisher('http://127.0.0.1:3600');
    while (true) { // only for test
        try {
            yield publisher.publish("deals", {
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
        yield new Promise((resolve, reject) => {
            setTimeout(resolve, +(Math.random() * 5000).toFixed());
        });
    }
}))();
