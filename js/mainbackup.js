function onload(){
	if (navigator.appName == 'Microsoft Internet Explorer') {        
		var r=confirm("You are using Internet Explorer. You should go download Google Chrome. This website will not work until you do.");
		if (r==true){
				window.location = "http://www.google.com/chrome"
		}else{
			window.location = "http://www.google.com/chrome"
		}
	}
	document.getElementById('imageFrame').addEventListener('touchmove', function(e){ e.preventDefault(); }); 
	document.getElementById('overLay').addEventListener('touchmove', function(e){ e.preventDefault(); }); 
	document.getElementById('loadingoverLay').addEventListener('touchmove', function(e){ e.preventDefault(); }); 
	document.addEventListener("orientationchange", updateOrientation,false);
	//preloadThumbs();			
}


function preloadThumbs() {
	var i = 0;
	var loaded = 0;
	var imageObj = new Array();
	var images = new Array();
	
/*
	images[0]	=	"img/HenryFace.png"
	images[1]	=	"img/NicoleFace.png"
	images[2]	=	"img/AboutUs.png"
	images[3]	=	"img/TheWedding.png"
*/
	
	images[0]	=	"gallery/thumb0.jpg"
	images[1]	=	"img/jrpartialocean300.jpg"
	images[2]	=	"img/jrsuiteswimout300.jpg"
	images[3]	=	"img/jrsuiteocean300.jpg";
	
	if (window.innerWidth <= 400){
		images[4]	=	"img/HenryNicole380.png"
		images[14]	=	"img/henrypicture1-300h.jpg"
	}else if (window.innerWidth <=678){
		images[4]	=	"img/HenryNicole700.png"
		images[14]	=	"img/henrypicture1-420h.jpg"
	}else if (window.innerWidth <=1275){
		images[4]	=	"img/HenryNicole925.jpg"
		images[14]	=	"img/henrypicture1-420h.jpg"
	}else{
		images[4]	=	"img/HenryNicole925.jpg"
		images[14]	=	"img/henrypicture1.jpg"
	}
	
	images[5]	=	"gallery/thumb1.jpg"
	images[6]	=	"gallery/thumb2.jpg"
	images[7]	=	"gallery/thumb3.jpg"
	images[8]	=	"gallery/thumb4.jpg"
	images[9]	=	"gallery/thumb5.jpg"
	images[10]	=	"gallery/thumb6.jpg"
	images[11]	=	"gallery/thumb7.jpg"
	images[12]	=	"gallery/thumb8.jpg"
	images[13]	=	"gallery/thumb9.jpg"
	images[15]	=	"img/nicolepicture1.jpg"
	
/*
	images[16]	=	"gallery/thumb0.jpg"
	images[17]	=	"img/jrpartialocean300.jpg"
	images[18]	=	"img/jrsuiteswimout300.jpg"
	images[19]	=	"img/jrsuiteocean300.jpg";
*/
    
	while(i<=images.length-1){
		imageObj[i] 	= new Image(); 
		imageObj[i].src	=images[i]
	   
 		if (i==15){
			imageObj[i].onload= loadMainimages;
			break
		}else{
		   imageObj[i].onload=i++;
		   console.log("i " + i)
		}
	};
};

function sayit(i){
	console.log(i)
}

function loadMainimages(){
alert('load')
	setTimeout('loadingoverLay.hide();animate.meetHenry(); animate.mainImage(); animate.meetNicole(); animate.aboutUs(); animate.theWedding(); showText("show");', 500)
	setTimeout('window.scrollTo(0, 1)', 1000)
	//document.getElementById('mainimage').style.backgroundImage	= "url('../img/HenryNicole925.png')";
/*
	document.getElementById('meetHenry').style.backgroundImage	= "url('../img/HenryFace.png')";
	document.getElementById('meetNicole').style.backgroundImage	= "url('../img/NicoleFace.png')";
	document.getElementById('aboutUs').style.backgroundImage	= "url('../img/AboutUs.png')";
	document.getElementById('theWedding').style.backgroundImage	= "url('../img/TheWedding.png')";
*/
}

var selection = {
	personSelected: function(person){
		if (document.getElementById('mainStage').style.display == "block"){
			this.switchPerson(person)
		}else{
			this.selectPerson(person);
		};
	},
	selectPerson: function(person){
		showText('hide');
		document.getElementById("mainimage").className 		= "moveaway";
		document.getElementById("allBoxes").className  		= "moveaway";
		document.getElementById('mainStage').style.display 	= "block";
		setTimeout( "document.getElementById('mainStage').style.opacity = '1'", 400)
		this.loadupmainStage(person)
	},
	switchPerson: function(person){
		document.getElementById('mainStage').style.opacity = '0';
		setTimeout( function(){ selection.loadupmainStage(person) }, 350)
		setTimeout( "document.getElementById('mainStage').style.opacity = '1'", 400)
	},
	bringbackmainimageBorder: function(){
		document.getElementById("mainimage").className 	= "bringback";
		document.getElementById("allBoxes").className 	= "bringbackFast";
		document.getElementById("mainStage").className 	= "bringbackFast";
	},
	loadupmainStage: function(person){
		if (person == "henry"){
			document.getElementById("mainStage").innerHTML = document.getElementById("_meetHenry").innerHTML;
		}else if(person == "nicole"){
			console.log(person)
		   document.getElementById("mainStage").innerHTML = document.getElementById("_meetNicole").innerHTML;
		}else if(person == "us"){
			document.getElementById("mainStage").innerHTML = document.getElementById("_meetUs").innerHTML;
			makeClickable()
		}else if(person == "wedding"){
			document.getElementById("mainStage").innerHTML = document.getElementById("_theWedding").innerHTML;
			picked.room(document.getElementById('theWeddingstageButtons').getElementsByTagName('span')[0])
		};
	}
};

