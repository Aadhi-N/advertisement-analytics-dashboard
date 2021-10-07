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
};

// ===========================|| DASHBOARD CHART QUERIES ||=========================== //

/* Two table joins - public.hourly_stats & public.hourly_events */
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
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler);



// ===========================|| DASHBOARD CHART QUERIES ||=========================== //

/* SUM OF CLICKS - CHART */ 
app.get('/dashboard/charts/stats/total-clicks/:timeline', (req, res, next) => {
  switch (req.params.timeline) {
    case "daily": 
      req.sqlQuery = `
        SELECT date, SUM(clicks) as sum_clicks
        FROM public.hourly_stats
        WHERE date = '2017-06-16'
        GROUP BY hourly_stats.date;
      `;
      break;

    case "weekly": 
      req.sqlQuery = `
        SELECT date, SUM(clicks) as sum_clicks
        FROM public.hourly_stats
        WHERE '2017-06-09' <= date and date < '2017-06-16'
        GROUP BY hourly_stats.date;
      `;
      break;
    case "monthly":
      req.sqlQuery = `
        SELECT date, SUM(clicks) as sum_clicks
        FROM public.hourly_stats
        WHERE '2017-06-01' <= date and date < '2017-07-01'
        GROUP BY hourly_stats.date;
      `;
      break;
    default: 
      res.json({message: "Server error."})
  };
  return next();
}, queryHandler);


/* SUM OF EVENTS - CHART */
app.get('/dashboard/charts/events/total-events/:timeline', (req, res, next) => {
  switch (req.params.timeline) {
    case "daily": 
      req.sqlQuery = `
        SELECT date, SUM(events) as sum_events
        FROM public.hourly_events
        WHERE date = '2017-06-16'
        GROUP BY hourly_events.date;
      `;
      break;

    case "weekly": 
      req.sqlQuery = `
        SELECT date, SUM(events) as sum_events
        FROM public.hourly_events
        WHERE '2017-06-09' <= date and date < '2017-06-16'
        GROUP BY hourly_events.date;
      `;
      break;
    case "monthly":
      req.sqlQuery = `
        SELECT date, SUM(events) as sum_events
        FROM public.hourly_events
        WHERE '2017-06-01' <= date and date < '2017-07-01'
        GROUP BY hourly_events.date;
      `;
      break;
    default: 
      res.json({message: "Server error."})
  };
  return next();
}, queryHandler);

/* MOST POPULAR IMPRESSIONS - CHART */
// Monthly data - Get most occurence of impressions by time
// Query: sum impressions, group by date, order by most impressions, return first row
app.get('/dashboard/charts/impressions/popular-time/monthly', (req, res, next) => {
  req.sqlQuery = `
    SELECT hour, SUM(impressions)
    FROM public.hourly_stats
    WHERE '2017-06-01' <= date and date < '2017-07-01'
    GROUP BY hour
    ORDER BY sum DESC
    FETCH NEXT 1 ROW ONLY;
  `;
  return next();
}, queryHandler);

/* MOST POPULAR CLICKS - CHART */
// Monthly data - Get most occurence of clicks by time
// Query: sum clicks, group by date, order by most clicks, return first row
app.get('/dashboard/charts/clicks/popular-time/monthly', (req, res, next) => {
  req.sqlQuery = `
    SELECT hour, SUM(clicks)
    FROM public.hourly_stats
    WHERE '2017-06-01' <= date and date < '2017-07-01'
    GROUP BY hour
    ORDER BY sum DESC
    FETCH NEXT 1 ROW ONLY;
  `;
  return next();
}, queryHandler);


