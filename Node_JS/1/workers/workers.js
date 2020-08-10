const express = require('express');//שימוש בספריית אקספרס
const router = express.Router();//שימוש בחלק של ראוטר מתוך הספרי אקספרס
const fs = require('fs');//שימוש בספריב פס עמנ לקרוא קובץ
const { send } = require('process');
const MongoClient = require('mongodb', { useUnifiedTopology: true }).MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Workers';

//פונקציה שהוא מגיע אליה תמיד ואז ממשילך הלאה בגלל שיש לה נקס (הנקסט לא חובה)
router.use(function (req, res, next) {
    console.log("worker use");
    next();
})


router.get('/getAllWorkers', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            const myDataBase = client.db(dbName);
            const workersCollection = myDataBase.collection('Workers');
            var allWorkersDetails = workersCollection.find({}).toArray(function (req, result) {
                if (err) {
                    client.close();
                    return res.status(500).send(err);
                }
                else {
                    var Names = result.map(function (item) { return { name: item.first_Name + " " + item.last_Name, phone: item.phone }; });
                    client.close();
                    return res.send(Names);
                } ``
            });
        }
    })
});

router.get('/getWorkersDetails', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        if (err) console.log("can't connect!");
        else {
            const myDataBase = client.db(dbName);
            const workersCollection = myDataBase.collection('Workers');
            var workerDetails = workersCollection.find({ "worker_Id": req.query.id.toString() }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res = err;
                    client.close();
                    return res.status(500).send(err);
                }
                else {
                    client.close();
                    return res.send(result[0]);
                }
            });

        }
    });
});





router.post('/deleteWorker', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        if (err) console.log("can't connect!");
        else {
            const myDataBase = client.db(dbName);
            const workersCollection = myDataBase.collection('Workers');
            workersCollection.updateOne(
                { "worker_Id": req.body.id },
                {
                    $set: {
                        "isActive": "false"
                    }
                }, function (err, answer) {
                    if (err) {
                        client.close();
                        return res.status(500).send(err);
                    }
                    else {
                        client.close();
                        return res.send(answer)
                    }
                }
            )
        }
    });
});




router.post('/addWorker', function (req, res) {
    console.log("arived add worker.");

    MongoClient.connect(url, function (err, client) {
        const myDataBase = client.db(dbName);
        const workersCollection = myDataBase.collection('Workers');
        var myobj = { "worker_Id": req.body.worker_Id, "first_Name": req.body.first_Name, "last_Name": req.body.last_Name, "address": req.body.address, "phone": req.body.phone, "email": req.body.email, "isActive": "true" };

        workersCollection.insertOne(myobj, function (err, res) {
            if (err) throw err;
            client.close();
        });

        newWorker = req.body;
        fs.readFile('workers/workers.json', 'utf-8', (err, buffer) => {
            var newValue = buffer.slice(0, buffer.length - 1);
            newValue += ',';
            newValue += JSON.stringify(newWorker);
            newValue += ']';
            fs.writeFile("workers/workers.json", newValue, err => {
                if (err) return console.error('File write error:', err)
            })
        })
        client.close();
    })
});




router.post('/editWorker', function (req, res) {
    console.log("arived edit worker.")
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
        if (err) console.log("can't connect!");
        else {
            const myDataBase = client.db(dbName);
            const workersCollection = myDataBase.collection('Workers');

            var newData = {
                $set: {
                    worker_Id: req.body.id,
                    first_Name: req.body.firstName,
                    last_Name: req.body.lastName,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email
                }
            };
            var myQuery = { worker_Id: req.body.id.toString() };
            workersCollection.updateOne(myQuery, newData, function (err, result) {
                if (err) {
                    res.status(500);
                    res.send(' error ');
                } else {
                    res.send(req.body.WorkerID + " OK");
                }
            });
            console.log("succeed connect.");
        }
    });
})




module.exports = router;//הכרזה על כך שניתן לירש ממנו ולהשתמש בו