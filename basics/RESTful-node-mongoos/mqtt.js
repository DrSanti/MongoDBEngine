const mqtt = require('mqtt');
const serverUri = "tcp://iot.eclipse.org:1883";
const client = mqtt.connect(serverUri);


const sub_topic = 'ecc/devices';
const pub_topic = 'ecc/devices';

client.on('connect', (package) => {
    // console.log(package);
    client.subscribe(pub_topic);
    client.publish(pub_topic, 'Connected to ' + serverUri);
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    
    //!! disconnect if require
    //client.end();
});



/**
 Packet {
    cmd: 'connack',
    retain: false,
    qos: 0,
    dup: false,
    length: 2,
    topic: null,
    payload: null,
    sessionPresent: false,
    returnCode: 0 
}
 */