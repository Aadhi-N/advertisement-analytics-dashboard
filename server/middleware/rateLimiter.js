const moment = require("moment");
const redis = require("redis");

const redisClient = redis.createClient();

const WINDOW_SIZE_IN_HOURS = 1;
const MAX_WINDOW_REQUEST_COUNT = 5;
const WINDOW_LOG_INTERVAL_IN_HOURS = 1;

const rateLimiter = (req, res, next) => {
    try {
        // Check if Redis client exists
        if (!redisClient) {
            throw new Error("Redis client does not exist!");
        };
        // Fetch records of current user using IP address; return null if no record exists
        redisClient.get(req.ip, (err, record) => {
            if (err) throw err;
            const currentRequestTime = moment();
            console.log("Record", record);

            // If no record exists, create new record for user and store to Redis
            if (record === null) {
                let newRecord = [];
                let requestLog = {
                    requestTimeStamp: currentRequestTime.unix(),
                    requestCount: 1
                };
                newRecord.push(requestLog);
                redisClient.set(req.ip, JSON.stringify(newRecord));
                next();
            }; 

            // If record exists, parse number of requests user made within the last window
            const data = JSON.parse(record);
            let windowStartTimestamp = moment().subtract(WINDOW_SIZE_IN_HOURS, "hours").unix();
            let requestsWithinWindow = data.filter(entry => {
                return entry.requestTimeStamp > windowStartTimestamp;
            });
            console.log("RequestsWithinWindow: ", requestsWithinWindow);
            let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
                return accumulator + entry.requestCount;
            }, 0);

            // If number of requests made equals to or exceeds limit, return error
            if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
                res.status(429).send(`You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!`)
            } else {
                // If number of requests made is less than limit, create new entry
                let lastRequestLog = data[data.length - 1];
                let currentWindowIntervalStartTimeStamp = currentRequestTime.subtract(WINDOW_LOG_INTERVAL_IN_HOURS, "hours").unix();

                // If time interval has not passed since last request, increment counter
                if (lastRequestLog.requestTimeStamp > currentWindowIntervalStartTimeStamp) {
                    lastRequestLog.requestCount++;
                    data[data.length - 1] = lastRequestLog;
                } else {
                    // If time interval has passed, create new entry and timestamp for user
                        data.push({
                        requestTimeStamp: currentRequestTime.unix(),
                        requestCount: 1
                    });
                }
                redisClient.set(req.ip, JSON.stringify(data));
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = rateLimiter;