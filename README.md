# CoordinateInfo-Client

**_What does it do?_**
- CoordinateInfo-Client displays a map and as the mouse cursor is repositioned, an API call is made which returns municipality information on the x, y coordinate position of the mouse cursor.  The API information is displayed in the upper-right portion of the map.

- This is a companion application to CoordinateInfo-API (https://github.com/greghorne/CoordinateInfo-API) used to consume information via API calls to CoordinateInfo-API.

**_Deployment:_** https://rawgit.com/greghorne/CoordinateInfo-Client/master/index.html

**_Options:_** There is 1 option that may be added to the URL as a parameter to override default settings:

- _db=database:_ database=pg (default) or database=mongo - specifies to API which database to use.
- example: _https://rawgit.com/greghorne/CoordinateInfo-Client/master/index.html?db=pg_
- example: _https://rawgit.com/greghorne/CoordinateInfo-Client/master/index.html?db=mongo_

**_Data:_** For more information on the data source, please refer to: https://github.com/greghorne/CoordinateInfo-API

**_Tech Stack:_** Leaflet v1.3.3 & Javascript



