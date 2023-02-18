"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _EventConsumer_instances, _EventConsumer_processEvent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventConsumer = void 0;
const eventsource_1 = __importDefault(require("eventsource"));
class EventConsumer {
    constructor(baseUrl, opts) {
        _EventConsumer_instances.add(this);
        this.callBackEvents = {
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
        this.baseUrl = baseUrl;
        this.opts = {
            retryConnectionInterval: typeof (opts === null || opts === void 0 ? void 0 : opts.retryConnectionInterval) != "undefined" ? opts === null || opts === void 0 ? void 0 : opts.retryConnectionInterval : 0,
            headers: typeof (opts === null || opts === void 0 ? void 0 : opts.retryConnectionInterval) != "undefined" ? opts === null || opts === void 0 ? void 0 : opts.headers : undefined,
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
        this.eventSource = new eventsource_1.default(`${this.baseUrl}/consume?${_topics}`, Object.assign({}, this.opts.headers));
        this.eventSource.onopen = (evt) => {
            __classPrivateFieldGet(this, _EventConsumer_instances, "m", _EventConsumer_processEvent).call(this, "open", evt);
        };
        this.eventSource.onmessage = (evt) => {
            __classPrivateFieldGet(this, _EventConsumer_instances, "m", _EventConsumer_processEvent).call(this, "message", evt);
        };
        this.eventSource.onopen = (evt) => {
            __classPrivateFieldGet(this, _EventConsumer_instances, "m", _EventConsumer_processEvent).call(this, "open", evt);
        };
    }
    on(type, cb) {
        this.callBackEvents[type] = cb;
    }
}
exports.EventConsumer = EventConsumer;
_EventConsumer_instances = new WeakSet(), _EventConsumer_processEvent = function _EventConsumer_processEvent(type, event) {
    var _a, _b, _c, _d, _e, _f;
    const obj = Object.assign({}, Object.assign({}, event));
    if (type == "error") {
        typeof ((_a = this.callBackEvents) === null || _a === void 0 ? void 0 : _a.error) == "function" && ((_b = this.callBackEvents) === null || _b === void 0 ? void 0 : _b.error(obj));
    }
    else if (type == "message") {
        obj.data = JSON.parse(obj.data).event;
        typeof ((_c = this.callBackEvents) === null || _c === void 0 ? void 0 : _c.message) == "function" && ((_d = this.callBackEvents) === null || _d === void 0 ? void 0 : _d.message(obj));
    }
    else if (type == "open") {
        typeof ((_e = this.callBackEvents) === null || _e === void 0 ? void 0 : _e.open) == "function" && ((_f = this.callBackEvents) === null || _f === void 0 ? void 0 : _f.open(obj));
    }
};
