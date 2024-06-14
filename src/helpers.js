const { readFileSync, writeFileSync } = require("fs");
const Table = require("cli-table3");

function readJSONFile(path, fileName) {
  const collection = readFileSync(`${path}/${fileName}`, "utf8");
  return collection ? JSON.parse(collection) : [];
}

function writeJSONFile(path, fileName, data) {
  data = JSON.stringify(data, 0, 2);
  return writeFileSync(`${path}/${fileName}`, data, { encoding: "utf-8" });
}

function makeTable(weapon, table) {
  table.push([weapon.id, weapon.name]);

  console.log(table.toString());
}
module.exports = {
  readJSONFile,
  writeJSONFile,
  makeTable,
};
