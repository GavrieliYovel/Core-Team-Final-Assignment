const { loggerController } = require('../controllers/loggerController');

describe('loggerController', () => {

    test('Get logs', async () => {
        // Arrange
        const req = {};
        const res = {send: jest.fn()};

        // Act
        await loggerController.getAllLogs(req, res);

        // Assert
        const response = res.send.mock.calls[0][0];
        expect(Array.isArray(response)).toBe(true);
        expect(response.length).toBeGreaterThan(0);
    });
});
