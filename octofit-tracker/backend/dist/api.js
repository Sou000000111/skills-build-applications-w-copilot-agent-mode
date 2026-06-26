"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApiRoutes = registerApiRoutes;
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const router = express_1.default.Router();
router.get('/users/', async (_req, res) => {
    const users = await models_1.User.find().sort({ score: -1, createdAt: -1 });
    res.json(users);
});
router.post('/users/', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
router.get('/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().sort({ createdAt: -1 });
    res.json(teams);
});
router.post('/teams/', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
router.get('/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().sort({ createdAt: -1 });
    res.json(activities);
});
router.post('/activities/', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.Leaderboard.find().sort({ rank: 1 });
    res.json(leaderboard);
});
router.get('/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().sort({ createdAt: -1 });
    res.json(workouts);
});
router.post('/workouts/', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
function registerApiRoutes(app) {
    app.use('/api', router);
}
