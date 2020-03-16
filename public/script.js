fetch("./pwnedtrim.json")
.then(function(resp)
{
    return resp.json();
})
.then(function(data)
{
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
                    canBreak = true;
                }
            }
            if(canBreak)
            {
                break;
            }
        }
    }

    corrupteds.forEach(element => 
        {
            console.log(element.Alias);
        });
});