function makeClickable(){
	var gallery = document.getElementById('gallery');
	var countOfImages = gallery.getElementsByTagName('div');
	
	for (i=0;i<countOfImages.length;i++){
		gallery.getElementsByTagName('div')[i].setAttribute("data-number",i);
		gallery.getElementsByTagName('div')[i].setAttribute("class","image"+i);
		gallery.getElementsByTagName('div')[i].onclick = function() {imageSelect(this);};
	}
};

function imageSelect(i,number){
	if(number || number ==0){
		var imageNumber 	= number;
	}else{
		var imageNumber 	= i.getAttribute('data-number')
	}
	var imageHeight, imageWidth;
	var imageFrame 		= document.getElementById('imageFrame');
	var newImg 				= new Image();
		 newImg.src 		= "../gallery/"+ imageNumber +".jpg";
	var scrollDistance 	= window.pageYOffset;
	var windowWidth 		= window.innerWidth;
	var windowHeight 		= window.innerHeight;
	var getoverLay			= document.getElementById('overLay');
	var getloadingoverLay = document.getElementById('loadingoverLay');
	getloadingoverLay.style.top = scrollDistance;
	getoverLay.style.height 	 = "130%";
	loadingoverLay.show()
	
 	 newImg.onload = function(){
 	 alert('hide 1')
 	 	 loadingoverLay.hide()
 	 	 
		 document.getElementById('imageFrame').style.display 			= "inline";
		 document.getElementById('imageFramebuttons').style.display = "inline";
		 document.getElementById('overLay').style.display 				= "inline";
		 
		 imageHeight 	= newImg.height;
	    imageWidth 	= newImg.width;
	    
	    var ratio = imageHeight / imageWidth;
	    if (ratio < 1){
			 imageFrame.setAttribute("data-orientation",'landscape');
			 imageFrame.setAttribute("data-number",imageNumber);
	    }else{
			 imageFrame.setAttribute("data-orientation",'portrait');
			 imageFrame.setAttribute("data-number",imageNumber);
	    }
	    
	    if( windowHeight < windowWidth){
	    	//landscape
		    	document.getElementById('imageFrame').style.top 			= scrollDistance;
		    	document.getElementById('imageFramebuttons').style.top 	= scrollDistance + 6;
		    	getoverLay.style.top 	= scrollDistance;
		    	overLay.style.height = "129%";
		    	getoverLay.style.width 	= "96%";
	    }else{
    		//portrait
    			if (ratio < 1){
    	    		document.getElementById('imageFrame').style.top 			= scrollDistance + 27;
    	    		document.getElementById('imageFramebuttons').style.top 	= scrollDistance + 6;
	    		}else{
	    	    	document.getElementById('imageFrame').style.top 			= scrollDistance;
	    	    	document.getElementById('imageFramebuttons').style.top 	= scrollDistance + 7;
		    	}
		    	getoverLay.style.top 		 = scrollDistance;
		    	getloadingoverLay.style.top = scrollDistance;
		      getoverLay.style.height 	= "130%";
	    }
	    var preloadimage1 = Number(imageNumber) + Number(1);
	    var preloadimage2 = Number(imageNumber) - Number(1);
	    
	    if (preloadimage1 == 10){
		    preloadimage1 = 0;
		 }else if(preloadimage1 < 0){
			 preloadimage1 = 9;
	    }
	    
	    if (preloadimage2 == 10){
		    preloadimage2 = 0;
		 }else if(preloadimage2 < 0){
			 preloadimage2 = 9;
	    }
	    
	    preloader(preloadimage1)
	    preloader(preloadimage2)
		 document.getElementById('imageFrame').style.backgroundImage= "url('../gallery/"+ imageNumber +".jpg')";
	 }
};

function closeFrame(){
	document.getElementById('imageFrame').style.display 			= "none";
	document.getElementById('imageFramebuttons').style.display 	= "none";
	document.getElementById('overLay').style.display 				= "none";
}

var loadingoverLay = {
	show: function(){
		var overlay = document.getElementById('loadingoverLay');
		overlay.style.opacity = ".9";
		document.getElementById('loadingoverLay').style.display ='table';
	},
	hide: function() {
		var overlay = document.getElementById('loadingoverLay');
		overlay.style.opacity = "0";
		setTimeout( function() {document.getElementById('loadingoverLay').style.display ='none'} , 1000)
	}
};

