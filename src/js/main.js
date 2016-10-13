let SI = new Nutshell('space-invaders', {
	debug: true,
	canvasSize: {width:800,height:600}
});

SI.GAME = (function(){

	let _renderer, _stage;

	let _render = function(){
		_renderer.render(_stage);
	};

	let _init = (function(){
		_stage = new PIXI.Container();
		_renderer = new PIXI.WebGLRenderer(800, 600, {transparent:true});
		document.getElementById('game').appendChild(_renderer.view);
		SI.registerEvent('game-render', _render);
	})();

	return {
		gameView: function(){
			return _renderer.view;
		},
		drawSprite: function(){
			console.log('draw sprite');
		},
		drawRectangle: function(c,x,y,w,h){
			var rect = new PIXI.Graphics();
			rect.beginFill(c);
			rect.drawRect(x,y,w,h);
			_stage.addChild(rect);
			return rect;
		},
		drawCircle: function(c,x,y,r){
			var circ = new PIXI.Graphics();
			circ.beginFill(c);
			circ.drawCircle(x,y,r);
			_stage.addChild(circ);
			return circ;
		}
	}
})();

for(var key in SI.GAME){
	console.log(String(SI.GAME[key].name));
	var obj = {};
	obj[String(SI.GAME[key].name)] = SI.GAME[key];
	SI.extendContext(obj);
};

window.onload = function(){ SI.start(); }