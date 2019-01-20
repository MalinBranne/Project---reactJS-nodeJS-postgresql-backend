module.exports = {
    env: 'development',
    db: {
        user: 'postgres',
        host: 'localhost',
        port: '5432',
        password: '0000',
        database:'postgres',
        schema: 'team_one',
    },
    port: process.env.PORT || 3001,
    PRIVATE_SECRET_KEY: 'groupOne',
};