const service = require('../service/service');
const mongo = require('mongodb');
const connexion = require('../service/connexion')();

module.exports = {
    index: function(req, res){
        console.log("==> GET INDEX");
        res.send("Bonjour!");
    },

    creation: function(req, res){
        console.log("==> POST CREATION");
        var nom = req.body.nom, prenom = req.body.prenom, email = req.body.email, date_creation = new Date();
        //Verification données attendues
        if(nom && prenom && email){
            connexion.then(function(dbo){
                //Verification existence email dans la base de données => false if not exist
                service.verification_exist_email(email, dbo, "creation").then(function(verify){
                    if(!verify){
                        //Insertion dans la base de données
                        dbo.collection("utilisateur").insertOne({nom:nom, prenom:prenom, email:email, date_creation:date_creation, date_modification:null}, function(err){
                            if(err) res.status(500).send({error:err});
                            res.send({success:"Success"});
                        })
                    }
                    else{
                        res.status(403).send({error:"Adresse email déjà utilisé"});
                    }
                })
            })
        }
        else{
            res.status(403).send({error:"Information insuffisante"});
        }
    },

    list: function(req, res){
        console.log("==> GET LIST");
        connexion.then(function(dbo){
            dbo.collection("utilisateur").find({}, { projection: { nom: 1, prenom: 1, email: 1, date_creation:1 } }).toArray(function(err, resultats){
                if(err) res.status(500).send("Error: ressource");
                res.send(resultats);
            })
        })
    },

    delete: function(req, res){
        console.log("==> DELETE");
        var id = req.body.id;
        if(id.length == 24){
            connexion.then(function(dbo){
                dbo.collection("utilisateur").findOneAndDelete({_id: new mongo.ObjectID(id)}, function(err, resultat){
                    if(err) res.status(500).send("Error: ressource");
                    if(resultat.value){
                        res.send({success:"Success"});
                    }
                    else{
                        res.status(403).send({error:"Utilisateur introuvable"});
                    }
                })
            })
        }
        else{
            res.status(403).send({error:"Information insuffisante"});
        }
    },

    update: function(req, res){
        console.log("==> UPDATE : " + req.body.id.length);
        var id = req.body.id, nom = req.body.nom, prenom = req.body.prenom, email = req.body.email, date_modification = new Date();
        if(id.length == 24 && email){
            connexion.then(function(dbo){
                service.verification_exist_email(email, dbo, "modification", id).then(function(exist){
                    if(!exist){
                        dbo.collection("utilisateur").findOneAndUpdate({_id: new mongo.ObjectID(id)}, {$set:{nom:nom, prenom:prenom, email:email, date_modification:date_modification}}, {projection:{nom:1},  returnNewDocument: 1}, function(err, resultat){
                            if(err) res.status(500).send("Error: ressource");
                            if(resultat.value){
                                res.send({success:"Success"});
                            }
                            else{
                                res.status(403).send({error:"Utilisateur introuvable"});
                            }  
                        })
                    }
                    else{
                        res.status(403).send({error:"Adresse email déjà utilisé"});
                    }
                })
            })
        }
        else{
            res.status(403).send({error:"Information insuffisante"});
        }
    },

    search: function(req, res){
        console.log("==> SEARCH");
        var critere = req.body.critere;
        if(critere){
            connexion.then(function(dbo){
                dbo.collection("utilisateur").find({$or:[{nom: { $regex: ".*"+critere+".*" }}, {prenom:{ $regex: ".*"+critere+".*" }}, {email: { $regex: ".*"+critere+".*" }}]}).toArray(function(err, resultats){
                    if(err) res.status(500).send("Error: ressource");
                    if(resultats.length){
                        res.send({success: resultats});
                    }
                    else{
                        res.send({success: "Aucune résultat"});
                    }   
                })
            })
        }
        else{
            res.status(403).send({error:"Information insuffisante"});
        }
    }
}
