let axios = require('axios');
let BASE_URL = 'http://3.1.189.234:8090/data/ttntest';

// the nummber of elements for each page
const SIZE_PER_PAGE = 200;

exports.fetch = function(page) {

    return new Promise((resolve, reject) => {
        try {
            console.log('GET');
            axios.get(`${BASE_URL}`).then(function (res) {
                const dataObj = res.data;
                
                //  calculate the first element for the current page
                let firstElement = (page - 1) * SIZE_PER_PAGE;

                //  calucuate the last element for the current page
                let lastElement = (firstElement + SIZE_PER_PAGE) - 1;

                //  check if the computed last element index is out of the actual length of dataObj
                if(lastElement > dataObj.length){
                  lastElement = dataObj.length - 1;
                }

                // contains data elements that are in the range of the current page
                let returnList = [];
                for(let i = firstElement; i <= lastElement; i++){
                  returnList.push(dataObj[i]);
                }
                
                // packgaging result into JSON to add information about the current page and total pages
                let result = {
                  currentPage: page,
                  totalPages: Math.ceil(dataObj.length / SIZE_PER_PAGE),
                  data: returnList,
                }

                // let date1 = new Date(dataObj[1].timestamp);
                // let date2 = new Date("2020-08-08T08:22:50.330Z");
                // resolve({
                //   diff: date2 - date1,
                //   date1: date1,
                //   date2: date2
                // });
                resolve(result);
            });
        

          } catch (e) {
            console.error(e);
            reject(e);
          }
    })
}