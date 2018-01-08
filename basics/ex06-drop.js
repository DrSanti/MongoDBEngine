/**
 * ex06-drop
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
 * Drop all documents/reords/row in the collection
 */

engine.connect()
    .then( () => {
        return engine.drop();           // drop/delete/clean all documents in the collection
    })
    .then( () => {                      
        return engine.print();          // display database's content (empty after dropped)
    })
    .then( () => {                      // close the connection
        return engine.close();
    })

/**
 * Result:
 * 
 * MDBEngine-Info: connecting to "test.docs"
 * MDBEngine-Info: connected to "test.docs"
 * MDBEngine-Info: dropping all documents in the "test.docs"
 * MDBEngine-Info: dropped all documents in "test.docs"
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |   _id   |         time        |  sensor1  |  sensor2  |  sensor3  |  sensor4  |
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * MDBEngine-Info: closing "test.docs"...
 * MDBEngine-Info: closed the "test.docs"
 */