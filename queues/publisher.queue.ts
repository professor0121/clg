import { channelWrapper } from "@/config";

const publishUserCreated = async (data: any) => {
  await channelWrapper.sendToQueue("user.created", data, { persistent: true });
  console.log("Message sent successfully !")
};

export {
    publishUserCreated
}