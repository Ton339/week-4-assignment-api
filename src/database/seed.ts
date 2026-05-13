// paste in terminal
// docker exec tasks-api npm run seed

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
import { Task } from '../task/entities/task.entity';
import { User } from '../user/entities/user.entity';

// 1. เตรียมข้อมูล User
const usersData = [
  {
    name: 'สมชาย ใจดี (Somchai)',
    email: 'somchai@dev.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somchai',
    address: '123 Sukhumvit Road, Bangkok',
    birthdate: '1990-05-15',
    phone: '081-234-5678',
    occupation: 'Software Engineer',
  },
  {
    name: 'สมศรี รักดี (Somsri)',
    email: 'somsri@dev.com',
    role: 'User',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somsri',
    address: '456 Silom Road, Bangkok',
    birthdate: '1992-08-22',
    phone: '089-876-5432',
    occupation: 'Marketing Manager',
  },
  {
    name: 'มานะ ขยัน (Mana)',
    email: 'mana@dev.com',
    role: 'User',
    status: 'Inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mana',
    address: '789 Chiang Mai Road, Chiang Mai',
    birthdate: '1988-11-05',
    phone: '085-555-1234',
    occupation: 'Graphic Designer',
  },
  {
    name: 'ชูใจ ใฝ่รู้ (Chujai)',
    email: 'chujai@dev.com',
    role: 'Editor',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chujai',
    address: '321 Phaya Thai Road, Bangkok',
    birthdate: '1995-02-14',
    phone: '083-333-9876',
    occupation: 'Content Writer',
  },
  {
    name: 'ปิติ ยินดี (Piti)',
    email: 'piti@dev.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Piti',
    address: '654 Pattaya Road, Chonburi',
    birthdate: '1991-09-30',
    phone: '086-666-4567',
    occupation: 'Data Analyst',
  },
];

// 2. เตรียมข้อมูล Task (ปรับให้ใช้ user: { id: ... })
const tasksData = [
  {
    id: 1,
    title: 'Setup Next.js & Tailwind',
    status: 'Done',
    priority: 'High',
    user: { id: 1 },
  },
  {
    id: 2,
    title: 'Install shadcn/ui components',
    status: 'Done',
    priority: 'High',
    user: { id: 1 },
  },
  {
    id: 3,
    title: 'Create Dashboard UI',
    status: 'In Progress',
    priority: 'Medium',
    user: { id: 2 },
  },
  {
    id: 4,
    title: 'Implement Lazy Loading Chart',
    status: 'Todo',
    priority: 'Low',
    user: { id: 2 },
  },
  {
    id: 5,
    title: 'Fetch Users API with error handling',
    status: 'In Progress',
    priority: 'High',
    user: { id: 3 },
  },
  {
    id: 6,
    title: 'Design Empty State layout',
    status: 'Todo',
    priority: 'Medium',
    user: { id: 4 },
  },
  {
    id: 7,
    title: 'Create Tasks Page',
    status: 'Done',
    priority: 'High',
    user: { id: 5 },
  },
  {
    id: 8,
    title: 'Implement Pagination logic',
    status: 'Todo',
    priority: 'High',
    user: { id: 5 },
  },
  {
    id: 9,
    title: "Add 'Load More' button",
    status: 'Todo',
    priority: 'Medium',
    user: { id: 1 },
  },
  {
    id: 10,
    title: 'Setup json-server',
    status: 'Done',
    priority: 'High',
    user: { id: 1 },
  },
  {
    id: 11,
    title: 'Fix ESLint errors',
    status: 'In Progress',
    priority: 'Medium',
    user: { id: 2 },
  },
  {
    id: 12,
    title: 'Write unit tests for UI',
    status: 'Todo',
    priority: 'Low',
    user: { id: 3 },
  },
  {
    id: 13,
    title: 'Review PR for Dashboard',
    status: 'Todo',
    priority: 'High',
    user: { id: 4 },
  },
  {
    id: 14,
    title: 'Optimize images',
    status: 'Todo',
    priority: 'Low',
    user: { id: 5 },
  },
  {
    id: 15,
    title: 'Deploy to Vercel',
    status: 'Todo',
    priority: 'High',
    user: { id: 1 },
  },
  {
    id: 16,
    title: 'Update README.md',
    status: 'Done',
    priority: 'Low',
    user: { id: 2 },
  },
  {
    id: 17,
    title: 'Fix memory leak in charts',
    status: 'In Progress',
    priority: 'High',
    user: { id: 3 },
  },
  {
    id: 18,
    title: 'Add dark mode support',
    status: 'Todo',
    priority: 'Medium',
    user: { id: 4 },
  },
  {
    id: 19,
    title: 'Refactor user authentication',
    status: 'Todo',
    priority: 'High',
    user: { id: 5 },
  },
  {
    id: 20,
    title: 'Integrate payment gateway',
    status: 'Todo',
    priority: 'High',
    user: { id: 1 },
  },
  {
    id: 21,
    title: 'Create marketing assets',
    status: 'In Progress',
    priority: 'Medium',
    user: { id: 2 },
  },
  {
    id: 22,
    title: 'Setup CI/CD pipeline',
    status: 'Done',
    priority: 'High',
    user: { id: 3 },
  },
  {
    id: 23,
    title: 'Write API documentation',
    status: 'Todo',
    priority: 'Low',
    user: { id: 4 },
  },
  {
    id: 24,
    title: 'Optimize database queries',
    status: 'In Progress',
    priority: 'High',
    user: { id: 5 },
  },
  {
    id: 25,
    title: 'Design new logo',
    status: 'Done',
    priority: 'Medium',
    user: { id: 1 },
  },
  {
    id: 26,
    title: 'Implement search functionality',
    status: 'Todo',
    priority: 'High',
    user: { id: 2 },
  },
  {
    id: 27,
    title: 'Fix responsive layout bugs',
    status: 'In Progress',
    priority: 'Medium',
    user: { id: 3 },
  },
  {
    id: 28,
    title: 'Setup monitoring tools',
    status: 'Todo',
    priority: 'Low',
    user: { id: 4 },
  },
  {
    id: 29,
    title: 'Conduct user testing',
    status: 'Todo',
    priority: 'High',
    user: { id: 5 },
  },
  {
    id: 30,
    title: 'Prepare release notes',
    status: 'Todo',
    priority: 'Medium',
    user: { id: 1 },
  },
];

// 2. ตั้งค่า Connection Database (ใช้ค่าเดียวกับใน app.module.ts ของคุณ)
const AppDataSource = new DataSource({
  type: 'postgres', // เปลี่ยนเป็น mysql หรือ sqlite ตามที่คุณใช้จริง
  host: String(process.env.POSTGRES_HOST),
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DB),
  entities: [Task, User], // ใส่ Entity ที่เกี่ยวข้อง
});

async function runSeed() {
  try {
    // เปิด Connection
    await AppDataSource.initialize();
    console.log('⏳ Start seeding to TypeORM...');

    // 3. Seeding Users
    console.log('👤 Seeding Users...');
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values(usersData)
      .onConflict(`("id") DO NOTHING`)
      .execute();

    // 4. Seeding Tasks
    console.log('📋 Seeding Tasks...');
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Task)
      .values(tasksData)
      .onConflict(`("id") DO NOTHING`)
      .execute();

    console.log(
      `✅ Seeding finished. Inserted ${usersData.length} users and ${tasksData.length} tasks.`,
    );
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    // ปิด Connection เมื่อทำงานเสร็จ
    await AppDataSource.destroy();
  }
}

runSeed();
