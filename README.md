# Insytio-dashboard
E-commerce insights based on nodejs and other js charting libraries with api.

To run the project:
Pre-req: You should have node installed.
-Clone the project.
1-Create database in mysql(using phpmyadmin) for the metrics data.
  -Get the .sql extension file (metrics_data.sql) in API folder and run it through to create SQLdb.
  -change the configuration in connection.js file as per your sql host, username and password.
  

2-Open insytio folder in terminal and http server 
      http-server -c -1
 it should listen on port 8080 (if not try changing the port)
 
3-Open API folder in terminal and run API server for fetching data.
          node app.js
          Server listening on port 8085(else try other port in file app.js in API folder)
          
4-Open a web browser and check for API calls- 
          localhost:8085
          enter this in url to check GET data- localhost:8085/insytapi/graphs/2016-09-01 0:00:00/2016-09-30 23:59:59
          it should reflect some data.
  
5-Open the url in another tab - localhost:8080

You should see a dashboard- select date range from date selector 
  use June 16'-Sep 16' any dates as database have data as per this time period only.
  Charts are populated as expected.
