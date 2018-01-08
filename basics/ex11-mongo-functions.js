/**
 * ex10-mongo-functions
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory (ECCLab)
 * INC @ KMUTT
 * 
 * 06 January, 2017
 * 06.40 PM
 */

let engine = require('../libs/MDBEngine');

engine.connect()
    .then( (obj) => {
        doMongo(obj);
    })
    .then(() => {

    })

function doMongo(obj) {
    var collection = obj._collection;
    collection.find({  _id: { $eq: 1 }  }, {'sensor1': false}, function(err, json){
        json.toArray( function (err, arr) {
            //!! print the arr content
            console.log(arr);

            //!!
            //!! process the arr
            //!!
            if(parseFloat(arr[0].sensor1) > 60) {
                console.log(parseFloat(arr[0].sensor1) + ' > 60');
            }
            else {
                console.log(parseFloat(arr[0].sensor1) + ' <= 60');  
            }

            //!! close the connection
            obj._client.close();
        })
    });
}

