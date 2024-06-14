const { nanoid } = require("nanoid");
const { makeTable } = require("./helpers");
const Table = require("cli-table3");

// CREATE
function create(
  weapons,
  itemName = "Unknown",
  itemCreator = "Unknown",
  itemDescription = "None provided",
  bannedStatus = "false",
  itemPrice = "A lot probably",
  inStockStatus = "false"
) {
  const weapon = {
    id: nanoid(4),
    name: itemName,
    creator: itemCreator,
    description: itemDescription,
    banned: bannedStatus,
    priceInCents: itemPrice,
    inStock: inStockStatus,
  };

  weapons.push(weapon);
  console.log(`Your new weapon, "${weapon.name}", was created successfully!`);
  return weapons;
}

//DELETE
function destroy(weapons, id) {
  if (!weapons) {
    return console.log("There are no weapons to remove!");
  }
  if (!id) {
    return console.log("Please specify an ID!");
  }

  const target = weapons.find((weapon) => weapon.id === id);
  if (target) {
    weapons.splice(weapons.indexOf(target), 1);
    console.log(`${target.name} has been removed!`);
    return weapons;
  } else {
    return console.log(`The weapon with the id of ${id} does not exist!`);
  }
}

//SHOW
function show(weapons, id) {
  if (!weapons) {
    return console.log("There are no weapons to display!");
  }
  if (!id) {
    return console.log("Please specify an ID!");
  }

  const target = weapons.find((weapon) => weapon.id === id);
  if (target) {
    let table = new Table({
      // head: [
      //   "id",
      //   "Name",
      //   "Creator",
      //   "Description",
      //   "Banned Status",
      //   "Price in Dollars",
      //   "Price in Cents",
      //   "In Stock",
      // ],
      colWidths: [30, 30, 30, 30, 30, 30, 30, 30],
      wordWrap: true,
    });

    table.push(
      { ID: target.id },
      { Name: target.name },
      { Creator: target.creator },
      { Description: target.description },
      { "Banned Status": target.banned },
      { "Price In Dollars": target.priceInCents / 100 },
      { "Price In Cents": target.priceInCents },
      { "In Stock Status": target.inStock }
    );

    console.table(table.toString());
  } else {
    return console.log(`The weapon with the id of ${id} does not exist!`);
  }
}

//INDEX
function index(weapons) {
  if (!weapons) {
    return console.log("There are no weapons to show!");
  }

  let table = new Table({
    head: ["id", "Name", "Creator", "In Stock"],
  });

  weapons.forEach((weapon) => {
    table.push([weapon.id, weapon.name, weapon.creator, weapon.inStock]);
  });
  console.table(table.toString());
}

module.exports = {
  create,
  destroy,
  index,
  show,
};
