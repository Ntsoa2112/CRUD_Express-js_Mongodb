# CRUD_Express-js_Mongodb
Route, méthode, données atteundues et méthode:

Création d'un utilisateur: /api/v1/creation  méthode POST
 * Données attendues: nom, prenom, email
 * Retour: status 200 {"success":"Success"}, 403 {"error":"Adresse email déjà utilisé"}, 403 {"error":"Information insuffisante"}, 500 {"error":"Ressource"}

Affichage d'un utilisateur: /api/v1/utilisateur  méthode GET
 * Donnée attendue: id
 * Retour: status 200 {"_id":"6096a8f8234fec7ac780eed9","nom":"MIHAINGOHERILANTO","prenom":"Manambintsoa","email":"ntsoa.s118@gmail.com","date_creation":"2021-05-08T15:06:32.053Z","date_modification":"2021-05-08T18:45:09.903Z"} , 200 {"success":"Aucune résultat"}, status 403 {"error":"Information insuffisante"}, status 500 {"error": "Ressource"}

Liste des utilisateurs: /api/v1/list  méthode GET
 * Données attendues: rien
 * Retour: status 200 [{"_id":"6096a8f8234fec7ac780eed9","nom":"MIHAINGOHERILANTO","prenom":"Manambintsoa","email":"ntsoa.s118@gmail.com","date_creation":"2021-05-08T15:06:32.053Z"},{"_id":"6096cf9939397a103cbb4892","nom":"KLOI","prenom":"kloi","email":"kloi@gmail.com","date_creation":"2021-05-08T17:51:21.363Z"},{"_id":"60997ee77efead0d9ce146e2","nom":"MOIKOTO","prenom":"Moit","email":"moi@gmail.com","date_creation":"2021-05-10T18:43:51.502Z"}] ; status 500 {"error": "Ressource"}

Supprimer un utilisateur: /api/v1/delete  méthode POST
 * Donnée attendue: id
 * Retour: status 200 {"success":"Success"}, 403 {"error":"Utilisateur introuvable"}, 403 {"error":"Information insuffisante"}, 500 {"error":"Ressource"}

Editer un utilisateur: /api/v1/update POST
 * Données attendues: id, nom, prenom, email
 * Retour: 200 {"success":"Success"}, 403 {"error":"Utilisateur introuvable"}, 403 {"error":"Adresse email déjà utilisé"}, 403 {"error":"Information insuffisante"}, 500 {"error":"Ressource"}
