module.exports = {
    mongodb: {
        url: 'mongodb://localhost:27017/sa',
        options: { useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    jwt: {
        secret: 'jwt-secret-key',
        options: {}
    }
}