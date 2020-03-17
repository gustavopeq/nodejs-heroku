const $file = $('#file');

function onChange(event) {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    let data = JSON.parse(event.target.result);

    checkForCorruptedPasswords(data);

}

function checkForCorruptedPasswords(data)
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

    $('#listFound').empty();

    if(corrupteds.length > 0)
    {
        corrupteds.forEach(element => 
        {
            $('#listFound').append(`<p list-style-type: none>${element.Alias}</p>`);
        });
    }else
    {
        $('#listFound').append(`<p list-style-type: none>There is no alias with compromised password. </p>`);
    }
}

$file.on('change', onChange);