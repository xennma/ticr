var categoriesWin = function() {

	var win = Titanium.UI.createWindow({
		title : 'Categories',
		backgroundColor : '#fff'
	});
	var table = Ti.UI.createTableView({
		top: 5,	
		separatorColor: "#fff",		
	});
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var domain = 'http://www.ticr.com/';
	var url = domain + 'index.php?option=com_mobile&task=categories';
	client.open('POST',url);
	
	client.onload = function(){
		var json = this.responseText;
		var responses = JSON.parse(json);
		table.setData([]);
		
		for (var i=0; i < responses.length; i++) {
			var row = Ti.UI.createTableViewRow({
			 	height: '70dp',
			 	touchEnabled: true,
			 	rowIndex:i,
			 	link: 'Category id: ' + responses[i].id,
			 	hasChild: true,
			 	backgroundColor: '#e0e0e0',		
			 });
			 
			var catLabel = Ti.UI.createLabel({
	        text: responses[i].category_title,
	        font:{
	            fontSize:'30dp',
	            fontWeight:'bold'
	        },
	        height:'auto',
	        left:'15dp',	        
	        color:'#000',
	        touchEnabled:false,
	        link: 'Category id: ' + responses[i].id,
	        });   
	           	
	        row.add(catLabel);        
	        tableData.push(row);
		};
		table.setData(tableData);
	//	textField.value = response.name;
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	
	table.addEventListener('click', function(e){
		alert(e.source.link);
	});

	client.send();
	win.add(table);
	return win;
}