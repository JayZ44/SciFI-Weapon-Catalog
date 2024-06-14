const { create, destroy, index, show } = require("./src/controllers");
const {
  stopLoadingAnimation,
  startLoadingAnimation,
} = require("./src/spinners");
const { readJSONFile, writeJSONFile, makeTable } = require("./src/helpers");
const weapons = readJSONFile(".", "weapons.json");
const log = console.log;

function run() {
  let writeToFile = false;
  let updatedWeapons = [];
  const action = process.argv[2];
  const name = process.argv[3];
  const creator = process.argv[4];
  const description = process.argv[5];
  const banned = process.argv[6];
  const priceInCents = process.argv[7];
  const inStock = process.argv[8];

  const stopLoadingAnimation = startLoadingAnimation();

  switch (action) {
    case "create":
      setTimeout(() => {
        stopLoadingAnimation();
        updatedWeapons = create(
          weapons,
          name,
          creator,
          description,
          banned,
          priceInCents,
          inStock
        );
      }, 1200);

      writeToFile = true;
      break;
    case "destroy":
      setTimeout(() => {
        stopLoadingAnimation();
        updatedWeapons = destroy(weapons, process.argv[3]);
      }, 1200);

      writeToFile = true;
      log(updatedWeapons);
      break;
    case "index":
      setTimeout(() => {
        stopLoadingAnimation();
        index(weapons);
      }, 1200);
      break;

    case "show":
      setTimeout(() => {
        stopLoadingAnimation();
        show(weapons, process.argv[3]);
      }, 1200);

      break;
    default:
      log("There was an error :(");
  }

  //npm run create "Super Gun" "Red Guy Industries" "Fires condensed supernovae at the target" true 99999999 false
  if (writeToFile) {
    writeJSONFile(".", "weapons.json", updatedWeapons);
  }
}

run();
