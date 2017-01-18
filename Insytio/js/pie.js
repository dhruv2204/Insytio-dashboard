function languge(start,end){
var data=[];
d3.json('http://localhost:8085/insytapi/language/'+start+'/'+end+'/', function(error, json) {
   if(json === undefined || json.length === 0)    
    {

    	$("#pieChart").html("<h5><span class='fw-semi-bold'>Not Enough data to plot.</span></h5>");

    }

else{
    json = JSON.parse(JSON.stringify(json).split('"Language":').join('"label":'));
  $.each(json, function(d,i){

    data.push({

      label: i.label,

      value: i.value

    })

  })


$("#pieChart").empty();
var pie1=new d3pie("pieChart", {
    "header": {
        "title": {
            "text": "",
            "color": "#272121",
            "fontSize": 30,
            "font": "verdana"
        },
        "subtitle": {
            "color": "#999999",
            "fontSize": 10,
            "font": "verdana"
        },
        "location": "pie-center",
        "titleSubtitlePadding": 12
    },
    "footer": {
        "color": "#999999",
        "fontSize": 11,
        "font": "open sans",
        "location": "bottom-center"
    },
    "size": {
        "canvasHeight": 350,
        "canvasWidth": 350,
        "pieInnerRadius": "60%",
        "pieOuterRadius": "81%"
    },
    "data": {
        "sortOrder": "value-asc",
        "content": data
    },

    "labels": {
        "outer": {
            "pieDistance": 15
        },
        "mainLabel": {
            "color": "#000000",
            "font": "exo",
            "fontSize": 15
        },
        "percentage": {
            "color": "#e1e1e1",
            "font": "verdana",
            "fontSize": 10,
            "decimalPlaces": 0
        },
        "value": {
            "color": "#e1e1e1",
            "font": "verdana",
            "fontSize": 10
        },
        "lines": {
            "enabled": true,
            "color": "#cccccc"
        },
        "truncation": {
            "enabled": true
        }
    },
    "tooltips": {
        "enabled": true,
        "type": "placeholder",
        "string": "{label}: {percentage}%",
        "styles": {
            "fadeInSpeed": 149,
            "backgroundOpacity": 0.49,
            "color": "#f0e6e6"
        }
    },
    "effects": {
        "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400
        }
    },
    "misc": {
        "canvasPadding": {
            "top": 15,
            "right": 15,
            "bottom": 15,
            "left": 15
        },

        "colors": {
            "segments": [
                "#FFC8C8", "#444F5A", "#FF9999"	,"#3E4149"
            ]
        }
    },
    "callbacks": {
    	onload: null,
        onMouseoverSegment: null,
        onMouseoutSegment: null,
        onClickSegment: null
    }
});
}
});
}
function language(start,end){
		$('#pieChart').empty();
        $('#pieChart').css({height: 300});
        $.getJSON('http://localhost:8085/insytapi/language/'+start+'/'+end+'/', function (json) {
        	if(json === undefined || json.length === 0)    
    $("#pieChart").html("<h5><span class='fw-semi-bold'>Not Enough data to plot.</span></h5>");
			else{
				/*json= JSON.parse(JSON.stringify(json).split('"Language":').join('"label":'));*/
				//use of ES6 arrow functions to improve efficiency
				var json = json.map(item => ({
						    label: item.Language,
						    value: item.value,
						    PV: item.PV
						}));

				json.forEach(function(record) {
							    if (record.label === "en") {
							        record.label = "English";
							    }
							    if (record.label === "ar") {
							        record.label = "Arabic";
							    }
							});
/*             json= JSON.parse(JSON.stringify(json).split('"en"').join('"English"'));
             json= JSON.parse(JSON.stringify(json).split('"ar"').join('"Arabic"'));*/

             $("#langname").text(json[0].label);
			   $("#langvalue").text(json[0].value);
			   $("#PVvalue").text(json[0].PV);
			var total = 0;
				for(var i = 0; i < json.length; i++){
				    total += parseInt(json[i].value);        
				}

            Morris.Donut({
            element: 'pieChart',
            data: json,
            colors: ['#ed7999', '#ebe8f1', '#97bebf','#a77393','#cbbc6b'],
            formatter: function (value, data) { return Math.round((value/total)*100) + '%'; }
        }).on('click', function(i, row){
			   $("#langname").text(row.label);
			   $("#langvalue").text(row.value);
  				$("#PVvalue").text(row.PV);
  			});
        }
    });
    }


function referral(start,end){
		$('#pieChart2').empty();
        $('#pieChart2').css({height: 300});
        $.getJSON('http://localhost:8085/insytapi/referral/'+start+'/'+end+'/', function (json) {
        	if(json === undefined || json.length === 0)    
    $("#pieChart2").html("<h5><span class='fw-semi-bold'>Not Enough data to plot.</span></h5>");
			else{
             json = JSON.parse(JSON.stringify(json).split('"Referral":').join('"label":'));
             $("#refname").text(json[0].label);
			   $("#refvalue").text(json[0].value);
			   $("#pgvvalue").text(json[0].pgv);
			   
			var total = 0;
				for(var i = 0; i < json.length; i++){
				    total += parseInt(json[i].value);        
				}

            Morris.Donut({
            element: 'pieChart2',
            data: json,
            colors: ['#c53440', '#e28b51', '#97bebf','#a77393','#cbbc6b'],
            formatter: function (value, data) { return Math.round((value/total)*100) + '%'; }
        }).on('click', function(i, row){
			   $("#refname").text(row.label);
			   $("#refvalue").text(row.value);
  				$("#pgvvalue").text(row.pgv);
  			});
        }
    });
    }


