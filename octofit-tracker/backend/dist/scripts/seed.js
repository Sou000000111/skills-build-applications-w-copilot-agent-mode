"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const database_1 = require("../database");
// Seed the octofit_db database with test data
async function seedDatabase() {
    await (0, database_1.connectDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.Leaderboard.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
        { name: 'Ava Chen', email: 'ava@example.com', role: 'captain', score: 920 },
        { name: 'Noah Patel', email: 'noah@example.com', role: 'member', score: 875 },
        { name: 'Mina Alvarez', email: 'mina@example.com', role: 'member', score: 842 },
    ]);
    await models_1.Team.insertMany([
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
    await models_1.Activity.insertMany([
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
    await models_1.Leaderboard.insertMany([
        { name: 'Ava Chen', score: 920, rank: 1 },
        { name: 'Noah Patel', score: 875, rank: 2 },
        { name: 'Mina Alvarez', score: 842, rank: 3 },
    ]);
    await models_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
