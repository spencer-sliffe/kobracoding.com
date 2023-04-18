class Account {
    constructor(id = '', email = '', subscription = false, packageData = null, profilePicture = null) {
        this.id = id;
        this.email = email;
        this.subscription = subscription;
        this.package = packageData ? new Package(packageData.id, packageData.name, packageData.price) : null;
        this.profilePicture = profilePicture ? new URL(profilePicture) : null;
    }
}
