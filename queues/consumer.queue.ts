import { connection } from "@/config";
import { ConfirmChannel } from "amqplib";

async function startConsumer() {
  const channel = connection.createChannel({
    json: true,
    setup: async (channel :any) => {
      await channel.assertQueue("user.created", {
        durable: true,
      })

      await channel.consume("user.created", (msg : any) => {
        if (!msg) return

        const data = JSON.parse(msg.content.toString())
        console.log("📥 Message received:", data)

        channel.ack(msg)
      })
    },
  })
}

startConsumer()
