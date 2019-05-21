const axios = require("axios");
const moment = require("moment");
const url = "http://checkip.amazonaws.com/";
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    const ret = await getData();
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
        location: ret.data.trim(),
          time: moment('2312-24-12', "/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i", true).isValid()
      })
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

exports.lambdaAxiosHandler = async (event, context) => {
  try {
    const ret = await getData();
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
        location: ret.data.trim()
      })
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

getData = async () => {
  try {
    return await axios.get(url, { maxContentLength: 2000 });
  } catch (err) {
    console.log(err);
    return err;
  }
};
