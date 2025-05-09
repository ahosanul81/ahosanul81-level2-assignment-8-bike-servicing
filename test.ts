const data = [
  {
    bikeId: "2ca1aefc-1e7d-4377-b359-555c79bd04be",
    description: "piston change",
  },
  {
    bikeId: "4db95b8e-af1b-4384-92c0-4db6a8311b1c",
    description: "Oil change",
  },
  {
    bikeId: "ce0779c5-e1fa-4652-adfd-b9086515ad31",
    description: "break change",
  },
];

const bikeIds = data?.map((item) => {
  return item.bikeId;
});

console.log(bikeIds);
