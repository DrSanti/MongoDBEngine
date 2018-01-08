/**
 * ex02-connect-default
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
 * Connect to default database ('test') and collection ('docs')
 */
console.log("Connect to default database and collection");
engine.connect()
    .then( () => {
        // do nothing
    })
    .then( () => {              // close the connection
        return engine.close();
    })

/**
 * We can see output messages like this:
 * 
 * MDBEngine-Info: connecting to "test.docs"
 * MDBEngine-Info: connected to "test.docs"
 * 
 * It means that DatabaseName is "test" and CollectionName is "docs"
 */



/**
 * How they work
 * 
 * +---------+            +-----------+
 * | connect | -- then -->| do others | 
 * +---------+            +-----------+
 */

