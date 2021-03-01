var cron = require('node-cron');
const config = require('../config/config');
const moment = require('moment');

// mqqt
const mqtt = require('mqtt');
const converter = require('utf8-string-bytes')
const { utf8ByteArrayToString, stringToUtf8ByteArray } = require('utf8-string-bytes');

const RecordsSchema = require('../modals/records');


var task = cron.schedule('* * * * *', () => {
  try {
    console.log('cron job running');

    // cron job
    var client = mqtt.connect("mqtt://192.46.215.19", 1883);

    client.on('connect', function (connect) {
      if (connect.returnCode !== 0) {
        return res.json({ error: err });
      } else {
        client.subscribe('/result/return', function (err, granted) {
          console.log('Subscribed to topics: ' + JSON.stringify(granted));
        });
      }
    })

    client.on('message', function (topic, message) {
      client.end();
      // console.log('message', message);
      const out = utf8ByteArrayToString(message)
      // console.log('out', out);
      const output = JSON.parse(out);
      // console.log('output', output);

      const d = new Date();

      const record = new RecordsSchema({
        tag: output.data.tag,
        pointName: output.data.pointName,
        pointId: output.data.pointId,
        propertyName: output.data.properties[0].propertyName,
        propertyValue: output.data.properties[0].propertyValue,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
      })

      // console.log('record', record);

      record.save().then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error)
      });

    })
  } catch (error) {
    console.log(error);
  }

}, {
  scheduled: true
});


exports.start = function (req, res) {
  task.start();
  console.log(task.getStatus())
}

exports.stop = function (req, res) {
  task.stop();
  console.log(task.getStatus())
  return res.send({ message: 'cron job stopped...' })
}

exports.destroy = function (req, res) {

}

function isElligible(starttime, endtime) {
  let date = moment(new Date()).format("MM-DD-YYYY");
  let start_time = moment(new Date(date + ' ' + starttime));
  let end_time = moment(new Date(date + ' ' + endtime));
  let current_time = moment(new Date());
  return start_time.isSameOrBefore(current_time) && end_time.isSameOrAfter(current_time);
}