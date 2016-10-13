SI.registerService('player-controller', function(){
	var _mX, mY;
	return {
		init : function(){
			console.log('service initialised');
		},
		addEventListener : function(dom, type, callback){
			dom.addEventListener(type, callback);
		}
	}
});