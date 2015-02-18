//disable console.log if not supported.
if (! ("console" in window) || !("firebug" in console)) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group"
                 , "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i <names.length; ++i) window.console[names[i]] = function() {};
}


// Check if namespace defined if not create it
if (typeof(BB) === 'undefined') {
	/** 
	 * @namespace 
	 * Balfour Beatty Namespace for all javascript functions
	 */
	var BB = {};
}






/** 
 * @class 
 * Contains all methods for the People Finder App.
 */
BB.PeopleFinder = function(){
	
	//IE bug fix indexOf on Arrays
	if(!Array.indexOf){
		/** 
		 * Method not available within IE so have included it
		 * 
		 * @return {int} returns position of item within the array	
		 */
	    Array.prototype.indexOf = function(obj){
	        for(var i=0; i<this.length; i++){
	            if(this[i]==obj){
	                return i;
	            }
	        }
	        return -1;
	    }
	}

	
	//Example Static Data Structure Optimised ON array
	/*
	var optList = {
		total:124,
		filterList: {
			sectionKey:['OpCo','Job Title','Name'],
			optListFieldNames:['Name','Value'],
			section: {
				'OpCo': {
					optList: [
						['Balfour Beatty WorkPlace',8],
						['Balfour Beatty Engineering',1],
						['Balfour Beatty Rail',1],
						['Balfour Beatty Utility Solutions',1]
					]
				},
				'Job Title': {
					optList: [
						['Cleaner',3],
						['Enginer',3],
						['Security Manager',2],
						['Soft Services Manager',1],
						['Electrician',1]
					]
				},
				'Name': {
					optList: [
						['test1',3],
						['test2',3],
						['test3 Manager',2],
						['test4 Services Manager',1],
						['test5',1],
						['test6',1],
						['test7',1],
						['test8',1],
						['test9',1],
						['test10',1],
						['test11',1],
						['test12',1],
						['test13',1],
						['test14',1],
						['test15',1],
						['test16',1],
						['test17',1],
						['test18',1],
						['test19',1],
						['test20',1],
						['test21',1]
					]
				}
			}
		},
		resultSet: [
			{
				uid:1,
				firstName:'jon',
				familyName:'sim',
				displayName:'',
				givenName:'',
				mail:'',
				orclGuid:'',
				organization:'',
				title:'',
				location:'',
				employeeNumber:''
			},{
				uid:2,
				firstName:'james',
				familyName:'smith',
				displayName:'',
				givenName:'',
				mail:'',
				orclGuid:'',
				organization:'',
				title:'',
				location:'',
				employeeNumber:''
			},{
				uid:3,
				firstName:'karl',
				familyName:'sim',
				displayName:'',
				givenName:'',
				mail:'',
				orclGuid:'',
				organization:'',
				title:'',
				location:'',
				employeeNumber:''
			},{
				uid:4,
				firstName:'joe',
				familyName:'sid',
				displayName:'',
				givenName:'',
				mail:'',
				orclGuid:'',
				organization:'',
				title:'',
				location:'',
				employeeNumber:''
			}
		]
	};
	*/
	
	
	/** @scope BB.PeopleFinder */
	return {
		
		/** Notifies methods if ajax request is active 
		 * @type Boolean
		 */
		AjaxActive: false,
		/** Url to send ajax requests to - this will be set by the local html page. 
		 *  - BB.GlobalData.peopleFinderPortlet.resourceUrl
		 */
		resourceUrl: '',
		/** Current active paging page
		 * @type int
		 */
		currentPage: 1,
		/** Stored search string
		 * @type String
		 */
		searchTerm: '',
		/** Stored selected opco value from optList 
		 * @type String
		 */
//		chosenOpco: '',
		/** Show save search list results
		 * @type Boolean
		 */
		showSaveSearch: true,
		/** Object of saved search values - BB.GlobalData.peopleFinderPortlet.savedSearchList.resultSet
		 * @type object
		 */
		savedSearchList: {
			fieldNames:['Id','Name','SearchString'],
			resultSet: {}
		},
		
		/*
		savedSearchList: {
			fieldNames:['Id','Name','SearchString','Opco'],
			resultSet: {
				'id_1': [1, 'Meee', 'john'],
				'id_2': [2, 'My Search', 'marcos','BBW']
			}
		}, 
		*/
		
		/** show recent search list results
		 * @type boolean
		 */
		showRecentSearch: true, 
		/** Top 10 array of recent search string values
		 * @type array
		 */
		recentSearchList:[],
		
		//Set empty filter lists
		//TODO:: Create a dynamic var list so filters can automatically be generated.
		/** array of selected filters
		 * @type array
		 */
//		filterOpco: [],
		/** array of selected filters
		 * @type array
		 */
		filterJobTitle: [],
		/** array of selected filters
		 * @type array
		 */
		filterLocation: [],
		/** array of selected filters
		 * @type array
		 */
		filterContract: [],
		/** array of selected filters
		 * @type array
		 */
		filterSector: [],
		/** array of selected filters
		 * @type array
		 */
//		filterCostCentreCode: [],
		/** array of selected filters
		 * @type array
		 */
		filterSkillsAndQualifications: [],
		/** array of selected filters
		 * @type array
		 */
		filterExperience: [],
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * First Method to call after DOM loaded.
		 *  - Set ResourceUrl
		 *  - Set Recent Search options panel
		 *  - Set Save Search panel
		 *  - Show / hide save Search
		 *  - Initialise 'events' method
		 *  - Initialise 'initAjax' method
		 */
		init: function(){
			// set resourceUrl if defined
			if (BB.GlobalData.peopleFinderPortlet.resourceUrl.length > 0) {
				this.resourceUrl = BB.GlobalData.peopleFinderPortlet.resourceUrl;
			}
			
			// set recentSearch if defined in DOM
			if (BB.GlobalData.peopleFinderPortlet.recentSearchList != null) {
				BB.PeopleFinder.recentSearchList = BB.GlobalData.peopleFinderPortlet.recentSearchList;
			}
			
			// set saveSearch if defined in DOM
			if (BB.GlobalData.peopleFinderPortlet.savedSearchList != null) {
				if (BB.PeopleFinder.savedSearchList.resultSet != null) {
					BB.PeopleFinder.savedSearchList.resultSet = BB.GlobalData.peopleFinderPortlet.savedSearchList.resultSet;
				}
			}
			
			// hide save search if false
			if (!this.showSaveSearch) { 
				$('#BBW-wrap-saved').hide();
				$('.BBW-ico-save').hide(); //should be #id
			}
			
			// convert saveSearchList array to displayable result
			this.saveSearch({action:'loadList'});
			
			// convert recentSearchList array to displayable result
			this.recentSearch({action:'loadList'});
			
			// setup events
			this.events(); 
			
			//test to see if search values are populated
			//if they are submit ajax request
			this.initAjax();
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * If value is held within the Search String input box then auto fire ajax request
		 * to bring back results.
		 */
		initAjax: function() {
			if ($('#PFSearchString').val().length > 0) {
				BB.PeopleFinder.submitSearch({});
			}
		},
		
		
		
		
		
		
		
		
		
		
		
		
		//TEMP!!!
		/**
		 * Temporary popup close method - need to update
		 */
		tempclose:function() {
			$('#BBW-PPF-Popup').hide();
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Sets all events on the DOM - these also handle new elements that are added 
		 * via javascript that require events against them.
		 */
		events: function(){
			
			//on window resize reset popup position
			$(window).resize(function() {
				var xWidth = 300;
				var $Window = $(window);
				var yTop = $Window.height()/2;
				var xLeft = ($Window.width()/2) - (xWidth/2);
				
				$('#BBW-PPF-Popup').css({
					left:xLeft+'px',
					top:yTop+'px'
				});

			});

			
			
			
			
			//on custom form field filterSearch filter enter keypress to add new temp filter item 
			$('#BBW-filterList').delegate('.filterSearch', 'keypress.filterSearch', function(e) {
				
				if (e.keyCode == '13') {
					var $this = $(this);
					BB.PeopleFinder.addFilter({
						filter:$this.attr('name'),
						fValue:$this.val()
					});
					e.preventDefault();
				}
			});
/*			
			$('#BBWOpcoOption').keypress(function(e) {
				if (e.keyCode == '13') {
					BB.PeopleFinder.callSearch();
				}
			});
*/			
			
			
			
			
			//on click on result values display popup with userInfo plus options
			$('#BBW-search-result').delegate('.BBW-wrap-result-people', 'click.resultPopup', function(e){
				var arrayItem = $(this).attr('id').replace('resultSet_','');
				var selectedUserInfoList = BB.PeopleFinder.filterList.resultSet[arrayItem];
				
								
				var hPopupInfo ='';
				hPopupInfo += '<div class="BBW-wrap-result-people">'; 
				hPopupInfo += '	<div class="BBW-people-image">';
				hPopupInfo += '    <img width="75" src="/horizon-public/profile/photo?ProfilePhotoUserGuid='+selectedUserInfoList.orclGuid+'&ProfilePhotoPictureSize=MEDIUM" border="0" alt="" />';
				hPopupInfo += ' </div>';
				hPopupInfo += ' <div class="BBW-people-data">';
				hPopupInfo += '    	<div class="BBW-wrap-people-data">';
				
				hPopupInfo += '			<div class="BBW-name"><span class="BBW-undescore">'+selectedUserInfoList.firstName+' '+selectedUserInfoList.familyName+'</span></div>';
				hPopupInfo += '			<div class="hr"><hr /></div>';
				hPopupInfo += '			<div class="BBW-profession">'+selectedUserInfoList.title+'</div>';
				hPopupInfo += '			<div class="BBW-profession">'+selectedUserInfoList.phoneNumber+'</div>';
				hPopupInfo += '			<div class="BBW-profession">'+selectedUserInfoList.mobileNumber+'</div>';
				hPopupInfo += '			<div class="BBW-mail">'+selectedUserInfoList.mail+'</div>';
				hPopupInfo += '		</div>';
				hPopupInfo += '	</div>';
				hPopupInfo += '	<div class="clear"></div>';
				hPopupInfo += '	<div class="hr"><hr /></div>';
				hPopupInfo += '</div>';
				
				var hPopupProfile = '<div class="BBW-profile">';
				if (selectedUserInfoList.uid != '') {
					hPopupProfile += '<a href="javascript:BB.PeopleFinder.postToMessageBoard({action:\'popup\', uid:\'' + selectedUserInfoList.orclGuid + '\'})" class="ico_messageBoard">Message wall</a> ';
					hPopupProfile += '<a href="/webcenter/faces/oracle/webcenter/webcenterapp/view/pages/peopleconn/UserProfileGallery.jspx?wc.username=' + selectedUserInfoList.username + '"" class="ico_profile">Profile</a>';
				}
				if (selectedUserInfoList.mail != '') {
					hPopupProfile += '<a href="mailto:' + selectedUserInfoList.mail + '" class="ico_mail">Send email</a>';
				}
				hPopupProfile += '<div class="clear"></div></div>';
				
				
				
				
				//initialise popup
				BB.PeopleFinder.popup({
					title:'User Info',
					html:hPopupInfo,
					buttons:hPopupProfile
				});
			});
			
			
			
			
			
			
			
			
			
			// Search Form submit
			//$('#BBSearchForm').submit(function() {
			$('#peoplefinderSubmit').click(function(){
				BB.PeopleFinder.callSearch();
			});
			
			// Search Form submit via enter keypress
			$('#PFSearchString').keypress( function(e) {
				if (e.keyCode == '13') {
					BB.PeopleFinder.callSearch();
				}
			});
			
			
			
			
			
			
			
			// Paging options request paged resultset
			$('#BBW-footer-left').delegate('li', 'click.paging', function(e){
				e.preventDefault();
				if (!BB.PeopleFinder.AjaxActive) {
					var $this = $(this);
					
					//deleteSearch all active classes from paging
					$('#BBW-footer-left li').each(function(i){
						$this.attr('class', '');
					});
					$this.attr('class', 'BBW-active'); //set active class on selected field
					
					BB.PeopleFinder.currentPage = parseInt($this.children().html());
					
					//send ajax request to update results
					BB.PeopleFinder.ajax({
						action:'page',
						pageNo:BB.PeopleFinder.currentPage
					});
				}
			});
			
			
			
			
			
			
			// Next page resultset
			$('.BBW-arrow-left-result').click(function() {
				BB.PeopleFinder.currentPage -= 1;
				BB.PeopleFinder.ajax({
					action:'page',
					pageNo:BB.PeopleFinder.currentPage
				});
			});
			
			// Previous page resultset
			$('.BBW-arrow-right-result').click(function() {
				BB.PeopleFinder.currentPage += 1;
				BB.PeopleFinder.ajax({
					action:'page',
					pageNo:BB.PeopleFinder.currentPage
				});
			});
			
			
			
			
			
			
			
			
			// Filter list option list
			$('#BBW-filterList').delegate('li', 'click.active', function(e) {
				e.preventDefault();
				if (!BB.PeopleFinder.AjaxActive) {
					$(this).toggleClass('BBW-active');
					
					//clear arrays
					//TODO:: Create a dynamic var list so filters can automatically be generated.
					//dont want to use eval == evil!! - may use named array? :)
//					BB.PeopleFinder.filterOpco = [];
					BB.PeopleFinder.filterJobTitle = [];
					BB.PeopleFinder.filterLocation = [];
					BB.PeopleFinder.filterContract = [];
					BB.PeopleFinder.filterSector = [];
//					BB.PeopleFinder.filterCostCentreCode = [];
					BB.PeopleFinder.filterSkillsAndQualifications = [];
					BB.PeopleFinder.filterExperience = [];
					
					//generate clean array list
					$('.BBW-contentresult .BBW-active').each(function(i){
						

						
						var activeList = $(this).attr('id').replace(/_/g,' ').split('---');
						var filter = activeList[0];
						var value = activeList[1];
						console.log(filter);
						console.log(value);
						
						//TODO:: Create a dynamic var list so filters can automatically be generated.
/*						if (filter == 'OpCo') {
							BB.PeopleFinder.filterOpco.push(value);
						} else 
*/            
            if (filter == 'Job Title') {
							BB.PeopleFinder.filterJobTitle.push(value);
						} else 
            if (filter == 'Location') {
							BB.PeopleFinder.filterLocation.push(value);
						} else 
            if (filter == 'Contract') {
							BB.PeopleFinder.filterContract.push(value);
						} else 
            if (filter == 'Sector') {
							BB.PeopleFinder.filterSector.push(value);
						} else 
/*            if (filter == 'Cost Centre Code') {
							BB.PeopleFinder.filterCostCentreCode.push(value);
						} else
*/
            if (filter == 'Skills And Qualifications') {
							BB.PeopleFinder.filterSkillsAndQualifications.push(value);
						} else if (filter == 'Experience') {
							BB.PeopleFinder.filterExperience.push(value);
						}
					});
					
					//send ajax request to update results
					BB.PeopleFinder.ajax({
						action:'filter',
						pageNo:1
					});
					
				}
			});
			
			//do I need this?
			//not required to click close button - just click li to active unactivate option.
			//$('.BBW-active').delegate('.BBW-ico-close','click.unactive', function(){
			//	$(this).parent().toggleClass('BBW-active');
			//});
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Check that submitted search only contains 5 words - test by space delimeter.
		 * If more than 5 then crop to only search on 5.
		 */
		callSearch: function() {
                    if ($('#PFSearchString').val() == '') {
                        alert("Please introduce a valid search");
                    } else {
                        var searchString = $('#PFSearchString').val().split(' ');
			var searchStringLength = searchString.length;
			var removeFromArray = [];
			var y = 0;
			var totalExceptions = 0;
			// loop through search string array match against exception currently = '0R'
			// if array contains string with less than 2 chars store position for removal next step
			for (x=0;x<searchStringLength;x++) {
				if (searchString[x].indexOf('OR') >= 0) {
					searchStringLength -= 1;
					totalExceptions += 1;
				} else {
					if (searchString[x].length <= 2) {
						searchStringLength -= 1;
						removeFromArray[y] = x;
						y += 1;
					}
				}
			}
			
			//remove any items in array <= to 2 chars
			for (x=0;x<removeFromArray.length; x++) {
				searchString.splice(removeFromArray[x], 1);
			}
			
			//replace array to string comma with space
			var updateSearchString = searchString.toString().replace(/,/g,' ');
			$('#PFSearchString').val(updateSearchString);
			
			
			
			if (searchStringLength > 5) {
				alert('You have entered more than 5 search terms only your first 5 fields will be used');
				
				var updateSearchString = '';
				totalItems = 5 + totalExceptions;
				for (x=0;x<totalItems;x++) {
					updateSearchString += searchString[x] + ' ';
				}
				
				$('#PFSearchString').val(updateSearchString);
			}
			
			BB.PeopleFinder.submitSearch({});
                    }
			
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * [popup] then display popup form to allow users to post messages | 
		 * [post] then send ajax request to post to REST API message boards
		 * @param {Object} config
		 * @param {int} config.uid User ID
		 * @param {string} config.action Action to take on this
		 */
		postToMessageBoard: function(config) {
			var uid = typeof(config.uid) == 'undefined' ? '' : config.uid;
			var action = typeof(config.action) == 'undefined' ? '' : config.action;
			
			// post to BS.RestAPI
			if (action == 'post') {
				var message = $('#fMessage').val();
				var data = {
					"body":message
				};
				
				BS.RestAPI.restRequest({
					//http://ksd1app01v.bb.wan:7777/rest/api/messageBoards/person/8B7E52CE7D96A001E040630AFD092DDC?stoken=FHmnHA2zLAIHPhrR63yQZfp47pAZuh8*
					//http://ksd1app01v.bb.wan:7777/rest/api/messageBoards/person/8B7E52CE7D96A001E040630AFD092DDC?stoken=FB8-7EfJeFP3K5xMfnd6NP-09G0SuaY*
					//http://ksd1app01v.bb.wan:7777/rest/api/messageBoards/person/8B7E52CE7D96A001E040630AFD092DDC?stoken=FHmnHA2zLAIHPhrR63yQZfp47pAZuh8*
					//url:BS.RestAPI.settings.server+'/rest/api/messageBoards/person/@me?stoken='+BS.RestAPI.settings.stoken,
					url:BS.RestAPI.settings.server+'/rest/api/messageBoards/person/'+uid+'?stoken='+BS.RestAPI.settings.stoken,
					httpMethod:'post',
					data:data,
					callback:BB.PeopleFinder.restInfo,
					params:{}
				}); 
			}
			
			//show popup form to post message
			if (action == 'popup') {
				this.popup({
					title: 'Post To Message Wall',
					html: '<div id="BBW-info-message"><textarea id="fMessage" name="fMessage"></textarea></div>',
					buttons: '<input type="button" value="Post Message" onclick="javascript:BB.PeopleFinder.postToMessageBoard({action:\'post\', uid:\''+uid+'\'})" /><input type="button" value="Cancel" onclick="javascript:BB.PeopleFinder.popup({action:\'close\'})" />'
				});
			}
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Callback initiated after the rest post. -  ie to message board
		 * @param {Object} config
		 * @param {string} config.error error message returned from the ajax request to the rest service
		 */
		restInfo: function(config) {
			var error = typeof(config.error) == 'undefined' ? '' : config.error;
			
			//test if successful post
			var msg = '';
			if (error.length > 0) {
				msg = 'You need to be connected to this user to post on their message board.';
			} else {
				msg = 'Message Posted.';
			}
			
			//display message - should use popup method..
			$('#BBW-info-message').html(msg);
			$('#BBW-PPF-Popup-foot .buttons').html('<input type="button" onclick="javascript:BB.PeopleFinder.popup({action:\'close\'})" value="Close">');
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Appends custom selectable filter to filter option list
		 * @param {Object} config
		 * @param {string} config.filter Filter container name
		 * @param {string} config.fValue Filter name to add as selectable option
		 */
		addFilter: function(config) {
			var filter = typeof(config.filter) == 'undefined' ? '' : config.filter;
			var fValue = typeof(config.fValue) == 'undefined' ? '' : config.fValue;
			
			var vFilterSection = filter;
			var filterId = vFilterSection.toLowerCase().replace(/ /g,'');
			var vName = fValue;
			
			var hOptionList = '<li id="'+vFilterSection.replace(' ','_')+'---'+vName.replace(' ','_')+'"><a href="#">'+vName+'</a><span class="BBW-ico-close">&nbsp;</span></li>';
			$('#BBW-wrap-'+filterId+' .BBW-contentresult ul').append(hOptionList);
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Generates filter list from the ajax response & Appends 2 custom filters
		 * @param {Object} config
		 * @param {Object} config.response json array object defining filter options to display
		 */
		genFilterList: function(config){
			
			
			var optList = typeof(config.response) == 'undefined' ? function(){return;} : config.response.filterList;		
			var showRows = 5; //display first 5 rows for each filterlist.

			
			
			
			
			/*Loop through array*/
			var hFilterContainer = ''; // clear filters 
			var vSectionList = optList.sectionKey;
			$('#filter-results').html('');
			for (rs=0;rs<vSectionList.length;rs++) {
				/*Var List*/
				var vFilterSection = vSectionList[rs];
				var vSectionContent = optList.section;
				var vSectionIdentifier = vFilterSection.replace(/ /g,'').toLowerCase();
				
				//if sectionKey not listed in section obj then skip filter
				if (typeof(vSectionContent[vFilterSection]) == 'undefined') {
					continue;
				}
				
				var vOptionList = vSectionContent[vFilterSection].optList
				var vOptionListTotal = vSectionContent[vFilterSection].optList.length;
				/*xVar List*/
				hFilterStartContainer += '<div class="filtertitle">'+vFilterSection+'</div>';
				$('#filter-results').append(hFilterStartContainer);
				//if no filter options then skip filter and move to next item in loop.
				if (vOptionListTotal == 0) {
					continue;
				}
				
				/*Loop through option list array*/
				var hOptionList = '<ul>';
				for (rs2=0;rs2<vOptionList.length;rs2++) {
					var vFieldNameList = optList.optListFieldNames;
					var vName = vOptionList[rs2][vFieldNameList.indexOf('Name')];
					var vValue = vOptionList[rs2][vFieldNameList.indexOf('Value')];
					hOptionList += '<div class="indentbox"></div>'+vName+' ('+vValue+')<br/>';					
				/*xLoop through option list array*/				
				/*Create new filter list container*/
				var hFilterStartContainer = '';
				var hFilterHead = '';
				var hFilterList = '';
				var hFilterCloseContainer = '';
				/*xCreate new filter list container*/				
				/*Filter List template*/
								
								
			}
			hOptionList += '</ul>';
				$('#filter-results').append(hOptionList);
			}
			
			
			
			
			
			
			
			
			
			
			
			
			/*Write filterlist*/

			
			
			//$('.BBW-showmore-title').show(); //show filter results text
			/*xWrite filterlist*/
			
			
			/****************/
			/*EXAMPLE OUTPUT*/
			/****************/
			/* 
			<!-- Wrap BBW-OpCo -->
            <div class="cl"></div>
            <div id="BBW-wrap-opco">
                <div class="BBW-rbroundbox">
                    <div class="BBW-rbtop"><div></div></div>
                        <div class="BBW-rbcontent">
                            <div class="BBW-wrap-contentmain" id="opco"><span class="btn-slide" onclick="expand('opco')">OpCo (14)</span></div>
                        </div>
                    <div class="BBW-rbbot"><div></div></div>
                </div>
                <!-- Wrap BBW-OpCo-content -->
                <div class="BBW-wrap-result" id="BBW-wrap-result-opco" style="display:none">
                    <div class="BBW-contentresult">
                        <!-- BBW-Result Opco -->
                        <ul>
                            <li><a href="#">Balfour Beatty WorkPlace (8)</a><span class="BBW-ico-close">&nbsp;</span></li>
                            <li class="BBW-active"><a href="#">Balfour Beatty Construction (2)</a><span class="BBW-ico-close"></span></li>                               
                            <li><a href="#">Balfour Beatty Engineering (1)</a><span class="BBW-ico-close">&nbsp;</span></li>
                            <li><a href="#">Balfour Beatty Rail (1)</a><span class="BBW-ico-close">&nbsp;</span></li>
                            <li><a href="#">Balfour Beatty Utility Solutions (1)</a><span class="BBW-ico-close">&nbsp;</span></li>
                        </ul>
                        <div class="BBW-showmore">
                    		<a href="#">Shore more</a>
                    	</div>
                        
                        <div class="BBW-showmore-input">
                        	<input value="Enter OpCo" width="100%" />
                        </div>
                    </div>
                    <!-- BBW-OpCo-content-bottom -->
                    <div class="BBW-contentresult-bottom"></div>
                </div>
            </div>
            <!-- End Wrap BBW-OpCo -->
			*/
			/****************/
			/****************/
			
			//set events when filter list generated.
			//this.events();
			
			
			
			
			//var optList = config.response.filterList = '';
			
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * If more than 5 filters a more option is display on click this method is 
		 * initiated which shows all filters within the filter collection.
		 * @param {string} section The filter collection name
		 */
		showAllFilterOptions: function(section){
			$('#BBW-wrap-' + section + ' li').show();
			$('.BBW-showmore.' + section).hide();
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Enables / disables the AJAX loading animation and fields to hide show during the process.
		 * @param {Object} config
		 * @param {Boolean} config.active Enable / Disable animation
		 */
		waitingForResponse: function(config){
			var active = typeof(config.active) == 'undefined' ? false : config.active;
			
			var $BBWLoading = $('#BBW-loading');
			var $BBWWrapResultPeople = $('.BBW-wrap-result-people');
			
			if (active) {
				$('#peoplefinderSubmit').attr('disabled', 'disabled'); // disable button
				this.AjaxActive = true; //prevents click action event
				$('#BBW-wrap-search-result .BBW-header').hide();
				$('#BBW-wrap-search-result .BBW-footer').hide();
				$('#BBW-wrap-result').hide();
				$BBWLoading.show();
				$('#BBW-loading-status').show();
				$('.BBW-wrap-result-people').hide();
				$('#BBW-wrap-search-result .BBW-messages').hide();
				//BBW-wrap-result loading
			} else {
				$('#peoplefinderSubmit').removeAttr('disabled');
				this.AjaxActive = false;//enables click action event
				//$('#BBW-wrap-search-result .BBW-header').show();
				//$('#BBW-wrap-search-result .BBW-footer').show();
				$('#BBW-wrap-result').show();
				$BBWLoading.hide();
				$('#BBW-loading-status').hide();
				$BBWWrapResultPeople.show();
			}
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

		
		
		/**
		 * The global People finder ajax requester - response initialised based on config.action
		 * @param {Object} config
		 * @param {string} config.action Used to define type of ajax call to make [deleteSearch,saveSearch,search]
		 * @param {int} config.pageNo Specifies which paging resultset to call
		 * @param {string} config.user Specifies the user logged in who is making the ajax requests
		 * @param {string} config.fName Passed If user is saving a search - name of the search.
		 * @param {string} config.fIncludeOpco Tells saveSearch request to save selected opco in the save search.
		 * @param {string} config.saveSearchId The ID of the save search to be passed when user selected a saved search
		 */
		ajax: function(config) {
			var action = typeof(config.action) == 'undefined' ? 'search' : config.action;
			var pageNo = typeof(config.pageNo) == 'undefined' ? 1 : config.pageNo;
			var user = typeof(BB.GlobalData.peopleFinderPortlet.username_) == 'undefined' ? '' : BB.GlobalData.peopleFinderPortlet.username_;
			var fName = typeof(config.fName) == 'undefined' ? '' : config.fName;
//			var fIncludeOpco = typeof(config.fIncludeOpco) == 'undefined' ? '' : config.fIncludeOpco;
			var saveSearchId = typeof(config.saveSearchId) == 'undefined' ? '' : config.saveSearchId;	
			//wait for ajax response
			BB.PeopleFinder.waitingForResponse({
				active:true
			});
			
			//test if resourceUrl has been set else error and break.
			if (BB.PeopleFinder.resourceUrl == '') { //exit func if true.
				alert('Error:: Please contact People Finder Admin no resourceUrl set to return json resultset!');
				return;
			}
			
			/*$.ajax({
			    url:BB.PeopleFinder.resourceUrl,
				dataType:'json',
				data: {
					action:action,
					searchString: BB.PeopleFinder.searchTerm,
//					opcoOption: BB.PeopleFinder.chosenOpco,
					pageNo: pageNo,
					username_: user,
					fName:fName,
					saveSearchId:saveSearchId,
//					fIncludeOpco:fIncludeOpco,
					//TODO:: Create a dynamic var list so filters can automatically be generated.
//					filterOPCO : BB.PeopleFinder.filterOpco,
					filterJOBTITLE : BB.PeopleFinder.filterJobTitle,
					filterLOCATION : BB.PeopleFinder.filterLocation,
					//filterCurrentLocation : BB.PeopleFinder.filterCurrentLocation,
					filterCONTRACT : BB.PeopleFinder.filterContract,
					filterSECTOR : BB.PeopleFinder.filterSector,
//					filterCOSTCENTRECODE : BB.PeopleFinder.filterCostCentreCode,
					filterSKILLSANDQUALIFICATIONS: BB.PeopleFinder.filterSkillsAndQualifications,
					filterEXPERIENCE : BB.PeopleFinder.filterExperience
				},*/
				$.ajax({
        		    url:'./data.html',
					dataType:'json',		   
				success: function(data) {
					if (action != 'deleteSearch') {
						if (action == 'saveSearch') {
							BB.PeopleFinder.saveSearch({
								action: 'update',
								selected:data.resultSet.id
							});
						}
						else {
							if (action == 'search') {
								
   																
														
								BB.PeopleFinder.genFilterList({
								
									response: data
								});
							}
							
							BB.PeopleFinder.filterList = data;
							BB.PeopleFinder.genRestultList({
								response: data
							});
						}
					}
					BB.PeopleFinder.waitingForResponse({
						active: false
					});
					
					//data = '';
				},
				error: function(request, type, errorThrown) {
					
					var message = "There was an error with the AJAX request.\n";
					switch (type) {
						case 'timeout':
							message += "The request timed out.";
							break;
						case 'notmodified':
							message += "The request was not modified but was not retrieved from the cache.";
							break;
						case 'parseerror':
							message += "XML/Json format is bad.";
							break;
						default:
							message += "HTTP Error (" + request.status + " " + request.statusText + ").";
							if (request.status == 200) {
								message += " - XML/Json format is bad.";
							}
					}
					message += "\n";
					console.log(message);
					
					$('errorMsg').html('<span style="font-color:red;font-weight:bold; background:yellow; padding:2px; border:solid 2px red;">Error:: Connection to PeopleFinder Timed Out</span>');
					
					
					BB.PeopleFinder.waitingForResponse({
						active:false
					});
				}
			});
		},
		
		
		
		
		
		

















		/**
		 * Generates a link to service adding required params to request auto generated csv from server
		 */
		callCSV:function(){
			var user = typeof(BB.GlobalData.peopleFinderPortlet.username_) == 'undefined' ? '' : BB.GlobalData.peopleFinderPortlet.username_;
			
			d = {
				action:'exportCSV',
				searchString: BB.PeopleFinder.searchTerm,
				opcoOption: BB.PeopleFinder.chosenOpco,
				username_: user,
				filterOPCO : BB.PeopleFinder.filterOpco,
				filterJOBTITLE : BB.PeopleFinder.filterJobTitle,
				filterLOCATION : BB.PeopleFinder.filterLocation,
				filterCONTRACT : BB.PeopleFinder.filterContract,
				filterSECTOR : BB.PeopleFinder.filterSector,
				filterCOSTCENTRECODE : BB.PeopleFinder.filterCostCentreCode,
				filterSKILLSANDQUALIFICATIONS: BB.PeopleFinder.filterSkillsAndQualifications,
				filterEXPERIENCE : BB.PeopleFinder.filterExperience
			}
			var url =BB.PeopleFinder.resourceUrl + '?';
			for (var j in d) {
				if (d[j].length > 0) {
					url += j + '=' + d[j] + '&';
				}
			}
			url = url.slice(0, -1);
			window.location = url;
			
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Generates the displayed Result set from the ajax response.
		 * Calculates resultset paging.
		 * @param {Object} config
		 * @param {Object} config.response AJAX json array object response
		 */
		genRestultList: function(config){
			var response = typeof(config.response) == 'undefined' ? '' : config.response.resultSet;
			var vTotal = typeof(config.response.total) == 'undefined' ? 'undefined' : config.response.total;
			var vMessage = typeof(config.response.message) == 'undefined' ? '' : config.response.message;
		
			//Template for result set.
			var hResultSet = '';
			for (rs=0;rs<response.length;rs++) {
				hResultSet += '<div class="result">';
				hResultSet += '	<div class="mwpic">';
				hResultSet += '		<img src="./images/'+response[rs].firstName.toLowerCase()+response[rs].familyName.toLowerCase()+'.png"/>';
				hResultSet += '	</div>';
				hResultSet += '	<div class="mwtext">';
				hResultSet += '		<img class="chaticon" src="./images/chaticon.png"/>';
				hResultSet += '		<div class="resultname"><a href="'+response[rs].firstName.toLowerCase()+response[rs].familyName.toLowerCase()+'profile.html">'+response[rs].firstName+' '+response[rs].familyName+'</a></div>';
				hResultSet += '		<div class="resulttitle">'+response[rs].title+'</div>';
				hResultSet += '		<p>';
				hResultSet += '			<img src="./images/phoneicon.png"/>'+response[rs].phoneNumber+'<br/>';
				hResultSet += '			<img src="./images/mailicon.png"/>'+response[rs].mail;
				hResultSet += '		</p>';
				hResultSet += '	</div>';
				hResultSet += '</div>';
			}
				
				$('#search-results').html('');
				$('#search-results').html(hResultSet);
			},
			
				
	           
			
			/****************/
			/*EXAMPLE OUTPUT*/
			/****************/
			/* 
			<!--people 5-->
        	<div class="BBW-wrap-result-people" onmouseover="this.className='BBW-wrap-result-people-select'" onmouseout="this.className='BBW-wrap-result-people'"> 
            	<div class="BBW-people-image">
                	<img src="images/5people.jpg" width="80" height="80" border="0" alt="" />
                </div>
                <div class="BBW-people-data">
                	<div class="BBW-wrap-people-data">
                        <div class="BBW-name"><span class="BBW-undescore">Thomas Smith</span></div>
                        <div class="BBW-profession">Site Manager</div>
                        <div class="BBW-number">07712345678</div>
                        <div class="BBW-location"></div>
                    </div>
                    <div class="BBW-about-me">
                    	<div></div>
                    </div>
                </div>
                <div class="BBW-people-icons">
                	
                	<div class="BBW-number">5</div>
                </div>
            </div>
            <!--End people 5-->
            */
			
			
			
			//var response = config.response = '';

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Expands the Filter section to show selectable filters
		 * @param {string} id ID name of filter that appends to "#BBW-wrap-result-" + id
		 */
		expand: function(id) {
			var $BBWWrapResultId = $("#BBW-wrap-result-" + id);
			var $id = id;
			$BBWWrapResultId.slideToggle('slow');
			$BBWWrapResultId.toggleClass('active');
			$('#' + id).toggleClass('active');
			return false;
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Create / update popup DOM fields 
		 * @param {Object} config
		 * @param {html} config.htmlData HTML data to insert into the content container
		 * @param {string} config.title Title of the popup to display
		 * @param {html} config.buttons HTML data of additional popups
		 * @param {string} config.action if 'close' passed popup will close
		 */
		popup: function(config) {
			var htmlData = typeof(config.html) == 'undefined' ? 'Error no data supplied' : config.html;
			var title = typeof(config.title) == 'undefined' ? '' : config.title;
			var buttons = typeof(config.title) == 'undefined' ? '' : config.buttons;
			var action = typeof(config.action) == 'undefined' ? '' : config.action;
			
			if (action == 'close') {
				$('#BBW-PPF-Popup').hide();
				return;
			}
			
			var xWidth = 300;
			var $Window = $(window);
			var yTop = $Window.height()/2;
			var xLeft = ($Window.width()/2) - (xWidth/2);
			
			
			var createContainerStart ='';
			var createContainerEnd ='';
			
			var $BBWPPFPopup = $('#BBW-PPF-Popup');
			if ($BBWPPFPopup.length == 0) {
				
				createContainerStart = '<div id="BBW-PPF-Popup" style="top:'+yTop+'px;left:'+xLeft+'px">';
				createContainerStart += '	<a href="javascript:BB.PeopleFinder.tempclose()" class="BBW-popup-closeIco">Close</a>';
				createContainerStart += '	<div id="BBW-PPF-Popup-head"><div><h4>'+title+'</h4></div></div>';
				createContainerStart += '	<div id="BBW-PPF-Popup-content"><div class="container">';
				
				createContainerEnd = '	</div></div>';
				createContainerEnd += '	<div id="BBW-PPF-Popup-foot"><div class="buttons">'+buttons+'</div></div>';
				createContainerEnd += '</div>';
				
				$('#BBW-container').append(createContainerStart + htmlData + createContainerEnd);
			} else {
				$('#BBW-PPF-Popup-content .container').html(htmlData);
				$('#BBW-PPF-Popup-foot .buttons').html(buttons);
				$BBWPPFPopup.show();
			}
			
			
			//reconfirm position
			$BBWPPFPopup.css({
				top:yTop + 'px',
				left:xLeft + 'px',
				width:xWidth + 'px'
			});
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Submit Save to create ajax request
		 * @param {Object} config
		 * @param {string} config.action defines type of action to take within method
		 */
		submitSave: function(config) {
			var action = typeof(config.action) == 'undefined' ? 'close' : config.action;
			
			var $BBWPPFPopup = $('#BBW-PPF-Popup');
			if (action == 'close') {
				$BBWPPFPopup.hide();
			}
			
			$BBWPPFPopup.hide();
			if (action == 'saveSearch') {
				this.fName = $('#fName').val();
				if (this.fName.replace(/ /g,'') == '') {
					alert('Error:: You need to enter a "Search Term Name"');
					return;
				}
				
				if ($('#fIncludeOpco').is(':checked')) {
					this.fIncludeOpco = $('#BBWOpcoOption').val();
				} else {
					this.fIncludeOpco = '';
				}
				
				this.ajax({
					action: 'saveSearch',
					fName: this.fName,
					fIncludeOpco: this.fIncludeOpco
				});
			}
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * [saveSearch] Display popup save search form | 
		 * [loadList] Generate Save Search list panel from BB.PeopleFinder.savedSearchList.resultSet | 
		 * [update] Insert Saved Search list panel | 
		 * [deleteSearch] Remove Save Search item from list panel
		 * @param {Object} config
		 * @param {string} config.action [saveSearch, loadList, update, deleteSearch]
		 * @param {string} config.selected The selected Save Search ID
		 */
		saveSearch: function(config) {
			var action = typeof(config.action) == 'undefined' ? 'saveSearch' : config.action;
			var selected = typeof(config.selected) == 'undefined' ? '' : config.selected;
			
			
			/*
			savedSearchList: {
				fieldNames:['Id','Name','SearchString','Opco'],
				resultSet: {
					'id_1': [1,'Meeee','john'],
					'id_2': [2,'MySearch','marcos','BBW']
				}
			}, 
			*/
			
			
			
			//submit ajax request to save search
			//could use switch but if else is faster
			//should use namespace inner func list.. ohwell next time. 
			var $BBWWrapSaved = $('#BBW-wrap-saved')
			if (action == 'saveSearch') { 
				this.popup({
					title: 'Save Search Term',
					html:'<form id="saveSearchTerm"><label><span>Search Term Name:</span> <input maxlength="30" type="text" name="fName" id="fName" /></label><label>Include Opco:<input id="fIncludeOpco" type="checkbox" name="fIncludeOpco" checked="checked" /></label></form>',
					buttons:'<input type="button" value="Save" onclick="javascript:BB.PeopleFinder.submitSave({action:\'saveSearch\'});" /><input type="button" value="Cancel" onclick="javascript:BB.PeopleFinder.submitSave({action:\'close\'});" />'
				});
				
				
			
			
			
			
			//on page load convert array to DOM list to show saved searches
			} else if (action == 'loadList') { 
				var savedSearchDOM = '';
				var savedSearchListTotal = 0;
				//if first resultSet not defined exit functon
				
				
				if (this.savedSearchList.resultSet.length <=0) {
					$BBWWrapSaved.hide();
					//return;
				} else {
					
					for(arrId in this.savedSearchList.resultSet) {
						var savedSearchId = this.savedSearchList.resultSet[arrId][this.savedSearchList.fieldNames.indexOf('Id')];
						var savedSearchValue = this.savedSearchList.resultSet[arrId][this.savedSearchList.fieldNames.indexOf('Name')];
						
						savedSearchDOM += '<li id="id_' + savedSearchId + '"><a href="javascript:BB.PeopleFinder.submitSearch({savedSearchKey:\'id_'+savedSearchId+'\'})">' + savedSearchValue + '</a><div class="BBW-wrap-icon"><a href="javascript:BB.PeopleFinder.saveSearch({selected:\'id_'+savedSearchId+'\',action:\'deleteSearch\'});" class="BBW-icon-bin"></a></div></li><li class="BBW-line"></li>';
						savedSearchListTotal++;
					}
					
					
					//update html structure
					$('#BBW-content-saved-search ul').html(savedSearchDOM);
					$BBWWrapSaved.show();
				}
				this.savedSearchListTotal = savedSearchListTotal;
			
			
			//if save success update DOM
			} else if (action == 'update') { 
			
				//return last item from array find its Id add 1.
				this.savedSearchListTotal += 1; 
				
				this.savedSearchList.resultSet['id_' + selected] = [selected, this.fName, this.searchTerm, this.fIncludeOpco];

				//update html structure
				$('#BBW-content-saved-search ul').prepend('<li id="id_'+selected+'"><a href="javascript:BB.PeopleFinder.submitSearch({savedSearchKey:\'id_'+selected+'\'})">'+this.fName+'</a><div class="BBW-wrap-icon"><a href="javascript:BB.PeopleFinder.saveSearch({selected:\'id_'+selected+'\',action:\'deleteSearch\'})" class="BBW-icon-bin"></a></div></li><li class="BBW-line"></li>');
				$BBWWrapSaved.show();
				
			
			
			//deleteSearch saved search item from view
			} else if (action == 'deleteSearch') { 
				this.ajax({
					action: 'deleteSearch',
					saveSearchId: selected.replace('id_','')
				});
				
				
				//deleteSearch from array
				this.savedSearchList.resultSet[selected] = null; 
				
				//should wait for ajax to return success of removal.. 
				var $Selected = $('#'+selected);
				$Selected.next().remove(); 
				$Selected.remove(); 
				
				this.savedSearchListTotal--;
				
				if (this.savedSearchListTotal <= 0) {
					this.savedSearchListTotal == 0;
					$BBWWrapSaved.hide();
				}
			}
			
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Update DOM to show Resent Search items
		 * [loadList] Generates recent search panel from array - BB.PeopleFinder.recentSearchList | 
		 * [update] Appends latest search string to recent search
		 * @param {Object} config
		 * @param {string} config.action [loadList, update]
		 */
		recentSearch: function(config) {
			var action = typeof(config.action) == 'undefined' ? 'update' : config.action;
			
			/*
			recentSearchList = ['john','marcos']
			};
			*/
			
			if (action == 'update') {
				//update Search
				var escapeString = BB.PeopleFinder.searchTerm.replace(/'/g,'&#92;&#39;');
				escapeString = escapeString.replace(/"/g,'&#34;');
				
				$('#BBW-content-recent-search ul').prepend('<li><b id="BBW-total-pageList"></b><span class="BBW-number">1</span><a href="javascript:BB.PeopleFinder.submitSearch({searchString:\'' + escapeString + '\',fType:\'recentSearch\'})">' + BB.PeopleFinder.searchTerm + '</a></b></li><li class="BBW-line"></li>');
				this.recentSearchList.push(BB.PeopleFinder.searchTerm);
				
				//update count results
				$('#BBW-content-recent-search span').each(function(i, e){
					var $this = $(this);
					$this.html(i + 1);
					//remove all results gt 10
					if ((i+1) > 10) {
						$this.parent().next().remove();//remove line
						$this.parent().remove();//remove result
					}
				});
			} else if (action == 'loadList') {//add recentSearchList if any stored on page load
				
				var recentSearchDOM = '';
				for (x = 0; x < this.recentSearchList.length; x++) {
					var searchTerm = this.recentSearchList[x];
					var escapeString = searchTerm.replace(/'/g,'&#92;&#39;');
					escapeString = escapeString.replace(/"/g,'&#34;');
					
					recentSearchDOM += '<li><b id="BBW-total-pageList"></b><span class="BBW-number">'+(x+1)+'</span><a href="javascript:BB.PeopleFinder.submitSearch({searchString:\'' + escapeString + '\',fType:\'recentSearch\'})">' + searchTerm + '</a></b></li><li class="BBW-line"></li>';
				}
				$('#BBW-content-recent-search ul').html(recentSearchDOM);
			}
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/**
		 * Submits an ajax request to search for search string and opco value.
		 * Resets all filters and paging.
		 * @param {Object} config
		 * @param {String} config.savedSearchKey  - if supplied sets search values & opco from BB.PeopleFinder.savedSearchList.resultSet[savedSearchKey]
		 * @param {String} config.fType - alerts method that search type is from recent search not from the generic form
		 * @param {String} config.searchString - if defined sets the search string value
		 * @param {String} config.optList - if defined sets the Opco Optionlist value
		 */
		submitSearch: function(config) {
			
			var savedSearchKey = typeof(config.savedSearchKey) == 'undefined' ? '' : config.savedSearchKey;
			var fType = typeof(config.fType) == 'undefined' ? '' : config.fType;
			var searchString = typeof(config.searchString) == 'undefined' ? '' : config.searchString;
			
			this.currentPage = 1;
			
			var $BBWSearchString = $('#PFSearchString');
			if (savedSearchKey != '') {
				$BBWSearchString.val(this.savedSearchList.resultSet[savedSearchKey][this.savedSearchList.fieldNames.indexOf('SearchString')]);
			} else {
				if (typeof(config.searchString) != 'undefined') {
					$BBWSearchString.val(config.searchString);
				}
			}
			
			
			
			//clear filters
			BB.PeopleFinder.filterJobTitle = [];
			BB.PeopleFinder.filterLocation = [];
			BB.PeopleFinder.filterContract = [];
			BB.PeopleFinder.filterSector = [];
			BB.PeopleFinder.filterSkillsAndQualifications = [];
			BB.PeopleFinder.filterExperience = [];
			
			var vSearchString = $BBWSearchString.val();
			if (fType == 'recentSearch') {
				//vOpcoOption = ''; //opco option not required for recent search.
			}
			
			BB.PeopleFinder.searchTerm = vSearchString;
//			BB.PeopleFinder.chosenOpco = '';

			if (vSearchString != '') {
				BB.PeopleFinder.ajax({
					action:'search' //default action is 'search' - do not need to specify.
					//pageNo: 1 //default pageNo is 1 - do not need to specify.
				});
				this.recentSearch({});
			}
		}
		
	}
}();






//init script
$(document).ready(function() {
	BB.PeopleFinder.init();
});
