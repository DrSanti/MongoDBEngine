/**
 * ex07-structure
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
 * Display default data structure (not database, just default settings)
 */
console.log('Current/Default data structure'); 
engine.showStructure();

/**
 * Previously, the data structure is defined like this:
 * 
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |   _id   |         time        |  sensor1  |  sensor2  |  sensor3  |  sensor4  |
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 */


/**
 * Create a new data structure for new database (only sensor1 and sensor2)
 * "_id" and "time" are required and must be located in the 1st and 2nd
 * the other column names can be anything, allowing 10 columns (for display them correctly)
 */
var structure = {
    columnNames: ['_id', 'time', 'flow', 'speed']
}

/**
 * Set new data structure
 */
engine.setStructure(structure);

/**
 * Display the new setup
 */
console.log('New data structure'); 
engine.showStructure();
/** 
 * We can see the new data structure like this:
 * +---------+---------------------+--------------+--------------+
 * |   _id   |         time        |     flow     |     speed    |
 * +---------+---------------------+--------------+--------------+
*/

/**
 * Create data
 */
var dataSingle = {
    [structure.columnNames[0]]: 0,                      // _id will be changed to another value internally
    [structure.columnNames[1]]:  engine.currentTime(),  // time
    [structure.columnNames[2]]:  Math.random() * 100,   // flow
    [structure.columnNames[3]]:  Math.random() * 100,   // speed
};

/**
 * Create array of data
 */
var dataArray = [
    {
        [structure.columnNames[0]]: 0,                      // _id 
        [structure.columnNames[1]]:  engine.currentTime(),  // time
        [structure.columnNames[2]]:  Math.random() * 100,   // flow
        [structure.columnNames[3]]:  Math.random() * 100,   // speed
    },
    {
        [structure.columnNames[0]]: 0,                      // _id will be changed to another value internally
        [structure.columnNames[1]]:  engine.currentTime(),  // time
        [structure.columnNames[2]]:  Math.random() * 100,   // flow
        [structure.columnNames[3]]:  Math.random() * 100,   // speed
    }
];

/**
 * Create a new databasd and collection (if not exists) and connect to it,
 * then, inset the data into the "new.process"
 */
var hostName       = null;                  // use default host
var databaseName   = 'new';                 // database name
var collectionName = 'peocess';             // collection name
engine.connect(hostName, databaseName, collectionName)
    .then( () => {
        return engine.drop();               // remove the previous documents
    })
    .then( () => {
        return engine.insert(dataSingle);   // insert data
    })
    .then( () => {
        return engine.insert(dataArray);    // insert array of data
    })
    .then( () => {
        return engine.print();              // display the database's content
    })
    .then( () => {                          // close the connection
        return engine.close();
    })


/**
 * Results:
 * 
 * Current/Default data structure                                                       
 * +---------+---------------------+-----------+-----------+-----------+-----------+    
 * |   _id   |         time        |  sensor1  |  sensor2  |  sensor3  |  sensor4  |    
 * +---------+---------------------+-----------+-----------+-----------+-----------+    
 * New data structure                                                                   
 * +---------+---------------------+-----------+-----------+                            
 * |   _id   |         time        |    flow   |   speed   |                            
 * +---------+---------------------+-----------+-----------+                            
 * MDBEngine-Info: connecting to "new.peocess"                                          
 * MDBEngine-Info: connected to "new.peocess"                                           
 * MDBEngine-Info: dropping all documents in the "new.peocess"                          
 * MDBEngine-Info: dropped all documents in "new.peocess"                               
 * MDBEngine-Info: searching the last id of document in the "new.peocess"               
 * MDBEngine-Info: no document is found, id will be set to 1                            
 * MDBEngine-Info: inserting 1 document in "new.peocess"                                
 * MDBEngine-Info: inserted 1 documentinto the "new.peocess"                            
 * MDBEngine-Info: searching the last id of document in the "new.peocess"               
 * MDBEngine-Info: found the last doc, id "1"                                           
 * MDBEngine-Info: inserting 2 documents in "new.peocess"                               
 * MDBEngine-Info: inserted 2 documentsinto the "new.peocess"                           
 * +---------+---------------------+-----------+-----------+
 * |   _id   |         time        |    flow   |   speed   |
 * +---------+---------------------+-----------+-----------+
 * |    1    |  2018-1-8 09:02:10  |   58.694  |   74.408  |
 * |    2    |  2018-1-8 09:02:10  |   24.103  |   98.076  |
 * |    3    |  2018-1-8 09:02:10  |   80.476  |   79.835  |
 * +---------+---------------------+-----------+-----------+                           
 * MDBEngine-Info: closing "new.peocess"...                                             
 * MDBEngine-Info: closed the "new.peocess"                                             
 */