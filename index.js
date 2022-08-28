const express = require('express')
const config = require('./config.json')
const app = express()
const port = config.port
const JSONdb = require('simple-json-db')
const db = new JSONdb('./db/profiles.json')
let userCount = 0;
const {
    getpp,
    howsimp,
    randomNumber,
    randomString,
    addRequest,
    profile
} = require('./functions.js')
const {
    makeLog
} = require('./log.js')
const bannedIPS = config.bannedIPS;
const endpoints = [
    '/pp',
    ' /howsimp',
    ' /howgay',
    ' /randomnumber',
    ' /randomstring',
    ' /profile',
    ' /register'
]

// ONLY TAKE THIS OUT OF THE COMMENTS IF YOU KNOW WHAT YOU'RE DOING AND HAVE ALREADY FIXED AND ADJUSTED IT AND STUFF.
/*
var addon = require('addon');

var addons = {};
 // READ MORE ABOUT ADDONS IN /info/plugins.md
addon.call(addons, __dirname + '/plugins/*.js');
 
addons.hello();
*/

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=

/*
{                                                           
    "port" : "81",
    "tokenREQUIRED" : true,
    "tokenGenerationALLOWED" : true,
    "bannedIPS" : [ 
        "IP1",
        "IP2"
    ]
}
*/
setInterval(() => {
    let data = db.JSON();
    let entries = Object.entries(data)
    let counter = 0;
    entries.forEach(() => {
        counter++
    })
    userCount = counter
}, 1500)

if (!config.port || !config.tokenREQUIRED || !config.tokenGenerationALLOWED || !config.bannedIPS) {
    function whyDidUdeleteTheSettingsLikeWtfTheresNoPointInDoingThat__DidYouExpectSomethingToChange_WellThatsNotHowItWorks_PleaseDontChangeAndAlsoGiveMeCreditsForThisThingyIfYouCopied_IJustWannaHaveSomeoneToKnowMe_yk_ItDbeVeryNiceOfYouToJustLikeSay_OhThisGuyGaveMeAsmallThingToMakeThisOrSomethingAndIllbVery_VERY_happy() {
        console.log(`ONE OF THE CONFIG SETTINGS IS MISSING! \n DEFULT SETTINGS:`)
        return console.log(`{
            "port": "81",
            "tokenREQUIRED": true,
            "tokenGenerationALLOWED": true,
            "RegisterPORT": "81",
            "bannedIPS": [
                "IP1",
                "IP2"
            ]
        }
        IT IS VERY LICKLY IT IS BECAUSE ONE OF THE SETTINGS IS SET TO FALSE!
        IF THAT'S TRUE, THAN PLEASE IGNORE THIS MESSAGE.`)
    };
    if(config.warnings == false) {
// this is left blank for.... proffesional reasons. (but really, don't add anything like "return;" here. It's not gonna be good.  )
    } else {
    whyDidUdeleteTheSettingsLikeWtfTheresNoPointInDoingThat__DidYouExpectSomethingToChange_WellThatsNotHowItWorks_PleaseDontChangeAndAlsoGiveMeCreditsForThisThingyIfYouCopied_IJustWannaHaveSomeoneToKnowMe_yk_ItDbeVeryNiceOfYouToJustLikeSay_OhThisGuyGaveMeAsmallThingToMakeThisOrSomethingAndIllbVery_VERY_happy()
    };
};
app.use(async (req, res, next) => {

    makeLog('New request from ' + req.ip + ' to ' + req.path);

    let user = db.get(req.ip)

    if (req.path === '/register') {
        return next();
    };

    if (config.tokenREQUIRED == true) {



        if (!req.headers.authorization) {
            return res.json({
                message: '204 No API key',
                info: 'Please enter an API key.',
                error: true
            });

        } else if (!user || user.token !== req.headers.authorization) {

            return res.json({
                message: '404 Incorrect API key',
                info: 'Your API key did not work. Please make sure it\'s correct. | Forgot it? Ask the staff for help!',
                error: true
            });

        } else { // has a valid authorization
            next();
        };
    } else { // tokenREQUIRED setting
        next();
    };
});

app.get('/profile', async (req, res, next) => {
    res.json({
        message: profile(req.ip),
        info: "Get a your profile!",
        error: false
    });
    addRequest(req.ip, 'profile');
});

app.get('/randomnumber', async (req, res, next) => {
    res.json({
        message: randomNumber(),
        info: "Generate a random number for whatever you want to use! (We recommend that you generate a random number your self though because it takes only about a line..)",
        error: false
    });
    addRequest(req.ip, 'randomNumber');
});

app.get('/randomstring', (req, res, next) => {
    res.json({
        message: randomString(),
        info: "Generates a random string that you can use for anything like making tokens, passwords, IDs, ect.",
        error: false
    });
    addRequest(req.ip, 'randomString');
});

app.get('/pp', (req, res, next) => {
    res.json({
        message: getpp(),
        info: "You just get a random PP size, get it from legendary to least.. (1-26.)",
        error: false
    });
    addRequest(req.ip, 'pp');
});

