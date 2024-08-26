// registerSchema.ts
import { z } from 'zod';
import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry';
import zodToJsonSchema from 'zod-to-json-schema';

// Define the Zod schema
export const UserEventSchema = z.object({
  userId: z.string(),
  eventType: z.enum(['login', 'logout', 'signup']),
  timestamp: z.string(),
});

export type UserEvent = z.infer<typeof UserEventSchema>;

// Convert Zod schema to JSON schema
const jsonSchema = zodToJsonSchema(UserEventSchema, "UserEvent");

const registry = new SchemaRegistry({ host: 'http://localhost:8081' });

export const registerSchema = async () => {
  const schema = {
    type: SchemaType.JSON,
    schema: JSON.stringify(jsonSchema),
  };

  const { id } = await registry.register(schema);
  return id;
};
