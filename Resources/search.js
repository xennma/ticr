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
		pickerView.animate(slideOut);
	});
	
	view.add(valueLabel);
	view.add(drop_button);
	//win.add(tableView);
	win.add(view);
	win.add(pickerView);
	return win;	
}
