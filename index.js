const { create, destroy, index, show, update } = require("./src/controllers");
const {
  stopLoadingAnimation,
  startLoadingAnimation,
} = require("./src/spinners");
const { readJSONFile, writeJSONFile } = require("./src/helpers");
const weapons = readJSONFile(".", "weapons.json");
const log = console.log;

function run() {
  let updateWeapon = false;
  let writeToFile = false;
  let updatedWeapons = [];
  const action = process.argv[2];
  const name = process.argv[3];
  const creator = process.argv[4];
  const description = process.argv[5];
  const banned = process.argv[6];
  const priceInCents = process.argv[7];
  const inStock = process.argv[8];

  const loadingStopper = startLoadingAnimation();

  const handleAction = () => {
    switch (action) {
      case "create":
        updatedWeapons = create(
          weapons,
          name,
          creator,
          description,
          banned,
          priceInCents,
          inStock
        );
        writeToFile = true;
        break;
      case "destroy":
        updatedWeapons = destroy(weapons, process.argv[3]);
        writeToFile = true;
        break;
      case "index":
        index(weapons);
        // console.log(weapons);
        break;
      case "show":
        show(weapons, process.argv[3]);
        break;
      case "update":
        updatedWeapons = update(weapons, process.argv[3]);
        console.log("UPDATED WEAPONS", updatedWeapons);
        writeToFile = true;
        break;
      default:
        log("Invalid action specified.");
        break;
    }

    // Stop the loading animation
    loadingStopper();

    if (writeToFile) {
      writeJSONFile(".", "weapons.json", updatedWeapons);
      console.log("Data updated successfully.");
      const updatedData = readJSONFile(".", "weapons.json");
      //   console.log("Updated Data:", updatedData);
    }

    if (updateWeapon) {
      //   writeJSONFile();
    }
  };

  setTimeout(handleAction, 1200);
}

run();
