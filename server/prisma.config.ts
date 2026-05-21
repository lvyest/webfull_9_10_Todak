import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

config({ path: path.join(rootDir, '.env') });

// generate는 DB 연결 없이 동작하지만, v7 config에서 url 필드는 필요함
const databaseUrl =
  process.env.DATABASE_URL ?? 'postgresql://localhost:5432/todak?schema=public';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
