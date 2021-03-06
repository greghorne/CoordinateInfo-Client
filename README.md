# CoordinateInfo-Client

**_What does it do?_**
- CoordinateInfo-Client displays a map and as the mouse cursor is repositioned, an API call is made which returns municipality information on the x, y coordinate position of the mouse cursor.

- This is a companion application to CoordinateInfo-API (https://github.com/greghorne/CoordinateInfo-API) used to consume information via API calls to CoordinateInfo-API.

**_Deployment:_** http://coordinateinfo-client.s3-website-us-east-1.amazonaws.com

**_Options:_** There is 1 option that may be added to the URL as a parameter to override default settings:

- _db=database:_ database=pg (default) or database=mongo - specifies to API which database to use.
- example: _http://coordinateinfo-client.s3-website-us-east-1.amazonaws.com?db=pg_
- example: _http://coordinateinfo-client.s3-website-us-east-1.amazonaws.com/?db=mongo_

**_Data:_** For more information on the data source, please refer to: https://github.com/greghorne/CoordinateInfo-API

**_Tech Stack:_** Leaflet v1.3.3 & Javascript (Client-side execution only thus there is no web server.)

**_Note about using MongoDB:_** I believe that some of the geometry descriptions in MongoDB are too large and hitting some type of size limitation for indexing.  Thus when the cursor is placed over Greenland or the southern part of Argentina, MongoDB is taking a long time to return data on the x,y coordinate.
