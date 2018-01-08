/**
 * ex03-connect-specific
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
 * Connect to specific database ('inc') and collection ('sensor')
 */
console.log("Connect to specific database ('inc') and collection ('sensor'");
var hostName       = null;                  // use default host
var databaseName   = 'inc';
var collectionName = 'sensors';
engine.connect(hostName, databaseName, collectionName)
    .then( () => {
        // do nothing
    })
    .then( () => {              // close the connection
        return engine.close();
    })

/**
 * We can see output messages like this:
 * 
 * MDBEngine-Info: connecting to "inc.sensors"
 * MDBEngine-Info: connected to "inc.sensors"
 * 
 * It means that DatabaseName is "inc" and CollectionName is "sensors"
 */
