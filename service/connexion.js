const MongoClient = require('mongodb').MongoClient;
var dbo, base_de_donnee = "base";

module.exports = function() {
    return new Promise(function (resolve) {
        if(dbo){
            resolve(dbo);
        }
        else{
            MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err)throw err;
            dbo = db.db(base_de_donnee);
            process.on('exit', (code) => {
                dbClose();
            })
            resolve(dbo);
        });
        }
    })
}