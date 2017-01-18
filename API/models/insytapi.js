var connection = require('../connection');

function Todo() {
	
this.browser = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT `Browser`,SUM(`Sessions`) as value FROM metrics_data WHERE `Time` >= ? AND `Time` <= ? GROUP BY `Browser` ORDER BY value DESC', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };


  this.sales = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT SUM(`Sales`) AS Sales FROM metrics_data WHERE `Time` >= ? AND `Time` <= ?', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };


this.transactions = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT SUM(`Transactions`) AS Transactions FROM metrics_data WHERE `Time` >= ? AND `Time` <= ?', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.pageviews = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT SUM(`Pageviews`) AS Pageviews FROM metrics_data WHERE `Time` >= ? AND `Time` <= ?', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.sessions = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT SUM(`Sessions`) AS Sessions FROM metrics_data WHERE `Time` >= ? AND `Time` <= ?', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };
  
this.PPS = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT (SUM(`Pageviews`)/SUM(`Sessions`)) AS PPS FROM metrics_data WHERE `Time` >= ? AND `Time` <= ?', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.customers = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT SUM(`Customers`) AS Customers FROM metrics_data WHERE `Time` >= ? AND `Time` <= ?', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.productv = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT SUM(`Product_Views`) AS ProductView, SUM(`Adds`) AS Adds, SUM(`Removes`) AS Removes FROM metrics_data WHERE `Time` >= ? AND `Time` <= ?', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.language = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT `Language`,SUM(`Sessions`) as value, SUM(`Product_Views`) as PV FROM metrics_data WHERE `Time` >= ? AND `Time` <= ? GROUP BY `Language` ORDER BY value DESC', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.referral = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT `Referral`,SUM(`Sessions`) as value, SUM(`Pageviews`) as pgv FROM metrics_data WHERE `Time` >= ? AND `Time` <= ? GROUP BY `Referral` ORDER BY value DESC', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.devices = function(start, end, res) {
    connection.acquire(function(err, con) {
   con.query('SELECT `Device`,SUM(`Sessions`) as Sessions, SUM(`Product_Views`) AS PV FROM metrics_data WHERE `Time` >= ? AND `Time` <= ? GROUP BY `Device`', [start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.saleswithdate = function(start, end, res) {
    connection.acquire(function(err, con) {
con.query('SELECT DATE_FORMAT(`Time`,"%Y-%m-%d") AS Date, SUM(`Sales`) AS Sales FROM metrics_data WHERE `Time` >= ? AND `Time` <= ? GROUP BY Date',[start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.graphs = function(start, end, res) {
    connection.acquire(function(err, con) {
con.query('SELECT DATE_FORMAT(`Time`,"%Y-%m-%d") AS Date, SUM(`Sales`) AS Sales, SUM(`Customers`) AS Customers, SUM(`Sessions`) AS Sessions, SUM(`Pageviews`) AS Pageviews FROM metrics_data WHERE `Time` >= ? AND `Time` <= ? GROUP BY Date',[start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

this.salesmap = function(start, end, res) {
    connection.acquire(function(err, con) {
con.query('SELECT `Geography`,SUM(`Sales`) as Sales FROM metrics_data WHERE `Time` >= ? AND `Time` <= ? GROUP BY `Geography`',[start,end], function(err, result) {
        con.release();
	if (err) {
          res.send({status: 1, message: 'Some sql error'});
        } else {
          res.send(result);
        }
	 
      });
    });
  };

}

module.exports = new Todo();