/* LOCATIONS METRICS - CHART */
app.get('/dashboard/charts/locations/total-:metric/:timeline', (req, res, next) => {
  switch (req.params.timeline) {
    case "daily": 
      switch(req.params.metric) {
        case "revenue": case "clicks": case "impressions": 
          req.sqlQuery = `
            SELECT p.poi_id, p.name, p.lat, p.lon, i.date, SUM(i.${req.params.metric}) as ${req.params.metric}
            FROM public.poi p
            INNER JOIN public.hourly_stats i ON i.poi_id = p.poi_id
            WHERE date = '2017-06-16'
            GROUP BY p.poi_id, i.date
            ORDER BY p.name ASC
          `;
        break;

        case "events":
          req.sqlQuery = `
            SELECT p.poi_id, p.name, p.lat, p.lon, i.date, SUM(i.${req.params.metric}) as ${req.params.metric}
            FROM public.poi p
            INNER JOIN public.hourly_events i ON i.poi_id = p.poi_id
            WHERE date = '2017-06-16'
            GROUP BY p.poi_id, i.date
            ORDER BY p.name ASC
          `;
        break;

        default: 
          res.json({message: "Server error."})
      };
    break;

    case "weekly": 
      switch(req.params.metric) {
        case "revenue": case "clicks": case "impressions": 
          req.sqlQuery = `
            SELECT p.poi_id, p.name, p.lat, p.lon, SUM(i.${req.params.metric}) as ${req.params.metric}
            FROM public.poi p
            INNER JOIN public.hourly_stats i ON i.poi_id = p.poi_id
            WHERE '2017-06-09' <= date and date < '2017-06-16'
            GROUP BY  p.poi_id 
            ORDER BY p.name ASC     
          `;
        break;

        case "events":
          req.sqlQuery = `
            SELECT p.poi_id, p.name, p.lat, p.lon, SUM(i.${req.params.metric}) as ${req.params.metric}
            FROM public.poi p
            INNER JOIN public.hourly_events i ON i.poi_id = p.poi_id
            WHERE '2017-06-09' <= date and date < '2017-06-16'
            GROUP BY  p.poi_id 
            ORDER BY p.name ASC     
          `;
        break;

        default: 
          res.json({message: "Server error."})
      }
    break;
      
    case "monthly":
      switch(req.params.metric) {
        case "revenue": case "clicks": case "impressions": 
          req.sqlQuery = `
            SELECT p.poi_id, p.name, p.lat, p.lon, SUM(i.${req.params.metric}) as ${req.params.metric}
            FROM public.poi p
            INNER JOIN public.hourly_stats i ON i.poi_id = p.poi_id
            WHERE '2017-06-01' <= date and date < '2017-07-01'
            GROUP BY  p.poi_id     
            ORDER BY p.name ASC 
          `;
        break;

        case "events":
          req.sqlQuery = `
            SELECT p.poi_id, p.name, p.lat, p.lon, SUM(i.${req.params.metric}) as ${req.params.metric}
            FROM public.poi p
            INNER JOIN public.hourly_events i ON i.poi_id = p.poi_id
            WHERE '2017-06-01' <= date and date < '2017-07-01'
            GROUP BY  p.poi_id     
            ORDER BY p.name ASC 
          `;
        break;

        default: 
          res.json({message: "Server error."})
      }
    break;
    default: 
      res.json({message: "Server error."})
  };
  return next();
}, queryHandler);

/* REVENUE BAR CHART */
app.get('/dashboard/charts/revenue/:timeline', (req, res, next) => {
  console.log('params', req.params)
  switch(req.params.timeline) {
    case "daily":
      req.sqlQuery = `
        SELECT date, hour, SUM(revenue) as revenue
        FROM public.hourly_stats
        WHERE date = '2017-06-16'
        GROUP BY hour, date
        ORDER BY hour      
      `;
    break;

    case "weekly":
      req.sqlQuery = `
        SELECT date, hour, SUM(revenue) as revenue
        FROM public.hourly_stats
        WHERE '2017-06-09' <= date and date < '2017-06-16'
        GROUP BY hour, date
        ORDER BY hour    
      `;
    break;

    case "monthly":
      req.sqlQuery = `
        SELECT date, hour, SUM(revenue) as revenue
        FROM public.hourly_stats
        WHERE '2017-06-01' <= date and date < '2017-07-01'
        GROUP BY hour, date
        ORDER BY hour    
      `;
    break;
    
    default: 
      res.json({message: "Server error."})
  };
  return next();
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



