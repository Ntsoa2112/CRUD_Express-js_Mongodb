# CRUD_Express-js_Mongodb
Route, méthode, données atteundues et méthode:

Création d'un utilisateur: /api/v1/creation  méthode POST
 * Données attendues: nom, prenom, email
 * Retour: status 200 {"success":"Success"}, 403 {"error":"Adresse email déjà utilisé"}, 403 {"error":"Information insuffisante"}, 500 {"error":"Ressource"}
 
