let canvas;

let canvasSize = 800;
let labyrinthSize = 20;

let totalSquares = 0;
let remainingSquares = 0;
let elapsedTime = 0;

let grid = [];
let gridSize;

let backtrack = [];
let backtrackCounter;

let drawBorders = true;

let hasStartedTimedConstruction = false;
let hasStartedInstaConstruction = false;
let hasEndedConstruction = false;

let pointer;

let start;
let end;

function setup() {
	SetCanvasSize();
	SetGridSize();
	
	SetScreenData();
}

function draw() {
	background(255);
	
	
	if(hasStartedTimedConstruction) {
		ConstructTimed();
		if(frameCount % 60 == 0)
			elapsedTime++;
		
		SetScreenData();
	}
	
	if(hasStartedInstaConstruction) {
		if(frameCount % 60 == 0)
			elapsedTime++;
	
		SetScreenData();
	}
	
	if(remainingSquares == 0)
		EndConstruction();
	
	// Draw squares
	for(let i = 0; i < labyrinthSize; i++) {
		for(let j = 0; j < labyrinthSize; j++) {
			grid[i][j].show();
		}
	}
	
	if(!drawBorders)
		return;
	
	// Draw borders
	fill(0);
	stroke(0);
	strokeWeight(2);
	// Up Border
	line(1, 1, canvasSize, 1);
	// Down Border
	line(1, canvasSize - 1, canvasSize - 1, canvasSize - 1);
	// Left Border
	line(1, 1, 1, canvasSize);
	// Right Border
	line(canvasSize - 1, 1, canvasSize - 1, canvasSize - 1);
}

function SetScreenData() {
	document.getElementById("remainingSquaresText").innerHTML = "Remaining Squares: " + remainingSquares;
	document.getElementById("elapsedTimeText").innerHTML = "Elapsed Time: " + elapsedTime + "s";
}

function StartTimedConstruction() {
	if(hasEndedConstruction) {
		alert("Construction is already finished!");
		return;
	}
	
	if(start == null) {
		alert("Labyrinth start point not defined!");
		return;
	}
	
	if(end == null) {
		alert("Labyrinth end point not defined!");
		return;
	}
	
	if(hasStartedTimedConstruction || hasStartedInstaConstruction) {
		console.log("Construction already started!");
		return;
	}
	
	remainingSquares--;
	hasStartedTimedConstruction = true;
	hasEndedConstruction = false;
}

async function StartInstaConstruction() {
	if(hasEndedConstruction) {
		alert("Construction is already finished!");
		return;
	}
	
	if(start == null) {
		alert("Labyrinth start point not defined!");
		return;
	}
	
	if(end == null) {
		alert("Labyrinth end point not defined!");
		return;
	}
	
	if(hasStartedTimedConstruction || hasStartedInstaConstruction) {
		console.log("Construction already started!");
		return;
	}
	
	remainingSquares--;
	hasStartedInstaConstruction = true;
	hasEndedConstruction = false;
	
	await ConstructInsta();
}

function EndConstruction() {
	if(hasEndedConstruction)
		return;
	
	hasStartedTimedConstruction = false;
	hasStartedInstaConstruction = false;
	hasEndedConstruction = true;
	
	pointer.isPointer = false;
	
	console.log("Construction ended");
	
	frameRate(60);
}

function ConstructTimed() {
	console.log("Constructing");
	
	let next, x, y;
	
	let dir = int(random(4));
	
	if(backtrack.length != 0 && backtrackCounter >= 4) {
		
		backtrackCounter = 0;
		
		pointer.visited = true;
		
		pointer.isPointer = false;
		pointer = backtrack[backtrack.length - 1];
		pointer.isPointer = true;
		
		backtrack.pop();
		
		return;
	}	
	
	do {
		// Up
		if(dir == 0) {
			x = pointer.grid.x;
			y = pointer.grid.y - 1;
			
			if(y < 0) {
				dir++;
				backtrackCounter++;
				
				continue;
			}
		}
		
		// Right
		if(dir == 1) {
			x = pointer.grid.x + 1;
			y = pointer.grid.y;
			
			if(x >= labyrinthSize) {
				dir++;
				backtrackCounter++;
				
				continue;
			}
		}
		
		// Down
		if(dir == 2) {
			x = pointer.grid.x;
			y = pointer.grid.y + 1;
			
			if(y >= labyrinthSize) {
				dir++;
				backtrackCounter++;
				
				continue;
			}
		}
		
		// Left
		if(dir == 3) {
			x = pointer.grid.x - 1;
			y = pointer.grid.y;
			
			if(x < 0) {
				dir = 0;
				backtrackCounter++;
				
				continue;
			}
		}
		
		if(grid[x][y].visited) {
			
			dir = (dir + 1) % 4;
			backtrackCounter++;
			
		} else {
			
			next = grid[x][y];
			backtrackCounter = 0;
			
		}
	} while(next == null && backtrackCounter < 4);
	
	if(next != null) {
		backtrack.push(pointer);
		
		pointer.isPointer = false;
		pointer.visited = true;
		
		next.isPointer = true;
		next.visited = true;
		
		pointer.removeWall(dir);
		next.removeWall((dir + 2) % 4);
		
		pointer = next;
		
		remainingSquares--;
	}
}

