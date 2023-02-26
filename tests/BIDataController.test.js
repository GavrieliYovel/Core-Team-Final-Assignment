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

    // test('getMRR', async () => {
    //     // Arrange
    //     const expected = "25000";
    //     const req = {params: {year: '2022', month: '01'}};
    //     const res = {status: jest.fn(), json: jest.fn()};
    //
    //     // Act
    //     await BIDataController.getMRR(req, res);
    //
    //     // Assert
    //     expect(res.json).toHaveBeenCalledWith(expected);
    // });

    // test('getDRR', async () => {
    //     // Arrange
    //     const expected = "25000";
    //     const req = {params: {year: '2022', month: '01', day: '01'}};
    //     const res = {status: jest.fn(), json: jest.fn()};
    //
    //     // Act
    //     await BIDataController.getDRR(req, res);
    //
    //     // Assert
    //     expect(res.json).toHaveBeenCalledWith(expected);
    // });

    // test('getPaymentsByMonth', async () => {
    //     // Arrange
    //     const expected = {"fail": 5, "success": 10};
    //     const req = {params: {year: '2022', month: '01'}};
    //     const res = {status: jest.fn(), json: jest.fn()};
    //
    //     // Act
    //     await BIDataController.getPaymentsByMonth(req, res);
    //
    //     // Assert
    //     expect(res.json).toHaveBeenCalledWith(expected);
    // });

    // test('getMonthlyExperiments', async () => {
    //     // Arrange
    //     const expected = "0";
    //     const req = {params: {year: '2022', month: '01'}};
    //     const res = {status: jest.fn(), json: jest.fn()};
    //
    //     // Act
    //     await BIDataController.getMonthlyExperiments(req, res);
    //
    //     // Assert
    //     expect(res.json).toHaveBeenCalledWith(expected);
    // });


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

});
