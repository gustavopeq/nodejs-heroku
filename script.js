var fs = require("fs");

var jsonFile = process.argv[2];

fs.readFile(jsonFile, function(err, file){

    let data = JSON.parse(file);

    checkForCorruptedPasswords(data);
});

function checkForCorruptedPasswords(data)
{
    if(!data[0].hasOwnProperty('DomainName') || !data[0].hasOwnProperty('Alias') || !data[0].hasOwnProperty('Breaches'))
    {
        alert('Json not valid for this application');
        file.value = '';
        return;
    }

    let corrupteds = [];

    for (let i = 0; i < data.length; i++) {
        const elementData = data[i];
        for (let j = 0; j < elementData.Breaches.length; j++) {
            const elementBreaches = elementData.Breaches[j];
            let canBreak = false;
            for (let k = 0; k < elementBreaches.DataClasses.length; k++) {
                const elementDataClasses = elementBreaches.DataClasses[k];
                
                if(elementDataClasses == 'Passwords')
                {
                    corrupteds.push(elementData);
                    //canBreak = true;
                }
            }
            if(canBreak)
            {
                break;
            }
        }
    }

    corrupteds.forEach(element => {
        console.log(element.Alias);
    });
}