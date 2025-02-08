const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0dKY3hzeGVEMWFubnBlZ1Y1WEgzRU5sZ0ZZQ3I4dXZYaFQvTFJLL0Jsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQy9GTys4Y1lqUE1hN3RIQU5MYmswWDZMNGdZTThOQ2t0SytiR1ltQkR3RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQVVKRTY1dUNqZHdqbVJCKzBKVnFhUnJIb3lWZzdNQVdZWW8rMnVOc253PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRlg0R3dQbW95UFlrMWFvUTg3Q1d3MmtZMjdEcHdiaVBwMUtIdHlJM1cwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlKRUh5aFpBR0tFMUpicHBkQ24ralE1ZFgxYndFUmdsMlIrdGgxOWZHbTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlMrT045akpCZ0JyU2x3bnZ1TXIyMXlWRnNXZnpITXdoR3ZYaWhtTnY3bnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUtqZjNCTkw5MGIyYnpCSXRRRjBwSFhEbUhQTTBjWDQ2RUxOcmxxVWQybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWNISUx3UXIrWmdNR0QvZlFrQnhORjBaUnBGSUM2V3ZkTytWMHQvS2huND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklSODVIZVhFWDUzT0JXZjFIVHhQdEg4N0pDVkdlU0dtemlWZ2RiQmlWUzNMYU90VzVrQUg0RzBkWVZYUGJRWlBrZ2w1SEdUY1RnUUZrM0NXYmkwV0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiI2OFRITGdXTDlpc0xQdzQ5ZTU3aEZQU20zeS9CSjhya09kUUUwZXVnS1kwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwVTZweFRHWlFQZUF1X1Y1TFB3LWxRIiwicGhvbmVJZCI6IjZjMjIwNDc0LTdhMzItNDUwMi1iOTZhLWRlZTQ2YjNlZmEzOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHZjJtV20wUFBKRjJvTGF1cFE2SFVVRldMWUU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY25YbVVXSFlaMmhFeDBwYmJXSzdQWVFydmFVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilk5Q0hCNkM2IiwibWUiOnsiaWQiOiI5NDc4OTg5NzI4Njo0MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJSQVNJWUEgT0ZGSUNJQUwgT1dORVIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BUdzNwMEdFTC9tbkwwR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IllHSzc4U0ZyY0tQWllhYnFWRGdIVGVMZDRkWlA4Sm91S0N6RGdNMnhoeDg9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik1qK09UUDJydzAwUkhCTUVFRzdJWkw5N3dtaW0xaXVDOXJtaWt4Y0hXd1laZlF1ZmRmbGJaQ0hEOVluZzJCU2lndkh2L1NwNkFsdjM1RlVYdnZHbURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJRZUNQaFBoN3BDeXN3MTVoWHlJS0hNd04rdlF4Z0JkZnoyT21USGlxNGRTK2l2ZTZaQzlZM3NzMXdzWWlPaHhVTVNvMmhXUjJMVEZnN1pRSVlHaEJDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0Nzg5ODk3Mjg2OjQwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldCaXUvRWhhM0NqMldHbTZsUTRCMDNpM2VIV1QvQ2FMaWdzdzRETnNZY2YifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzkwMTA4OTJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'on',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
