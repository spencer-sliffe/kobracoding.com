class Chat {
    constructor(id = '', participants = [], lastMessage = null) {
        this.id = id;
        this.participants = participants;
        this.lastMessage = lastMessage;
    }

    otherParticipantEmail(currentUserEmail) {
        return this.participants.filter(email => email !== currentUserEmail)[0] || '';
    }
}