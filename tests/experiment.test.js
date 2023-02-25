import { loadCard, getExperiment } from "../public/js/experiment";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ card }),
  })
);
it("loading new card", async () => {
  const card = await loadCard();
  expect(card).toEquel(true);
});

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve(res),
  });
  it("getting new experiment", async () => {
    const experiment = await getExperiment();
    expect(experiment).toEquel(true);
  });
});
