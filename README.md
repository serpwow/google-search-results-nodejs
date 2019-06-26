# Google Search Results in Node.JS

This Node.JS module allows you to scrape and parse Google Search Results using [SerpWow](https://serpwow.com). In addition to [Search](https://serpwow.com/docs/search-api/overview) you can also use this module to access the SerpWow [Locations API](https://serpwow.com/docs/locations-api/overview), [Batches API](https://serpwow.com/docs/batches-api/overview) and [Account API](https://serpwow.com/docs/account-api).

All methods support promises and node-style callbacks.

## Installation
You can install google-search-results-serpwow with:

```shell
$ npm install google-search-results-serpwow
```

and update with:

```shell
$ npm update google-search-results-serpwow
```

View package on [npmjs.com](https://www.npmjs.com/package/google-search-results-serpwow)

## Documentation
We have included examples here but full SerpWow API documentation is available at the [API Docs](https://serpwow.com/docs):
- [Search API Docs](https://serpwow.com/docs/search-api/overview) 
- [Locations API Docs](https://serpwow.com/docs/locations-api/overview) 
- [Account API Docs](https://serpwow.com/docs/account-api)
- [Batches API Docs](https://serpwow.com/docs/batches-api)

You can also use the [API Playground](https://app.serpwow.com/playground) to visually build Google search requests using SerpWow.

## Examples
- [Simple Example](#simple-example) 
- [Example Response](#example-response) 
- [Getting an API Key](#getting-an-api-key)
- [Searching with a Location](#searching-with-a-location)
- [Searching Google Places, Google Videos, Google Images, Google Shopping and Google News](#searching-google-places-google-videos-google-images-google-shopping-and-google-news)
- [Returning results as JSON, HTML and CSV](#returning-results-as-json-html-and-csv)
- [Requesting mobile and tablet results](#requesting-mobile-and-tablet-results)
- [Parsing Results](#parsing-results)
- [Paginating results, returning up to 100 results per page](#paginating-results-returning-up-to-100-results-per-page)
- [Search example with all parameters](#search-example-with-all-parameters)
- [Locations API Example](#locations-api-example)
- [Account API Example](#account-api-example)
- [Batches API](#batches-api)

## Requirement
- ES6 basic understanding
- Node.JS coding experience
- Node 7+ and npm installed

## Simple Example
Simplest example for a standard query "pizza", returning the Google SERP (Search Engine Results Page) data as JSON.
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

// #1. example using promises & async/await
async function getResult() {

  let result = await serpwow.json({
    q: 'pizza'
  });
  
  // pretty-print the result
  console.log(JSON.stringify(result, 0, 2));

}
getResult();


// #2. example using callbacks
serpwow.json(
  {
    q: 'pizza'
  })
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    // print the error
    console.log(error);
  });
```

## Example Response
A snapshot (shortened for brevity) of the JSON response returned is shown below. For details of all of the fields from the Google search results page that are parsed please see the [docs](https://serpwow.com/docs/search-api/results/google/overview).
```json
{
  "request_info": {
    "success": true
  },
  "search_metadata": {
    "id": "20c8e44e9cacedabbdff2d9b7e854436056d4f33",
    "engine_url": "https://www.google.com/search?q=pizza&oq=pizza&sourceid=chrome&ie=UTF-8",
    "total_time_taken": 0.14
  },
  "search_parameters": {
    "q": "pizza"
  },
  "search_information": {
    "total_results": 1480000000,
    "time_taken_displayed": 0.45,
    "query_displayed": "pizza",
    "detected_location": "Ireland"
  },
  "local_map": {
    "link": "https://www.google.com/search?q=pizza&npsic=0&rflfq=1&rldoc=1&rlha=0&rllag=53350059,-6249133,1754&tbm=lcl&sa=X&ved=2ahUKEwiC3cLZ0JLgAhXHUxUIHQrsBC4QtgN6BAgBEAQ",
    "gps_coordinates": {
      "latitude": 53.350059,
      "longitude": -6.249133,
      "altitude": 1754
    },
    "local_results": [{
        "position": 1,
        "title": "Apache Pizza Temple Bar",
        "extensions": [
          "American-style pizza-delivery chain"
        ],
        "rating": 3.6,
        "reviews": 382,
        "type": "Pizza",
        "block_position": 1
      }
    ]
  },
  "knowledge_graph": {
    "title": "Pizza",
    "type": "Dish",
    "description": "Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients baked at a high temperature, traditionally in a wood-fired oven.",
    "source": {
      "name": "Wikipedia",
      "link": "https://en.wikipedia.org/wiki/Pizza"
    },
    "nutrition_facts": {
      "total_fat": [
        "10 g",
        "15%"
      ],
      "sugar": [
        "3.6 g"
      ]
    }
  },
  "related_searches": [{
      "query": "apache pizza",
      "link": "https://www.google.com/search?q=apache+pizza&sa=X&ved=2ahUKEwiC3cLZ0JLgAhXHUxUIHQrsBC4Q1QIoAHoECAUQAQ"
    }
  ],
  "organic_results": [{
      "position": 1,
      "title": "10 Best Pizzas in Dublin - A slice of the city for every price point ...",
      "link": "https://www.independent.ie/life/travel/ireland/10-best-pizzas-in-dublin-a-slice-of-the-city-for-every-price-point-37248689.html",
      "domain": "www.independent.ie",
      "displayed_link": "https://www.independent.ie/.../10-best-pizzas-in-dublin-a-slice-of-the-city-for-every-p...",
      "snippet": "Oct 20, 2018 - Looking for the best pizza in Dublin? Pól Ó Conghaile scours the city for top-notch pie... whatever your budget.",
      "cached_page_link": "https://webcache.googleusercontent.com/search?q=cache:wezzRov42dkJ:https://www.independent.ie/life/travel/ireland/10-best-pizzas-in-dublin-a-slice-of-the-city-for-every-price-point-37248689.html+&cd=4&hl=en&ct=clnk&gl=ie",
      "block_position": 2
    }
  ],
  "related_places": [{
    "theme": "Best dinners with kids",
    "places": "Pinocchio Italian Restaurant - Temple Bar, Cafe Topolisand more",
    "images": [
      "https://lh5.googleusercontent.com/p/AF1QipNhGt40OpSS408waVJUHeItGrrGqImmEKzuVbBv=w152-h152-n-k-no"
    ]
  }],
  "pagination": {
    "current": "1",
    "next": "https://www.google.com/search?q=pizza&ei=fRZQXMKqL8en1fAPitiT8AI&start=10&sa=N&ved=0ahUKEwiC3cLZ0JLgAhXHUxUIHQrsBC4Q8NMDCOkB"
  }
}
```

## Getting an API Key
To get a free API Key head over to [app.serpwow.com/signup](https://app.serpwow.com/signup).

## Searching with a location
Example of a Google query geo-locating the query as if the user were located in New York. 
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

// retrieve the search results as JSON
serpwow.json(
  {
    q: 'pizza',
    location: 'New York,New York,United States'
  })
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    // print the error
    console.log(error);
  });
```

## Searching Google Places, Google Videos, Google Images, Google Shopping and Google News
Use the ``search_type`` param to search Google Places, Videos, Images and News. See the [Search API Parameters Docs](https://serpwow.com/docs/search-api/searches) for full details of the additional params available for each search type.
```javascript
// perform a search on Google News, just looking at blogs, filtering out duplicates, ordered by date, in the last tear
serpwow.json(
  {
    q: 'football news',
    search_type: 'news',
    news_type: 'blogs',
    show_duplicates: 'false',
    sort_by: 'date',
    time_period: 'last_year'
  })
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    // print the error
    console.log(error);
  });


// perform a search on Google Places for 'plumber' in London
serpwow.json(
  {
    search_type: 'places',
    q: 'plumber',
    location: 'London,England,United Kingdom'
  })
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    // print the error
    console.log(error);
  });


// perform an image search on Google Images for "red flowers"
serpwow.json(
  {
    q: 'red flowers',
    search_type: 'images'
  })
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    // print the error
    console.log(error);
  });
```

## Returning results as JSON, HTML and CSV
SerpWow can return data in JSON, HTML and CSV formats using the ``json``, ``html`` and ``csv`` methods. For CSV results use the ``csv_fields`` param ([docs](https://serpwow.com/docs/search-api/reference/csv-fields)) to request specific result fields.
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

/* 
  Set up parameters the query (q) and location parameters
  note that the "location" parameter should be a value
  returned from the Locations API.
  We'll re-use the same params for all 3 examples.
*/
var params = {
  q: 'pizza',
  location: 'New York,New York,United States'
}

// retrieve the Google search results as JSON
serpwow.json(params)
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    console.log(error);
  });

// retrieve the Google search results as HTML
serpwow.html(params)
  .then(result => {
    // print the result HTML
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

// retrieve the Google search results as CSV
serpwow.csv(params)
  .then(result => {
    // print the result CSV string
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
```

## Requesting mobile and tablet results
To request that SerpWow renders the Google search results via a mobile or tablet browser use the ``device`` param:
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

// set up the mobile params
var paramsMobile = {
  q : 'pizza',
  device : 'mobile'
}

// set up the tablet params
var paramsTablet = {
  q : 'pizza',
  device: 'tablet'
}

// set up the desktop params (note we omit the 'device' param)
var paramsDesktop = {
  q: 'pizza'
}

// retrieve the mobile search results
serpwow.json(paramsMobile)
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    console.log(error);
  });

// retrieve the tablet search results
serpwow.json(paramsTablet)
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    console.log(error);
  });

// retrieve the desktop search results
serpwow.json(paramsDesktop)
  .then(result => {
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  })
  .catch(error => {
    console.log(error);
  });
```

## Parsing results
When making a request via the ``json`` method an object is returned. You can inspect this dict to iterate, parse and store the results in your app.
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

// make a simple query, returning JSON
serpwow.json({
    q: 'pizza'
  })
  .then(result => {

    // determine if the request was successful
    var success = result.request_info.success;

    if (success === true) {
      
      // extract the time taken and number of organic results
      timeTaken = result.search_metadata.total_time_taken;
      organicResultCount = result.organic_results.length;

      // print
      console.log(organicResultCount + ' organic results returned in ' + timeTaken + 's');
    }

  })
  .catch(error => {
    console.log(error);
  });
```

## Paginating results, returning up to 100 results per page
Use the ``page`` and ``num`` parameters to paginate through Google search results. The maximum number of results returned per page (controlled by the ``num`` param) is 100 (a Google-imposed limitation) for all ``search_type``'s apart from Google Places, where the maximum is 20. Here's an example.
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

// set number of results 
let numberOfResults = 100;

// request the first 100 results
serpwow.json({
    q: 'pizza',
    page: 1,
    num: numberOfResults
  })
  .then(result => {

    // print out the number of organic results returned 
    console.log(result.organic_results.length + ' results returned');

  })
  .catch(error => {
    console.log(error);
  });

```

## Search example with all parameters
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

// set up a multiple search parameters, retrieving results as CSV (note the csv_fields param)
serpwow.csv({
    q: 'pizza',
    gl: 'us',
    hl: 'en',
    location: 'New York,New York,United States',
    google_domain: 'google.com',
    time_period: 'custom',
    sort_by: 'date',
    time_period_min: '02/01/2018',
    time_period_max: '02/08/2019',
    device: 'mobile',
    csv_fields: 'search.q,organic_results.position,organic_results.domain',
    page: '1',
    num: '100'
  })
  .then(result => {

    // print out the CSV results
    console.log(result);

  })
  .catch(error => {
    console.log(error);
  });
```


## Locations API Example
The [Locations API](https://serpwow.com/docs/locations-api/overview) allows you to search for SerpWow supported Google search locations. You can supply the ``full_name`` returned by the Locations API as the ``location`` parameter in a Search API query (see [Searching with a location](https://github.com/serpwow/google-search-results-python#searching-with-a-location) example above) to retrieve search results geo-located to that location.
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

// retrieve locations matching the query parameters as JSON
serpwow.locations({
    q: 'mumbai'
  })
  .then(result => {

    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));

  })
  .catch(error => {
    console.log(error);
  });
```

## Account API Example
The [Account API](https://serpwow.com/docs/account-api) allows you to check your current SerpWow usage and billing information. 
```javascript
var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('API_KEY')

// get our account info
serpwow.account()
  .then(result => {

    // pretty-print the account info
    console.log(JSON.stringify(result, 0, 2));

  })
  .catch(error => {
    console.log(error);
  });
```

## Batches API
The [Batches API](https://serpwow.com/docs/batches-api) allows you to create, update and delete Batches on your SerpWow account (Batches allow you to save up to 15,000 Searches and have SerpWow run them on a schedule).

For more information and extensive code samples please see the [Batches API Docs](https://serpwow.com/docs/batches-api).