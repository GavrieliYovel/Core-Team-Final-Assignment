const fs = require('fs');
const Path = require('path');
const { EventEmitter } = require('events');

module.exports = class experimentRepository extends EventEmitter {
    constructor() {
        super();
        this.connectExperimentJSON();
    }

    connectExperimentJSON() {
        const data = require('../mockData/experimentsMock.json');
        this.setData(data);
        this.on('updateData', () => {
            fs.writeFile(Path.join(__dirname, '../mockData/experimentsMock.json'), JSON.stringify(this.data), 'utf8', err => {
                console.log(this.data);
                if (err) throw err;
                console.log('File has been saved!');
            });
        });
        return this;
    }

    setData(data) {
        this.data = data;
    }

    updateExperimentData(payload) {
        this.setData([...this.data, payload]);
        this.emit('updateData');
    }

    getAllExperiment() {
        return this.data;
    }

    getExperimentByAccount(account) {
        const experiments = this.data.filter(item => item.account == account);
        return experiments;
    }

    getExperimentById(id) {
        const experiment = this.data.find(item => item.experimentId == id);
        return experiment;
    }

    getABTestByAccount(account) {
        const experiments = this.data.filter(item => (item.account == account && item.type == "a-b"));
        return experiments;
    }

    getFeatureFlagByAccount(account) {
        const experiments = this.data.filter(item => (item.account == account && item.type == "feature-flag"));
        return experiments;
    }

    createExperiment(payload) {
        let newID = 1;
        if (this.data.length > 0)
            newID = this.data[this.data.length - 1].experimentId + 1;

        const newExperiment = {
            experimentId: newID,
            name: payload.name,
            account: payload.account,
            type: payload.type,
            test_attributes: payload.test_attributes,
            variant_success_count: {
                "A": 0,
                "B": 0,
                "C": 0
            },
            traffic_percentage: payload.traffic_percentage,
            goal_id: payload.goal_id,
            "call_count": 0,
            "status": "active",
            start_time: payload.start_time,
            end_time: payload.end_time,
            variants: payload.variants
        }
        this.updateExperimentData(newExperiment);
        return newID;
    }

    deleteExperiment(experimentId) {
        this.data = this.data.filter(experiment => experiment.experimentId != experimentId);
        this.emit('updateData');
    }

    updateExperiment(payload, id) {
        // let updatedExperiment = this.data.find(item => item.id == id);
        if(payload.hasOwnProperty("test_attributes")) {
            this.data.find(item => item.experimentId == id).test_attributes = payload.test_attributes;
        }
        if(payload.hasOwnProperty("variant_success_count")) {
            this.data.find(item => item.experimentId == id).variant_success_count = payload.variant_success_count;
        }
        if(payload.hasOwnProperty("name")) {
            this.data.find(item => item.experimentId == id).name = payload.name;
        }
        if(payload.hasOwnProperty("name")) {
            this.data.find(item => item.experimentId == id).test_attributes = payload.test_attributes;
        }
        if(payload.hasOwnProperty("type")) {
            this.data.find(item => item.experimentId == id).type = payload.type;
        }
        if(payload.hasOwnProperty("traffic_percentage")) {
            this.data.find(item => item.experimentId == id).traffic_percentage = payload.traffic_percentage;
        }
        if(payload.hasOwnProperty("call_count")) {
            this.data.find(item => item.experimentId == id).call_count = payload.call_count;
        }
        if(payload.hasOwnProperty("status")) {
            this.data.find(item => item.experimentId == id).status = payload.status;
        }
        if(payload.hasOwnProperty("end_time")) {
            this.data.find(item => item.experimentId == id).end_time = payload.end_time;
        }

        // this.data.find(item => item.id == id) = updatedExperiment;
        this.emit('updateData');
        return this.data.find(item => item.experimentId == id)

    }

    getExperimentsByMonth(month, year) {
        const date = new Date(year, month , 1);
        const experiments = this.data.filter(item => new Date(item.end_time)>= date && new Date(item.start_time) <= date);
        return experiments.length;
    }
}



