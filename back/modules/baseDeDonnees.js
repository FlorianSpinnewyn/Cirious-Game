let baseDeDonnees = (function() {

    const mysql = require('mysql');
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "game"
    });
  
    con.connect(err => {
      if(err) throw err;
      else console.log('Connexion effectuée');
    });
  
    function select(r, params)
    {
      let callback = params[0];
      params.shift();
      con.query(r, params, (err, result) => {
        if(err) throw err;
        callback.call(this, result);
      });
    }
  
    function change(r, params) 
    {
      con.query(r, params, (err,result) => {
        if(err) throw err;
        console.log("resultat du change : ", result);
      });
    }
  
    function getConnection(r, isSelect, params) 
    {
      console.log(r, params);
      if(isSelect)
      {
        select(r, params);
      }
      else
      {
        change(r, params);
      }
    }
  
    return {
      select: (requete, ...parameters) => getConnection(requete, true,  parameters),
      change: (requete, ...parameters) => getConnection(requete, false, parameters),
    }
})();

module.exports = baseDeDonnees;