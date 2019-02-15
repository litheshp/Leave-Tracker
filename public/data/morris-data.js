$(function() {
	
	

	/* Morris.Area({
        element: 'morris-area-chart',
        data: [{ period: '2018 Q1', leave: 1.5625, ute: 87.5, billable: 1344 },
  { period: '2018 Q2', leave: 1.5625, ute: 87.5, billable: 1344 },
  { period: '2018 Q3', leave: 3.5625, ute: 97.5, billable: 2344 },
  { period: '2018 Q4', leave: 3.5625, ute: 107.5, billable: 3344 } , {
            period: '2011 Q1',
            iphone: 6810,
            ipad: 1914,
            itouch: 2293
        }, {
            period: '2011 Q2',
            iphone: 5670,
            ipad: 4293,
            itouch: 1881
        }, {
            period: '2011 Q3',
            iphone: 4820,
            ipad: 3795,
            itouch: 1588
        }, {
            period: '2011 Q4',
            iphone: 15073,
            ipad: 5967,
            itouch: 5175
        }, {
            period: '2012 Q1',
            iphone: 10687,
            ipad: 4460,
            itouch: 2028
        }, {
            period: '2012 Q2',
            iphone: 8432,
            ipad: 5713,
            itouch: 1791
        }],
        xkey: 'period',
        ykeys: ['leave', 'ute', 'billable'],
        labels: ['leave', 'ute', 'billable'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });*/

   Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Download Sales",
            value: 12
        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: 'Jan',
            a: 100,
            b: 90
        }, {
            y: 'Feb',
            a: 75,
            b: 65
        }, {
            y: 'Mar',
            a: 50,
            b: 40
        }, {
            y: 'Apr',
            a: 75,
            b: 65
        }, {
            y: 'May',
            a: 50,
            b: 40
        }, {
            y: 'Jun',
            a: 75,
            b: 65
        }, {
            y: 'Jul',
            a: 90,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });
    Morris.Line({
		  // ID of the element in which to draw the chart.
		  element: 'morris-line-chart',
		  // Chart data records -- each entry in this array corresponds to a point on
		  // the chart.
		  data: [
		    { year: '2008', value: 20 },
		    { year: '2009', value: 10 },
		    { year: '2010', value: 5 },
		    { year: '2011', value: 5 },
		    { year: '2012', value: 20 }
		  ],
		  // The name of the data record attribute that contains x-values.
		  xkey: 'year',
		  // A list of names of data record attributes that contain y-values.
		  ykeys: ['value'],
		  // Labels for the ykeys -- will be displayed when you hover over the
		  // chart.
		  labels: ['Value']
		});
});
