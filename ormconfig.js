const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
const nodeEnvironment = process.env.NODE_ENV || "develop";
module.exports = [
    {
        name : 'default',
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'nikhil',
        password: process.env.DB_PASS || '8143',
        database: process.env.DB_NAME || 'test_db',
        synchronize: false,
        migrationsRun: false,
        logging: process.env.NODE_ENV !== 'production',
        "entities": [
            nodeEnvironment === "develop" ? "src/entity/**/*.ts" : "dist/entity/**/*.js"
        ],
        "migrations": [
            nodeEnvironment === "develop" ? "src/migration/**/*.ts" : "dist/migration/**/*.js"
        ],
        cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/migration'
        },
        extra: {
            poolSize: 10,
            connectionTimeoutMillis: 2000
        },
        // cache: {
        //     type: 'redis',
        //     options: {
        //         url: process.env.REDIS_CACHE
        //     }
        // },
        namingStrategy: new SnakeNamingStrategy()
    }
]