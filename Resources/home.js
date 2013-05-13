var homeWin = function() {

	//creamos la ventana
	var win = Titanium.UI.createWindow({
		title : 'Live & Popular',
		backgroundColor : '#fff'
	});
	
	var table = Ti.UI.createTableView({
		top: 5,
		separatorColor: "#fff",
	});
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var domain = 'http://www.ticr.com/';
	var url = domain + 'index.php?option=com_mobile';
	client.open('POST',url);
	
	client.onload = function(){
		var json = this.responseText;
		var responses = JSON.parse(json);
		table.setData([]);
		
		for (var i=0; i < responses.length; i++) {
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
	        tableData.push(row);
		};
		table.setData(tableData);
	//	textField.value = response.name;
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	client.send();
	win.add(table);

	return win;
}