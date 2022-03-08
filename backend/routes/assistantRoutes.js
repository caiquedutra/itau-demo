const assistantRoutes = require('express').Router();
const assistantController = require('../connectors/watsonAssistantConnector')


assistantRoutes.post('/', async function (req, res, next) {
    try {     
        let result = await assistantController.sendMessageToAssistant(req.body)
        .then(response => {
            res.status(200).send({
                'message': 'Conversation Ok',
                'data': response
            });
        })
        .catch(err => {
            res.status(500).send({
                'message': 'Conversation not started!' + err
            });
        });
    } 
    catch (err) {
        res.status(500).send({
            'message': 'Conversation not started!',
            'data': err
        });
    }
});


module.exports = assistantRoutes;
