import amqp from "amqp-connection-manager";
import { ChannelWrapper } from "amqp-connection-manager";
import { ConfirmChannel } from "amqplib";
import { RABBITMQ_URL } from "@/env";

if(!RABBITMQ_URL){
    throw new Error("rabbit mq url is not defined")
}

const connection=amqp.connect([RABBITMQ_URL]);

connection.on("connect",()=>console.log("rabbitmq is connected"))
connection.on("disconnect",()=>console.log("rabbitmq is disconnected"))
connection.on("connectFailed",()=>console.log("rabbitmq's connection is failed"))

// Safe reconnect :

const channelWrapper:ChannelWrapper=connection.createChannel({
    json:true,
    setup:async(channel:ConfirmChannel)=>{
        await channel.assertQueue("user.created",{durable:true})
    }
})

export {
    connection,
    channelWrapper
}