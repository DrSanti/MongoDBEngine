/**
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory (ECCLab)
 * INC @ KMUTT
 * 06 January, 2017
 * 06.40 PM
 */



 /**
  * DATA STRUCTURE
  * +------------+-------------------+-----------+-----------+------------+------------+
  * |    _id     |        time       |  sensor1  |  sensor2  |   sensor3  |   sensor4  | << column names
  * +------------+-------------------+-----------+-----------+------------+------------+
  * |     1      | 2018-1-4 13:53:28 |  45.356   |   22.346  |   45.625   |   63.335   | << values
  * +------------+-------------------+-----------+-----------+------------+------------+
  * |     2      | 2018-1-4 13:53:29 |  97.726   |   54.352  |   85.273   |   98.258   |
  * +------------+-------------------+-----------+-----------+------------+------------+
  * |     3      | 2018-1-4 13:53:30 |  98.973   |   34.834  |   38.423   |   63.269   |
  * +------------+-------------------+-----------+-----------+------------+------------+
  * |     4      | 2018-1-4 13:53:31 |  48.335   |   32.943  |   17.257   |   83.263   |
  * +------------+-------------------+-----------+-----------+------------+------------+
  * |     5      | 2018-1-4 13:53:32 |  38.495   |   43.232  |   84.374   |   28.267   |
  * +------------+-------------------+-----------+-----------+------------+------------+
  * 
  ***********************************************************************************************
  *  >> _id      : document/row id (unique, auto increment)
  *  >> time     : timestamp, e.g.; 2018-1-4 13:53:28
  *  >> SensorX  : sensor names
  *  >>          : all values of the sensors must be floating point
  ***********************************************************************************************
  */



const MongoClient = require('mongodb').MongoClient;
const json2csv = require('json2csv');
const fs = require('fs');
const check = require('assert');

/**
 * default configuration
 */
const dbConfig = {
    host: 'mongodb://localhost:27017',
    dbName: 'test',
    collectionName: 'docs'
};


/**
 * data configuration, the sensorX can be added or removed
 */
const dataStruct = {
    //!! data structure
    columnNames:  ['_id', 'time', 'sensor1', 'sensor2', 'sensor3', 'sensor4' /*, 'sensor5'*/],
    
    //!! used for controlling displaying data in table
    columnSpaces: [ 9,    21,     11,        11,        11,        11, 11, 11, 11, 11, 11, 11],
    showId : true,
    showTime: true
};

function showStructure() {
 
    var cn = dataStruct.columnNames;
    var sw = dataStruct.columnSpaces;

    var plus  = [];
    var j     = 0;
    plus[j++] = 0;
    var str = '';
    for(let i=0; i<cn.length; i++, j++) {
        str += '|' + _fws(cn[i], sw[i]); plus[j] = str.length;    
    }
    str += '|';

    var line = '';
    j = 0;
    for(var i=0; i<str.length-1; i++) {
        if(i == plus[j]) {
            line += '+';
            j++;   
        }else{
            line += '-';
        }
    }
    line += '+';
    console.log(line);
    console.log(str);
    console.log(line);   
}

function setStructure(st) {
    dataStruct.columnNames  = st.columnNames;
}


/**
 * global variables
 */
var _connected = false;
var _client;
var _db;
var _collection;


process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
})


/**
 * Time functions
 *
 * USAGE: of currentTime() and convertTime()
 *
 * Ex1:
 *  var time_str = currentTime();
 *  console.log("Current time: " + time_str);
 *
 * Ex2:
 *   var date_object = convertTime(time_str);
 *   console.log('Converted time: ' + date_object);
 */

function currentTime() {
    var now = new Date();
    var offset = now.getTimezoneOffset();
    var actual = now - offset;
    var str_date = new Date(actual).toLocaleDateString();
    var str_time = new Date(actual).toLocaleTimeString();
    return str_date + ' ' + str_time;
}

function convertTime(time_str) {
    //!! time_str format is "2018-1-4 13:53:28"
    var current = new Date(time_str);
    var offset = new Date().getTimezoneOffset();
    return (new Date(current - offset));
}


