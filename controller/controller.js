var connexion = require('../service/connexion')();

module.exports = {
    index: function(req, res){
        console.log("==> GET INDEX");
        res.send("Bonjour!");
    },

    list: function(req, res){
        console.log("==> GET LIST");
        connexion.then(function(dbo){
            dbo.collection("user").find({}, { projection: { _id: 0, nom: 1, prenom: 1 } }).toArray(function(err, resultats){
                if(err) res.status(500).send("Error: ressource");
                console.log("==> FIN GET LIST");
                res.status(200).send(resultats);
            })
        })
    }
}
