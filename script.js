var fs = require("fs");

const jsonFile = process.argv[2];
const conditionType = process.argv[3];
const conditionValue = process.argv[4];
const secondConditionType = process.argv[5];
const secondConditionValue = process.argv[6];

const BEFORE_CONDITION = 0;
const AFTER_CONDITION = 1;

const listOfConditionTypes = ["-before", "-after"];
var conditionBefore = false;
var conditionAfter = false;
var conditionBetweenBeforeAndAfter = false;
var conditionBetweenAfterAndBefore = false;

if(conditionType != undefined && !listOfConditionTypes.includes(conditionType))
{
    console.log("Condition type not valid!");
    return;
}else if(secondConditionType != undefined && !listOfConditionTypes.includes(secondConditionType)){
    console.log("Second condition type not valid!");
    return;
}else if(conditionType != undefined && secondConditionType != undefined && secondConditionType == conditionType){
    console.log("The same condition can't be used twice!")
    return;
}

if(conditionType != undefined)
{
    if(secondConditionType != undefined){
        if(conditionType == listOfConditionTypes[BEFORE_CONDITION]){
            conditionBetweenBeforeAndAfter = true;
        }else{
            conditionBetweenAfterAndBefore = true;
        }
    }else
    {
        if(conditionType == listOfConditionTypes[BEFORE_CONDITION]){
            conditionBefore = true;
        }else if(conditionType == listOfConditionTypes[AFTER_CONDITION]){
            conditionAfter = true;
        }
    }
}

fs.readFile(jsonFile, function(err, file){

    let data = JSON.parse(file);

    checkForCompromisedPasswords(data);
});

function checkForCompromisedPasswords(data)
{
    if(!data[0].hasOwnProperty('DomainName') || !data[0].hasOwnProperty('Alias') || !data[0].hasOwnProperty('Breaches'))
    {
        console.log('Json not valid...');
        return;
    }

    let listOfCompromised = [];

    data.forEach(elementData => {
        elementData.Breaches.forEach(elementBreaches => {
            elementBreaches.DataClasses.forEach(elementDataClasses => {
                if(elementDataClasses == 'Passwords')
                {
                    if(conditionBetweenBeforeAndAfter){
                        if((elementBreaches.BreachDate < conditionValue) && (elementBreaches.BreachDate > secondConditionValue)){
                            listOfCompromised.push(elementData);
                        }
                    }else if(conditionBetweenAfterAndBefore){
                        if((elementBreaches.BreachDate > conditionValue) && (elementBreaches.BreachDate < secondConditionValue)){
                            listOfCompromised.push(elementData);
                        }
                    }else if(conditionBefore){
                        if(elementBreaches.BreachDate < conditionValue){
                            listOfCompromised.push(elementData);
                        }
                    }else if(conditionAfter){
                        if(elementBreaches.BreachDate > conditionValue){
                            listOfCompromised.push(elementData);
                        }
                    }else{
                        listOfCompromised.push(elementData);
                    }
                }
            });
        });
    });


    listOfCompromised.forEach(element => {
        console.log(element.Alias);
    });
       
}