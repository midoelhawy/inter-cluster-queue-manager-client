import EventSource from 'eventsource'
import { CallBackEvents } from '../interfaces'



export class EventConsumer {
    opts: {
        retryConnectionInterval: number,
        headers?: { [key: string]: string }
    }

    baseUrl: string
    topics?: string|string[]
    eventSource?: EventSource
    callBackEvents: {
        error: (err: { type: "error", message: string }) => void,
        message: (msg: { type: "message", message: string }) => void,
        open: (e: { type: "open" }) => void
    } = {
            error: (err) => {
                console.error(err)
            },
            message: (msg) => {
                console.log(msg)
            },
            open: (e) => {
                console.log(e)
            }
        }


    constructor(baseUrl: string, opts?: { retryConnectionInterval?: number, headers?: { [key: string]: string } }) {
        this.baseUrl = baseUrl;
        this.opts = {
            retryConnectionInterval: typeof opts?.retryConnectionInterval != "undefined" ? opts?.retryConnectionInterval : 0,
            headers: typeof opts?.retryConnectionInterval != "undefined" ? opts?.headers : undefined,
        }
    }



    startConsumeFromTopics(topics:string|string[]) {
        let _topics = ''
        if (Array.isArray(topics)) {
            _topics = topics.map(p=>`topic=${p}`).join("&")
        }else{
            _topics = `topic=${topics}`
        }

        this.eventSource = new EventSource(`${this.baseUrl}/consume?${_topics}`, { ...this.opts.headers });
        this.eventSource.onopen = (evt: any) => {
            this.#processEvent("open", evt)
        }
        this.eventSource.onmessage = (evt: any) => {
            this.#processEvent("message", evt)
        }
        this.eventSource.onopen = (evt: any) => {
            this.#processEvent("open", evt)
        }

    }


    #processEvent(type: CallBackEvents, event: any) {
        const obj = Object.assign({},{...event}) 
        if (type == "error") {
            typeof this.callBackEvents?.error == "function" && this.callBackEvents?.error(obj)
        } else if (type == "message") {
            obj.data = JSON.parse(obj.data).event
            typeof this.callBackEvents?.message == "function" && this.callBackEvents?.message(obj)
        } else if (type == "open") {
            typeof this.callBackEvents?.open == "function" && this.callBackEvents?.open(obj)
        }
    }



    public on(type: "error", cb: (err: { type: "error", message: string }) => void): void;
    public on(type: "message", cb: (msg: { type: "message", message: string }) => void): void;
    public on(type: "open", cb: (e: { type: "open" }) => void): void;
    public on(type: CallBackEvents, cb: any) {
        this.callBackEvents[type] = cb
    }



}