function browser(start,end){
		$('#morris3').empty();
        $('#morris3').css({height: 350});
        $.getJSON('http://localhost:8085/insytapi/browser/'+start+'/'+end+'/', function (json) {
        	if(json === undefined || json.length === 0)    
    $("#morris3").html("<h5><span class='fw-semi-bold'>Not Enough data to plot.</span></h5>");
			else{
             json = JSON.parse(JSON.stringify(json).split('"Browser":').join('"label":'));
             
			var total = 0;
				for(var i = 0; i < json.length; i++){
				    total += parseInt(json[i].value);        
				}
            Morris.Donut({
            element: 'morris3',
            data: json,
            /*colors: ['#F7653F', '#F8C0A2', '#e6e6e6', '#EA5455'],*/
            colors: ['#F7653F', '#99567f', '#feeebe', '#fe9e6b'],
            formatter: function (value, data) { return Math.round((value/total)*100) + '%'; }
        })
        }
    });
    }

function devices(start,end){
	$.getJSON("http://localhost:8085/insytapi/devices/"+start+"/"+end+"/", devicebar);

function devicebar(databar)
{
  		var sessiondata=[],pvdata=[],fdata=[]; 
  		for(var i = 0; i < databar.length; i++){
                sessiondata.push({label: databar[i].Device, value: databar[i].Sessions});
                pvdata.push({label: databar[i].Device, value: databar[i].PV});
                }  

  		fdata=[
  		{	"key": "Product Views",
  			"values": pvdata
  		},
  		{
  			"key": "Sessions",
  			"values": sessiondata
  		}];

               nv.addGraph(function() {
          var chart = nv.models.multiBarHorizontalChart()
              .x(function(d) { return d.label })
              .y(function(d) { return d.value })
              .margin({top: 20, right: 20, bottom: 20, left: 55})
              .showValues(false)
              .showControls(true)
              .showLegend(true)
              ;
        
          chart.yAxis
              .tickFormat(d3.format(',d'));
        
          d3.select('#barchart svg')
          		.style('height', '400px')
              	.datum(fdata)
            	.transition().duration(500)
              	.call(chart);
        
          insytioApp.onResize(chart.update);
        
          return chart;
        });
 }
/*d3.json('http://localhost:8085/insytapi/devices/'+start+'/'+end+'/', function(error, json) {
      if(json=== undefined || json.length === 0)    
    {

    	$("#pieChart3").html("<h5><span class='fw-semi-bold'>Not Enough data to plot.</span></h5>");

    }

else{
    json = JSON.parse(JSON.stringify(json).split('"Device":').join('"label":'));
  $.each(json, function(d,i){

    data.push({

      label: i.label,

      value: i.value

    })

  })


$("#pieChart3").empty();
var pie3=new d3pie("pieChart3", {
	"header": {
		"title": {
			"text": "",
			"color": "#272121",
			"fontSize": 30,
			"font": "verdana"
		},
		"subtitle": {
			"color": "#999999",
			"fontSize": 10,
			"font": "verdana"
		},
		"location": "pie-center",
		"titleSubtitlePadding": 12
	},
	"footer": {
		"color": "#999999",
		"fontSize": 11,
		"font": "open sans",
		"location": "bottom-center"
	},
	"size": {
		"canvasHeight": 350,
		"canvasWidth": 360,
		"pieInnerRadius": "60%",
		"pieOuterRadius": "81%"
	},
	"data": {
		"sortOrder": "value-asc",
		"content": data
	},
	"labels": {
		"outer": {
			"pieDistance": 13
		},
		"mainLabel": {
			"color": "#000000",
			"font": "exo",
			"fontSize": 15
		},
		"percentage": {
			"color": "#e1e1e1",
			"font": "verdana",
			"fontSize": 10,
			"decimalPlaces": 0
		},
		"value": {
			"color": "#e1e1e1",
			"font": "verdana",
			"fontSize": 10
		},
		"lines": {
			"enabled": true,
			"color": "#cccccc"
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "{label}: {percentage}%",
		"styles": {
			"fadeInSpeed": 149,
			"backgroundOpacity": 0.2,
			"color": "#f0e6e6"
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400
		}
	},
	"misc": {
		"canvasPadding": {
			"top": 15,
			"right": 15,
			"bottom": 15,
			"left": 15
		},

		"colors": {
			"segments": [
				"#A9EEE6", "#FEFAEC", "#F38181", "#625772", "#555555"
			]
		}
	},
	"callbacks": {}
});
}
});*/
}
