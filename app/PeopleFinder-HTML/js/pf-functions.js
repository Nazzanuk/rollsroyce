	
var globalData = {
	resourceUrl:'http://178.23.56.210:8889/vass-peoplefinder/asynchronous'

};

//check if BB namespace exists
if (typeof(BB) === 'undefined') {
	var BB = {};
}

//define global data structure
if (typeof(BB.GlobalData) === 'undefined') {
	//set Global params, methods
	BB.GlobalData = function(){
        return {
            peopleFinderPortlet: globalData
        }
    }();
} else {
	//append globalvals
	BB.GlobalData.peopleFinderPortlet = globalData;
}
