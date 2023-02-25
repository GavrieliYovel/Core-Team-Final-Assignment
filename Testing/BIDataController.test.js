const { BIDataController } = require('../controllers/BIDataController');

describe('BIDataController', () => {
    test('getARR should return the correct data', async () => {
        const req = { params: { year: '2022' } };
        const res = { send: jest.fn() };
        await BIDataController.getARR(req, res);
        expect(res.send).toHaveBeenCalled();
    });

    test('getMRR should return the correct data', async () => {
        const req = { params: { year: '2022', month: '01' } };
        const res = { send: jest.fn() };
        await BIDataController.getMRR(req, res);
        expect(res.send).toHaveBeenCalled();
    });

    test('getDRR should return the correct data', async () => {
        const req = { params: { year: '2022', month: '01', day: '01' } };
        const res = { send: jest.fn() };
        await BIDataController.getDRR(req, res);
        expect(res.send).toHaveBeenCalled();
    });

    test('getPaymentsByMonth should return the correct data', async () => {
        const req = { params: { year: '2022', month: '01' } };
        const res = { send: jest.fn() };
        await BIDataController.getPaymentsByMonth(req, res);
        expect(res.send).toHaveBeenCalled();
    });

    test('getMonthlyExperiments should return the correct data', async () => {
        const req = { params: { year: '2022', month: '01' }};
        const res = { send: jest.fn() };
        await BIDataController.getMonthlyExperiments(req, res);
        expect(res.send).toHaveBeenCalled();
    });
});

