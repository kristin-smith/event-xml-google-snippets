///Alternate version using AJAX
var snippet;
var jsonSnippet;
var xml;
var xmlEvents;
var xmlEvent;
var eventName;
var eventStart;
var eventOrganizer;
var eventLocation;
var jsonStrong;
var eventForPage;

function xmlToJson(xml) {
// create the return object
	var obj = {};
	if ($xmlEvent.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item= xml.childNodes.item(i);
			var item2 = xml.childNodes.item(i).innerHTML;
			//console.log(item);
			//if (item2 != undefined) {console.log(item2);}
			var nodeName = item.nodeName;
                if (nodeName === "START_DATE"){nodeName = "startDate";} //need to work on formatting for this
                if (nodeName === "END_DATE"){nodeName = "endDate";} //need to work on formatting for this
                if (nodeName === "EVENT_TITLE"||nodeName === "EVENT_NAME"){nodeName = "name";}
                if (nodeName === "NODE_TYPE_NAME"){nodeName = "type";}
                if (nodeName === "REGISTRATION_URL"){nodeName = "url";}
                if (nodeName === "EVENT_LOCATOR"){nodeName = "location";}
                if (nodeName === "ORGANIZATION_NAME"){nodeName = "organizer";}
                if (nodeName === "ALIEN_UID" || nodeName === "CABINET_NAME" || nodeName === "CABINET_ID" || nodeName === "CREATION_DT" || nodeName === "EVENT_ID" || nodeName === "EVENT_PRIORITY" || nodeName === "EVENT_TYPE_ID" || nodeName === "FAVORITE" || nodeName === "LAST_MOD_DT" || nodeName === "LAST_MOD_USER" || nodeName === "NODE_TYPE" || nodeName === "EVENT_TYPE_NAME" || nodeName === "STATE" || nodeName === "STATE_NAME" || nodeName === "ORGANIZATION_ID" || nodeName === "PARENT_ID" || nodeName === "#text"){nodeName = "delete"};
				obj[nodeName] = xmlToJson(item);
				obj[nodeName] = item2;
                delete obj.delete;
                if (obj.url ===""){ obj.url="http://www.du.edu/calendars";}     			
		}
	}
	return obj;
    
}; 
	
$.ajax({
  url: "http://stage.du.edu/_resources/api/rest/events/event-list-example2.xml",
  beforeSend: function( xhr ) {
    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  }
})
  .done(function( data ) {
    $snippet = data;
    if ( console && console.log ) {
      //console.log( "Sample of data:", $snippet.slice( 0, 200 ) );
	  $("#rawContent").append($snippet);
	  //console.log($snippet);
	  $xmlEvents = document.getElementsByTagName("event");
	  console.log($xmlEvents[0]);
	  for (i=0; i<$xmlEvents.length; i++) {
	  	$xmlEvent = $xmlEvents[i];
	  	console.log($xmlEvent);
       $("#mainContent").append($xmlEvent);//style this to appear on the actual page?
	  	//$eventName = $xmlEvent.getElementsByTagName("event_name")[0];
         // $eventName = $eventName.childNodes[0].data;
        //$eventStart = $xmlEvent.getElementsByTagName("start_date")[0];
         // $eventStart = $eventStart.childNodes[0].data;
       // $eventOrganizer = $xmlEvent.getElementsByTagName("organization_name")[0].innerHTML;
       //   console.log($eventOrganizer);
          //$eventOrganizer = $eventOrganizer.innerHTML;
       // $eventForPage ={$eventName, $eventStart, $eventOrganizer};
        //  console.log($eventForPage);
        //$("#mainContent").append("'eventForPage' goes here");//These are the info I want, but it's not in an object which I can't add to the page...
		
		$jsonSnippet = xmlToJson($xmlEvent);
		//console.log($jsonSnippet);
        $jsonString = JSON.stringify($jsonSnippet);
        //console.log($jsonString);
		//$("#mainContent").append($jsonString);
        var el = document.createElement('script');
          el.type = 'application/ld+json';
          el.text = JSON.stringify($jsonSnippet);
          document.querySelector('body').appendChild(el); //yay JSON scripts on the page for every event!
	  }
    }
  });


//OK, so the main issue is that the 25live web services server does not have ANY access-control-allow-origin in its header so I'm unable to pull down any XML to du.edu. 
//My plan is to build an asset that lets us build our URL parameters
//Should I use CSS to style the XML to hide the node, for example <start_date>? And then the JSON scripts take care of Google?
