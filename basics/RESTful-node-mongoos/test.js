



// let ObjX = function(cmd) {
//     this.timer = null;
//     this.command = cmd;
//     this.rcvCallback = null;
// }



// let arr = [{name:'hello1'},{name:'hello2'},{name:'hello3'}];

// arr.forEach(a => {
//     let x = new ObjX(a);
//     x.rcvCallback = mcu.onData;
//     x.timer = setTimeout(()=>{
//         x.rcvCallback(a.name);
//         clearTimeout(x.timer);
//     }, Math.random()*5000 + 2000);
// });





function sendToMCU(c) {
    return (new Promise( (resolve, reject) => {
        setTimeout(()=>{
            reject('No data!! from ' + c);        
        }, 5000);
        //resolve(Math.random());
    }));
   
}

let comds = [4,5,6];
comds.forEach(c => {
    sendToMCU(c)
    .then((data)=>{
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    }); 
    
    console.log('DONE!');
});




