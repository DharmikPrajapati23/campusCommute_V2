require('dotenv').config();

const FRONTEND_URL = process.env.FRONTEND_URL;
const LLM_URL = process.env.LLM_URL;

module.exports = {
  FRONTEND_URL,
  LLM_URL
};