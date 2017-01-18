function mapsales(start,end){
$.getJSON("http://localhost:8085/insytapi/salesmap/"+start+"/"+end+"/", salesmap);
	function salesmap(data){	
		var obj={};
		for(var i = 0; i < data.length; i++){
				var x= inverseCountryCodes[data[i].Geography];
				obj[x]={ value: data[i].Sales,
						tooltip: {
						 		content: "<span style='font-weight:bold;'>"+data[i].Geography+"</span><br>Sales : "+data[i].Sales
																   } };

                }

	$(".maparea").mapael({
		map : {
			name : "world_countries",
			defaultArea: {
				attrs : {
					stroke : "#fff", 
					"stroke-width" :1
				}
			}
		},
		legend : {
			area : {
				display : false,
				title :"Sales by country", 
				slices : [
					{
						max :100000, 
						attrs : {
							fill : "#F7653F"
						},
						label :"Less than de 100000 sales"
					},
					{
						min :50000, 
						max :100000, 
						attrs : {
							fill : "#F7653F"
						},
						label :"Between 50000 and 100000 sales"
					},
					{
						min :35000, 
						max :50000, 
						attrs : {
							fill : "#F7653F"
						},
						label :"Between 35000 and 50000 sales"
					},
					{
						min :35000, 
						attrs : {
							fill : "#F7653F"
						},
						label :"More than 35000 sales"
					}
				]
			}
		},
		areas: obj
	});
}
}