app.get('/howsimp', (req, res, next) => {
    res.json({
        message: howsimp(),
        info: "This command gives out procentage calculated by the uneverse on how much of a simp the person you were thinking of is a simp. You can simply do '${user} is ${json.message} simp!' and if you do it correctly, it would be something like, 'Channel is 97% simp!'",
        error: false
    });
    addRequest(req.ip, 'howSimp');
});

app.get('/howgay', (req, res, next) => {
    res.statusCode = 200
    res.json({
        message: howsimp(),
        info: "This command gives out procentage calculated by the universe on how gay the person you were thinking of is. You can simply do '${user} is ${json.message} gay!' and if you do it correctly, it would be something like, 'Channel is 97% gay!'",
        error: false
    });
    addRequest(req.ip, 'howGay');
});

app.get('/register', (req, res, next) => {

    if (config.tokenGenerationALLOWED == false) {

        return res.json({
            message: "Token generation is disabled!",
            info: "The owner has disabled Token Generation.",
            error: true
        })

    } else if (config.tokenREQUIRED == false){

        return res.json({
            message: "Tokens are not required, so no token.",
            info: "Token Generation is Disabled."
        })

    } else if (bannedIPS.includes(req.ip)) {

        return  res.json({
            message: "Your IP adress was Permanently banned from registrating tokens.",
            info: "You are unable to register token.",
            error: true
        });

    } else if (db.get(req.ip)) {

        return res.json({
            message: "This IP already has a token!",
            info: "The IP already has a token generated and attached to it. If you wanna regenorate it, ask the staff.",
            error: true
        })

    } else {

        let token;
        token = randomString();
        const user = {
            token: token,
            requestsTOTAL: 1,
            requests: {
                pp: 0,
                howSimp: 0,
                howGay: 0,
                randomNumber: 0,
                randomString: 0,
                profile: 0
            },
        };

        db.set(req.ip, user)

        res.json({
            message: `New API token created! (In the info header) - Its generated only for your current IP adress (${req.ip})`,
            info: token,
            error: false
        })
    };
});

app.get('/stats', (req, res, next) => {
    res.json({
        message: randomString(),
        info: "Generates a random string that you can use for anything like making tokens, passwords, IDs, ect.",
        error: false
    });
    addRequest(req.ip, 'randomString');

})

app.listen(port, '0.0.0.0', () => {

    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Following endpoints avalible: \n ${endpoints}`);
})

app.get('/', (req, res, next) => {
    res.send(`Hey! Thanks for using our API! All of the avalible API endpoints: \n ${endpoints} \n \n | most of them will give output in JSON format with 'message'. To get more infromation about an endpoint, read the "info." header. \n \n Total amount of users: ${userCount}`)
    addRequest(req.ip, 'mainPage')
});

/*
          STATUS_CODES: {
            '100': 'Continue',
            '101': 'Switching Protocols',
            '102': 'Processing',
            '103': 'Early Hints',
            '200': 'OK',
            '201': 'Created',
            '202': 'Accepted',
            '203': 'Non-Authoritative Information',
            '204': 'No Content',
            '205': 'Reset Content',
            '206': 'Partial Content',
            '207': 'Multi-Status',
            '208': 'Already Reported',
            '226': 'IM Used',
            '300': 'Multiple Choices',
            '301': 'Moved Permanently',
            '302': 'Found',
            '303': 'See Other',
            '304': 'Not Modified',
            '305': 'Use Proxy',
            '307': 'Temporary Redirect',
            '308': 'Permanent Redirect',
            '400': 'Bad Request',
            '401': 'Unauthorized',
            '402': 'Payment Required',
            '403': 'Forbidden',
            '404': 'Not Found',
            '405': 'Method Not Allowed',
            '406': 'Not Acceptable',
            '407': 'Proxy Authentication Required',
            '408': 'Request Timeout',
            '409': 'Conflict',
            '410': 'Gone',
            '411': 'Length Required',
            '412': 'Precondition Failed',
            '413': 'Payload Too Large',
            '414': 'URI Too Long',
            '415': 'Unsupported Media Type',
            '416': 'Range Not Satisfiable',
            '417': 'Expectation Failed',
            '418': "I'm a Teapot",
            '421': 'Misdirected Request',
            '422': 'Unprocessable Entity',
            '423': 'Locked',
            '424': 'Failed Dependency',
            '425': 'Too Early',
            '426': 'Upgrade Required',
            '428': 'Precondition Required',
            '429': 'Too Many Requests',
            '431': 'Request Header Fields Too Large',
            '451': 'Unavailable For Legal Reasons',
            '500': 'Internal Server Error',
            '501': 'Not Implemented',
            '502': 'Bad Gateway',
            '503': 'Service Unavailable',
            '504': 'Gateway Timeout',
            '505': 'HTTP Version Not Supported',
            '506': 'Variant Also Negotiates',
            '507': 'Insufficient Storage',
            '508': 'Loop Detected',
            '509': 'Bandwidth Limit Exceeded',
            '510': 'Not Extended',
            '511': 'Network Authentication Required'
          },
*/