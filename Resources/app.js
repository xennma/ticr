Titanium.UI.setBackgroundColor('#fff');
Titanium.include('home.js','upcoming.js','categories.js', 'search.js');
// create tab group
var tabGroup = Titanium.UI.createTabGroup();
 
// create base UI tabs and  windows

var iconHome = 'KS_nav_ui.png';
var iconUploading = 'KS_nav_ui.png';
var iconCategories = 'KS_nav_ui.png';
var iconSearch = 'KS_nav_ui.png';
if(Ti.Platform.osname != 'android')
{
	iconSearch = Titanium.UI.iPhone.SystemIcon.SEARCH;
	iconHome = Ti.UI.iPhone.SystemIcon.MOST_VIEWED;
	iconCategories = Ti.UI.iPhone.SystemIcon.FAVORITES;
	iconUploading = Ti.UI.iPhone.SystemIcon.HISTORY;
}

var home = homeWin();
var tab1 = Titanium.UI.createTab({  
    title:'Home',
    window: home, 
    icon: iconHome,
});

var upcoming = upcomingWin();
var tab2 = Titanium.UI.createTab({  
    title:'Upcoming',
    window: upcoming,
    icon: iconUploading,
});
 
var categories = categoriesWin();
var tab3 = Titanium.UI.createTab({  
    title:'Categories',
    window: categories,
    icon: iconCategories,
}); 
 
  
var search = searchWin();

var tab4 = Titanium.UI.createTab({  
    title:'Search',
    window: search,
    icon: iconSearch,
}); 
 
//  add tab
 
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  
// open tab group
tabGroup.open();