/**
 * 
 * print functions
 */
function printInfo(msg) {
    console.info('MDBEngine-Info: ' + msg);
}

function printError(msg) {
    console.error('MDBEngine-Error: ' + msg);
}

// generates fixed width string
function _spc(ns) {
    var sp = '';
    for(var i=0; i<ns; i++) {
        sp += ' ';
    }
    return sp;
}
function _fws(str, width) {
    var len = str.toString().length;
    var spc = width - len;
    nL = Math.round(spc/2);
    nR = width - len - nL;

    var ret = _spc(nL) + str + _spc(nR);
    //console.log('>>',width-ret.length)

    return ret;
}

/**
 * utility functions
 */
function getName() {
    return dbConfig.dbName + '.' + dbConfig.collectionName;
}

function getDbName() {
    return dbConfig.dbName;
}

function getColName() {
    return dbConfig.collectionName;
}

function getClient() {
    return _client;
}

function getDb() {
    return _db;
}

function getCollection() {
    return _collection;
}

/**
 * database operation functions
 */

function connect(host, dbName, collectionName) {

    dbConfig.host   = host   || dbConfig.host;
    dbConfig.dbName = dbName || dbConfig.dbName;
    dbConfig.collectionName = collectionName || dbConfig.collectionName;

    return(new Promise(function(resolve, reject) {
            if(!_connected) {
                printInfo('connecting to \"' + getName() + '\"');

                //----
                MongoClient.connect(dbConfig.host, function(err, client) {
                    if(err){
                        console.log('\r\nCannot connect to the database!!\nPleast check the MongoDB server and other components!\n\n');
                        reject(new Error('Cannot connect to ' + getName()));
                    }

                    let db = client.db(getDbName());

                    let collection = db.collection(getColName());
                    _client = client;
                    _db = db;
                    _collection = collection;
                    printInfo('connected to \"' + getName() + '\"');  
                    _connected = true;
                    resolve( { _client, _db,  _collection} );
                });
            }
            else {
                // return the previous one
                resolve( { _client, _db,  _collection} );
            }
        })
    ); 
}

function close() {
    return (new Promise( (resolve, reject) => {
        printInfo('closing \"' + getName() + '\"...');
        if(_connected) {
            _client.close( () => {
                _db = null;
                _collection = null;
                _client = null;
                _connected = false;
                printInfo('closed the \"' + getName() + '\"');
                resolve('ok');
            });
        }
        else{
            printInfo('closed the \"' + getName() + '\"');
            resolve('ok');
        }
    }));
}




/**
 * 
 * arr is an array of JSON objects
 */
function _display(arr) {

    var cn = dataStruct.columnNames;
    var sw = dataStruct.columnSpaces;

    var plus  = [];
    var j     = 0;
    plus[j++] = 0;
    var str = '';
    for(let i=0; i<cn.length; i++, j++) {
        str += '|' + _fws(cn[i], sw[i]); plus[j] = str.length;    
    }
    str += '|';

    var line = '';
    j = 0;
    for(var i=0; i<str.length-1; i++) {
        if(i == plus[j]) {
            line += '+';
            j++;   
        }else{
            line += '-';
        }
    }
    line += '+';
    console.log(line);
    console.log(str);
    console.log(line);

    for(var i=0; i<arr.length; i++) {
        j = 0;
        str = '';
        if(1)   // _id is required
            str += '|' + _fws((arr[i][cn[j]])?parseInt(arr[i][cn[j]]):              '--', sw[j++]); // _id 
        if(1)   // time is required
            str += '|' + _fws((arr[i][cn[j]])?arr[i][cn[j]]:                        '--', sw[j++]); // time
        
        if(cn.length >= 3)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor1
        if(cn.length >= 4)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor2
        if(cn.length >= 5)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor3
        if(cn.length >= 6)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor4
        if(cn.length >= 7)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor5
        if(cn.length >= 8)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor6
        if(cn.length >= 9)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor7
        if(cn.length >= 10)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor8
        if(cn.length >= 11)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3): '--', sw[j++]); // sensor9
        if(cn.length >= 12)
            str += '|' + _fws((arr[i][cn[j]])?parseFloat(arr[i][cn[j]]).toFixed(3):'--', sw[j++]); // sensor10
        str += '|';
        console.log(str);
    }
    console.log(line);
}


