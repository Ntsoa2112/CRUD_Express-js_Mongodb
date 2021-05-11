const mongo = require('mongodb');

module.exports = {
    verification_exist_email: function(email, dbo, operation, id = null){
        return new Promise(function(resolve){
            //Si condition == "creation" , on vérifie si l'email n'existe pas dans la base de données
            //Sinon (si condition == "modification") , on vérifie si l'email n'est pas utilisé par d'autre utilisateur
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