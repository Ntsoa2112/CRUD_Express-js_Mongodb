const service = require('../service/service');
const mongo = require('mongodb');
const connexion = require('../service/connexion')();

module.exports = {
    //Création d'un utilsateur
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
                            if(err) res.status(500).send({error: "Ressource"});
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

    getUser: function(req, res){
        console.log("==> GET USER ");
        var id = req.query.id;
        //L'id doit être 12 bytes ou une chaine de 24 caracteres
        if(id.length == 24 ) {
            connexion.then(function(dbo){
                //Requete d'un utilisateur dans la base de données
                dbo.collection("utilisateur").findOne({_id: new mongo.ObjectID(id)}, function(err, resultat){
                    if(err) res.status(500).send({error: "Ressource"});
                    if(resultat){
                        res.send(resultat);
                    }
                    else{
                        res.send({success:"Aucune résultat"});
                    }
                })
            })
        }
        else{
            res.status(403).send({error:"Information insuffisante"});
        }
    },

    //Requete de tous les utilisateurs dans la base de données
    list: function(req, res){
        console.log("==> GET LIST");
        connexion.then(function(dbo){
            dbo.collection("utilisateur").find({}, { projection: { nom: 1, prenom: 1, email: 1, date_creation:1 } }).toArray(function(err, resultats){
                if(err) res.status(500).send({error: "Ressource"});
                if(resultats.length){
                    res.send(resultats);
                }
                else{
                    res.send({success:"Aucune résultat"});
                }
                
            })
        })
    },

    //Suppression d'un utilisateur (à partir de son id)
    delete: function(req, res){
        console.log("==> DELETE");
        var id = req.body.id;
        if(id.length == 24){
            connexion.then(function(dbo){
                dbo.collection("utilisateur").findOneAndDelete({_id: new mongo.ObjectID(id)}, function(err, resultat){
                    if(err) res.status(500).send({error: "Ressource"});
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

    //Modification d'un utilisateur
    update: function(req, res){
        console.log("==> POST UPDATE ");
        var id = req.body.id, nom = req.body.nom, prenom = req.body.prenom, email = req.body.email, date_modification = new Date();
        if(id.length == 24 && email && nom && prenom){
            connexion.then(function(dbo){
                //On vérifie si l'email n'est pas utilisé par d'autre utilisateur
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

    index: function(req, res){
        console.log("==> GET INDEX");
        res.send("Hello world!");
    },

}
