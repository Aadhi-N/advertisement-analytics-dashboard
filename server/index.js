const express = require('express');
const pg = require('pg');
const cors = require('cors')
const bodyParser = require('body-parser');

const rateLimiter = require("./middleware/rateLimiter");

require('dotenv').config();
const pool = new pg.Pool();

const app = express();

app.use(express.json())

app.use(cors());

app.use(rateLimiter);

const queryHandler = (req, res, next) => {
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || [])
  }).catch(next)
}

app.get('/events/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events, poi_id
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/events/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler);


app.get('/events/location', (req, res, next) => {
  req.sqlQuery = `
  SELECT date, i.poi_id, events
  FROM public.hourly_events i
  LEFT JOIN public.poi p ON p.poi_id = i.poi_id

  LIMIT 168;
  `
  return next()
}, queryHandler);


app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
  SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler);


app.get('/stats/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler);


app.get('/poi', (req, res, next) => {
  console.log('POIIIII')
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler);


/* 2 TABLES: public.hourly_stats & public.hourly_events
/* Select ALL events and stats, join both tables */
app.get('/all', (req, res, next) => {
  req.sqlQuery = `

  SELECT * 
  FROM public.hourly_stats i
  LEFT JOIN public.hourly_events ON public.hourly_events.date = i.date
  LEFT JOIN public.poi ON public.poi.poi_id = i.poi_id
  ORDER BY i.date, i.hour
  LIMIT 168;
  `
  return next()
}, queryHandler);


/* Get date and/or hourly data using given params */
app.get('/events/map', (req, res, next) => {
  const dailyQuery = `
    SELECT date, SUM(events) as events, SUM(hour) as hour, i.poi_id, p.name, p.lat, p.lon
    FROM public.hourly_events i
    LEFT JOIN public.poi p ON p.poi_id = i.poi_id
    WHERE date='${req.query.date}'
    GROUP BY i.poi_id, i.date, p.name, p.lat, p.lon
  `;

  const hourlyQuery = `
    SELECT date, events, hour, i.poi_id
    FROM public.hourly_events i
    LEFT JOIN public.poi p ON p.poi_id = i.poi_id
    WHERE date='${req.query.date}' AND hour='${req.query.hourly}'
  `;

  if (req.query.hourly) {
     req.sqlQuery = hourlyQuery
  } else {
     req.sqlQuery = dailyQuery
  }  
  return next()
}, queryHandler)


app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
