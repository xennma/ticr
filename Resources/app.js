Titanium.UI.setBackgroundColor('#fff');
Titanium.include('home.js','upcoming.js','categories.js', 'search.js');
// create tab group
var tabGroup = Titanium.UI.createTabGroup();
 
// create base UI tabs and  windows

var home = homeWin();
var tab1 = Titanium.UI.createTab({  
    title:'Home',
    window: home, 
    icon:'KS_nav_ui.png',
});

var upcoming = upcomingWin();
var tab2 = Titanium.UI.createTab({  
    title:'Upcoming',
    window: upcoming,
    icon:'KS_nav_ui.png',
});
 
var categories = categoriesWin();
var tab3 = Titanium.UI.createTab({  
    title:'Categories',
    window: categories,
    icon:'KS_nav_ui.png',
}); 
 
  
var search = searchWin();
var tab4 = Titanium.UI.createTab({  
    title:'Search',
    window: search,
    icon:'KS_nav_ui.png',
}); 
 
//  add tab
 
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  
// open tab group
tabGroup.open();