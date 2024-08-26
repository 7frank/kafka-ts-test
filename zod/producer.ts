// producer.ts
import { Kafka } from 'kafkajs';
import { registerSchema, UserEvent, UserEventSchema } from './registerSchema';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const produceUserEvent = async (event: UserEvent) => {
  // Validate the event using Zod
  UserEventSchema.parse(event);

  await producer.connect();

  const schemaId = await registerSchema();
  const encodedValue = await registry.encode(schemaId, event);

  await producer.send({
    topic: 'user-events',
    messages: [{ value: encodedValue }],
  });

  await producer.disconnect();
};

// Example usage
produceUserEvent({
  userId: '123',
  eventType: 'login',
  timestamp: new Date().toISOString(),
}).catch(console.error);
