const fs = require('fs');
const decodeBase64Image = async (encodeData, type, decode) => {
    const buffer = new Buffer.from(encodeData, type)
    decode(buffer)
}

module.exports = io => {
    io.on('connection', socket => {
        console.log('Connected socketIO');
        socket.on('sendphoto', data => {
            const { Base64, name, type } = data
            pathName = `./dataSet/${name}`
            decodeType = type.split(";").pop()
            decodeBase64Image(Base64,decodeType, decode => {
                console.log(decode);
                
                fs.writeFileSync(pathName, decode);
            })
        })
    })
    setInterval(() => {
        const nowDate = (new Date()) / 1
        console.log(`Ping: ${nowDate}`);
        io.emit('ping', { data: nowDate })
    }, 1000)
}