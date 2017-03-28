var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('abcd');  
  
db.serialize(function() {  
  db.run("CREATE TABLE user (ID INTEGER PRIMARY KEY   AUTOINCREMENT, name TEXT, score TEXT)");  
  
});  
  
db.close();  
