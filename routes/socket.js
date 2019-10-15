const fs = require('fs')
const request = require('request-promise')
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
                // here code to send base64 to server
                options = {
                    method:req.method,
                    uri:`${url}/predict`,
                    form:{
                        model_id:id,
                        buffer:decode
                    }
                }
                request(options).then(v => {
                    res.status(200).json(v)
                }).catch(err => {
                    console.error(err)
                    res.status(400).json(err)
                })
                // end code
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