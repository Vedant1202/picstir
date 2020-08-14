/** @format */

const baseUrl = 'http://127.0.0.1';
const port = '4000';
const apiVersion = '/v1';
const apiUrl = baseUrl + ':' + port + apiVersion;
const socketUrl = 'http://127.0.0.1:4040/';

// Cache storage Functions
const setData = (cname, cvalue) => {
    window.localStorage.setItem(cname, JSON.stringify(cvalue));
};

const getData = cname => {
    return JSON.parse(JSON.parse(window.localStorage.getItem(cname)));
};

const checkData = cname => {
    const user = getData(cname);
    if (user != null) {
        return true;
    }
    return false;
};

const deleteData = cname => {
    window.localStorage.removeItem(cname);
};

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const searchInArrayOfObjects = (nameKey, myArray, keyName) => {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i][keyName] === nameKey) {
            return true;
        }
    }
    return false;
};

const getCurrentDate = (dateString, options) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', options);
};

module.exports = {
    apiUrl,
    socketUrl,
    setData,
    getData,
    checkData,
    deleteData,
    capitalizeFirstLetter,
    searchInArrayOfObjects,
    getCurrentDate,
};
