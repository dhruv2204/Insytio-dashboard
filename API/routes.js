var insytapi = require('./models/insytapi');
 
module.exports = {
  configure: function(app) {
 	
    app.get('/insytapi/browser/:start/:end', function(req, res) {
      insytapi.browser(req.params.start,req.params.end, res);
    });
    
    app.get('/insytapi/devices/:start/:end', function(req, res) {
      insytapi.devices(req.params.start,req.params.end, res);
    });
	
    app.get('/insytapi/sales/:start/:end', function(req, res) {
      insytapi.sales(req.params.start,req.params.end, res);
    });

    app.get('/insytapi/transactions/:start/:end',function(req,res){
	insytapi.transactions(req.params.start,req.params.end,res);
    });

    app.get('/insytapi/pageviews/:start/:end',function(req,res){
	insytapi.pageviews(req.params.start,req.params.end,res);
    });
    
    app.get('/insytapi/sessions/:start/:end',function(req,res){
	insytapi.sessions(req.params.start,req.params.end,res);
    });	
   
    app.get('/insytapi/PPS/:start/:end',function(req,res){
	insytapi.PPS(req.params.start,req.params.end,res);
    });
   
    app.get('/insytapi/customers/:start/:end',function(req,res){
	insytapi.customers(req.params.start,req.params.end,res);
    });

    app.get('/insytapi/language/:start/:end',function(req,res){
	insytapi.language(req.params.start,req.params.end,res);
    });
    
    app.get('/insytapi/referral/:start/:end',function(req,res){
	insytapi.referral(req.params.start,req.params.end,res);
    });
     
    app.get('/insytapi/saleswithdate/:start/:end',function(req,res){
	insytapi.saleswithdate(req.params.start,req.params.end,res);
    });
	
    app.get('/insytapi/graphs/:start/:end',function(req,res){
	insytapi.graphs(req.params.start,req.params.end,res);
    });
    
    app.get('/insytapi/salesmap/:start/:end',function(req,res){
	insytapi.salesmap(req.params.start,req.params.end,res);
    });

    app.get('/insytapi/productv/:start/:end',function(req,res){
	insytapi.productv(req.params.start,req.params.end,res);
    });
  }
};	
