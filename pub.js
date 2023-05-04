const amqp = require("amqplib");

const connectionURL = require("./connectionURL");
const msg = { number: process.argv[2] };

connect();
async function connect() {
  try {
    const connection = await amqp.connect(connectionURL);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`job sent successfuly ${msg.number}`);
    await channel.close();
    await connection.close();
  } catch (err) {
    console.log(err);
  }
}
