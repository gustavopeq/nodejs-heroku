# Alias with compromised password checker

## Hosted at:
https://pwnedjsonreader.herokuapp.com/

## Description
The purpose of this project is to upload a json file from https://haveibeenpwned.com/ and get all the alias that
have their password listed as compromised.

## Getting started
To run this application, you can access the website https://pwnedjsonreader.herokuapp.com/.
In case you want to run it locally, you will need to install NodeJs. After it, download the project and run a NodeJs local server.
After access the main page, click in Choose File to select the .json file with information about pwned.
If the file doesn't contain the properties 'DomainName', 'Alias' and 'Breaches', the application won't work.
