// ///////////////////////////////////////////////////////////////////////////יצירת מסד עם ולידיטורס
// db.createCollection("Workers", {
//    validator: {
//        $jsonSchema: {
//            bsonType: "object",
//            required: ["worker_Id", "first_Name", "last_Name", "address", "phone", "email","isACctive"],
//            properties: {
//                worker_Id: {
//                    bsonType: "string",
//                    description: "must be a string and is required",
//                },
//                first_Name: {
//                    bsonType: "string",
//                    description: "must be a string and is required",
//                },
//                last_Name: {
//                    bsonType: "string",
//                    description: "must be a string and is required",
//                },
//                address: {
//                    bsonType: "string",
//                    description: "must be a String and is required",
//                },
//                phone: {
//                    bsonType: "string",
//                    description: "must be a string and is required",
//                },
//                email: {
//                    bsonType: "string",
//                    description: "must be a string and is required",
//                },
//                iaActive: {
//                    bsonType: "bool",
//                    description: "must be a string and is required",
//                },
//            }
//        }
//    }
// }
//)


///////////////////////////////////////////////////////////////////////////////////////////random function
function rnd_Name() {
    var length = 9;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function rnd_Phone() {
return "05"+Math.floor(Math.pow(10, 8-1) + Math.random() * 9 * Math.pow(10, 8-1));
}

function rnd_Email() {
    var length = 9;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return (result + '@domain.com');
}

//check
//rnd_Name()
//rnd_Barcode()
//rnd_Price()
//rnd_Qty()
//rnd_Min_Qty()
//rnd_Email()
//rnd_Allergic()
//rnd_Nutritional_Values()

////////////////////////////////////////////////////////////////////////////////////////////insert 100
for (var i = 0; i < 100; i++) {
    db.Workers.insert({
        "worker_Id": rnd_Name(),
        "first_Name":rnd_Name(),
        "last_Name":rnd_Name(),
        "address": rnd_Name(),
        "phone": rnd_Phone(),
         "email": rnd_Email(),
        "isActive":true,
    })
}

