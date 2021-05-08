const mongo = require('mongodb');

module.exports = {
    verification_exist_email: function(email, dbo, operation, id = null){
        return new Promise(function(resolve){
            let condition = operation === "creation" ? {email:email} : {_id:{$ne: new mongo.ObjectID(id)}, email:email};
            dbo.collection("utilisateur").find(condition).toArray(function(err, resultats){
                if(err) throw(err);
                if(resultats.length){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            })
        })      
    }
}