function print(doc) {
    if(doc != undefined) {
        if(doc  instanceof Array){
            // do notning
        }
        else {
            // convert to array
            doc = Array(doc);
        }
        return (new Promise( (resolve, reject) => {
            _display(doc)
            resolve(doc);   
        }));
    }
    else {
        return (new Promise( (resolve, reject) => {
            _collection.find({},{}).toArray((err, arr) => {
                _display(arr)
                resolve(arr);
            })    
        }));
    }
}


function getLast() {

    printInfo('searching the last id of document in the \"' +  getName() + '\"');
    return( new Promise( (resolve, reject) => {

        if(!_connected) {
            reject(new Error('no database is connected'));    
        }

        _collection.find().sort({_id: -1}).limit(1).toArray((err, arr) => {
            if(err) {
                reject(new Error('getLast failed'));
            }
            if(arr[0] == undefined) {
                printInfo('no document is found, id will be set to 1');
            }
            else {
                printInfo('found the last doc, id \"' + arr[0]._id + '\"');
            }
            resolve(arr[0]); 
        });
    }));
}

function insert(doc) {

    // Check and convert the doc to array
    if(doc  instanceof Array){
        // do notning
    }
    else {
        // convert to array
        doc = Array(doc);
    }

    return( new Promise( (resolve, reject) => {
        if(!_connected) {
            reject(new Error('no database is connected'));    
        }
        getLast()
        .then((item) => {
            // get the last id in the collectionName
            let id = 1;
            if(item) {
                id = item._id + 1;
            }

            // change the document's id
            for(var i=0; i<doc.length; i++) {
                doc[i]._id = id + i;
            }

            printInfo('inserting ' + doc.length + ' document' + ( doc.length>1?'s':'' ) + ' in \"' + getName() + '\"' );
            _collection.insertMany( doc, (err, result) => {
                if(err) {
                    var msg = 'cannot insert document' + ( doc.length>1?'s':'' ) + ' into the \"' + getName() + '\"'
                    reject(new Error(msg));  
                }
                printInfo('inserted ' + result.insertedCount + ' document' + ( result.insertedCount > 1 ? 's' : '' ) + 'into the \"' + getName() + '\"' );
                resolve(doc);
            } );
        })
    }));
}

function drop() {
    printInfo('dropping all documents in the \"' + getName() + '\"');

    return new Promise( (resolve, reject) => {

        _collection.count( (err, result) => { 
            if(result > 0) {
                _collection.drop( (err, isOk) => {
                    if(err) {
                        reject(new Error('cannot drop the documents in the \"' + getName() + '\"'));  
                    }
                    printInfo('dropped all documents in \"' + getName() + '\"' );
                    resolve('ok');
                })
            }
            else {
                printInfo('no document in the \"' + getName() + '\" to be dropped' );
                resolve('ok'); 
            }
         })
    });
}


function count() {
    printInfo('counting number of documents in \"' + getName() + '\"');

    return new Promise( (resolve, reject) => {
        _collection.count( (err, result) => {
            if(err) {
                reject(new Error('cannot count the documents in the \"' + getName() + '\"'));    
            }
            printInfo('found ' + result +  ' document' + (result>2?'s':'')  + 'in the \"' + getName() + '\"' );
            resolve('ok');
        })
    });
}

