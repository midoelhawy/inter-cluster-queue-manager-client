"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPublisher = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class EventPublisher {
    baseUrl;
    debugMode;
    constructor(baseUrl, debugMode = false) {
        this.baseUrl = baseUrl;
        this.debugMode = debugMode;
    }
    async publish(topic, message) {
        try {
            const res = await (0, node_fetch_1.default)(`${this.baseUrl}/sendMessageToTopic`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'topic': topic,
                    'message_body': message
                })
            });
            if (this.debugMode) {
                try {
                    const data = await res.json();
                    if (data) {
                        console.log(`sent response : ${JSON.stringify(data, null, '\t')}`);
                    }
                }
                catch (therr) {
                    console.error(`server return 200 ok i got error while parsing response`);
                }
            }
        }
        catch (err) {
            throw err;
        }
    }
}
exports.EventPublisher = EventPublisher;
