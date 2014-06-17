var pp = require('prettyjson');
var _ = require('lodash');
var Q = require('kew');
var mach = require('mach');

function mockDb(){
    return Q
        .fcall(function () {
            return [{
                sensor: "pH",
                measurement: {
                    value: 7.2,
                    units: 'pH'
                }
            }];
        });
}

exports.Measurements = {
    list: function(req, email_address) {
        return mockDb()
            .then(mach.json);
    }
};
