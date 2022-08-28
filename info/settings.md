{
    "port" : "80",
    "tokenREQUIRED" : true,
    "tokenGenerationALLOWED" : true,
    "warnings": true,
    "logging": 3,
    "bannedIPS" : [ 
        "IP1",
        "IP2" 
    ]
}

- Port 
The port the api is gonna run on. (Recommended not to change)

- tokenREQUIRED
If requests made to the api require a token.
**WARNING: If false, Token Generation will also be disabled.**

- tokenGenerationALLOWED
If users can generate new tokens. 

- wanings
If you wanna be warned about the some stuff in the api. 

- logging
Select how and where you log your requests.
+ 0 - no logging
+ 1 - logging to a .txt file
+ 2 - logging into the console
+ 3 - logging into the console and into the .txt file

- bannedIPS
Type the IP's of the users you do not want to use your api or look like they spam it.