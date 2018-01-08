/**
 * ex04-print
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
 * Connects to default database and collection, then prints it's content
 *
 */
engine.connect()
    .then( () => {
        return engine.print();      // print database's content
    })
    .then( () => {                  // close the connection
        return engine.close();
    })

/**
 * We can see some messages and the content of the test.docs like this:
 * 
 * MDBEngine-Info: connecting to "test.docs"
 * MDBEngine-Info: connected to "test.docs"
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |   _id   |         time        |  sensor1  |  sensor2  |  sensor3  |  sensor4  |
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |    1    |  2018-1-7 09:29:03  |   15.093  |   10.846  |   59.677  |   99.354  |
 * |    2    |  2018-1-7 09:29:03  |     --    |   44.928  |   34.100  |   58.345  |
 * |    3    |  2018-1-7 09:29:03  |   59.734  |   11.419  |     --    |   47.500  |
 * |    4    |  2018-1-7 09:29:03  |     --    |   19.472  |   46.100  |     --    |
 * |    5    |  2018-1-7 09:29:03  |     --    |     --    |   94.389  |   1.193   |
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 */