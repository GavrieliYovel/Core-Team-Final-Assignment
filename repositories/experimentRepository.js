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
        const experiments = this.data.filter(item => item.account_id == account);
        if(experiments)
            return experiments;
        else
            return [];
    }

    getExperimentById(id) {
        if(this.data.find(item => item.experimentId == id))
            return this.data.find(item => item.experimentId == id);
        else
            return false;
    }

    getABTestByAccount(account) {
        const experiments = this.data.filter(item => (item.account_id == account && item.type == "a-b"));
        if(experiments)
            return experiments;
        else
            return [];

    }

    getFeatureFlagByAccount(account) {
        const experiments = this.data.filter(item => (item.account_id == account && item.type == "f-f"));
        if(experiments)
            return experiments;
        else
            return [];
    }

    createExperiment(payload) {
        let newID = 1;
        if (this.data.length > 0)
            newID = this.data[this.data.length - 1].experimentId + 1;
        let newExperiment;
        if(payload.type ==  'a-b') {
             newExperiment = {
                experimentId: newID,
                name: payload.name,
                account_id: payload.account_id,
                type: payload.type,
                test_attributes: payload.test_attributes,
                variant_success_count: {
                    "A": 0,
                    "B": 0,
                    "C": 0
                },
                traffic_percentage: payload.traffic_percentage,
                goal_id: payload.goal_id,
                call_count: 1,
                status: "active",
                start_time: payload.start_time,
                end_time: payload.end_time,
                variants_ab: payload.variants_ab
            }
        } else {
             newExperiment = {
                experimentId: newID,
                name: payload.name,
                account_id: payload.account_id,
                type: payload.type,
                test_attributes: payload.test_attributes,
                variant_success_count: {
                    "ON": 0,
                    "OFF": 0
                },
                traffic_percentage: payload.traffic_percentage,
                goal_id: payload.goal_id,
                call_count: 1,
                status: "active",
                start_time: payload.start_time,
                end_time: payload.end_time,
                variants_ff: payload.variants_ff
            }
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

    endExperiment(id) {
        if( this.data.find(item => item.experimentId == id)) {
            this.data.find(item => item.experimentId == id).status = "end"
            this.emit('updateData');
        }
    }

    getVariantCountById(id) {
        if(this.data.find(item => item.experimentId == id))
            return  this.data.find(item => item.experimentId == id).variant_success_count;
        else
            return "no such experiment"
    }

    getCallCountById(id) {
        if(this.data.find(item => item.experimentId == id))
            return  this.data.find(item => item.experimentId == id).call_count;
        else
            return "no such experiment"
    }

    updateVariantCount(id, variant) {
        if(this.data.find(item => item.experimentId == id && item.type == "a-b")) {
            if(variant == "A")
                this.data.find(item => item.experimentId == id).variant_success_count.A += 1;
            if(variant == "B")
                this.data.find(item => item.experimentId == id).variant_success_count.B += 1;
            if(variant == "C")
                this.data.find(item => item.experimentId == id).variant_success_count.C += 1;
            this.emit('updateData');
        } else if(this.data.find(item => item.experimentId == id && item.type == "f-f")) {
            if (variant == "ON")
                this.data.find(item => item.experimentId == id).variant_success_count.ON += 1;
            if (variant == "OFF")
                this.data.find(item => item.experimentId == id).variant_success_count.OFF += 1;
            this.emit('updateData');
        } else {
            return "no such experiment"
        }
    }
}



