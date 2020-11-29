let axios = require('axios');
let BASE_URL = 'http://3.1.189.234:8090/data/ttntest';

//  1 day in millisecond format
const DAY_IN_MS = 2678400000;

exports.predict = function (day) {
    //  TODO: predict what data was in the next day
    return new Promise((resolve, reject) => {
        try {
            console.log('GET');
            axios.get(`${BASE_URL}`).then(function (res) {
                const dataObj = res.data;
                let firstDataItem = dataObj[0];
                let lastDataItem = dataObj[dataObj.length - 1];
                
                let firstDataTimeStamp = new Date(firstDataItem.timestamp);
                let lastDataTimeStamp = new Date(lastDataItem.timestamp);
                let diffTime = lastDataTimeStamp - firstDataTimeStamp;
                
                let firstData = firstDataItem.data || 0;
                let firstData2 = firstDataItem.data2 || 0;
                let lastData = lastDataItem.data || 0;
                let lastData2 = lastDataItem.data2 || 0;

                let diffData = lastData - firstData;
                let diffData2 = lastData2 - firstData2;

                let predictedData = lastData + ( diffData / diffTime ) * ( DAY_IN_MS * day );
                let predictedData2 = lastData2 + ( diffData2 / diffTime ) * ( DAY_IN_MS * day );

                let predictedResult = {
                    daysPredicted: day,
                    lastData: lastData,
                    predictedData: predictedData,
                    lastData2: lastData2,
                    predictedData2: predictedData2,
                }
                
                console.log('return success');
                resolve(predictedResult);
            });
        
    
          } catch (e) {
            console.error(e);
            reject(e);
          }
    })
}

exports.min = function() {
    return new Promise((resolve, reject) => {
        try {
            console.log('GET');
            axios.get(`${BASE_URL}`).then(function (res) {
                const dataObj = res.data;
                let min = dataObj[0].data;
                let minItem = dataObj[0];
                for (dataItem of dataObj){
                    if (min > dataItem.data){
                        minItem = dataItem;
                        min = dataItem.data;
                    }
                }
                
                console.log('return success');
                resolve(minItem);
            });
        
    
          } catch (e) {
            console.error(e);
            reject(e);
          }
    })
}

exports.max = function() {
    return new Promise((resolve, reject) => {
        try {
            console.log('GET');
            axios.get(`${BASE_URL}`).then(function (res) {
                const dataObj = res.data;
                let max = 0;
                let maxItem = dataObj[0];
                for (dataItem of dataObj){
                    if (max < dataItem.data){
                        maxItem = dataItem;
                        max = dataItem.data;
                    }
                }
                
                console.log('return success');
                resolve(maxItem);
            });
        
    
          } catch (e) {
            console.error(e);
            reject(e);
          }
    })
}

exports.avg = function() {
    return new Promise((resolve, reject) => {
        try {
            console.log('GET');
            axios.get(`${BASE_URL}`).then(function (res) {
                const dataObj = res.data;
                let sum = 0;
                let avg = 0;
                for (dataItem of dataObj){
                    sum += dataItem.data;
                }
                avg = sum/dataObj.length;
                resolve(avg);
            });
        
    
          } catch (e) {
            console.error(e);
            reject(e);
          }
    })
}
