const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const connString = require('./config.json').mongo;
const mongoClient = new MongoClient(connString, {useNewUrlParser: true});

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

const PORT = parseInt(process.argv[2] || process.env.APP_PORT) || 3000;

//connect to atlas and web server
mongoClient.connect((err, client)=>{
    if(err){
        console.error('error connecting to mongo atlas', err);
        return;
    }
    console.log('successfully connected to mongo atlas =D');
    console.log('now connecting to port....');
    app.listen(PORT, ()=>{
        console.log('server running on port number: '+ PORT);
    }    
    );
})

//********************************************************************************
// API ROUTES
//basicColl = mongoClient.db('boardgames').collection('basic');
//detailedColl = mongoClient.db('boardgames').collection('detailed');
//commentsColl = mongoClient.db('boardgames').collection('comments');

//call insertOne
app.post('/api/comment/new', bodyParser.json(), (req, res)=>{
    let doc = req.body;
    console.log(doc);
    const commentsColl = mongoClient.db('boardgames').collection('comments');
    commentsColl.insertOne(doc)
    .then(result=> {console.log('successfully inserted doc into atlas!'); res.status(200); res.json(result.insertedId);})
    .catch(err => console.log('Oh no did not manage to insert new comment into atlas'));
});

app.get('/api/comments/:boardgameId', (req, res)=>{
    const bgId = +req.params.boardgameId;
    const commentsColl = mongoClient.db('boardgames').collection('comments');
    commentsColl.find({boardgameId : bgId})
    .limit(10)
    .toArray()
    .then(result=>{
        console.info('SUCCESSFULLY FETCHED COMMENTS from atlas, RESULTS:\n',result);
        res.status(200);
        res.type('application/json');
        res.json(result);
    })
    .catch(err=>{
        res.status(500);
        console.error('Error getting comments from atlas', error);
        res.end();
    })
});


app.get('/api/boardgames/:search', (req, res)=>{
    const search = req.params.search;
    const detailedColl = mongoClient.db('boardgames').collection('detailed');
    // detailedColl.find({"boardgamecategory" : {$regex : ".*"+search+".*", $options: 'i'}}, {projection: {_id: 0, id: 1, primary: 1, boardgamecategory : 1, thumbnail : 1}})
    detailedColl.find({"$or":[{"boardgamecategory" : {$regex : ".*"+search+".*", $options: 'i'}},
    {"primary" : {$regex : ".*"+search+".*", $options: 'i'}}]}, 
    {projection: {_id: 0, id: 1, primary: 1, boardgamecategory : 1, thumbnail : 1, average: 1}})
    .limit(10)
    .toArray()
    .then(result=>{
        console.info('SUCCESSFULLY FETCHED DATA from atlas, RESULTS:\n',result);
        res.status(200);
        res.type('application/json');
        res.json(result);
    })
    .catch(err=>{
        res.status(500);
        console.error('Error getting distinct categories from atlas', error);
        res.end();
    })
});

//GET one boardgame
app.get('/api/boardgame/:id', (req, res)=>{
    const id = +req.params.id;
    const detailedColl = mongoClient.db('boardgames').collection('detailed');
    const basicColl = mongoClient.db('boardgames').collection('basic');
    let url = "https://boardgamegeek.com/";
    basicColl.findOne({"ID": id}, {projection: {_id: 0, URL: 1}})
    .then(result=>{
        url += result.URL;
        return detailedColl.findOne({"id" : id}, 
        {projection: {_id: 0, id: 1, primary: 1, boardgamecategory : 1, 
            thumbnail : 1, image : 1, description : 1, yearpublished : 1, "Board Game Rank" : 1, bayesaverage: 1, usersrated: 1}})
    })
    // detailedColl.findOne({"id" : id}, 
    // {projection: {_id: 0, id: 1, primary: 1, boardgamecategory : 1, 
    //     thumbnail : 1, image : 1, description : 1, yearpublished : 1, "Board Game Rank" : 1, bayesaverage: 1, usersrated: 1}})
    .then(result=>{
        result.url = url;
        console.info('SUCCESSFULLY FETCHED single boardgame from atlas, RESULTS:\n', result);
        res.status(200);
        res.type('application/json');
        res.json(result);
    })
    .catch(err=>{
        res.status(404);
        console.error('Error getting single boardgame', error);
        res.end();
    })
});

//GET one comment
app.get('/api/comment/:id', (req, res)=>{
    const id = req.params.id;
    const obj_id = ObjectId(id);
    const commentsColl = mongoClient.db('boardgames').collection('comments');
    commentsColl.findOne({"_id" : obj_id})
    .then(result=>{
        console.info('SUCCESSFULLY FETCHED single comment from atlas, RESULTS:\n', result);
        res.status(200);
        res.type('application/json');
        res.json(result);
    })
    .catch(err=>{
        res.status(404);
        console.error('Error getting single comment', error);
        res.end();
    })
});
