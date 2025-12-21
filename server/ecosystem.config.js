module.exports = {
    apps: [{
        name: "vnivip",
        script: "./dist/main.js",
        env: {
            MODE: 'production',
            PORT: 5000,
            POSTGRES_HOST: '127.0.0.1',
            POSTGRES_USER: 'admin',
            POSTGRES_DB: 'vnivip',
            POSTGRES_PASSWORD: 'admin',
            POSTGRES_PORT: 5432,
            JWT_ACCESS_TOKEN_SECRET_KEY: 'QrFAutu~Ti2~xoT+V0j-',
            JWT_REFRESH_TOKEN_SECRET_KEY: 'QrFAutu~Ti2~xoT+V0j-',
            JWT_DEFAULT_TOKEN_SECRET_KEY: 'QrFAutu~Ti2~xoT+V0j-',
            DB_DIALECT: 'postgres',
            max_memory_restart: "200M",
            ORIGIN: 'https://vnivip.ru',
            SMTP_HOST: 'smtp.timeweb.ru',
            SMTP_PORT: 465,
            EMAIL_USERNAME: 'noreply@vnivip.ru',
            EMAIL_PASSWORD: '3Kl7t9GdR',
            EMAIL_FROM: 'noreply@vnivip.ru',
            EMAIL_TO: 'noreply@vnivip.ru',
        },
    }]
}
