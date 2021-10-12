
class CPlayer {
	constructor(pack, isSelf) {
		for (const key of Object.keys(pack)) {
			this[key] = pack[key]
		}
		this.server = { x: pack.x, y: pack.y, xv: pack.xv, yv: pack.yv }
		this.pos = { x: this.x, y: this.y };
		this.isSelf = isSelf;
		this.interpAngle = pack.angle;
		this.chatMessage = '';
		this.chatMessageTimer = 0;
		this.chatMessageTime = 8;
	}
	chat(msg) {
		this.chatMessageTimer = this.chatMessageTime;
		this.chatMessage = msg;
	}
	smooth(delta, isSelf) {


		if (!_interpolate) {
			this.pos.x = this.x;
			this.pos.y = this.y;
			this.interpAngle = this.angle;
			return;
		}

		this.pos.x = lerp(this.pos.x, this.x, delta);
		this.pos.y = lerp(this.pos.y, this.y, delta);

		const dtheta = this.angle - this.interpAngle;
		if (dtheta > Math.PI) {
			this.interpAngle += 2 * Math.PI;
		} else if (dtheta < -Math.PI) {
			this.interpAngle -= 2 * Math.PI;
		}
		this.interpAngle = lerp(this.interpAngle, this.angle, delta);


	}
	Snap(data) {
		for (const key of Object.keys(data)) {
			this[key] = data[key]
		}

		this.server = { x: this.x, angle: this.angle, y: this.y, xv: this.xv, yv: this.yv };
	}
	pack() {
		return {
			x: this.x,
			y: this.y,
			radius: this.radius,
			name: this.name,
		};
	}
}

function lerp(start, end, dt) {
	return (1 - dt) * start + dt * end;
}