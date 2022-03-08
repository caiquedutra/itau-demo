var AssistantV1 = require('watson-developer-cloud/assistant/v1');
var credentials = require('../credentials/assistantCreds.json');

//Instantiating Assistant service

const assistant = new AssistantV1({
    username: credentials.username,
    password: credentials.password,
    url: credentials.url,
    version: '2017-02-27'

});

async function sendMessageToAssistant(message) {
    return new Promise((resolve, reject) => {
        assistant.message({
            workspace_id: credentials.workspaceId,
            input: {
                text: message.message
            },
            context: message.context ? message.context : null

        }, function (err, response) {
            if (err) {
                reject('Error: ' + err);
            }
            else {
                resolve(response);
            }
        });
    })
}

module.exports = {
    sendMessageToAssistant: sendMessageToAssistant
};