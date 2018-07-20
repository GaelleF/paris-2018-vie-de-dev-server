const  pg  = require('pg')
//const client = new client()

const client = new pg.Client({
  user: 'vdd',
  host: '',
  database: 'vdd',
  password: 'vdd',
  port: 5432

})

client.connect()

client.query('SELECT * FROM "vdd"."user"')
.then(console.log)
/*INSERT INTO user (name, email, password)
  VALUES ("Mikael Verdu", "mikael.verdu@gmail.com","azerty94");nextval('post_id_seq'::regclass)*/

//create tables
/*A adapter : CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(64) NOT NULL UNIQUE,
  email VARCHAR(254) NOT NULL UNIQUE,
  password VARCHAR(254) NOT NULL,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)

  /*client.query(`
  CREATE TABLE "vdd"."post"(
    id SERIAL PRIMARY KEY,
    userId integer NOT NULL,
    content TEXT,
    createAt TIMESTAMP DEFAULT now()
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE vdd."post"
    OWNER TO vdd;
  `
)
.catch(e => console.error(e.stack))

client.query(`
CREATE TABLE "vdd"."yesVotes" (
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (userId,postId),
  FOREIGN KEY (userId) REFERENCES "vdd"."user"(id),
  FOREIGN KEY (postId) REFERENCES "vdd"."post"(id)
)
`)
.catch(e => console.error(e.stack))

client.query(`
CREATE TABLE "vdd"."saltyVotes" (
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (userId,postId),
  FOREIGN KEY (userId) REFERENCES "vdd"."user"(id),
  FOREIGN KEY (postId) REFERENCES "vdd"."post"(id)
)
`)
.catch(e => console.error(e.stack))

client.query(`
CREATE TABLE "vdd"."badVotes" (
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (userId,postId),
  FOREIGN KEY (userId) REFERENCES "vdd"."user"(id),
  FOREIGN KEY (postId) REFERENCES "vdd"."post"(id)
)
`)
.catch(e => console.error(e.stack))

client.query(`CREATE TABLE "vdd"."comment" (
  id SERIAL PRIMARY KEY,
  postId INT NOT NULL,
  userId INT NOT NULL,
  content TEXT,
  createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (postId) REFERENCES "vdd"."post"(id),
  FOREIGN KEY (userId) REFERENCES "vdd"."user"(id)
)
`)
.catch(e => console.error(e.stack))*/


//requete fonctionnelle ! :insert !
/*client.query('INSERT INTO "vdd"."user"(name, email, password) VALUES($1, $2, $3)', [ 'Mikael Verdu', 'mikael.verdu@gmail.com','azerty94'])
  .catch(e => console.error(e.stack))*/

  /*client.query('INSERT INTO "vdd"."user"(name, email, password) VALUES($1, $2, $3)', [ "gloomiz", "gloomiz@gmail.com","gggg56"])
  .catch(e => console.error(e.stack))

  client.query('INSERT INTO "vdd"."post"(userId, content) VALUES($1, $2)',
  ["1","Que fait un développeur s'il veut se marier ? Une fille en C ..."])
  .catch(e => console.error(e.stack))

  client.query('INSERT INTO "vdd"."post"(userId, content) VALUES($1, $2)',
  ["2","Combien de développeurs faut-il pour remplacer une ampoule grillée? Aucun, c'est un problème Hardware..."])
  .catch(e => console.error(e.stack))

  client.query('INSERT INTO "vdd"."post"(userId, content) VALUES($1, $2)',
  ["2","A quoi sert Internet Explorer ? A télécharger Google Chrome..."])
  .catch(e => console.error(e.stack))*/
