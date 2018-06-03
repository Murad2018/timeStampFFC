var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var dateFormat = require('dateformat');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

router.route('/:number')
    .get(function (req, res) {
        
            // isNumber or not from W3School
        var data = req.params.number; 
        var pattern = new RegExp(/^\d+$/);
        var result = pattern.test(data);
        
        //if number
        if(result){
            var date = new Date(data*1000);
            date = dateFormat(date, 'ddd, mmm dS yyyy');
            res.json({
                unix: data,
                natural: date
            })            
        }else{
            var unixNumber = new Date(data).getTime()/1000;
            //if not number AND not valid date format
            if(!unixNumber){
                res.json({
                    unixNumber: null,
                    natural: null
                })
                //if valid date format
            }else{
                data = dateFormat(data, 'ddd, mmm dS yyyy');
                res.json({
                    unix: unixNumber,
                    natural: data
                })
            }
        }       
    })

app.use('/api', router);
app.listen(port, function () {
    console.log("perfect")
});