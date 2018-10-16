'use strict';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

module.exports = {
  read: function (source) {
    var temp = source.replace(/^s3:\/\//, '').split('/');
    var bucket = temp.splice(0, 1);
    var key = temp.join('/');
    var params = {
      Bucket: bucket,
      Key: key
    };
    return new Promise ((resolve, reject) => {
      s3.getObject(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data.Body));
        }
      });
    })
  },
  write: function (dest, obj) {
    var temp = dest.replace(/^s3:\/\//, '').split('/');
    var bucket = temp.splice(0, 1);
    var key = temp.join('/');
    var params = {
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(obj),
      ContentType: "application/json"
    };
    return new Promise(function (resolve, reject) {
      s3.getObject(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};