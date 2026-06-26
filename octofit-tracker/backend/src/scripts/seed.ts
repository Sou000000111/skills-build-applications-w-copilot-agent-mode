import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
async function seedDatabase(): Promise<void> {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(uri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava@example.com', role: 'captain', score: 920 },
    { name: 'Noah Patel', email: 'noah@example.com', role: 'member', score: 875 },
    { name: 'Mina Alvarez', email: 'mina@example.com', role: 'member', score: 842 },
  ]);

  await Team.insertMany([
    {
      name: 'North Star Squad',
      description: 'Early morning runners and strength trainers',
      members: users.map((user) => user.name),
    },
    {
      name: 'Riverstone Cyclists',
      description: 'Weekend endurance and recovery rides',
      members: ['Ava Chen', 'Noah Patel'],
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0].id,
      type: 'run',
      duration: 45,
      notes: 'Tempo run with a strong finish',
    },
    {
      userId: users[1].id,
      type: 'strength',
      duration: 60,
      notes: 'Upper body and core circuit',
    },
    {
      userId: users[2].id,
      type: 'yoga',
      duration: 30,
      notes: 'Mobility flow',
    },
  ]);

  await Leaderboard.insertMany([
    { name: 'Ava Chen', score: 920, rank: 1 },
    { name: 'Noah Patel', score: 875, rank: 2 },
    { name: 'Mina Alvarez', score: 842, rank: 3 },
  ]);

  await Workout.insertMany([
    {
      title: 'HIIT Cardio Burst',
      focus: 'cardio',
      duration: 25,
      intensity: 'high',
    },
    {
      title: 'Lower Body Power',
      focus: 'strength',
      duration: 45,
      intensity: 'moderate',
    },
  ]);

  console.log('Seed the octofit_db database with test data');
  console.log('Seeded users, teams, activities, leaderboard, and workouts.');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
