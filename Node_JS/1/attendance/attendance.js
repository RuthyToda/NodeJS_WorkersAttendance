const express = require('express');//שימוש בספריית אקספרס
const router = express.Router();//שימוש בחלק של ראוטר מתוך הספרי אקספרס
const fs = require('fs');//שימוש בספריב פס עמנ לקרוא קובץ
const { send } = require('process');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Workers';
var datetime = require('node-datetime');



router.get('/getReport', function (req, res) {
    console.log("arived get report.");
    var path = 'attendance/workersAttendace/' + req.query.worker_Id;
    console.log(path)
    if (!fs.existsSync(path)) {
        console.log('not exists')
        return 'Sorry, there is not a report for you.'
    }
    fs.readFile(path, function (err, result) {
        if (err)
            return "err in read the report: " + err;

        arr = JSON.parse(result);
        console.log(arr);


        for (var i = 0; i < arr.length; i++) {
            var dt = datetime.create(arr[i].date);
            var formatted = dt.format('m/d/Y H:M:S');
            arr[i].date = formatted;
        }

        return res.send(arr);
    });
});


router.post('/addJobDay', function (req, res) {
    console.log("arived add Job Day.")
    MongoClient.connect(url, function (err, client) {
        if (err) console.log("can't connect!");
        else {
            const myDataBase = client.db(dbName);
            const attendancesCollection = myDataBase.collection('Attendance');
            attendancesCollection.insertOne(req.body
                , function (err, answer) {
                    if (err) {
                        client.close();
                        return res.status(500).send(err);
                    }
                    else {
                        newAtt = req.body;
                        var path = 'attendance/workersAttendace/' + newAtt.worker_Id;
                        if (!fs.existsSync(path)) {
                            fs.appendFile(path, JSON.stringify(newAtt), function (err) {
                                if (err) { console.error(err); }
                            })
                        }
                        else {
                            fs.readFile(path, 'utf-8', (err, buffer) => {
                                if (err) return console.error('File read error: ', err);
                                if (buffer[buffer.length - 1] == ']')
                                    var newValue = buffer.slice(0, buffer.length - 1);
                                else {
                                    var newValue = buffer;
                                    var arrayJson = [newValue.slice(0, 0), '[', newValue.slice(0)].join('');
                                    newValue = arrayJson;
                                }
                                newValue += ',';
                                newValue += JSON.stringify(newAtt);
                                newValue += ']';
                                fs.writeFile(path, newValue, err => {
                                    if (err) return console.error('File write error:', err)
                                })
                            })
                        }
                        client.close();
                        return res.send(answer)
                    }
                })
            console.log("succeed connect.");
        }
    });
})


//פונקציה שהוא מגיע אליה תמיד ואז ממשילך הלאה בגלל שיש לה נקס (הנקסט לא חובה)
router.use(function (req, res, next) {
    console.log("attendance use");
    next();
})


router.use(function (req, res, next) {
    res.status(200)
    res.send({ error: 'Not found URL: %s' + req.url });
    return;
});



module.exports = router;//הכרזה על כך שניתן לירש ממנו ולהשתמש בו