function ConstructInsta() {
	console.log("Constructing");
	
	while(remainingSquares > 0) {
		let next, x, y;
		
		let dir = int(random(4));
		
		if(backtrack.length != 0 && backtrackCounter >= 4) {
			
			backtrackCounter = 0;
			
			pointer.visited = true;
			
			pointer.isPointer = false;
			pointer = backtrack[backtrack.length - 1];
			pointer.isPointer = true;
			
			backtrack.pop();
		}	
		
		do {
			// Up
			if(dir == 0) {
				x = pointer.grid.x;
				y = pointer.grid.y - 1;
				
				if(y < 0) {
					dir++;
					backtrackCounter++;
					
					continue;
				}
			}
			
			// Right
			if(dir == 1) {
				x = pointer.grid.x + 1;
				y = pointer.grid.y;
				
				if(x >= labyrinthSize) {
					dir++;
					backtrackCounter++;
					
					continue;
				}
			}
			
			// Down
			if(dir == 2) {
				x = pointer.grid.x;
				y = pointer.grid.y + 1;
				
				if(y >= labyrinthSize) {
					dir++;
					backtrackCounter++;
					
					continue;
				}
			}
			
			// Left
			if(dir == 3) {
				x = pointer.grid.x - 1;
				y = pointer.grid.y;
				
				if(x < 0) {
					dir = 0;
					backtrackCounter++;
					
					continue;
				}
			}
			
			if(grid[x][y].visited) {
				
				dir = (dir + 1) % 4;
				backtrackCounter++;
				
			} else {
				
				next = grid[x][y];
				backtrackCounter = 0;
				
			}
		} while(next == null && backtrackCounter < 4);
		
		if(next != null) {
			backtrack.push(pointer);
			
			pointer.isPointer = false;
			pointer.visited = true;
			
			next.isPointer = true;
			next.visited = true;
			
			pointer.removeWall(dir);
			next.removeWall((dir + 2) % 4);
			
			pointer = next;
			
			remainingSquares--;
		}
	}
}

function RestartLabyrinth() {
	console.log("Labyrinth Restarted!");
		
	hasStartedTimedConstruction = false;
	hasStartedInstaConstruction = false;
	hasEndedConstruction = false;
	
	backtrack = [];
	backtrackCounter = 0;
	
	remainingSquares = totalSquares;
	elapsedTime = 0;
	
	pointer = null;
	start = null;
	end = null;
	
	for(let i = 0; i < labyrinthSize; i++) {
		for(let j = 0; j < labyrinthSize; j++) {
			grid[i][j].restart();
		}
	}
	
	SetScreenData();
}

function StartProgram() {
	console.log("Program started!");
	loop();
}

function StopProgram() {
	console.log("Program stopped!");
	noLoop();
}

function SetGridSize() {
	labyrinthSize = document.getElementById("gridSizeValue").value;

	grid = [];
	gridSize = canvasSize / labyrinthSize;
	
	for(let i = 0; i < labyrinthSize; i++) {
		grid[i] = [];
	}
	
	totalSquares = 0;
	for(let i = 0; i < labyrinthSize; i++) {
		for(let j = 0; j < labyrinthSize; j++) {
			let x = i * gridSize;
			let y = j * gridSize;
			
			grid[i][j] = new Square(i, j, x, y, gridSize, gridSize);
			totalSquares++;
		}
	}
	
	remainingSquares = totalSquares;
	
	RestartLabyrinth();
}

function SetCanvasSize() {
	canvasSize = document.getElementById("labyrinthSizeValue").value;
	
	if(canvas == null)
		canvas = createCanvas(canvasSize, canvasSize);
	else {	
		resizeCanvas(canvasSize, canvasSize);
		SetGridSize();
	}
	
}

function PickRandomStartEndPlaces() {
	if(hasStartedTimedConstruction) {
		console.log("Can't pick positions, labyrinth is constructing!");
		
		return;
	}
	
	RestartLabyrinth();
	
	start = createVector(int(random(grid.length)), int(random(grid.length)));
	end = createVector(int(random(grid.length)), int(random(grid.length)));
	
	grid[start.x][start.y].isStart = true;
	grid[end.x][end.y].isEnd = true;
	
	pointer = grid[start.x][start.y];
	pointer.isPointer = true;
	
	console.log("Random positions picked!");
}