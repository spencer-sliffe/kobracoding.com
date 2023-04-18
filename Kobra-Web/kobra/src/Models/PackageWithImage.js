class PackageWithImage {
    constructor(id = '', medal = '', price = 0, image = null) {
        this.id = id;
        this.medal = medal;
        this.price = price;
        this.image = image;
    }

    static isEqual(lhs, rhs) {
        return lhs.id === rhs.id;
    }
}