class Post {
    constructor(id = '', type = null, likes = 0, timestamp = new Date(), imageURL = null, likingUsers = [], dislikingUsers = [], comments = [], dislikes = 0) {
        this.id = id;
        this.type = type;
        this.likes = likes;
        this.timestamp = timestamp;
        this.imageURL = imageURL;
        this.likingUsers = likingUsers;
        this.dislikingUsers = dislikingUsers;
        this.comments = comments;
        this.dislikes = dislikes;
    }
}

class AdvertisementPost {
    constructor(poster = '', title = '', content = '', category = '') {
        this.poster = poster;
        this.title = title;
        this.content = content;
        this.category = category;
    }
}

class HelpPost {
    constructor(poster = '', question = '', details = '', category = '') {
        this.poster = poster;
        this.question = question;
        this.details = details;
        this.category = category;
    }
}

class NewsPost {
    constructor(poster = '', headline = '', article = '', category = '') {
        this.poster = poster;
        this.headline = headline;
        this.article = article;
        this.category = category;
    }
}

class MarketPost {
    constructor(vendor = '', type = null, price = 0, category = '') {
        this.vendor = vendor;
        this.type = type;
        this.price = price;
        this.category = category;
    }
}

class Hardware {
    constructor(name = '', condition = 'used', description = '') {
        this.name = name;
        this.condition = condition;
        this.description = description;
    }
}

class Software {
    constructor(name = '', description = '') {
        this.name = name;
        this.description = description;
    }
}

class Service {
    constructor(name = '', description = '') {
        this.name = name;
        this.description = description;
    }
}

class Other {
    constructor(title = '', description = '') {
        this.title = title;
        this.description = description;
    }
}
