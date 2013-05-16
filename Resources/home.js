var homeWin = function() {

	Titanium.include('loading.js');
	var parameter = require('parameter');
	
	var pageHome = 0;
	//creamos la ventana
	var win = Titanium.UI.createWindow({
		title : 'Live & Popular',
		backgroundColor : '#fff'
	});
	
	var loading = loadingIndicator();
	win.add(loading);
	// load data
	
	var table = Ti.UI.createTableView({
		top: 5,
		separatorColor: "#fff",
	});
	var table = getDataHome(loading,parameter,table,pageHome,pageHome);
	var style;


	win.add(table);
	return win;
}

function getDataHome(loading,parameter,table,offsetHome, pageHome)
{
	
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var domain = parameter.DOMAIN;
	var url = domain + parameter.URL_HOME;
	client.open('POST',url);
	client.ondatastream = function(e){
     	loading.show(); 
	};
	client.onload = function(){
		
		var button = Ti.UI.createButton({
					title: 'View more..',
					width: '120dp',					
				});
		var buttonBack = Ti.UI.createButton({
					title: 'Back Top',
					width: '120dp',					
				});
		var json = this.responseText;
		var responses = JSON.parse(json);
		table.setData([]);
		var band = true;
		for (var i=0; i < responses.length; i++) {			
			 
			 if (responses[i].title == 'more') 
			 {
			 	var row = Ti.UI.createTableViewRow({
				 	height: '50dp',
				 });			 	
				row.add(button); 
				band = false;
			 } else {
			 	
			 	var row = Ti.UI.createTableViewRow({
				 	height: '100dp',
				 	touchEnabled: true,
				 	rowIndex:i,
				 	link: domain + responses[i].streamer,
				 	backgroundColor: '#e0e0e0',
			 	});
			 	
			 	var nameLabel = Ti.UI.createLabel({
	            text:responses[i].title,
	            font:{
	                fontSize:'14dp',
	            	fontWeight:'bold',
	    	        	},
		        height:'auto',
		        left:'110dp',
		        top:'5dp',
		        color: "#6cb1d5",
		        link: domain + responses[i].streamer,
		        });
		        
		        var dateLabel = Ti.UI.createLabel({
		        text: responses[i].startdate,
		        font:{
		            fontSize:'12dp',
		            fontWeight:'bold',
		        },
		        height:'auto',
		        left:'110dp',
		        top:'40dp',
		        color:'#717777',
		        touchEnabled:false,
		        link: domain + responses[i].streamer,
		        });
		        
	        	var placeLabel = Ti.UI.createLabel({
		        text: responses[i].location,
		        font:{
		            fontSize:'12dp',
		        },
		        height:'auto',
		        left:'110dp',
		        top:'60dp',
		        color:'#717777',
		        touchEnabled:false,
		        link: domain + responses[i].streamer,
		        });
	        	var image = Ti.UI.createImageView({
	        		image: domain + responses[i].thumbnail,
	        		width: '98dp',
	        		height: '80dp',
	        		left: '5dp',
	        		top: '10dp',
	        		link: domain + responses[i].streamer,
	        	});
	        	
	            var guestLabel = Ti.UI.createLabel({
	            text: responses[i].guestText,
	            font:{
	                fontSize:'12dp',
	    	        	},
		        height:'auto',
		        left:'130dp',
		        bottom: '5dp',
		        color: "#6cb1d5",
		        link: domain + responses[i].streamer,
		        });
		        
		        var imageGuest = Ti.UI.createImageView({
	        		image: 'images/guest.png',
	        		left:'110dp',
		        	bottom: '5dp',
		        	width: '17dp',
	        		height: '17dp',
	        		link: domain + responses[i].streamer,
	        	});
	        	
	        	row.add(image);
	        	row.add(imageGuest);
		        row.add(nameLabel);
		        row.add(dateLabel);  
		        row.add(placeLabel); 
		        row.add(guestLabel); 
			 }
			      
	        tableData.push(row);
		};
		
		if ((band) && ((offsetHome > 0)||(i == 0)))
		{
			var row = Ti.UI.createTableViewRow({
				 	height: '50dp',
				 });			 	
			
			if (offsetHome > 0)
			{
				row.add(buttonBack); 
			} else {
				var text = Ti.UI.createLabel({
			        text: 'No Find Videos',
			        font:{
			             fontSize:'20dp',
			    	     },
				        
				   color: "#717777",
				      });
				row.add(text);	
			}
				
			tableData.push(row);
		}
		table.setData(tableData);
		
	    button.addEventListener('click', function(){
			pageHome = pageHome + 1;
			var offset = pageHome * parameter.LIMIT;
			table = getDataHome(loading,parameter,table,offset, pageHome);			
		});

		buttonBack.addEventListener('click', function(){
			pageHome = 0;			
			table = getDataHome(loading,parameter,table,pageHome, pageHome);			
		}); 
		loading.hide();	
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	var params = {
        offset : offsetHome,
        limit: parameter.LIMIT,
        top: parameter.TOP_LIMIT,
    };
	client.send(params);	
	return table;
}
