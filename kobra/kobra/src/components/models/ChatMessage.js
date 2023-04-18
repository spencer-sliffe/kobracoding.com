class ChatMessage {
    constructor(sender = '', text = '', timestamp = new Date(), isRead = false, id = '') {
        this.id = id || this.generateUUID();
        this.sender = sender;
        this.text = text;
        this.timestamp = timestamp;
        this.isRead = isRead;
    }

    static isEqual(lhs, rhs) {
        return lhs.id === rhs.id;
    }

    hash() {
        return this.id;
    }

    generateUUID() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
}