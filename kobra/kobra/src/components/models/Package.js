class Package {
    constructor(id = '', name = '', price = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    static isEqual(lhs, rhs) {
        return lhs.id === rhs.id;
    }
}