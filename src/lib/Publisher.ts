import fetch from 'node-fetch'

export class EventPublisher {
  baseUrl: string
  debugMode: boolean
  constructor(baseUrl: string, debugMode: boolean = false) {
    this.baseUrl = baseUrl
    this.debugMode = debugMode
  }

  async publish<MessageType = any, TopicsType = string>(topic: TopicsType, message: MessageType) {
    try {
      const res = await fetch(`${this.baseUrl}/sendMessageToTopic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: topic,
          message_body: message
        })
      })

      if (this.debugMode) {
        try {
          const data = await res.json()
          if (data) {
            console.log(`sent response : ${JSON.stringify(data, null, '\t')}`)
          }
        } catch (therr) {
          console.error(`server return 200 ok i got error while parsing response`)
        }
      }
    } catch (err) {
      throw err
    }
  }
}
