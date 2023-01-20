import { baseURL } from "./env.js"; //* Put a line below this
const getUrl = `${baseURL}/values/Sheet1!A:A`; //* Use string interpolation instead of concatnating strings this way
const postUrl = `${baseURL}/values:batchUpdate`; //* Same comment, see above
//* The two urls above share the same base URL and spreadsheetID, can these be combined into ONE base URL
//* and append the rest of the URL in the request or elsewhere?
//* use camel casing for variables ie: getUrl, postUrl, etc,


let tab_url, a_token, jobData, init, num;




// listener for content script
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // when form is pressed, send get request    
        // return status code if 401 -> get access token 
        // if status code is 200 then continue and send POST request
        // check status -> if 200 then successfully added message 
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            tab_url = tabs[0].url;
        });
        jobData = request; //* see comment about variable casings/style
        //* What happens if fetchGetCall errors?
        fetchGetcall(a_token);
    }
);

function fetchGetcall(authtoken) { //* Should be camelCased
    // GET fetch call to identify last used cell in column A
    // Based on status of 200 or 401 will determine if access token is required
    let httpHeader = create_header("GET", authtoken);
    fetch(
        getUrl,
        httpHeader)
        .then(status)
        .then(function (data) {
            if (data != null) {
                num = data.values.length + 1;
                posttoken(a_token, num, jobData); //* I think this function can be renamed to more accurately reflect what it's doing
            }
            else {
                fetchGetcall(a_token);
            }

        });
}

function create_header(request_method, token, body = null) {
    // Function to create header element for server requests based on parameter of POST or GET request
    if (request_method == 'POST' || request_method == 'GET') {
        init = {
            method: request_method,
            async: true,
            headers: {
                Authorization: `Bearer ${token}`, //* Use string interpolation here ex: `Bearer ${token}`
                'Content-Type': 'application/json',
            },
            'contentType': 'json'
        };
        if (request_method == 'POST') {
            init['body'] = JSON.stringify(body);
        }
        return init
    }
    else { //* You could probably just return invalid request instead of using else
        return 'invalid request'
    }
}

function status(response) { //* Can we use a more descriptive name here
    // Returns response of successful request and on 401 status (invalid credentials) will request access token 
    if (response.status === 401) {
        chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
            a_token = token
        });
    }
    else {
        return response.json();
    }
}

function posttoken(token, check, job_data) { //*Camel case function name
    let msg;
    let post_body = create_requestBody(check, job_data);
    let httpHeader = create_header("POST", token, post_body); //* rHeader could probably jsut be header httpHeader
    fetch(
        postUrl,
        httpHeader)
        .then(function (response) {
            if (response.status === 200) {
                msg = "So fur, so good: Save was successful!" //* If msg is only used here and passed down declare it in this function instead of globally
            }
            else {
                msg = "Feline good but Save was not successful."
            }
            status_notification(msg);

            // make sure your system settings for notifications are turned on for Google Chrome for this to work
        });
}

function create_requestBody(cellStart, dataValues) {
    // Function to create POST request body for Google sheets update for cell location and values
    const today = new Date(); //* Move const above the let variable - OK
    const sheetcells = `Sheet1!A${cellStart}:F${cellStart}` //* Use string interpolation
    const post_requestBody = {
        "valueInputOption": 'USER_ENTERED',
        "data": [
            {
                "range": sheetcells,
                "values": [
                    [
                        dataValues.form.company_name,
                        `=HYPERLINK("${tab_url}","${dataValues.form.position}")`, //* Use string interpolation
                        dataValues.form.site,
                        formatFormdate(today), //* if today is only used here and passed down, declare it in this function
                        dataValues.form.status,
                        dataValues.form.res_version,
                    ]
                ]
            }
        ]
    }
    return post_requestBody
}

function formatFormdate(formdate) {
    // Function to format date in MM-dd-yyyy format
    return [formdate.getMonth() + 1, formdate.getDate(), formdate.getFullYear()].join('/');
}

function status_notification(msg) {
    // notification function 
    const notification_settings = {
        title: 'Job Stats Result',
        message: msg,
        iconUrl: 'images/emoji-cat.png',
        type: 'basic'
    }
    chrome.notifications.create("", notification_settings);
}

//* If you have variables that are only used in a function and passed it down then its best to declare it within its scope
//* the less global variables you have the better it is
//* JavaScript uses camel casing so declare variables and functions as such ie: statusNotification