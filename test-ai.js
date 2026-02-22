import { parseFreeformItinerary } from './src/services/ai.js';
import 'dotenv/config'; // Might need dotenv or just polyfill localstorage
import fs from 'fs';

// localstorage mock
global.localStorage = {
    getItem: (key) => key === 'GEMINI_API_KEY' ? process.env.GEMINI_API_KEY : null
};

// load API key
const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/VITE_GEMINI_API_KEY=(.*)/) || [];
process.env.GEMINI_API_KEY = keyMatch[1]; // assuming the user has it in local info... wait no, they put it in LocalStorage from UI!

console.log("TEST!");
