$(function(){


    function initAnimations(){
        $('#geo-locations-number, #percent-1, #percent-2, #percent-3').each(function(){
            $(this).animateNumber({
                number: $(this).text().replace(/ /gi, ''),
                numberStep: $.animateNumber.numberStepFactories.separator(' '),
                easing: 'easeInQuad'
            }, 1000);
        });

        $('.js-progress-animate').animateProgressBar();
    }

    function initTiles(){
        $(".live-tile").css('height', function(){
            return $(this).data('height')
        }).liveTile();

        $(document).one('pjax:beforeReplace', function(){
            $('.live-tile').liveTile("destroy", true).each(function(){
                var data = $(this).data("LiveTile");
                if (typeof (data) === "undefined")
                    return;
                clearTimeout(data.eventTimeout);
                clearTimeout(data.flCompleteTimeout);
                clearTimeout(data.completeTimeout);
            });
        });

    }

/*Date Range Picker Code*/
   
        
function datepick(){
         var start = moment().startOf('date');
            var end = moment();
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment().startOf('date'), moment()],
           'Yesterday': [moment().subtract(1, 'days').startOf('date'), moment().subtract(1, 'days').endOf('date')],
           'Last 7 Days': [moment().subtract(6, 'days').startOf('date'), moment().endOf('date')],
           'Last 30 Days': [moment().subtract(29, 'days').startOf('date'), moment().endOf('date')],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    },cb);
    
    function cb(start,end){

        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        var st=start.format('YYYY-MM-DD H:mm:ss');
        var en=end.format('YYYY-MM-DD H:mm:ss');
        sales(st,en); 
        transactions(st,en);
        pageviews(st,en);
        sessions(st,en);
        PPS(st,en);
        customers(st,en);
        language(st,en);
        referral(st,en);
        browser(st,en);
        salesgraph(st,en);
        mapsales(st,en);
        devices(st,en);
        productviews(st,en);
        console.log(start.format('YYYY-MM-DD H:mm:ss'));
        console.log(end.format('YYYY-MM-DD H:mm:ss'));
    }
        cb(start,end);
   
    }
/*Date Range Ends*/

function numberWithCommas(x) {
    if(x===null)
        return "0";
        else
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function salesgraph(start,end){

$.getJSON("http://localhost:8085/insytapi/graphs/"+start+"/"+end+"/", saleschart);
function saleschart(data)
{
    var sales=[],
        sessions=[],
        customers=[],
        pageviews=[];

    for(var i = 0; i < data.length; i++){
                sales.push({x: data[i].Date, y: data[i].Sales});
                sessions.push({x: data[i].Date, y: data[i].Sessions});
                customers.push({x: data[i].Date, y: data[i].Customers});
                pageviews.push({x: data[i].Date, y: data[i].Pageviews});
                }  
    var fdata=[{
        area: true,
        key: "Sales",
        values: sales
    },
    {   area:true,
        key: "Sessions",
        values: sessions 
    },
    {   area:true,
        key:"Customers",
        values: customers
    },
    {   area:true,
        key:"Pageviews",
        values: pageviews

    }]
    ;

     nv.addGraph(function() {
            var chart = nv.models.lineChart()
                .x(function(d) {return d3.time.format("%Y-%m-%d").parse(d.x) })
                .useInteractiveGuideline(true)
                .margin({left: 45, bottom: 20, right: 20})
                .color(['#4A777A', '#AEC7E8', '#FF7F0E', '#FFBA77']);

            chart.xAxis
                .showMaxMin(true)
                .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)) });

            chart.yAxis
                .showMaxMin(false)
                .tickFormat(d3.format(',d'));

            d3.select('#nvd31 svg')
                .style('height', '300px')
                .datum(fdata)
                .transition().duration(500)
                .call(chart);
            nv.utils.windowResize(function(){ chart.update(); });
            return chart;
        });
}
}


function sales(start,end){
$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:8085/insytapi/sales/'+start+'/'+end+'/', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
            $.each(data, function(index, element) {
            $("#sales").text(numberWithCommas(element.Sales));
        });
    }
});
$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:8085/insytapi/sales/'+moment().subtract(7, 'days').format('YYYY-MM-DD H:mm:ss')+'/'+moment().format('YYYY-MM-DD H:mm:ss')+'/', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
            $.each(data, function(index, element) {
            $("#salesweekly").text(numberWithCommas(element.Sales));
        });
    }
});
$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:8085/insytapi/sales/'+moment().subtract(60, 'minutes').format('YYYY-MM-DD H:mm:ss')+'/'+moment().format('YYYY-MM-DD H:mm:ss')+'/', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
            $.each(data, function(index, element) {
            $("#saleshourly").text(numberWithCommas(element.Sales));
        });
    }
});
}

