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
const Consumer_1 = require("../src/lib/Consumer");
(() => __awaiter(void 0, void 0, void 0, function* () {
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
}))();
