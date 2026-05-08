import * as fs from 'fs';
import * as path from 'path';

// Manual .env loader
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

import { DataSource } from 'typeorm';
import { Task } from '../task/entities/task.entity'; // import Entity ของคุณเข้ามา

// 1. เตรียมข้อมูล 30 รายการของคุณ
const tasksData = [
    {
      id: 1,
      title: 'Setup Next.js & Tailwind',
      status: 'Done',
      priority: 'High',
      userId: 1,
    },
    {
      id: 2,
      title: 'Install shadcn/ui components',
      status: 'Done',
      priority: 'High',
      userId: 1,
    },
    {
      id: 3,
      title: 'Create Dashboard UI',
      status: 'In Progress',
      priority: 'Medium',
      userId: 2,
    },
    {
      id: 4,
      title: 'Implement Lazy Loading Chart',
      status: 'Todo',
      priority: 'Low',
      userId: 2,
    },
    {
      id: 5,
      title: 'Fetch Users API with error handling',
      status: 'In Progress',
      priority: 'High',
      userId: 3,
    },
    {
      id: 6,
      title: 'Design Empty State layout',
      status: 'Todo',
      priority: 'Medium',
      userId: 4,
    },
    {
      id: 7,
      title: 'Create Tasks Page',
      status: 'Done',
      priority: 'High',
      userId: 5,
    },
    {
      id: 8,
      title: 'Implement Pagination logic',
      status: 'Todo',
      priority: 'High',
      userId: 5,
    },
    {
      id: 9,
      title: "Add 'Load More' button",
      status: 'Todo',
      priority: 'Medium',
      userId: 1,
    },
    {
      id: 10,
      title: 'Setup json-server',
      status: 'Done',
      priority: 'High',
      userId: 1,
    },
    {
      id: 11,
      title: 'Fix ESLint errors',
      status: 'In Progress',
      priority: 'Medium',
      userId: 2,
    },
    {
      id: 12,
      title: 'Write unit tests for UI',
      status: 'Todo',
      priority: 'Low',
      userId: 3,
    },
    {
      id: 13,
      title: 'Review PR for Dashboard',
      status: 'Todo',
      priority: 'High',
      userId: 4,
    },
    {
      id: 14,
      title: 'Optimize images',
      status: 'Todo',
      priority: 'Low',
      userId: 5,
    },
    {
      id: 15,
      title: 'Deploy to Vercel',
      status: 'Todo',
      priority: 'High',
      userId: 1,
    },
    {
      id: 16,
      title: 'Update README.md',
      status: 'Done',
      priority: 'Low',
      userId: 2,
    },
    {
      id: 17,
      title: 'Fix memory leak in charts',
      status: 'In Progress',
      priority: 'High',
      userId: 3,
    },
    {
      id: 18,
      title: 'Add dark mode support',
      status: 'Todo',
      priority: 'Medium',
      userId: 4,
    },
    {
      id: 19,
      title: 'Refactor user authentication',
      status: 'Todo',
      priority: 'High',
      userId: 5,
    },
    {
      id: 20,
      title: 'Integrate payment gateway',
      status: 'Todo',
      priority: 'High',
      userId: 1,
    },
    {
      id: 21,
      title: 'Create marketing assets',
      status: 'In Progress',
      priority: 'Medium',
      userId: 2,
    },
    {
      id: 22,
      title: 'Setup CI/CD pipeline',
      status: 'Done',
      priority: 'High',
      userId: 3,
    },
    {
      id: 23,
      title: 'Write API documentation',
      status: 'Todo',
      priority: 'Low',
      userId: 4,
    },
    {
      id: 24,
      title: 'Optimize database queries',
      status: 'In Progress',
      priority: 'High',
      userId: 5,
    },
    {
      id: 25,
      title: 'Design new logo',
      status: 'Done',
      priority: 'Medium',
      userId: 1,
    },
    {
      id: 26,
      title: 'Implement search functionality',
      status: 'Todo',
      priority: 'High',
      userId: 2,
    },
    {
      id: 27,
      title: 'Fix responsive layout bugs',
      status: 'In Progress',
      priority: 'Medium',
      userId: 3,
    },
    {
      id: 28,
      title: 'Setup monitoring tools',
      status: 'Todo',
      priority: 'Low',
      userId: 4,
    },
    {
      id: 29,
      title: 'Conduct user testing',
      status: 'Todo',
      priority: 'High',
      userId: 5,
    },
    {
      id: 30,
      title: 'Prepare release notes',
      status: 'Todo',
      priority: 'Medium',
      userId: 1,
    },
  ];

// 2. ตั้งค่า Connection Database (ใช้ค่าเดียวกับใน app.module.ts ของคุณ)
const AppDataSource = new DataSource({
  type: 'postgres', // เปลี่ยนเป็น mysql หรือ sqlite ตามที่คุณใช้จริง
  host: String(process.env.POSTGRES_HOST),
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DATABASE),
  entities: [Task], // ใส่ Entity ที่เกี่ยวข้อง
});

async function runSeed() {
  try {
    // เปิด Connection
    await AppDataSource.initialize();
    console.log('⏳ Start seeding to TypeORM...');

    // 3. ใช้ QueryBuilder ในการทำ Bulk Insert
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Task)
      .values(tasksData)
      .orIgnore() // ข้ามรายการที่ id ซ้ำ (สำหรับ MySQL / SQLite)
      // .onConflict(`("id") DO NOTHING`) // **ถ้าคุณใช้ PostgreSQL ให้ใช้บรรทัดนี้แทน orIgnore()**
      .execute();

    console.log(`✅ Seeding finished. Inserted ${tasksData.length} tasks.`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    // ปิด Connection เมื่อทำงานเสร็จ
    await AppDataSource.destroy();
  }
}

runSeed();
