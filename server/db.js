/*const mysql = require('mysql2/promise')
const co = mysql.createConnection({
  host: 'localhost',
  user: 'server',
  password: 'vddISDope',
  database: 'VDD'
})
const exec = async (query, params) => {
  const connection = await co
  const result = await connection.execute(query, params)
  return result[0]
}*/

const  pg  = require('pg')

const client = new pg.Client({
  user: 'vdd',
  host: '',
  database: 'vdd',
  password: 'vdd',
  port: 5432

})

client.connect()

const exec = async (query, params) => {
 /*const connection = await client.connect()
   .then(console.log('co',connection))
  await client.connect()*/
  const result = await client.query(query, params)
  return result.rows

}

const getPosts = () => exec(`
  SELECT * FROM (
    SELECT * FROM (
      SELECT * FROM (
        SELECT * FROM (
          SELECT * FROM "vdd"."post"
            LEFT JOIN (
              SELECT postId, COUNT(userId) as commit
              FROM "vdd"."comment"
              GROUP BY postId
              ) t10
              ON "vdd"."post".id = t10.postId) tpost
              LEFT JOIN (
                SELECT postId AS postIdyes, COUNT(userId) AS yes
                FROM "vdd"."yesVotes"
                GROUP BY postId
              ) t2
              ON tpost.id = t2.postIdyes) t3
            LEFT JOIN (
              SELECT postId AS postIdsalty, COUNT(userId) AS salty
              FROM "vdd"."saltyVotes"
              GROUP BY postId
            ) t4
            ON t3.id = t4.postIdsalty) t5
          LEFT JOIN (
            SELECT postId as postIdbad , COUNT(userId) AS bad
            FROM "vdd"."badVotes"
            GROUP BY postId
          ) t6
          ON t5.id = t6.postIdbad) t7
        LEFT JOIN (
          SELECT id as userId , name
          FROM "vdd"."user"
        ) t8
        ON t7.userId = t8.userId
  `)
// requete SQL pour ajouter un post
const addPost = (params) =>
  exec('INSERT INTO "vdd"."post"(userId, content) VALUES ($1, $2)',
    [params.userId, params.content])

// test pour savoir si addPost fonctionne !
/* addPost({userId: 6, content: 'blllllllllllllla'})
  .then(result => console.log('result:', result))
  .catch(console.error) */

const addVote = (params, table) =>
  exec(`INSERT INTO "vdd"."${table}" (userId, postId) VALUES ($1, $2)`,
    [params.user, params.id])

const selectVote = (params, table) =>
  exec(`SELECT * FROM "vdd"."${table}" WHERE userId = $1 AND postId = $2`,
    [params.user, params.id])

const countVote = async (params, table) => (await exec(`SELECT
  postId as id, COUNT(userId) as nbvotes
  FROM "vdd"."${table}"
  WHERE postId = $1 GROUP BY id `, [params.id]))[0].nbvotes

const getUsers = () => exec('SELECT * FROM "vdd"."user"')
const addUser = (params) => exec(`INSERT INTO "vdd"."user"(name, email, password) VALUES ($1, $2, $3)`, [params.name, params.email, params.password])

/* selectVote({user: 2, idPost:1},'yesVotes')
    .then(result => console.log('result:', result))
    .catch(console.error) */

// requete SQL pour comment

const getPost = id =>
  exec(`SELECT * FROM (SELECT * FROM "vdd"."post" WHERE id=${id}) tPost
        LEFT JOIN (
          SELECT id as userId , name
            FROM "vdd"."user"
          ) tUser
        ON tPost.userId = tUser.userId
  `)

const getCommentsOfPost = id =>
  exec(`SELECT * FROM (SELECT * FROM "vdd"."comment" WHERE postId = $1 ORDER BY createAt DESC) tCom
    LEFT JOIN (
      SELECT id as userId , name
        FROM "vdd"."user"
        ) tUser
      ON tCom.userId = tUser.userId `, [ id ])

const addComment = params =>
  exec('INSERT INTO "vdd"."comment" (userId, postId, content) VALUES ($1, $2, $3)',
    [ params.userId, params.postId, params.content ])
const updateComment = params => exec('UPDATE "vdd"."comment" SET userId=$1, postId=$2, content=$3 WHERE id=$4',
  [ params.userId, params.postId, params.content, params.id ])

module.exports = {
  addPost,
  addVote,
  selectVote,
  getPosts,
  countVote,
  getUsers,
  getCommentsOfPost,
  addComment,
  updateComment,
  getPost,
  addUser
}
