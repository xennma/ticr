var searchWin = function() {

	//creamos la ventana
	var win = Titanium.UI.createWindow({
		title : 'Search',
		backgroundColor : '#fff'
	});
	var view = Titanium.UI.createView({
   		top: '0dp',
   		left: '0dp',
   		width:'50%',
   		height:'40dp'
	});
	var array = [];
	var valueRow = Titanium.UI.createTableViewRow({height:'46dp', backgroundColor: '#f5f5f5'}); 
	var valueLabel = Ti.UI.createLabel({color:'#000000', text:"Categories", font:{fontSize:21, fontWeight:'bold'}});
	valueRow.add(valueLabel);
	array.push(valueRow);
	var tableView = Titanium.UI.createTableView({data:array, style:Titanium.UI.iPhone.TableViewStyle.GROUPED});
	var pickerView = Titanium.UI.createView({height:248,bottom:-248});

	var picker = Titanium.UI.createPicker({top:0});
	picker.selectionIndicator=true;
	var pickerValues = [
		Titanium.UI.createPickerRow({title:'John'}),
		Titanium.UI.createPickerRow({title:'Alex'}),
		Titanium.UI.createPickerRow({title:'Marie'}),
		Titanium.UI.createPickerRow({title:'Eva'}),
		Titanium.UI.createPickerRow({title:'James'})
	];
	picker.add(pickerValues);
	pickerView.add(picker);
	// animations
	var slideIn =  Titanium.UI.createAnimation({bottom:0});
	var slideOut =  Titanium.UI.createAnimation({bottom:-251});
	
	// event functions
	view.addEventListener('click', function(eventObject)
	{
			pickerView.animate(slideIn);		
	});
	
	picker.addEventListener('change',function(e)
	{
		valueLabel.text = picker.getSelectedRow(0).title;;
		tableView.setData(array);
		pickerView.animate(slideOut);
	});
	
	view.add(tableView);
	win.add(view);
	win.add(pickerView);
	return win;	
}