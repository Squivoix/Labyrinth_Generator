class Square {
	constructor(i, j, x, y, w, h) {
		this.pos = createVector(x, y);
		this.grid = createVector(i, j);
		
		this.width = w;
		this.height = h;
		
		this.offset = 1;
		
		this.isStart = false;
		this.isPointer = false;
		this.isEnd = false;
		
		this.visited = false;
		
		this.drawWallUp = true;
		this.drawWallDown = true;
		this.drawWallLeft = true;
		this.drawWallRight = true;
	}
	
	show() {
		if(this.isPointer)
			fill(255, 255, 0);
		else if(this.isStart)
			fill(0, 255, 0);
		else if(this.isEnd)
			fill(255, 0, 0);
		else if(this.visited)
			fill(255);
		else 
			fill(150);
		
		noStroke();
		rect(this.pos.x, this.pos.y, this.width - (this.offset * 2), this.height - (this.offset * 2));
		
		fill(0);
		stroke(0);
		strokeWeight(2);
		if(this.drawWallUp)
			line(this.pos.x - this.offset, this.pos.y - this.offset, this.pos.x + this.width - this.offset, this.pos.y - this.offset);
		
		if(this.drawWallDown)
			line(this.pos.x - this.offset, this.pos.y + this.height - this.offset, this.pos.x + this.width - this.offset, this.pos.y + this.height - this.offset);
		
		if(this.drawWallLeft)
			line(this.pos.x - this.offset, this.pos.y - this.offset, this.pos.x - this.offset, this.pos.y + this.height - this.offset);
		
		if(this.drawWallRight)
			line(this.pos.x + this.width - this.offset, this.pos.y - this.offset, this.pos.x + this.width - this.offset, this.pos.y + this.height - this.offset);
	}
	
	removeWall(dir) {
		if(dir == 0) {
			this.drawWallUp = false;
		}
		
		if(dir == 1) {
			this.drawWallRight = false;
		}
		
		if(dir == 2) {
			this.drawWallDown = false;
		}
		
		if(dir == 3) {
			this.drawWallLeft = false;
		}
	}
	
	restart() {
		this.isStart = false;
		this.isPointer = false;
		this.isEnd = false;
		
		this.visited = false;
		
		this.drawWallUp = true;
		this.drawWallDown = true;
		this.drawWallLeft = true;
		this.drawWallRight = true;
	}
}