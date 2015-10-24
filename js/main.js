var CURRENT_USER = {};
var menuButtonsOpen = false;

$( document ).ready(function() {  
	//Disable scrolling for mobile  
	//$(document).bind('touchmove', function(e) {  
	//  e.preventDefault();  
	//});  
	$menuButtons = $("ul#menuButtons");  
	$menuButtons.slideUp();  
	$topMenuText = $("#topMenuText");  

	function hideControlsMenu(){    
		$menuButtons.slideUp();    
		menuButtonsOpen = false;    
		$topMenuText.text("");  
	}  

	function openControlsMenu(){    
		$("ul#menuButtons").slideDown();    
		menuButtonsOpen = true;    
		$topMenuText.text( $("#instructionsModal .modal-body h3").text() );  
	}  

	$("button#toggleMenuButton").click(function(){    
		if(menuButtonsOpen){      
			hideControlsMenu();    
		}else{      
			openControlsMenu();    
		}  
	});  

	var $iframeResize = $("#iframeResize");  
	var iframeSizeFull = true;  
	$iframeResize.click(function(){    
		iframeResizeUser();  
	});  

	function iframeResizeUser(){    
		if(iframeSizeFull){      
			$("iframe").css("width", "50%");      
			$("#iframeResize").css("left", "45%");      
			iframeSizeFull = false;    
		}else{      
			$("iframe").css("width", "60%");      
			$("#iframeResize").css("left", "55%");      
			iframeSizeFull = true;    
		}  
	}  

	var $play = $("#play");  
	var $iframeBlocker = $("#iframeBlocker");  

	$play.click(function(){    
		$play.prop("disabled", true);    
		$iframeBlocker.show();    
		//Resize blockly workspace to full width    
		iframeSizeFull = false;    
		iframeResizeUser();    

		if(!$.isEmptyObject(CURRENT_USER)){      
			var Play = Parse.Object.extend("Play");      
			var playParse = new Play();      
			var blocksUsed = Blockly.mainWorkspace.getAllBlocks();      
			var totalBlocksUsed = blocksUsed.length;      
			
			//Take away the embedded blocks      
			blocksUsed.forEach(function(element, index, array){        
				if(element.type === "target" ||          
					element.type === "target2" ||          
					element.type === "logic_negate" ||          
					element.type === "empty" ||          
					element.type === "empty_cell" ||          
					element.type === "empty_cell_left" ||          
					element.type === "empty_cell_right" ||          
					element.type === "obstacle" ||          
					element.type === "obstacle2" ||          
					element.type === "obstacle3" ||          
					element.type === "obstacle4"        )        
				{          
					console.log("Minus " + element.type);          
					totalBlocksUsed--;        
				}      
			});      

			console.log("Blocks used on Start: " + totalBlocksUsed);      
			playParse.set("level", currentLevel);      
			playParse.set("blocksUsed", totalBlocksUsed);      
			playParse.set("codeUsed", Blockly.JavaScript.workspaceToCode());      
			playParse.set("time", new Date());      
			playParse.set("UserId", CURRENT_USER.id);      
			playParse.save();    
		}    

		setTimeout(      
			function animationComplete(){        
				console.log("Running animationComplete");        
				if(window.animationsArray.length != 0){          
					setTimeout(function(){            
						animationComplete();          
					}, 200);        
				}else{          
					$play.prop("disabled", false);          
					$iframeBlocker.hide();        
				}      
			}    
			, 200);    

		executeBlockly();  
	});  
	

	$(".modal .retry").click(function(){    
		ReloadLevel();    
		if(!$.isEmptyObject(CURRENT_USER)){      
			var Retry = Parse.Object.extend("Retry");      
			var retry = new Retry();      
			retry.set("time", new Date());      
			retry.set("UserId", CURRENT_USER.id);      
			retry.save();    
		}  
	});  

	$('.tipModal').on('hidden.bs.modal', function () {    
		invalidState = false;    
		player.x = player.init_x;    
		player.y = player.init_y;    
		player.angle = 0;    
		redraw();    
		console.log("Tip modal hid");    
		console.log(this.id);    

		if(!$.isEmptyObject(CURRENT_USER)){      
			var HintModalClosed = Parse.Object.extend("HintClosed");      
			var closeHint = new HintModalClosed();      
			closeHint.set("HintId", tipToShow - 1);      
			closeHint.set("Level", currentLevel);      
			closeHint.set("time", new Date());      
			closeHint.set("UserId", CURRENT_USER.id);      
			closeHint.save();    
		}  
	});  

	$('#newBlockModal').on('hidden.bs.modal', function () {    
		invalidState = false;    
		player.x = player.init_x;    
		player.y = player.init_y;    
		player.angle = 0;    
		redraw();    
		console.log("New hint modal hid");    
		console.log(this.id);    

		if(!$.isEmptyObject(CURRENT_USER)){      
			var HintModalClosed = Parse.Object.extend("HintClosed");      
			var closeHint = new HintModalClosed();      
			closeHint.set("HintId", -1);      
			closeHint.set("Level", currentLevel);      
			closeHint.set("time", new Date());      
			closeHint.set("UserId", CURRENT_USER.id);      
			closeHint.save();    
		}  
	});  

	$('#successModal').on('hidden.bs.modal', function () {    
		console.log("Modal hid");    
		invalidState = false;    
		player.x = player.init_x;    
		player.y = player.init_y;    
		player.angle = 0;    
		redraw();  
	});  

	$("#menuButtons .retry").click(function(){    
		//Kill all animations in queue    
		while(animationsArray.length > 0){      
			clearTimeout(animationsArray.pop());    
		}    

		var level = currentLevel; //Store current level    
		currentLevel = 0; //Change currentLevel value so that Loading the level will make it seem like its the first time. This forces instructions to be displayed    
		LoadLevel(level); //Load the level    
		if(!$.isEmptyObject(CURRENT_USER)){      
			var Retry = Parse.Object.extend("Retry");      
			var retry = new Retry();      
			var blocksUsed = Blockly.mainWorkspace.getAllBlocks();      
			var totalBlocksUsed = blocksUsed.length;      

			//Take away the embedded blocks      
			blocksUsed.forEach(function(element, index, array){        
				if(element.type === "target" ||          
					element.type === "target2" ||          
					element.type === "logic_negate" ||          
					element.type === "empty" ||          
					element.type === "empty_cell" ||          
					element.type === "empty_cell_left" ||          
					element.type === "empty_cell_right" ||          
					element.type === "obstacle" ||          
					element.type === "obstacle2" ||          
					element.type === "obstacle3" ||          
					element.type === "obstacle4"        )        
				{          
					console.log("Minus " + element.type);          
					totalBlocksUsed--;        
				}      
			});      

			console.log("Blocks used on Retry: " + totalBlocksUsed);      
			retry.set("level", currentLevel);      
			retry.set("blocksUsed", totalBlocksUsed);      
			retry.set("codeUsed", Blockly.JavaScript.workspaceToCode());      
			retry.set("time", new Date());      
			retry.set("UserId", CURRENT_USER.id);      
			retry.save();    
		}  
	});  

	$(".tip").click(function(){    
		//Data is saved first, before tipToShow is modified    
		console.log("Hint modal requested from menu");    
		console.log(tipToShow);    
		if(!$.isEmptyObject(CURRENT_USER)){      
			var HintRequested = Parse.Object.extend("HintRequested");      
			var hintModalRequested = new HintRequested();      
			hintModalRequested.set("HintId", (tipToShow > totalNumTips) ? 1 : tipToShow);      
			hintModalRequested.set("Level", currentLevel);      
			hintModalRequested.set("time", new Date());      
			hintModalRequested.set("UserId", CURRENT_USER.id);      
			hintModalRequested.save();    
		};    

		//Hide menu buttons and instructions text    
		hideControlsMenu();    
		displayTip();  
	});  

	$("#newBlockTip").click(function(){    
		console.log("New Hint modal requested from menu");    
		console.log(tipToShow);    

		if(!$.isEmptyObject(CURRENT_USER)){      
			var HintRequested = Parse.Object.extend("HintRequested");      
			var hintModalRequested = new HintRequested();      
			hintModalRequested.set("HintId", -1);      
			hintModalRequested.set("Level", currentLevel);      
			hintModalRequested.set("time", new Date());      
			hintModalRequested.set("UserId", CURRENT_USER.id);      
			hintModalRequested.save();    
		};    

		$("#newBlockModal").modal('show');  
	});  

	$(".nextLevel").click(function(){    
		LoadNextLevel();  
	});  

	$("button#levelSelect").click(function(){    
		hideControlsMenu();    

		if(currentLevel <= 20){      
			$("#worldSelectMenu").hide();      
			$("#levelSelectMenu1").show();      
			$("#levelSelectMenu2").hide();    
		}else if(currentLevel <= 42){      
			$("#worldSelectMenu").hide();      
			$("#levelSelectMenu1").hide();      
			$("#levelSelectMenu2").show();    
		}    

		$("#levelSelectModal").modal({      
			backdrop: 'static',      
			show: true    
		});  
	});    

	$("button#levelSelectBack").click(function(){      
		$("#worldSelectMenu").show();      
		$("#levelSelectMenu1").hide();      
		$("#levelSelectMenu2").hide();      
		$("#levelSelectBack").hide();    
	});  

	$(".worldButton").click(function(){    
		var worldNum = this.value;    
		console.log(worldNum);    

		$("#worldSelectMenu").hide();    
		$("#levelSelectMenu1").hide();    
		$("#levelSelectMenu2").hide();    
		$("#levelSelectMenu" + worldNum).show();    
		$("#levelSelectBack").show();  
	});  

	$("#challengeTask").click(function(){    
		var challengePassword = prompt("Password: ");    
		if (challengePassword === "ptp") {      
			LoadLevel(99);      
			$("#researcherButton").show();      
			$("#levelSelect").hide();      

			if(!$.isEmptyObject(CURRENT_USER)) {        
				var StartChallengeTask = Parse.Object.extend("StartChallengeTask");        
				var startChallengeTask = new StartChallengeTask();        
				startChallengeTask.set("time", new Date());        
				startChallengeTask.set("UserId", CURRENT_USER.id);        
				startChallengeTask.save();      
			}    
		}  	
	});  

	$("#researcherButton").click(function(){    
		var challengeExitPassword = prompt("Password: ");    
		if (challengeExitPassword === "ptpexit") {      
			if(!$.isEmptyObject(CURRENT_USER)) {        
				var ExitChallengeTask = Parse.Object.extend("ExitChallengeTask");        
				var exitChallengeTask = new ExitChallengeTask();        
				exitChallengeTask.set("time", new Date());        
				exitChallengeTask.set("UserId", CURRENT_USER.id);        
				exitChallengeTask.save();      
			}      

			alert("All done! Thank you!");      

			LoadLevel(1);    
		}  
	});  

	$(".levelSelectMenu button").click(function(){    
		console.log(this);    
		console.log(this.id);    
		var level = parseInt( this.id.match(/\d+/)[0] );    
		eval("LoadLevel("+level+");");    
		console.log("Level selected from menu");    
		console.log(this);    
		if(!$.isEmptyObject(CURRENT_USER)) {      
			var LevelSelectedFromMenu = Parse.Object.extend("LevelSelectedFromMenu");      
			var levelSelectedFromMenu = new LevelSelectedFromMenu();      
			levelSelectedFromMenu.set("level", level);      
			levelSelectedFromMenu.set("time", new Date());      
			levelSelectedFromMenu.set("UserId", CURRENT_USER.id);      
			levelSelectedFromMenu.save();    
		}  
	});  

	$(".login-form button").click(function(){    
		var username = $("#login-username").val();    
		var password = $("#login-password").val();    
		console.log(username);    
		console.log(password);    
		Parse.User.logIn(username, password).then(        
			function(user) {          
				//Hide navbar to use all available space          
				$("nav").hide();          
				console.log("USER: " + user);          
				CURRENT_USER = user;          
				//CURRENT_USER = Parse.User.current();          
				$("#login").hide();          
				$("#logout h2").text(Parse.User.current().get("username"));          
				$("span#currentUser").html( Parse.User.current().get("studentName") );          
				$("#logout").show();          
				//var currentPlayer = Parse.User.current().id;          

				UnlockLevels(CURRENT_USER.attributes.maxLevel);          
				console.log("Users max level: " + CURRENT_USER.attributes.maxLevel);          
				$('#loginModal').modal('hide');          
				LoadLevel(CURRENT_USER.attributes.maxLevel);                
			},        
			function(error) {          
				alert("Invalid username or password");        
			}
		);  
	});  

	$("#logout button").click(function(){    
		Parse.User.logOut();    
		$("#login").show();    
		$("#logout").hide();  
	});  

	//Logout when the app is first loaded  
	Parse.User.logOut();  
	CURRENT_USER = {};  
	$("#logout").hide();  

	
	//Load Fast Click for mobile browsers  
	$(function() {    
		FastClick.attach(document.body);  
	});

	
});

//START APP AFTER EVERYTHING HAS LOADED
window.onload = init;
function init(){  
	Blockly.mainWorkspace.clear();  
	console.log("init");  
	$("#loginModal").modal({    
		backdrop: 'static',    
		show: true  
	});  

	// LoadLevel(1);
}