"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventConsumer = void 0;
const eventsource_1 = __importDefault(require("eventsource"));
class EventConsumer {
    opts;
    baseUrl;
    topics;
    eventSource;
    callBackEvents = {
        error: (err) => {
            console.error(err);
        },
        message: (msg) => {
            console.log(msg);
        },
        open: (e) => {
            console.log(e);
        }
    };
    constructor(baseUrl, opts) {
        this.baseUrl = baseUrl;
        this.opts = {
            retryConnectionInterval: typeof opts?.retryConnectionInterval != "undefined" ? opts?.retryConnectionInterval : 0,
            headers: typeof opts?.retryConnectionInterval != "undefined" ? opts?.headers : undefined,
        };
    }
    startConsumeFromTopics(topics) {
        let _topics = '';
        if (Array.isArray(topics)) {
            _topics = topics.map(p => `topic=${p}`).join("&");
        }
        else {
            _topics = `topic=${topics}`;
        }
        this.eventSource = new eventsource_1.default(`${this.baseUrl}/consume?${_topics}`, { ...this.opts.headers });
        this.eventSource.onopen = (evt) => {
            this.#processEvent("open", evt);
        };
        this.eventSource.onmessage = (evt) => {
            this.#processEvent("message", evt);
        };
        this.eventSource.onopen = (evt) => {
            this.#processEvent("open", evt);
        };
    }
    #processEvent(type, event) {
        const obj = Object.assign({}, { ...event });
        if (type == "error") {
            typeof this.callBackEvents?.error == "function" && this.callBackEvents?.error(obj);
        }
        else if (type == "message") {
            obj.data = JSON.parse(obj.data).event;
            typeof this.callBackEvents?.message == "function" && this.callBackEvents?.message(obj);
        }
        else if (type == "open") {
            typeof this.callBackEvents?.open == "function" && this.callBackEvents?.open(obj);
        }
    }
    on(type, cb) {
        this.callBackEvents[type] = cb;
    }
}
exports.EventConsumer = EventConsumer;
