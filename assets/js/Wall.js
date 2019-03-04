class Wall {
    constructor() {
        this.position = [Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)];

    }
    getWallPosition(){
        return this.position;
    }

}