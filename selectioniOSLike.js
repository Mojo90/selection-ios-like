/* 
 * 
 * Usage:
 *
 * selectioniOSLike(array, headerText);
 *
 *
 * Example: 
 *
 * selectioniOSLike(
     [
        {
          name     : "Logout",
          onclick  : logout,
          color    : "red"
        }
      ], 
      "Do you really want to logout?"
	);
 *
 * 
 * Notes:
 * 
 * Array must conform to this Array: Object, Object, Object, ... but can have 0 - n items
 *									   top   middle  bottom   cancel (automatically added)
 * Object = {
     name = "Edit",
     onclick = function(){console.log("clicked");},
     color = "white" --> optional color of text
   }
 * 
 * Cancel object on bottom is standard (just dismissing the selection)
   Localization of Cancel Text can be done in "generateCancelButton". Just replace the Command "LocalStrings.cancel" with Localization.
 *
 * jquery is a must for animation
 *
 * headerText is optional and can have approximate 40 characters (so that text is not broken in new line even on small phones)
 *
 * with selectioniOSLikeShown can be detected if the pop up is shown or not
 *
 */
 
var selectioniOSLikeShown = false;

function selectioniOSLike(array, headerText) {

	var cornerRadius = 10;

	var generateButton = function(isBold, isMiddle, topRoundedCorners, bottomRoundedCorners, color, text, place){
		var deviceWidth = $(window).width();
		var divWidth = deviceWidth - 30;
		
		var bold = "normal";
		if(isBold) bold = "bold";
		
		var topRounded = "0px";
		if(topRoundedCorners) topRounded = cornerRadius + "px";
		
		var bottomRounded = "0px";
		if(bottomRoundedCorners) bottomRounded = cornerRadius + "px";
		
		var borderSize = 0;
		if(isMiddle) borderSize = 1;
		
		if(color == null) color = "#0D80E9";
		
		var string = "\
        	<div id='selection_button_" + place + "' style='padding-top: 14px; text-align: center; background:#F9F9F9; border-top:" + borderSize + "px solid Lightgrey; height:50px; width:" + divWidth + "px; border-top-left-radius:" + topRounded + "; border-top-right-radius:" + topRounded + "; border-bottom-right-radius:" + bottomRounded + "; border-bottom-left-radius:" + bottomRounded + ";'>\
        		<span style='font-size:18px; color:" + color + "; font-weight:" + bold + ";'>" + text + "</span>\
        	</div>\
        ";
		return string;
	}
	
	var generateCancelButton = function(){
        return generateButton(true, false, true, true, null, LocalStrings.cancel, "cancel");
    };
    
    var generateHeaderText = function(text){
    	var deviceWidth = $(window).width();
		var divWidth = deviceWidth - 30;
		
		var bold = "normal";
		
		var topRounded = cornerRadius + "px";
		
		var bottomRounded = "0px";
		
		var borderSize = 0;
				
		var string = "\
        	<div id='selection_button_text' style='padding-top: 14px; text-align: center; background:#F9F9F9; border-top:" + borderSize + "px solid Lightgrey; height:50px; width:" + divWidth + "px; border-top-left-radius:" + topRounded + "; border-top-right-radius:" + topRounded + "; border-bottom-right-radius:" + bottomRounded + "; border-bottom-left-radius:" + bottomRounded + ";'>\
        		<span style='font-size:14px; color: grey; font-weight:" + bold + ";'>" + text + "</span>\
        	</div>\
        ";
		return string;
    };
    
    var generateAboveSingleButton = function(button, place){
    	var color;
    	if(button.hasOwnProperty("color")) color = button.color;
        return generateButton(false, false, true, true, color, button.name, place);
    };
    
    var generateAboveUpperButton = function(button, place){
        var color;
    	if(button.hasOwnProperty("color")) color = button.color;
        return generateButton(false, false, true, false, color, button.name, place);
    };
    
    var generateAboveMiddleButton = function(button, place){
        var color;
    	if(button.hasOwnProperty("color")) color = button.color;
        return generateButton(false, true, false, false, color, button.name, place);
    };
    
    var generateAboveBottomButton = function(button, place){
        var color;
    	if(button.hasOwnProperty("color")) color = button.color;
        return generateButton(false, true, false, true, color, button.name, place);
    };
    
    var spaceForCancel = function(){
		return "<div style='height:15px; margin:0;'></div>";
	};
    
    var dismissModalView = function(){
    	if(document.getElementById("overlay-screen-selection")){
			var deviceHeight = $(window).height();
			var animationHeight = document.getElementById("overlay-screen-selection").clientHeight + 15;
			$( "#overlay-screen-selection" ).fadeOut( "slow", function() {
    			// Animation complete
    			if(document.getElementById("overlay-screen-selection")) document.getElementById("overlay-screen-selection").remove();
	  		});
			$("#selection-holding").animate({
    		   	top: '+=' + animationHeight
	    		}, 300, 'swing',
		    	function() {
   					// Animation complete. CALLBACK?
   					if(document.getElementById("selection-holding")) document.getElementById("selection-holding").remove();		
				}
			);
		}
		selectioniOSLikeShown = false;
    };
    
    var callFunction = function(callback){
		callback();
		dismissModalView();
	};
	
	var touchHandler = function(e) {
		var element = e.currentTarget;
  		if (e.type == "touchstart") {
  			element.style.background = "#EBEBEB";
  		} 
  		else if (e.type == "touchend" || e.type == "touchcancel") {
  			element.style.background = "#F9F9F9";
  		}
  		//console.log("Event: " + element.tagName);
	};
    
    var addElementHandling = function(element, callback){
    	element.onclick = function(){callFunction(callback);};
		element.addEventListener("touchstart", touchHandler, false);
		element.addEventListener("touchend", touchHandler, false);
    }
    
    var showModalView = function(string, count, new_array){
    	selectioniOSLikeShown = true;
    	var div = document.createElement("div");
		div.setAttribute('id', 'overlay-screen-selection');
  		div.style.width = "100%";
  		div.style.height = "100%";
  		div.style.position = "fixed";
  		div.style.backgroundColor = "rgba(0,0,0,0.3)";
  		div.style.top = "0";
  		div.style.left = "0";
		div.onclick = dismissModalView;
		div.style.opacity = 0;
		var deviceHeight = $(window).height();
	
		var div2 = document.createElement("div");
		div2.setAttribute('id', 'selection-holding');
		div2.style.position = "relative";
		div2.style.width = "100%";
		div2.style.paddingLeft = "15px";
		div2.style.left = "0";
		div2.style.top = deviceHeight + "px";
		div2.innerHTML = string;
		
		document.body.appendChild(div);
		document.body.appendChild(div2);
		
		for(var i = 0; i < new_array.length; i++){
			var callback = new_array[i].onclick;
			var element = document.getElementById("selection_button_" + i);
			if(element){
				addElementHandling(element, callback);
			}
		}
		var cancelButton = document.getElementById("selection_button_cancel");
		if(cancelButton){
			cancelButton.onclick = dismissModalView;
			cancelButton.addEventListener("touchstart", touchHandler, false);
			cancelButton.addEventListener("touchend", touchHandler, false);
		}
	
		$( "#overlay-screen-selection" ).fadeTo( "slow" , 0.75, function() {
  		  	// Animation complete
  		});
		
		var animationHeight = (50 * count) + 80;
		$("#selection-holding").animate({
  		   	top: '-=' + animationHeight
  		  	}, 300, 'swing',
  		  	function() {
   				// Animation complete. CALLBACK?
							
			}
		);
    };
    
    var generatedString = "";
	var countA = 0;
	
    if(array == null || array.length == 0){
    	//just show cancel button
    	generatedString += generateCancelButton();
    }
	else if(array.length == 1){
		//show cancel + one button above
		if(headerText != null){
			countA = 2;
		    generatedString += generateHeaderText(headerText);
		    generatedString += generateAboveBottomButton(array[0], 0);
	    }
	    else{
	    	countA = 1;
		    generatedString += generateAboveSingleButton(array[0], 0);
		}
		generatedString += spaceForCancel();
		generatedString += generateCancelButton();
	}
	else if(array.length == 2){
		//show cancel + two buttons above
		if(headerText != null){
			countA = 3;
		    generatedString += generateHeaderText(headerText);
		    generatedString += generateAboveMiddleButton(array[0], 0);
		    generatedString += generateAboveBottomButton(array[1], 1);
	    }
	    else{
	    	countA = 2;
			generatedString += generateAboveUpperButton(array[0], 0);
			generatedString += generateAboveBottomButton(array[1], 1);
		}
		generatedString += spaceForCancel();
		generatedString += generateCancelButton();
	}
	else{
		//show cancel + more buttons
		countA = array.length;
		if(headerText != null){
			countA += 1;
		    generatedString += generateHeaderText(headerText);
	    }
		for(var i = 0; i < array.length; i++){
			if(i == 0){
				if(headerText != null){
					generatedString += generateAboveMiddleButton(array[i], i);
				}
				else{
					generatedString += generateAboveUpperButton(array[i], i);
				}
			}
			else if(i == (array.length - 1)){
				generatedString += generateAboveBottomButton(array[i], i);
			}
			else{
				generatedString += generateAboveMiddleButton(array[i], i);
			}
		}
		generatedString += spaceForCancel();
		generatedString += generateCancelButton();
	}
	
	showModalView(generatedString, countA, array);
	
}