window.utils = {};

if(!window.requestAnimationFrame){
	window.requestAnimationFrame = (window.webkitRequestAnimationFrame|| 
		window.mozRequestAnimationFrame||
		window.msRequestAnimationFrame||
		window.oRequestAnimationFrame||
		function(callback){
			return window.setTimeout(callback,17/*~1000/60*/);

	});
}

window.utils.parseColor=function(color,toNumber){
	if(toNumber===true){
		if(typeof color === 'number'){
			return(color|0);//chop off decimal
		}
		if(typeof color === 'string' && color[0] === '#'){
			color=color.slice(1);
		}
		return window.parseInt(color,16);	
	}
	else{
		if(typeof color === 'number'){
			color = '#' + ('000000'+(color | 0).toString(16)).substr(-6);//pad
		}
		return color;
	}
};

window.utils.captureMouse = function(element)
{
	var mouse = {x:0,y:0,event:null};
	element.addEventListener('mousemove',function(event){
		
		var x,y;
		if (event.pageX||pageY) {
			x = event.pageX;
			y = event.pageY;
		}
		else{
			x = event.clientX + body_scrollLeft + element_scrollLeft;
			y = event.clientY + body_scrollTop + element_scrollTop;
		}
		x -=element.offsetLeft;
		y -=element.offsetTop;
		mouse.x = x;
		mouse.y = y;
		
		mouse.event = event;
		
	},false);
	return mouse;
};

window.utils.containsPoint = function ()
{
	var x,y,rect;
	return !(x<rect.x||x>rect.x + rect.width||
		 y<rect.y || y>rect.y+rect.height);
};

window.utils.intersects = function (rectA, rectB) { 
	return !(rectA.x + rectA.width < rectB.x || 
	rectB.x + rectB.width < rectA.x || 
	rectA.y + rectA.height < rectB.y || 
	rectB.y + rectB.height < rectA.y); 
}; 