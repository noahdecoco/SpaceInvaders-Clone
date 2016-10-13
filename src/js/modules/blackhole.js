SI.registerModule('blackhole', function(context){

	let _blackhole;
	let _bhX, _bhY;

	let _update = function(){
		
	};

	let _checkBullets = function(bullets){
		for(var b = 0; b < bullets.length; b ++){
			let blt = bullets[b];
			let dstX = blt.x - _bhX;
			let dstY = blt.y - _bhY;
			let dstR = Math.round(Math.sqrt(Math.pow(dstX,2)+Math.pow(dstY,2)));
			console.log(dstX, dstY, dstR);
			if(Math.abs(dstR) < 100 && dstY > 0) {
				if(dstX < 0) {
					blt.vX -= (80-Math.abs(dstR))*0.5;
				} else {
					blt.vX += (80-Math.abs(dstR))*0.5;
				}
			}
		}
	};

	let _init = function(){
		_blackhole = new context.drawCircle(0x000000,0,0,80);
		_blackhole.x = _bhX = 300;
		_blackhole.y = _bhY = 300;
		context.registerEvent('bullets-moved', function(bullets){
			_checkBullets(bullets);
		});
		context.registerEvent('game-update', _update);
	};

	return {
		init : _init
	}
});