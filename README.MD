# Alias with compromised password

## How to use
node script.js pwnedtrim.json ---> Get all the compromised password found  
node script.js pwnedtrim.json -before 2015-01-01 ---> Get all the compromised password before this date  
node script.js pwnedtrim.json -after 2016-12-31 ----> Get all the compromised password after this date  
node script.js pwnedtrim.json -after 2015-01-01 -before 2020-01-01 --> Get all compromised password between these date
  
The date format is YYYY-MM-DD