function transactions(start,end){
$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:8085/insytapi/transactions/'+start+'/'+end+'/', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
    
        $.each(data, function(index, element) {
            $("#transactions").text(numberWithCommas(element.Transactions));
        });
    }
});
$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:8085/insytapi/transactions/'+moment().subtract(7, 'days').format('YYYY-MM-DD H:mm:ss')+'/'+moment().format('YYYY-MM-DD H:mm:ss')+'/', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
    
        $.each(data, function(index, element) {
            $("#transactionsweekly").text(numberWithCommas(element.Transactions));
        });
    }
});
$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:8085/insytapi/transactions/'+moment().subtract(60, 'minutes').format('YYYY-MM-DD H:mm:ss')+'/'+moment().format('YYYY-MM-DD H:mm:ss')+'/', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
    
        $.each(data, function(index, element) {
            $("#transactionshourly").text(numberWithCommas(element.Transactions));
        });
    }
});
}
   function productviews(start,end){
$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:8085/insytapi/productv/'+start+'/'+end+'/', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
            $.each(data, function(index, element) {
            $("#pv").text(numberWithCommas(element.ProductView));
            $("#adds").text(numberWithCommas(element.Adds));
            $("#removes").text(numberWithCommas(element.Removes));
        });
    }
});
$.ajax({ 
    type: 'GET', 
    url: 'http://localhost:8085/insytapi/productv/'+moment().subtract(60, 'minutes').format('YYYY-MM-DD H:mm:ss')+'/'+moment().format('YYYY-MM-DD H:mm:ss')+'/', 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
            $.each(data, function(index, element) {
            $("#pvhourly").text(numberWithCommas(element.ProductView));
            $("#addshourly").text(numberWithCommas(element.Adds));
            $("#removeshourly").text(numberWithCommas(element.Removes));
        });
    }
});
}
    function pageviews(start,end){
    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:8085/insytapi/pageviews/'+start+'/'+end+'/', 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (data) { 
        
            $.each(data, function(index, element) {
                $("#pageviews").text(numberWithCommas(element.Pageviews));                    
            });
        }  
    });
    }
    
    function sessions(start,end){
    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:8085/insytapi/sessions/'+start+'/'+end+'/', 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (data) { 
        
            $.each(data, function(index, element) {
                $("#sessions").text(numberWithCommas(element.Sessions));
                });
            }
        });
    }

    function PPS(start,end){
    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:8085/insytapi/PPS/'+start+'/'+end+'/', 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (data) { 
        
            $.each(data, function(index, element) {
                $("#pageviewpersession").text(element.PPS);
                });
            }
        });
    }

    function customers(start,end){
    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:8085/insytapi/customers/'+start+'/'+end+'/', 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (data) { 
        
            $.each(data, function(index, element) {
                $("#customers").text(numberWithCommas(element.Customers));
                });
            }
        });
    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:8085/insytapi/customers/'+moment().subtract(7, 'days').format('YYYY-MM-DD H:mm:ss')+'/'+moment().format('YYYY-MM-DD H:mm:ss')+'/', 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (data) { 
        
            $.each(data, function(index, element) {
                $("#customerweekly").text(numberWithCommas(element.Customers));
                });
            }
        });
    $.ajax({ 
        type: 'GET', 
        url: 'http://localhost:8085/insytapi/customers/'+moment().subtract(60, 'minutes').format('YYYY-MM-DD H:mm:ss')+'/'+moment().format('YYYY-MM-DD H:mm:ss')+'/', 
        data: { get_param: 'value' }, 
        dataType: 'json',
        success: function (data) { 
        
            $.each(data, function(index, element) {
                $("#customerhourly").text(numberWithCommas(element.Customers));
                });
            }
        });
    }


    function pjaxPageLoad(){
        $('.widget').widgster();
        initAnimations();
        initTiles(); 
        datepick();
        
        
    }

    pjaxPageLoad();
    insytioApp.onPageLoad(pjaxPageLoad);
});