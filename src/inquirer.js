const { create, destroy, index, show } = require("./controllers");
const { stopLoadingAnimation, startLoadingAnimation } = require("./spinners");
const { readJSONFile, writeJSONFile, makeTable } = require("./helpers");
const weapons = readJSONFile(".", "weapons.json");
const log = console.log;

const inquirer = require("inquirer");
console.log(" ");
console.log("----------- The SciFi Weapon Catalog! -----------");
console.log(" ");
//GOAL get inquirer to do npm run index for us!
//Ask user if they are buying or selling.
//If they are buying, Index, else ask more questions!
//How do we stop questioning when one answer is chosen and continue questioning when another is chosen?

const questions1 = [
  {
    type: "list",
    name: "list_question",
    message: "Welcome to the SciFi Weapon Catalog! How was your day?",
    choices: ["Awesome!", "Great!", "Splendid!", "Fantastic!"],
  },
  {
    type: "list",
    name: "buy_or_sell",
    message: "Thats very nice! Happy for you! You buyin' or sellin'?",
    choices: [
      "Buyin'",
      "Sellin'",
      "Leavin'",
      "Just show me the catalog please.",
    ],
  },
];

const questions2 = [
  {
    type: "input",
    name: "which_one",
    message: "Just type in the ID of the weapon you wanna buy!",
  },
];

function askMore(query) {
  return inquirer.prompt(query);
}

inquirer
  .prompt(questions1)
  .then((answers) => {
    // console.log(`"${answers.list_question}", huh? I don't care. Get lost.`);
    if (answers.buy_or_sell === "Leavin'") {
      console.log("Ok, cya later buddy!");
    }

    if (
      answers.buy_or_sell === "Buyin'" ||
      answers.buy_or_sell === "Just show me the catalog please."
    ) {
      console.log("Alright, here's what we got!");
      const stopLoadingAnimation = startLoadingAnimation();
      setTimeout(() => {
        stopLoadingAnimation();
        index(weapons);
      }, 1200);
    }
  })

  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });
// .then(askMore(questions2));
