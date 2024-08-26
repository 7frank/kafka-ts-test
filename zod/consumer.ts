// consumer.ts
import { Kafka } from 'kafkajs';
import { registerSchema, UserEventSchema } from './registerSchema';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'user-events-group' });

const consumeUserEvents = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const decodedValue = await registry.decode(message.value);
      const event = UserEventSchema.parse(decodedValue); // Validate with Zod again

      console.log('Received event:', event);
      // Process the validated message here
    },
  });
};

// Start consuming
consumeUserEvents().catch(console.error);