function csvExport(csv_name) {

    return new Promise( (resolve, reject) => {
        _collection.find({}, {} ).toArray( (err, result) => {
            if (err) {
                reject(new Error('Reading database failed!'));   
            }
            printInfo('exporting \"' + getName() + '\" to \"' + csv_name + '\"');
            var fields = dataStruct.columnNames;
            var csv = json2csv({ data: result, fields: fields});
            fs.writeFile(csv_name, csv, function (err) {
                if (err) {
                    reject(new Error('CSV esporting failed!'));   
                }
                printInfo('the csv file \"' + csv_name + '\" is exported');
                resolve(csv_name);
            });
        });
    });
}


function test() {
    connect()
    .then( () => {
        return drop();
    }).then( () => {
        return insert( [
            {
                _id: 0,     // will be changed automatically in the insert()
                time:currentTime(), 
                sensor1: (Math.random()*100).toFixed(3), 
                sensor2: (Math.random()*100).toFixed(3), 
                sensor3: (Math.random()*100).toFixed(3), 
                sensor4: (Math.random()*100).toFixed(3), 
            },
            {
                _id: 0, 
                time:currentTime(), 
                //sensor1: (Math.random()*100).toFixed(3), 
                sensor2: (Math.random()*100).toFixed(3), 
                sensor3: (Math.random()*100).toFixed(3), 
                sensor4: (Math.random()*100).toFixed(3), 
            },
            {
                _id: 0, 
                time:currentTime(), 
                sensor1: (Math.random()*100).toFixed(3), 
                sensor2: (Math.random()*100).toFixed(3), 
                //sensor3: (Math.random()*100).toFixed(3), 
                sensor4: (Math.random()*100).toFixed(3), 
            },
            {
                _id: 0, 
                time:currentTime(), 
                //sensor1: (Math.random()*100).toFixed(3), 
                sensor2: (Math.random()*100).toFixed(3), 
                sensor3: (Math.random()*100).toFixed(3), 
                //sensor4: (Math.random()*100).toFixed(3), 
            },
            {
                _id: 0, 
                time:currentTime(), 
                //sensor1: (Math.random()*100).toFixed(3), 
                //sensor2: (Math.random()*100).toFixed(3), 
                sensor3: (Math.random()*100).toFixed(3), 
                sensor4: (Math.random()*100).toFixed(3), 
            },
        ]);
    }).then( () => {
        return count();
    }).then( () => {
        print();
    }).then( () => {
        return close();
    }).catch( (err) => {
        console.error(err);
    }) 
}



module.exports.currentTime = currentTime;
module.exports.convertTime = convertTime;

module.exports.printInfo = printInfo;
module.exports.printError = printError;

module.exports.getName = getName;
module.exports.getDbName = getDbName;
module.exports.getColName = getColName;

module.exports.getClient = getClient;
module.exports.getDb = getDb;
module.exports.getCollection = getCollection;

module.exports.connect = connect;
module.exports.close = close;
module.exports.getLast = getLast;
module.exports.insert = insert;
module.exports.drop  = drop;
module.exports.count = count;
module.exports.print = print;
module.exports.test  = test;

module.exports.showStructure = showStructure;
module.exports.setStructure  = setStructure;
module.exports.csvExport = csvExport;

/**
 * Exampele
 */
/**
connect()
    .then( () => {
        return drop();
    }).then( () => {
        return insert( [
            {_id: 0, time:currentTime(), name: 'sensor1', value1: (Math.random()*100).toFixed(3) },
            {_id: 0, time:currentTime(), name: 'sensor2', value1: (Math.random()*100).toFixed(3), value2: (Math.random()*100).toFixed(3) },
            {_id: 0, time:currentTime(), name: 'sensor1', value1: (Math.random()*100).toFixed(3), value2: (Math.random()*100).toFixed(3) },
            {_id: 0, time:currentTime(), name: 'sensor3', value1: (Math.random()*100).toFixed(3) },
            {_id: 0, time:currentTime(), name: 'sensor2', value1: (Math.random()*100).toFixed(3), value2: (Math.random()*100).toFixed(3), value3: (Math.random()*100).toFixed(3) }
        ] );
    }).then( () => {
        return count();
    }).then( () => {
        print();
    }).then( () => {
        return close();
    }).catch( (err) => {
        console.error(err);
    }) 
 */


