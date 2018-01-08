/**
 * ex09-periodic-getlast
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory (ECCLab)
 * INC @ KMUTT
 * 
 * 06 January, 2017
 * 06.40 PM
 */

let engine = require('../libs/MDBEngine');


/**
 * Create a timer for executing the doPeriodically function every 2 seconds
 */
setInterval(doPeriodically, 2000);


/**
 * This function will be called by the timer
 */
function doPeriodically() {
    engine.connect()
        .then( () => {
            var data = getRandomData();
            return engine.insert(data);
        })
        .then( () => {
            return engine.getLast();
        })
        .then( (lastData) => {
            engine.print(lastData);
            return;
        })
        .then( () => {
            return engine.close();
        });
}

/**
 * Generates data randomly
 */
function getRandomData() {
    var data = {
        _id:  0,
        time:  engine.currentTime(),
        sensor1:  Math.random() * 100,
        sensor2:  Math.random() * 100,
        sensor3:  Math.random() * 100,
        sensor4:  Math.random() * 100,
    };
    return data;
}

/**
 * Results:
 *  check the data printed as a row of table on the console
 *  we can see that the last record is shown every 2 seconds, check _id and time
 */
