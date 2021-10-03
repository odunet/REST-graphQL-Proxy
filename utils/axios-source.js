const axios = require('axios');

const axiosGet = async (url) => {
  let {data} = await axios({
    method: 'GET',
    url: url
  })

  // console.log(data);

  return data

}

module.exports = {axiosGet}