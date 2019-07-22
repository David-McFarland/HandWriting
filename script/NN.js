var canvas = document.getElementById("myCanvas");

canvas.width = 560;
canvas.height = 560;

ctx = canvas.getContext('2d');
let arr = [];
for(let i = 0; i<28; i++){
	arr.push([]);
	for(let j = 0; j<28; j++){
		arr[i].push(0);
	}
}


for(let i = 0; i<29; i++){
	ctx.moveTo(0, i * 20);
	ctx.lineTo(560, i * 20);

	ctx.moveTo(i * 20, 0);
	ctx.lineTo(i * 20, 560);
}
ctx.stroke();

let down = false;

canvas.addEventListener("mousemove", function (e) {
    if(down){
    	let x = (e.clientX - (e.clientX % 20)) / 20;
    	let y = (e.clientY - (e.clientY % 20)) / 20;
    	//console.log("(" + x + ", " + y + ")")
    	ctx.fillStyle = "#000000";
    	ctx.fillRect(x * 20, y * 20, 20, 20);
    	ctx.fillStyle = "#000000";
    	let pos = [{x: x-1, y: y-1}, {x: x-1, y: y}, {x: x-1, y: y+1}, {x: x, y: y-1}
    	, {x: x, y: y+1}, {x: x+1, y: y-1}, {x: x+1, y: y}, {x: x+1, y: y+1}];
    	arr[x][y] = 1;
    	ctx.fillStyle = "#a0a0a0";
    	for( let i = 0; i<8; i++){
    		if(arr[pos[i].x][pos[i].y] != 1 && pos[i].x > -1 && pos[i].x < 28 && pos[i].y > -1 && pos[i].y < 28){
    			ctx.fillRect(pos[i].x * 20, pos[i].y * 20, 20, 20);
    			arr[pos[i].x][pos[i].y] = 0.4;
    		}
    		
    	}


    }
});
canvas.addEventListener("mousedown", function (e) {
    down = true;
});
canvas.addEventListener("mouseup", function (e) {
    down = false;
});
canvas.addEventListener("mouseout", function (e) {
    down = false;
});

window.addEventListener("keydown", function (e) {
    if(e.key === "n"){ //Normal
    	let string = "np.argmax(net.feedforward(np.array(["
    	for(let i = 0; i<28; i++){
			for(let j = 0; j<28; j++){
				string += ("[" + arr[i][j].toString() + "]" + ", ");
			}
		}
		string = string.substring(0, string.length-2) + "])))";
		console.log(string);
    }
    else if(e.key === "t"){//Transposed
    	let string = "np.argmax(net.feedforward(np.array([["
    	for(let i = 0; i<28; i++){
			for(let j = 0; j<28; j++){
				string += ("[" + arr[j][i].toString() + "]" + ", ");
			}
		}
		string = string.substring(0, string.length-2) + "])))";
		console.log(string);
    }
});