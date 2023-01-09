const fs = require('fs');
const Path = require('path');
const { EventEmitter } = require('events');
const data = require("../mockData/userMock.json");

module.exports = class userRepository extends EventEmitter {
    constructor() {
        super();
        this.connectUserJSON();
    }

    connectUserJSON() {
        const data = require('../mockData/userMock.json');
        this.setData(data);
        this.on('updateData', () => {
            fs.writeFile(Path.join(__dirname, '../mockData/userMock.json'), JSON.stringify(this.data), 'utf8', err => {
                if (err) throw err;
                console.log('File has been saved!');
            });
        });
        return this;
    }

    setData(data) {
        this.data = data;
    }

    login(email, password) {
        if(this.data.find(user => user.email == email && user.password == password)) {
            return "success"
        } else {
            return "fail"
        }
    }

    getDetailsById(userId) {
        console.log(userId);
        const user = this.data.find(user => user.id == userId);
        if(user) {
            return {
                credits: user.credits,
                type: user.type,
                plan: user.plan
            };
        } else {
            return "no such user"
        }
    }

    decreaseCredit(userId, amount) {
        const user = this.data.find(user => user.id == userId);
        if(user) {
            user.credits -= amount;
            this.emit('updateData');
            return user.credits;
        } else {
            return "no such user"
        }
    }

    getUserIdByEmail(email) {
        return this.data.find(user => user.email == email)
    }

}
