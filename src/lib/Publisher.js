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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPublisher = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class EventPublisher {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    publish(topic, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, node_fetch_1.default)(`${this.baseUrl}/sendMessageToTopic`, {
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
        });
    }
}
exports.EventPublisher = EventPublisher;