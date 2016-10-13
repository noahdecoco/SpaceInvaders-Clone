SI.registerModule('player', function(context){

	let _player;
	let _playerX, _playerY;
	let _bullets = [];
	let _pcService;

	let _update = function(){
		// _player.x += _player.vX;
		// Move bullets
		for(var i = 0; i < _bullets.length; i++){
			_bullets[i].y -= _bullets[i].vY;
			_bullets[i].x -= _bullets[i].vX;
			if(_bullets[i].y < -50) {
				console.log('bull removed');
				_bullets[i].destroy();
				_bullets.splice(i,1);
			}
			console.log(_bullets.length);
			context.triggerEvent('bullets-moved', [_bullets]);
		}
	};

	let _playerMove = function(e){
		_playerX = _player.x = e.offsetX - (_player.width/2);
		_playerY = _player.y = 500;

	}

	let _playerShoot = function(e){
		var bullet = new context.drawRectangle(0xffffff,0,0,4,10);
		bullet.x = _playerX+13;
		bullet.y = _playerY-10;
		bullet.vY = 20;
		bullet.vX = 0;
		_bullets.push(bullet);
	}

	let _init = function(){
		_player = new context.drawRectangle(0x6666ff,0,0,30,50);
		_player.y = 500;
		
		_pcService = context.getService('player-controller');
		_pcService.addEventListener(context.gameView(), 'mousemove', _playerMove);
		_pcService.addEventListener(context.gameView(), 'click', _playerShoot);

		context.registerEvent('game-update', _update);
	};

	return {
		init : _init
	}
});