// Classe para histórico.
export default class History {
    constructor(id, action, dateTime, userName, userRole, location, description) {
        this.id = id;
        this.action = action;
        this.dateTime = dateTime;
        this.userName = userName;
        this.userRole = userRole;
        this.location = location;
        this.description = description;
    };
};