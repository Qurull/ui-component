export class Point {
    constructor(public x: number = 0, public y: number = 0) {
        this.x = x
        this.y = y
    }
    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    normalize(): Point {
        let length: number = this.magnitude
        if (length < 0) length = 1
        return new Point(this.x/length, this.y/length)
    }
}