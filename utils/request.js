import {request} from 'wx-request';
var token = require('../storage/token.js')
const API_BASE_URL = 'http://localhost:8090'


function get(url, data){
    return requestAll(url, data, 'GET')
}

function post(url, data){
    return requestAll(url, data, 'POST')
}

function requestAll(url, data, method){
    return request({
        url: API_BASE_URL + url,
        data: data,
        method: method,
        header: {
            'content-type': 'application/json',
            "Inread-Auth-Token": token.getToken()
        }
    })
}

module.exports = {
    get: get,
    post: post
  };