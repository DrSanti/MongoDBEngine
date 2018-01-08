/**
 * ex05-insert
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
 * We know that the data structure is defined like this
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |   _id   |         time        |  sensor1  |  sensor2  |  sensor3  |  sensor4  |
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 */

/**
 * Create data in JSON format, _id and time are required
 */
var data1 = {
    _id: 0,             // the '_' is required, the 0 will be replaced automatically
    time: engine.currentTime(),
    sensor1: 12.345,
    sensor2: 34.123,
    sensor3: 56.456,
    sensor4: 78.789,
};

/**
 * sensor1 and sensor4 are created
 */
var data2 = {
    _id: 0,             // the '_' is required, the 0 will be replaced automatically
    time: engine.currentTime(),
    sensor1: 82.736,
    sensor4: 32.374,
};

/**
 * Connect and insert the data1 and data2 into default database
 */
engine.connect()
    .then( () => {
        return engine.insert(data1);    // insert data1
    })
    .then( () => {
        return engine.insert(data2);    // insert data2
    })
    .then( () => {
        return engine.print();          // display database's content
    })
    .then( () => {                      // close the connection
        return engine.close();
    })
    .catch( (err) => {                  // show error message if some errors are occured (optional) 
        console.error(err.message);
    })


/**
 * The 2 new documents/records/rows are added/inserted in to the "test.docs" 
 * (see the last 2 rows in the table below)
 * The system messages and database's content will be shown like this:
 * 
 * MDBEngine-Info: connecting to "test.docs"                                                
 * MDBEngine-Info: connected to "test.docs"                                                 
 * MDBEngine-Info: searching the last id of document in the "test.docs"                     
 * MDBEngine-Info: found the last doc, id "5"                                               
 * MDBEngine-Info: inserting 1 document in "test.docs"                                      
 * MDBEngine-Info: inserted 1 documentinto the "test.docs"                                  
 * MDBEngine-Info: searching the last id of document in the "test.docs"                     
 * MDBEngine-Info: found the last doc, id "6"                                               
 * MDBEngine-Info: inserting 1 document in "test.docs"                                      
 * MDBEngine-Info: inserted 1 documentinto the "test.docs"                                  
 * +---------+---------------------+-----------+-----------+-----------+-----------+        
 * |   _id   |         time        |  sensor1  |  sensor2  |  sensor3  |  sensor4  |        
 * +---------+---------------------+-----------+-----------+-----------+-----------+        
 * |    1    |  2018-1-7 09:29:03  |   15.093  |   10.846  |   59.677  |   99.354  |        
 * |    2    |  2018-1-7 09:29:03  |     --    |   44.928  |   34.100  |   58.345  |        
 * |    3    |  2018-1-7 09:29:03  |   59.734  |   11.419  |     --    |   47.500  |        
 * |    4    |  2018-1-7 09:29:03  |     --    |   19.472  |   46.100  |     --    |        
 * |    5    |  2018-1-7 09:29:03  |     --    |     --    |   94.389  |   1.193   |        
 * |    6    |  2018-1-7 10:16:26  |   12.345  |   34.123  |   56.456  |   78.789  |        
 * |    7    |  2018-1-7 10:16:26  |   82.736  |     --    |     --    |   32.374  |        
 * +---------+---------------------+-----------+-----------+-----------+-----------+        
 * MDBEngine-Info: closing "test.docs"...                                                   
 * MDBEngine-Info: closed the "test.docs"                                                   
 */