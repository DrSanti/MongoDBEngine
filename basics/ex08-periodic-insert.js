/**
 * ex08-periodic-insert
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
    engine.connect()                    // connect to default database & collection
        .then( () => {
            var data = getRandomData(); // get random data
            return engine.insert(data); // insert into database
        })
        .then( () => {
            return engine.print();      // show database's content
        })
        .then( () => {                  // close the connection
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
 *  check the data printed as table on the console
 *  we can see that a new document/record/row is periodically inserted every 2 seconds
 */

