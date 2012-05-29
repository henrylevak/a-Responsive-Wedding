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
		document.getElementById("mainimage").className 			= "moveaway";
		document.getElementById("allBoxes").className  			= "moveaway";
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
	var imageFrame 			= document.getElementById('imageFrame');
	var newImg 				= new Image();
		 newImg.src 			= "../gallery/"+ imageNumber +".jpg";
	var scrollDistance 	= window.pageYOffset;
	var windowWidth 		= window.innerWidth;
	var windowHeight 		= window.innerHeight;
	 	 newImg.onload = function(){
			 document.getElementById('imageFrame').style.display 			= "inline";
			 document.getElementById('imageFramebuttons').style.display 	= "inline";
			 document.getElementById('overLay').style.display 				= "inline";
			 imageHeight 	= newImg.height;
		    imageWidth 		= newImg.width;
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
			    	document.getElementById('imageFrame').style.top 				= scrollDistance;
			    	document.getElementById('imageFramebuttons').style.top 	= scrollDistance + 6;
			    	document.getElementById('overLay').style.top 		= scrollDistance;
			    	document.getElementById('overLay').style.height 	= "129%";
			    	document.getElementById('overLay').style.width 	= "96%";
		    }else{
	    		//portrait
	    			if (ratio < 1){
	    	    		document.getElementById('imageFrame').style.top 				= scrollDistance + 27;
	    	    		document.getElementById('imageFramebuttons').style.top 	= scrollDistance + 6;
		    		}else{
		    	    	document.getElementById('imageFrame').style.top 				= scrollDistance;
		    	    	document.getElementById('imageFramebuttons').style.top 	= scrollDistance + 7;
			    	}
				    	document.getElementById('overLay').style.top 		= scrollDistance;
				    	document.getElementById('overLay').style.height 	= "130%";
		    }
		    var preloadimage = Number(imageNumber + 1);
		    preloader(preloadimage)
			 document.getElementById('imageFrame').style.backgroundImage= "url('../gallery/"+ imageNumber +".jpg')";
		 }
};

function closeFrame(){
	document.getElementById('imageFrame').style.display 			= "none";
	document.getElementById('imageFramebuttons').style.display 	= "none";
	document.getElementById('overLay').style.display 				= "none";
}

function updateOrientation(e) {
	var scrollDistance 	= window.pageYOffset;
	var windowWidth 		= window.innerWidth;
	var windowHeight 		= window.innerHeight;
	var overLay 				= document.getElementById('overLay');
	 if( windowHeight < windowWidth){
	 	//landscape
	    	document.getElementById('imageFrame').style.top 				= scrollDistance;
	    	document.getElementById('imageFramebuttons').style.top 	= scrollDistance ;
	    	overLay.style.top 	= scrollDistance;
	    	overLay.style.height 	= "129%";
	    	overLay.style.width 	= "96%";
	 }else{
		//portrait
    		overLay.style.top 		= scrollDistance;
    		overLay.style.height 	= "130%";
    		document.getElementById('imageFrame').style.top 			= scrollDistance;
    		document.getElementById('imageFramebuttons').style.top = scrollDistance + 4;
	 }
};

function previousNext(type){
	var currentImage = document.getElementById('imageFrame').getAttribute("data-number");
	var preloadimage;
	if (type== 'next'){
		currentImage++;
		preloadimage = currentImage + 1;
	}else{
		currentImage--;
		preloadimage = currentImage - 1;
	}
	if (currentImage == 10){
		currentImage = 0;
	}else if(currentImage < 0){
		currentImage = 9;
	}
	
	if (preloadimage == 10){
		preloadimage = 0;
	}else if(preloadimage < 0){
		preloadimage = 9;
	}
	preloader(preloadimage)
	imageSelect(null,currentImage)
}

function preloader(preloadimage) {
 	preLoadimage = new Image(); 
 	preLoadimage.src = "gallery/" + preloadimage + ".jpg";
 }
 
 function preloadThumbs() {
     var i = 0;
     var loaded = 0;
     imageObj = new Image();
 
     images = new Array();
     images[0]	=	"img/HenryNicole925.png"
     images[1]	=	"gallery/thumb1.jpg"
     images[2]	=	"gallery/thumb2.jpg"
     images[3]	=	"gallery/thumb3.jpg"
     images[4]	=	"gallery/thumb4.jpg"
     images[5]	=	"gallery/thumb5.jpg"
     images[6]	=	"gallery/thumb6.jpg"
     images[7]	=	"gallery/thumb7.jpg"
     images[8]	=	"gallery/thumb8.jpg"
     images[9]	=	"gallery/thumb9.jpg"
     images[10]	=	"img/henrypicture1.jpg"
     images[11]	=	"img/nicolepicture1.jpg"
     images[12]	=	"gallery/thumb0.jpg"
 
	for(i=0; i<=12; i++){
 		imageObj.src=images[i];
	};
	
	console.log(i)
	
	if (i==13){
		showText('show');
	};
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
