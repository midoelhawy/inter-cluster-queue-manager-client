"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPublisher = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class EventPublisher {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async publish(topic, message) {
        try {
            await (0, node_fetch_1.default)(`${this.baseUrl}/sendMessageToTopic`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'topic': topic,
                    'message_body': message
                })
            });
            //const data = await  res.json();
        }
        catch (err) {
            throw err;
        }
    }
}
exports.EventPublisher = EventPublisher;
