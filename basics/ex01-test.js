/**
 * ex-01.js
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
 * Execute the test(), proviced in the MDBEngine
 * The test() generates 5 documents/records/rows randomly
 */
engine.test();


/**
 * Run the application and check the documents in the database.
 * The execution information will be printed like this:
 * 
 * MDBEngine-Info: connecting to "test.docs"
 * MDBEngine-Info: connected to "test.docs"
 * MDBEngine-Info: dropping all documents in the "test.docs"
 * MDBEngine-Info: dropped all documents in "test.docs"
 * MDBEngine-Info: searching the last id of document in the "test.docs"
 * MDBEngine-Info: no document is found, id will be set to 1
 * MDBEngine-Info: inserting 5 documents in "test.docs"
 * MDBEngine-Info: inserted 5 documentsinto the "test.docs"
 * MDBEngine-Info: counting number of documents in "test.docs"
 * MDBEngine-Info: found 5 documentsin the "test.docs"
 * MDBEngine-Info: closing "test.docs"...
 * MDBEngine-Info: closed the "test.docs"
 * 
 * The, the documents in the database will be shown like this: 
 *  
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |   _id   |         time        |  sensor1  |  sensor2  |  sensor3  |  sensor4  |
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |    1    |  2018-1-7 09:17:05  |   70.955  |   87.259  |   69.745  |   51.999  |
 * |    2    |  2018-1-7 09:17:05  |     --    |   55.084  |   85.974  |   42.154  |
 * |    3    |  2018-1-7 09:17:05  |   13.974  |   43.924  |     --    |   5.102   |
 * |    4    |  2018-1-7 09:17:05  |     --    |   39.414  |   86.196  |     --    |
 * |    5    |  2018-1-7 09:17:05  |     --    |     --    |   32.584  |   59.779  |
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 *
 * 
 * We can re-check the document in the database by executing the command "db.docs.find()" in mongo,
 * The results will be displayed like this:  
 *            
 * { "_id" : 1, "time" : "2018-1-7 09:17:05", "sensor1" : "70.955", "sensor2" : "87.259", "sensor3" : "69.745", "se
nsor4" : "51.999" }
 * { "_id" : 2, "time" : "2018-1-7 09:17:05", "sensor2" : "55.084", "sensor3" : "85.974", "sensor4" : "42.154" }
 * { "_id" : 3, "time" : "2018-1-7 09:17:05", "sensor1" : "13.974", "sensor2" : "43.924", "sensor4" : "5.102" }
 * { "_id" : 4, "time" : "2018-1-7 09:17:05", "sensor2" : "39.414", "sensor3" : "86.196" }
 * { "_id" : 5, "time" : "2018-1-7 09:17:05", "sensor3" : "32.584", "sensor4" : "59.779" }
 * 
 * Let's compare the JSON data to the table above, they are the same
 */