var animate = {
	meetNicole:function(){
		document.getElementById('meetNicole').style.opacity = 1;
		document.getElementById('meetNicole').style.visibility = "visible";
	},
	meetHenry:function(){
		document.getElementById('meetHenry').style.opacity = 1;
		document.getElementById('meetHenry').style.visibility = "visible";
	},
	aboutUs:function(){
		document.getElementById('aboutUs').style.opacity = 1;
		document.getElementById('aboutUs').style.visibility = "visible";
	},
	theWedding:function(){
		document.getElementById('theWedding').style.opacity = 1;
		document.getElementById('theWedding').style.visibility = "visible";
	},
	mainImage:function(){
		document.getElementById('mainimage').style.opacity = 1;
		document.getElementById('mainimage').style.visibility = "visible";
	}
};

function updateOrientation(e) {
	var scrollDistance 	= window.pageYOffset;
	var windowWidth 		= window.innerWidth;
	var windowHeight 		= window.innerHeight;
	var overLay 			= document.getElementById('overLay');
	if( windowHeight < windowWidth){
	 	//landscape
    	document.getElementById('imageFrame').style.top 			= scrollDistance;
    	document.getElementById('imageFramebuttons').style.top 	= scrollDistance ;
    	overLay.style.top 	= scrollDistance;
    	//overLay.style.height = "129%";
	 }else{
		//portrait
 		overLay.style.top 		= scrollDistance;
 		//overLay.style.height 	= "130%";
 		document.getElementById('imageFrame').style.top 		 = scrollDistance;
 		document.getElementById('imageFramebuttons').style.top = scrollDistance + 4;
	 }
};

function previousNext(type){
	var currentImage = document.getElementById('imageFrame').getAttribute("data-number");
	var preloadimage;
	if (type == 'next'){
		preloadimage = Number(currentImage) + Number(2);
	   currentImage++;
	}else{
		preloadimage = Number(currentImage) - Number(2);
		currentImage--;
	}

	if (currentImage > 9){
		currentImage = 0;
	}else if(currentImage < 0){
		currentImage = 9;
	}
	
	if (preloadimage == 10){
		preloadimage = 0;
	}
	else if(preloadimage > 10){
		preloadimage = Number(preloadimage) - Number(10);
	}
	else if(preloadimage == 0){
		preloadimage = 9;
	}
	else if(preloadimage < 0){
		preloadimage = Number(preloadimage) + Number(10);
	}

	preloader(preloadimage)
	imageSelect(null,currentImage)
}

function preloader(preloadimage) {
 	preLoadimage = new Image(); 
 	preLoadimage.src = "/gallery/" + preloadimage + ".jpg";
 }
 
function showText(type){
	var all = document.getElementById('mainimage')
	var allDivs = all.getElementsByTagName('div');
	
	if (type=="show"){
		for (var i=0; i<allDivs.length; i++){
	 		allDivs[i].style.opacity = .5;
	  	}
	}else{
		for (var i=0; i<allDivs.length; i++){
	 		allDivs[i].style.opacity = .0;
	  	}
	}
} 

function scrolltoBottom(){
	window.scrollTo(0, document.body.scrollHeight);
}

var picked = {
	room: function(that){
		for (var i=0; i<that.parentNode.getElementsByTagName('span').length; i++){
	 		that.parentNode.getElementsByTagName('span')[i].setAttribute('class','')
	  	}
		document.getElementById('theWeddingstageContent').innerHTML = document.getElementById('_Room').innerHTML;
		that.setAttribute('class','touched');
	},
	dates: function(that){
		for (var i=0; i<that.parentNode.getElementsByTagName('span').length; i++){
	 		that.parentNode.getElementsByTagName('span')[i].setAttribute('class','')
	  	}
		that.setAttribute('class','touched')
		document.getElementById('theWeddingstageContent').innerHTML = document.getElementById('_Dates').innerHTML;
	},
	bookit: function(that){
		for (var i=0; i<that.parentNode.getElementsByTagName('span').length; i++){
	 		that.parentNode.getElementsByTagName('span')[i].setAttribute('class','')
	  	}
		that.setAttribute('class','touched')
		document.getElementById('theWeddingstageContent').innerHTML = document.getElementById('_Bookit').innerHTML;
	}
};

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var henryPos = document.getElementById('meetHenry').offsetTop;
    var y = (elm.offsetTop - henryPos);
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID,room) {	
	document.getElementById('roomInfo').innerHTML = document.getElementById(room).innerHTML;
	var startY = currentYPosition();
   var stopY = elmYPosition(eID);
   var distance = stopY > startY ? stopY - startY : startY - stopY;
   if (distance < 100) {
		scrollTo(0, stopY); return;
   }
   var speed = Math.round(distance / 5);
   if (speed >= 20) speed = 20;
   var step = Math.round(distance / 25);
   var leapY = stopY > startY ? startY + step : startY - step;
   var timer = 0;
   if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}