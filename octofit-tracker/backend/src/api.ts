import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
    score: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    members: [{ type: String }],
  },
  { timestamps: true },
);

const activitySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, default: 'general' },
    duration: { type: Number, default: 30 },
    intensity: { type: String, default: 'moderate' },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Workout = mongoose.model('Workout', workoutSchema);

router.get('/users/', async (_req, res) => {
  const users = await User.find().sort({ score: -1, createdAt: -1 });
  res.json(users);
});

router.post('/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/teams/', async (_req, res) => {
  const teams = await Team.find().sort({ createdAt: -1 });
  res.json(teams);
});

router.post('/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get('/activities/', async (_req, res) => {
  const activities = await Activity.find().sort({ createdAt: -1 });
  res.json(activities);
});

router.post('/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.get('/leaderboard/', async (_req, res) => {
  const users = await User.find().sort({ score: -1, createdAt: -1 });
  res.json(users.map(({ name, score }) => ({ name, score })));
});

router.get('/workouts/', async (_req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.json(workouts);
});

router.post('/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export function registerApiRoutes(app: express.Application): void {
  app.use('/api', router);
}
