var upcomingWin = function() {

	Titanium.include('loading.js');
	var parameter = require('parameter');
	var pageUpcoming = 0;
	var catId = 0;
	var order = 0;
	var win = Titanium.UI.createWindow({
		title : 'Upcoming Show',
		backgroundColor : '#fff'
	});
	var view = Titanium.UI.createView({
   		top: '0dp',
   		left: '0dp',
   		width:'50%',
   		height:'40dp'
	});
	
	var view1 = Titanium.UI.createView({
   		top: '0dp',
   		left: '50%',
   		width:'50%',   		
	});

	var buttonOrder = Ti.UI.createButton({
			title: 'Popular',
			top: '1dp',
   			left: '0dp',   		
   			width:'100%',
			height: '38dp',							
	});
	
	var picker = Titanium.UI.createPicker({
		top: '0dp',
   		left: '0dp',   		
   		width:'100%',
	});
	var data = [];	
	
	if(Ti.Platform.osname != 'android')
	{
		data.push(Titanium.UI.createPickerRow({title:'Categories'}));
	}
	var tr = Titanium.UI.create2DMatrix();
	tr = tr.rotate(90);	 
	var drop_button =  Titanium.UI.createButton({
			style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			transform:tr,
			top: 0,
			right: '5dp'
	});
	
	var valueLabel = Ti.UI.createLabel({color:'#000000', text:"Categories", font:{fontSize:21, fontWeight:'bold'}, left:'10dp',
	});	
	var pickerView = Titanium.UI.createView({height:248,bottom:-248, width: '100%'});	
	
	
	var client = Ti.Network.createHTTPClient();
	var domain = parameter.DOMAIN;
	var url = domain + parameter.URL_CATEGORIES;
	client.open('POST',url);
	
	client.onload = function(){
		var json = this.responseText;
		var responses = JSON.parse(json);
		
		for (var i=0; i < responses.length; i++) {
			data.push(Titanium.UI.createPickerRow({title:responses[i].category_title, value: responses[i].id}));			
		};		
		
		picker.add(data);
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	client.send();	
	
	// load data
	var loading = loadingIndicator();
	win.add(loading);
					
	var table = Ti.UI.createTableView({
		top: '40dp',
		separatorColor: "#fff",
	});
	var table = getDataUpcoming(loading,parameter,table,pageUpcoming,catId,order,pageUpcoming);
	
	picker.addEventListener('change',function(e){
		catId = e.row.value;
		pageUpcoming = 0;
  		table = getDataUpcoming(loading,parameter,table,pageUpcoming,catId,order,pageUpcoming); 
  		valueLabel.text = picker.getSelectedRow(0).title;
		pickerView.animate(slideOut);		
	});	
		
	buttonOrder.addEventListener('click', function(){
			if (order == 0) 
			{ 
				order = 1; 
			} else {
				order = 0;
			}	
			catId = 0;
			pageUpcoming = 0;
			picker.setSelectedRow(0,0,true);
			table = getDataUpcoming(loading,parameter,table,pageUpcoming,catId,order,pageUpcoming);	
		});
	
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-251});
	
	view.addEventListener('click', function(eventObject)
	{
			pickerView.animate(slideIn);		
	});
	
	if(Ti.Platform.osname != 'android')
	{
		view.add(picker);
	} else {
		pickerView.add(picker);
		view.add(valueLabel);
		view.add(drop_button);			
	}
	
	win.add(pickerView);	
	view1.add(buttonOrder);
	win.add(view);
	win.add(view1);
	win.add(table);

	return win;
}

function getDataUpcoming(loading,parameter,table,offsetUpcoming,category_id,order,pageUpcoming)
{	
	var self = Ti.UI.createView({
        backgroundColor: '#232323'
    });
	var androidUploadProgress = 0;
	var tableData = [];
	var clientData = Ti.Network.createHTTPClient();
	var domain = parameter.DOMAIN;
	var url = domain + parameter.URL_UPCOMING;
	clientData.ondatastream = function(e){
     	loading.show(); 
	};
	clientData.open('POST',url);

	clientData.onload = function(){
		var buttonUpcoming = Ti.UI.createButton({
					title: 'View more..',
					width: '120dp',					
				});
		var buttonBackUpcoming = Ti.UI.createButton({
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
				row.add(buttonUpcoming); 
				band = false;
			 } else {
			 	
				var row = Ti.UI.createTableViewRow({
				 	height: '100dp',
				 	touchEnabled: true,
				 	rowIndex:i,
				 	link: domain + responses[i].streamer,
				 	backgroundColor: '#f5f5f5',
				 	hasChild: true,
				 });
				 
				var nameLabel = Ti.UI.createLabel({
	            text:responses[i].title,
	            font:{
	                fontSize:'14dp',
	            	fontWeight:'bold',
	    	        	},
		        height:'auto',
		        left:'100dp',
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
		        left:'100dp',
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
		        left:'100dp',
		        top:'60dp',
		        color:'#717777',
		        touchEnabled:false,
		        link: domain + responses[i].streamer,
		        });
	        	var image = Ti.UI.createImageView({
	        		image: domain + responses[i].thumbnail,
	        		width: '88dp',
	        		height: '70dp',
	        		left: '5dp',
	        		top: '15dp',
	        		link: domain + responses[i].streamer,
	        	});
	        	
	            var guestLabel = Ti.UI.createLabel({
	            text: responses[i].guestText,
	            font:{
	                fontSize:'12dp',
	    	        	},
		        height:'auto',
		        left:'120dp',
		        bottom: '5dp',
		        color: "#6cb1d5",
		        link: domain + responses[i].streamer,
		        });
		        
		        var imageGuest = Ti.UI.createImageView({
	        		image: 'images/guest.png',
	        		left:'100dp',
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
		   };
		   tableData.push(row);
		};
		
		if ((band) && ((offsetUpcoming > 0)||(i == 0)))
		{   var row = Ti.UI.createTableViewRow({
					 	height: '50dp',
					 });					 
			if (offsetUpcoming > 0)
			{							 	
				row.add(buttonBackUpcoming); 				
			} else  {
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
	    buttonUpcoming.addEventListener('click', function(){
			pageUpcoming = pageUpcoming + 1;
			var offset = pageUpcoming * parameter.LIMIT;
			table = getDataUpcoming(loading,parameter,table,offset,category_id,order,pageUpcoming);		
		});
		
		buttonBackUpcoming.addEventListener('click', function(){
			pageUpcoming = 0;			
			table = getDataUpcoming(loading,parameter,table,pageUpcoming,category_id,order,pageUpcoming);		
		});
		loading.hide();
	};
	clientData.onerror = function(e){alert('Transmission error: ' + e.error);};
	 var params = {
        category_id : category_id,
        offset : offsetUpcoming,
        limit: parameter.LIMIT,
        top: parameter.TOP_LIMIT,
        order: order
    };
	clientData.send(params);
	return table;
}

