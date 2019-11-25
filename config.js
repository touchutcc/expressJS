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
    },
    pythonServer:{
        server_ip:'127.0.0.1',
        port:5000,
        url:'' // todo
    }
}