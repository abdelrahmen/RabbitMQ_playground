const amqp = require("amqplib");

const connectionURL = require("./connectionURL");
const msg = { number: process.argv[2] };

connect();
async function connect() {
  try {
    const connection = await amqp.connect(connectionURL);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    channel.consume("jobs", (msg) => {
      let input = JSON.parse(msg.content.toString());
      console.log(`recieved this job: ${JSON.stringify(input)}`);
      channel.ack(msg);
    });
  } catch (err) {
    console.log(err);
  }
}
