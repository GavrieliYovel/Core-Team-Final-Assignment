import { window } from "../public/js/add.experiment";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ exData: { userId: 1 } }),
  })
);

it("bringing the userId", async () => {
  const userId = await window("res");
  expect(userId).toEqual(1);
});

// window.addEventListener("load res", () => {
//   console.log("load res triggered");
// });

// describe("", () => {
//   test("should pass", () => {
//     window.dispatchEvent(new Event("load res"));
//   });
// });
