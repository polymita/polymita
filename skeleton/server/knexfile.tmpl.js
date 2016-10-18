module.exports = {
    client: 'sqlite',
    connection: '${Namespace}/data/app.db',
    useNullAsDefault: true,
    debug: true,
    migrations: {
        directory: './source/resource/data/migrations/default',
        tableName: 'default_migrations'
    },
    seeds: {
        directory: './source/resource/data/seeds/default'
    }
};