var AwsEsConnector = require('http-aws-es');
var AWS = require('aws-sdk');
var elasticsearch = require('elasticsearch');
var config = require('../config/config.js');

function service() {

    // if using AWS ES service
    this.creds = new AWS.Credentials(config.awsGenerics);

    this.client = new elasticsearch.Client({
       // ssl: false,
		host: config.es.host, 
        log: 'error',
		sniffOnStart: true,
		deadTimeout: 10000,
		keepAlive: true,
		maxKeepAliveTime: 10000,
		sniffInterval: 60000,
		sniffOnConnectionFault: true,
		minSockets: 15,
		maxSockets: 1000,
        requestTimeout: 300000,
        ///if using AWS ES if not change according to preferenece
		connectionClass: AwsEsConnector,
		amazonES: {
			region: config.es.region,
			credentials: this.creds
		}
	});
	
}

/// method to INSERT or UPDATE
/// using PUT we can achieve this
/// not creating our own id so no need to worry about overwriting

service.prototype.index = function (esObject, callback) {

    this.client.index(esObject,
        (error, response) => {
		
			callback(error, response);
	});
}

service.prototype.bulk = function (esBulkObject, callback) {

    this.client.bulk(esBulkObject,
        (error, response) => {

            callback(error, response);
        });
}


service.prototype.deleteIndices = function (nothing, callback) {
	
	params = {
		index: nothing
	};

    this.client.indices.delete(params, (error, data) => {

        callback(error, data);

    });

}

service.prototype.getMapping = function (callback) {
	
	params = {
		index: "",
		type: ""
	}

	this.client.indices.getMapping(params,(err, _map) => {
		callback(err, _map);
	})

}


service.prototype.template = function (esObjectTemplate, callback) {



    this.client.indices.putTemplate(esObjectTemplate, (err, _template) => {
        callback(err, _template);
    })

}


module.exports = service;

