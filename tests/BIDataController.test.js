const { BIDataController } = require('../controllers/BIDataController');

describe('BIDataController', () => {
    // for success calls
    test('getARR', async () => {
        // Arrange
        const expected = 755;
        const req = {params: {year: '2022'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getARR(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('getMRR', async () => {
        // Arrange
        const expected = 4340;
        const req = {params: {year: '2023', month: '1'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getMRR(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('getDRR', async () => {
        // Arrange
        const expected = 10;
        const req = {params: {year: '2023', month: '1', day: '3'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getDRR(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('getPaymentsByMonth', async () => {
        // Arrange
        // const expected = {"Succeeded payments": 88, "Failed payments": 0};
        const expected = { "Succeeded_payments": 88, "Failed_payments": 0 };
        const req = {params: {year: '2023', month: '1'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getPaymentsByMonth(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('getMonthlyExperiments', async () => {
        // Arrange
        const expected = {"sum": 2};
        const req = {params: {year: '2023', month: '2'}};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getMonthlyExperiments(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('getAllRequestsPerAttribute', async () => {
        // Arrange
        const expected = {
            "attribute_distribution": {
                "devices": [
                    {
                        "count": 53,
                        "device": "desktop"
                    },
                    {
                        "count": 52,
                        "device": "mobile"
                    }
                ],
                "locations": [
                    {
                        "count": 53,
                        "location": "IL"
                    }
                ]
            }
        };
        const req = {};
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getAllRequestsPerAttribute(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    // for failed calls

    test('catch fail to getARR', async () => {
        // Arrange
        const expected = {message: "Failed to get ARR from Billing"};
        const req = {params: {year: 'adas'}}; // insert chars to fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getARR(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('catch fail to getMRR', async () => {
        // Arrange
        const expected = {message: "Failed to get MRR from Billing"};
        const req = {params: {year: 'asd', month: 'ad'}}; // insert chars to fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getMRR(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('catch fail to getDRR', async () => {
        // Arrange
        const expected = {message: "Failed to get DRR from Billing"};
        const req = {params: {year: 'asd', month: 'asd', day: 'asd'}}; // insert chars to fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getDRR(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('catch fail to getPaymentsByMonth', async () => {
        // Arrange
        const expected = {message: "Failed to get Monthly Payments from Billing"};
        const req = {params: {year: 'asd', month: 'asd'}}; // insert chars to fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getPaymentsByMonth(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('catch fail to getMonthlyExperiments', async () => {
        // Arrange
        const expected = {message: "Failed to get Monthly Experiments from Growth"};
        const req = {params: {year: 'ads', month: 'asd'}}; // insert chars to fail
        const res = {status: jest.fn(), json: jest.fn()};

        // Act
        await BIDataController.getMonthlyExperiments(req, res);

        // Assert
        expect(res.json).toHaveBeenCalledWith(expected);
    });

});
