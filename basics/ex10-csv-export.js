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
 * Note: Bebore run the app, 
 * if the csv file is opening, close it first
 */

var csvFileName = 'data.csv';                   // csv file name to be saved
engine.connect()
    .then( () => {
        return engine.print();                  // print the current data     
    })
    .then( () => {
        return engine.csvExport(csvFileName);   // export the data to *.csv file
    })
    .then( () => {          
        return engine.close();                  // close te connection
    });

/**
 * The results will be shown like this:
 * 
 * MDBEngine-Info: connecting to "test.docs"
 * MDBEngine-Info: connected to "test.docs"
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |   _id   |         time        |  sensor1  |  sensor2  |  sensor3  |  sensor4  |
 * +---------+---------------------+-----------+-----------+-----------+-----------+
 * |    1    |  2018-1-7 15:24:30  |   59.568  |   0.607   |   36.530  |   7.759   |
 * |    2    |  2018-1-7 15:24:32  |   43.834  |   52.293  |   14.350  |   18.788  |
 * |    3    |  2018-1-7 15:24:34  |   83.902  |   27.965  |   26.760  |   70.329  |
 * |    4    |  2018-1-7 15:24:36  |   23.974  |   65.112  |   23.237  |   47.656  |
 * |    5    |  2018-1-7 15:24:38  |   76.370  |   18.048  |   96.010  |   47.116  |
 * |                                OTHER LINES                                    |
 * +-------------------------------------------------------------------------------+
 * MDBEngine-Info: exporting "test.docs" to "data.csv"
 * MDBEngine-Info: the csv file "data.csv" is exported
 * MDBEngine-Info: closing "test.docs"...
 * MDBEngine-Info: closed the "test.docs"
 */

