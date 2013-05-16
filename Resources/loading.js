var loadingIndicator = function() {

	if (Ti.Platform.name === 'iPhone OS')
	{
  		style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else 
	{
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: '#6cb1d5',
	  font: {
	  	fontFamily:'Helvetica Neue', 
	  	fontSize:26, 
	  	fontWeight:'bold'
	  	},
	  message: 'Loading...',
	  style:style,  
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	
	return activityIndicator;
}