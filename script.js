var fs = require("fs");

const jsonFile = process.argv[2];
const conditionType = process.argv[3];
const conditionValue = process.argv[4];

const listOfConditionTypes = ["-before", "-after"]
var checkCondition = false;

if(conditionType != undefined && !listOfConditionTypes.includes(conditionType))
{
    console.log("Condition type not valid!");
    return;
}

if(conditionType != undefined)
{
    checkCondition = true;
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
                    if(checkCondition)
                    {
                        if(elementBreaches.BreachDate < conditionValue)
                        {
                            if(conditionType == listOfConditionTypes[0])
                            {
                                listOfCompromised.push(elementData);
                            }
                        }else
                        {
                            if(conditionType == listOfConditionTypes[1])
                            {
                                listOfCompromised.push(elementData);
                            }
                        }
                    }else
                    {
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