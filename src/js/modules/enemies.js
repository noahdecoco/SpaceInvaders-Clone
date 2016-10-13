SI.registerModule('enemies', function(context){

	let _enemies = [];
	let _spawnInt = 1000;
	let _currTime, _lastSpawn;
	let _warmUp = 3000;

	let _createEnemy = function(){
		let enemy = new context.drawRectangle(0xff6666,0,0,40,40);
		enemy.x = 100 + Math.random() * (300-40);
		enemy.y = -50;
		enemy.vY = 10;
		_enemies.push(enemy);
	}

	let _checkBulletHit = function(bullets){
		for(var b = 0; b < bullets.length; b ++){
			for(var e = 0; e < _enemies.length; e ++){
				console.log(bullets[b],_enemies[e]);
				// Check if bullet overlaps with enemy
				if((bullets[b].x + bullets[b].width > _enemies[e].x)
				&& (bullets[b].x < _enemies[e].x + _enemies[e].width)
				&& (bullets[b].y + bullets[b].height > _enemies[e].y)
				&& (bullets[b].y < _enemies[e].y + _enemies[e].height)) {
					bullets[b].destroy();
					bullets.splice(b,1);
					console.log('b destroy');
					_enemies[e].destroy();
					_enemies.splice(e,1);
					console.log('e destroy');
				}
			}
		}
	}

	let _update = function(delta){
		_currTime = (new Date()).getTime();
		for(var e = 0; e < _enemies.length; e ++){
			_enemies[e].y += _enemies[e].vY;
			if(_enemies[e].y > 600) {
				_enemies[e].destroy();
				_enemies.splice(e,1);
			}
		}
	}

	let _init = function(){
		setInterval(_createEnemy, 3000);
		context.registerEvent('bullets-moved', function(bullets){
			_checkBulletHit(bullets);
		});
		context.registerEvent('game-update', _update);
	};

	return {
		init : _init
	}
});