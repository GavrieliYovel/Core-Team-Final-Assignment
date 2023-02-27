const { experimentController } = require('../controllers/experimentController');

describe('experimentController', () => {
    // for success calls
    test('Get Experiment by ID', async () => {
        // Arrange
        const expected = {"_id": "63fa918e041de9bef3f8164c"};
        const req = {params: {id: '63fa918e041de9bef3f8164c'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getExperimentById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expected));
    });
    test('Terminate Experiment by ID', async () => {
        // Arrange
        const expected = {"message": "terminated successfully"};
        const req = {params: {id: '63fa918e041de9bef3f8164c'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.terminateExperiment(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
    test('Update Experiment by ID', async () => {
        // Arrange
        const expected = {"name": "Test"};
        const req = {params: {id: '63fa918e041de9bef3f8164c'}, body: {"experiment": {"name": "Test",},  "goals": []}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.updateExperiment(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expected));
    });
    test('Get experiments By Account', async () => {
        // Arrange
        const req = {params: {account: '63b9ff3f28ce812bf358d0b5'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.experimentsByAccount(req, res);

        // Assert
        const response = res.json.mock.calls[0][0];
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
    });
    test('Get AB Test experiments By Account', async () => {
        // Arrange
        const req = {params: {account: '63b9ff3f28ce812bf358d0b5'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.ABTestExperimentsByAccount(req, res);

        // Assert
        const response = res.json.mock.calls[0][0];
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
    });
    test('Get FF experiments By Account', async () => {
        // Arrange
        const req = {params: {account: '63b9ff3f28ce812bf358d0b5'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.FeatureFlagExperimentsByAccount(req, res);

        // Assert
        const response = res.json.mock.calls[0][0];
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
    });
    test('Get Request per variant by experiment ID', async () => {
        // Arrange
        const expected = {
            "testAttributes": {
                "location": [
                    {
                        "value": "IL",
                        "valueReqCount": 0
                    }
                ],
                "device": [
                    {
                        "value": "desktop",
                        "valueReqCount": 0
                    }
                ],
                "browser": [
                    {
                        "value": "Chrome",
                        "valueReqCount": 0
                    }
                ]
            },
            "customAttributes": {
                "Color": [
                    {
                        "value": "Yellow",
                        "valueReqCount": 0
                    },
                    {
                        "value": "Red",
                        "valueReqCount": 0
                    }
                ],
                "Shape": [
                    {
                        "value": "circle",
                        "valueReqCount": 0
                    },
                    {
                        "value": "triangle",
                        "valueReqCount": 0
                    }
                ]
            }
        };

        const req = {params: {id: '63fa6106d7a6d00778090881'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getRequestPerAttributeById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    test('Report Goal', async () => {
        // Arrange
        const expected = "varaintSuccessCount";
        const req = {body: {id: '63fa918e041de9bef3f8164c', gid: '63fa918e256d6bef5r97s32'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.reportGoal(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('Get Variant', async () => {
        // Arrange
        const expected = "varaintSuccessCount";
        const req = {body: {id: '63fa918e041de9bef3f8164c'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getVariant(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('getVariantSuccessById', async () => {
        // Arrange
        const expected = "VariantSuccessCount";
        const req = {body: {id: '63fa918e041de9bef3f8164c'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getVariantSuccessById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
    test('getRequestPerAttributeById', async () => {
        // Arrange
        const expected = "RequestPerAttribute";
        const req = {body: {id: '63fa918e041de9bef3f8164c'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getRequestPerAttributeById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });



    // for failed calls
    test('Catch fail to Get Experiment by ID', async () => {
        // Arrange
        const expected = {message: "Failed to get experiment by ID from Growth API"};
        const req = {params: {id: '42545'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getExperimentById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
    test('Catch fail to Terminate Experiment by ID', async () => {
        // Arrange
        const expected = {message: "Failed to terminate experiment from Growth API"};
        const req = {params: {id: '42545'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.terminateExperiment(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
    test('Catch fail to Update Experiment by ID', async () => {
        // Arrange
        const expected = {message: "Failed to update Experiments from Growth API"};
        const req = {params: {id: '12442'}, body: {"experiment": {"name": "Test",},  "goals": []}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.updateExperiment(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
    test('Catch Fail to Get experiments By Account', async () => {
        // Arrange
        const expected = {message: "Failed to get Experiments by account from Growth API"};
        const req = {params: {account: '13434'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.experimentsByAccount(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
    test('Catch Fail to Get AB Test experiments By Account', async () => {
        // Arrange
        const expected = {message: "Failed to get AB Test Experiments by account from Growth API"};
        const req = {params: {account: '13434'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.ABTestExperimentsByAccount(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
    test('Catch Fail to Get FF experiments By Account', async () => {
        // Arrange
        const expected = {message: "Failed to get Feature Flag Experiments by account from Growth API"};
        const req = {params: {account: '13434'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.FeatureFlagExperimentsByAccount(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
    test('Catch fail to Get Request per variant by experiment ID', async () => {
        // Arrange
        const expected = {message: "Failed to get Request per attribute from Growth API"};
        const req = {params: {id: '1414124'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getRequestPerAttributeById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('Catch fail to Report Goal', async () => {
        // Arrange
        const expected = {message: "Failed to declareGoal from Growth API"};
        const req = {body: {id: 'adad', gid: 'addas'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.reportGoal(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('Catch fail to Get Variant', async () => {
        // Arrange
        const expected = {message: "Failed to get call Experiments from Growth API"};
        const req = {body: {id: 'aadd'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getVariant(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('Catch fail to getVariantSuccessById', async () => {
        // Arrange
        const expected = {message: "Failed to getVariantSuccessById from Growth API"};
        const req = {body: {id: 'adsad'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getVariantSuccessById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('Catch fail to getRequestPerAttributeById', async () => {
        // Arrange
        const expected = "RequestPerAttribute";
        const req = {body: {id: 'asdd'}}; //wrong ID cause fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await experimentController.getRequestPerAttributeById(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });
});
