SI.registerModule('game-loop', function(context){

	let _animID;
	let _lastRenderTime, _lastUpdateTime, _delta, _currentTime;
	let _fps = 1000/30;
	let _ups = 1000/30;

	let _gameLoop = function(){
		_currentTime = (new Date()).getTime();

		// UPDATE
		_delta = _currentTime - _lastUpdateTime;
		if(_delta > _ups) {
			context.triggerEvent('game-update', [_delta]);
			_lastUpdateTime = _currentTime;
		}

		// RENDER
		_delta = _currentTime - _lastRenderTime;
		if(_delta > _fps) {
			context.triggerEvent('game-render', [_delta]);
			_lastRenderTime = _currentTime;
		}

		_animID = window.requestAnimationFrame(_gameLoop);
	};


	let _init = function(){
		_lastRenderTime = _lastUpdateTime = (new Date()).getTime();
		if(!_animID) window.requestAnimationFrame(_gameLoop);
	};

	return {
		init : _init
	}
});