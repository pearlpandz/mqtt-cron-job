
const mqtt = require('mqtt');
// const mqtt = require('mqtt-packet');
const converter = require('utf8-string-bytes')
const { utf8ByteArrayToString, stringToUtf8ByteArray } = require('utf8-string-bytes');
const RecordsSchema = require('../modals/records');

// mqtt
var options = {
    port: 1883,
    host: 'mqtt://192.46.215.19',
    // username: 'geomeo',
    // password: '12345'
};


exports.getDeviceStatus1 = async (req, res) => {

    const object = {
        cmd: 'publish',
        retain: false,
        qos: 0,
        dup: false,
        length: 10,
        topic: '/result/return',
        payload: JSON.stringify({ "status": "200", "data": { "clientId": "27790", "tag": "MODBUS-/dev/ttyUSB0-1", "pointName": "B Phase", "pointId": 40147 } })
    };

    const opts = { protocolVersion: 4 };

    const byetArr = mqtt.generate(object)
    const out = utf8ByteArrayToString(byetArr)
    // const output = JSON.parse(out.split('/result/return'));

    return res.send({ data: out });

    // const record = new RecordsSchema({
    //     clientId: output.data.clientId,
    //     tag: output.data.tag,
    //     pointName: output.data.pointName,
    //     pointId: output.data.pointId
    // })

    // record.save(function (err, result) {
    //     if (err) {
    //         return res.status(400).send({
    //             success: false,
    //             message: err.toString(),
    //         });
    //     } else {
    //         return res.status(200).send({
    //             success: true,
    //             data: result
    //         });
    //     }
    // });
}


exports.getDeviceStatus2 = async (req, res) => {
    var client = mqtt.connect("mqtt://192.46.215.19", options);



    const object = {
        retain: false,
        qos: 0,
        dup: false
    };

    client.publish(
        '/result/return',
        JSON.stringify({ "status": "200", "data": { "clientId": "27790", "tag": "MODBUS-/dev/ttyUSB0-1", "pointName": "B Phase", "pointId": 40147 } }),
        object, (err, result) => {
            if (err) {
                return res.json({ error: err });
            } else {
                return res.json({ data: result });
            }
        })
}


exports.getDeviceStatus = async (req, res) => {
    try {
        
        var client = mqtt.connect("mqtt://192.46.215.19", 1883);

        client.on('connect', function (connect) {
            if (connect.returnCode !== 0) {
                return res.json({ error: err });
            } else {
                client.subscribe('/result/return')
            }
        })

        client.on('message', function (topic, message) {
            client.end()
            const out = utf8ByteArrayToString(message)
            return res.json({ response: JSON.parse(out) })
        })
    } catch (error) {
        
        return res.json({ error }) 
    }
}