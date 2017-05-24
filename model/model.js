//model class 
//raw event will be processed here
// var attr = require('dynamodb-data-types').AttributeValue;
var month = require('month');
var conf = require('../config/config');
var _ = require('lodash'); 

var error = {};


function model() {
   
}

/// used previously when inserting records as single docs
model.prototype.parse_v4 = (input) => {

    var body = record;
    body.time = new Date().toISOString();

    body.hostname = (record.host).toLowerCase();

    var monthOfYeaaar = month("MMM");

    return {
        //index: "collectd_v2_m_" + monthOfYeaaar.toLowerCase() + "",
        index: "" + conf.indexBaseName + "_v3_m_" + monthOfYeaaar.toLowerCase() + "", // not recycling index based on time to avoid large amount of shards within ES service
        type: record.plugin, // creating a type per plugin under same index 
        body: body
    }

}

model.prototype.parse_bulk = (input) => {


    var outputNdjsonObj = [];

    var monthOfYeaaar = month("MMM");

    var indexname = "" + conf.indexBaseName + "_v4_m_" + monthOfYeaaar.toLowerCase() + "";



    //lodash
    _.forEach(input, (record) => {

        /// comment out below if your  
        record.time = new Date().toISOString();

        outputNdjsonObj.push(JSON.stringify({
            "index":
            {
                "_index": indexname,
                "_type": record.plugin
            }
        }));
        outputNdjsonObj.push(JSON.stringify(record));
    })

    return {
        body: outputNdjsonObj
    };
}

///
/// Setting the template for all future indexes as keywords and disabling source to save space
///

model.prototype.mappingCollectdTemplate = () => {

    return {
        "template": "" + conf.indexBaseName + "*",
        "mappings": {
            "ignore": {
                "_source": {
                    //this will not store the shadow copy of the JSON doc
                    // saves space doesn't allow re-indexing
                    // 
                    "enabled": false
                },
                "properties": {
                    "host": {
                        "type": "keyword"
                    },
                    "type": {
                        "type": "keyword"
                    },
                    "type_instance": {
                        "type": "keyword"
                    },
                    "plugin": {
                        "type": "keyword"
                    },
                    "dsnames": {
                        "type": "keyword"
                    },
                    "dstypes": {
                        "type": "keyword"
                    },
                    "plugin_instance": {
                        "type": "keyword"
                    }
                }
            }
        }
    }

}

module.exports = model;