import express from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const router = express.Router();

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
  const leaderboard = await Leaderboard.find().sort({ rank: 1 });
  res.json(leaderboard);
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
