# INTER-CLUSTER-QUEUE-MANAGER-CLIENT

This is a simple NodeJsClient to consume and publish from [interClusterQueueManagerServer](https://github.com/midoelhawy/inter-cluster-queue-manager)

## How to use It ?

##### - Initialize the consumer  :

```typescript
    const consumer  = new EventConsumer('http://127.0.0.1:3600',{});
```

##### Declere your CallBacks on events:

```typescript
    consumer.on("error",(err)=>{
        console.error(err)
    })
    consumer.on("open",(e)=>{
        console.log(`Connection succussifly established`,e)
    })

    consumer.on("message",(msg)=>{
        // @example : {"type":"message","data":{"timestamp":"2023-02-18T11:24:44.679Z","event":{"user":"10"},"topic":"deals"},"lastEventId":"","origin":"http://127.0.0.1:3600"}
        console.log('new messsage',msg)
    })
```

Now you can start consuming from your topics:

```typescript
    consumer.startConsumeFromTopics(["deals","notifications","etc..."]);

```

# HOW to use publisher

The publisher is used to send event to topics


##### - Initialize the publisher  :
```typescript
    const publisher = new EventPublisher('http://127.0.0.1:3600');
```



##### - start to publish your events  :
```typescript
        try {
            await publisher.publish("deals", {
                user: +(Math.random() * 1000).toFixed(),
                status: "open",
                extra: {
                    boh: true
                }
            })


            console.log("Ok");

        } catch (err) {
            console.error("Error while sending event")
        }
```