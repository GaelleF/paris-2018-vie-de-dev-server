const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../db.js')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const secret = 'vdd is great'
router.use(session({
  secret,
  saveUninitialized: false,
  resave: true,
  store: new FileStore({ secret })
}))

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post('/vote/:typeVote', (req, res, next) => {
  console.log('parametre URL POST:' + req.params.typeVote)
  db.addVote(req.body, req.params.typeVote)
    .then(() => db.countVote(req.body, req.params.typeVote))
    .then(result => res.json(result)/* console.log('addVote res : ',result,' nbVote: ', result['nbVotes'])*/)
    .catch(next)
})
router.post('/soumettre', (req, res, next) => {
  console.log('soume', req.body)
  db.addPost(req.body)
    .then(() => res.json('ok'))
    .catch(next)
})
module.exports = router
