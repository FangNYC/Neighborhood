# Neighborhood
For this project, I was responsible for scaling the backend of an existing airbnb clone built by another developer. 

## Related Projects

  - https://github.com/Staybnb/Nav
  - https://github.com/Staybnb/Listing_Description
  - https://github.com/Staybnb/Booking
  - https://github.com/Staybnb/Reviews


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

## Development
To run the application in non-development mode from within the root directory: 
```sh
npm run build
npm start
```

Then access the application at (http://localhost:3001).

To run in developer mode:
```sh
npm run react-dev
npm run start-dev
npm test
```

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Data Schema
This module's data is stored in a SQL database. There are three tables: 
* **Listings:** each record corresponds to one listing on Staybnb, and includes location information (lat/long) and host-inputted descriptions.
* **Neighborhoods:** each record corresponds to one of 15 neighborhoods in which all listings are located, and includes identifying names for different geographic levels related to the neighborhood as well as seven features of the neighborhood.
* **Landmarks:** each record corresponds to a well-known landmark in London, along with its location (lat/long). This data will be used to display to the client the five nearest landmarks to a given listing.

The schema is shown below.

![database schema](https://www.lucidchart.com/publicSegments/view/853181f4-358a-498e-ac6f-e406d5e1e8a9/image.png)
