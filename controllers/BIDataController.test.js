import supertest from "supertest";
const { BIDataController } = require("./BIDataController");

describe("BIDataController", () => {
  it("getArr", async () => {
    await expect(BIDataController().rejects.toThrow(""));
  });
  const data = BIDataController();
  console.log("we received data from billing", data);
});

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ card }),
//   })
// );
// it("loading new card", async () => {
//   const card = await loadCard();
//   expect(card).not.tobeNull();
// });

// global.fetch = jest.fn(() => {
//   Promise.resolve({
//     json: () => Promise.resolve(res),
//   });
//   it("getting new experiment", async () => {
//     const experiment = await getExperiment();
//     expect(experiment).not.tobeNull();
//   });
// });
