var categoriesWin = function() {

	//creamos la ventana
	var win = Titanium.UI.createWindow({
		title : 'Categories',
		backgroundColor : '#fff'
	});
	var table = Ti.UI.createTableView({
		top: 5,
		backgroundColor: '#ffffff',
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
			 	height: '60dp',
			 	touchEnabled: true,
			 	rowIndex:i,
			 	link: domain + responses[i].streamer,
			 	
			 });
			 
			var nameLabel = Ti.UI.createLabel({
            text:responses[i].title,
            font:{
                fontSize:'14dp',
            	fontWeight:'bold'
	        	},
	        height:'auto',
	        left:'70dp',
	        top:'5dp',
	        color:'#000',
	        link: domain + responses[i].streamer,
	        });
	        
	        var catLabel = Ti.UI.createLabel({
	        text:'"' + responses[i].category_title + '"',
	        font:{
	            fontSize:'12dp'
	        },
	        height:'auto',
	        left:'75dp',
	        bottom:'5dp',
	        color:'#000',
	        touchEnabled:false,
	        link: domain + responses[i].streamer,
	        });
        
        	var image = Ti.UI.createImageView({
        		image: domain + responses[i].thumbnail,
        		width: 40,
        		height: 30,
        		left: '8dp',
        		top: '10dp',
        		link: domain + responses[i].streamer,
        	});
                	
        	row.add(image);
	        row.add(nameLabel);
	        row.add(catLabel);        
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