import fetch from 'node-fetch';

export class EventPublisher {
    baseUrl: string
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }


    async publish(topic: string, message: any) {
        try {
            await fetch(`${this.baseUrl}/sendMessageToTopic`, {
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

        } catch (err) {
            throw err
        }

    }
}