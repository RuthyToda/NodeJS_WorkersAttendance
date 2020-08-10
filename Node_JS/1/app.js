const express = require('express');//שימוש בספריה של אקספרס
const app = express();//מופע של הספריה אקספרס
const router = express.Router();//שימוש בחלק של ראוטר מתוך הספרי אקספרס
var bodyParser = require('body-parser');
 app.use(bodyParser.json()); 
 app.use(bodyParser.urlencoded({ extended: true }));

const workers = require('./workers/workers');//מופע של דף של תלמיד
const attendance = require('./attendance/attendance');//מופע של דף של מןרה

//פונקציה שתמיד מגיע אליה קודם ואז ממשיך הלאה כי יש לה נקסט
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//פונקציה שכביכול יוצרת מאחרוי הקלעים שרת ואומרת שהוא מאזין לפורט 4000 
app.listen('4000', function () {
    console.log("my server listner to port 4000");
});

// //פונקציה אם לא הכניס כלום בניתוב
 router.get('/', function (req, res) {
    alert("s");
     res.send("you dont enter nothing in the url");
 })

//הודעה כעל כך שאם הניתוב מתחיל במלילים שבתוך הגרשיים הוא הולך לדף המסוים הזה שהכריז כבר למעלה שהוא יורש אותו ומשתמש בו
app.use("/worker", workers);
app.use("/attendance", attendance);
app.use(function (req, res, next) {
    res.status(200)
    res.send({ error: 'Not found URL: %s' + req.url });
    return;
});


