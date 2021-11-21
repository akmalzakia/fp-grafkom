
class Wave {
    constructor(name, startTime = 0) {
        this.name = name;
        this.startTime = startTime;
        this.items = [];
    }

    addObject(object, position, time) {
        const obj = {
            object : object,
            position : position,
            time : time,
        };

        this.items.push(obj);
    }

    isClear() {
        return this.items.length === 0;
    }

}

export { Wave };