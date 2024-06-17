const { create, destroy, index, show, update2 } = require("./controllers");
const { stopLoadingAnimation, startLoadingAnimation } = require("./spinners");
const { readJSONFile, writeJSONFile, makeTable } = require("./helpers");
const weapons = readJSONFile(".", "weapons.json");
const log = console.log;
let updatedWeapons = [];
const inquirer = require("inquirer");
console.log(" ");
console.log("----------- The SciFi Weapon Catalog! -----------");
console.log(" ");
//GOAL get inquirer to do npm run index for us!
//Ask user if they are buying or selling.
//If they are buying, Index, else ask more questions!
//How do we stop questioning when one answer is chosen and continue questioning when another is chosen?

//QUESTIONS--------------------
const starterQ = [
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
      "Editin'",
      "Just show me the catalog please.",
    ],
  },
];

const whichOneQ = [
  {
    type: "input",
    name: "which_one",
    message: "Just type in the ID of the weapon you wanna buy!",
  },
];

const editQ = [
  {
    type: "input",
    name: "editQ",
    message: "Alright! Just type in the ID of the weapon you wanna edit!",
  },
];

const editQ2 = [
  {
    type: "input",
    name: "changeName",
    message: `What would you like to change the name to?`,
  },
  {
    type: "input",
    name: "changeCreator",
    message: `What would you like to change the creator to?`,
  },
  {
    type: "input",
    name: "changeDescription",
    message: `What would you like to change the description to?`,
  },
  {
    type: "input",
    name: "changeBanned",
    message: `What would you like to change the ban status to?`,
  },
  {
    type: "input",
    name: "changePrice",
    message: `What would you like to change the price to?`,
  },
  {
    type: "input",
    name: "changeStock",
    message: `What would you like to change the stock status to?`,
  },
];

//END OF QUESTIONS--------------------

function askMore(query) {
  return inquirer.prompt(query);
}

inquirer
  .prompt(starterQ)
  .then((answers) => {
    // console.log(`"${answers.list_question}", huh? I don't care. Get lost.`);

    //LEAVIN'
    if (answers.buy_or_sell === "Leavin'") {
      console.log("Ok, cya later buddy!");
    }

    //BUYIN'
    if (
      answers.buy_or_sell === "Buyin'" ||
      answers.buy_or_sell === "Just show me the catalog please."
    ) {
      console.log("Alright, here's what we got!");
      askMore(whichOneQ).then((newAns) => {
        const stopLoadingAnimation = startLoadingAnimation();
        setTimeout(() => {
          stopLoadingAnimation();
          show(weapons, newAns.which_one);
        }, 1200);
      });

      const stopLoadingAnimation = startLoadingAnimation();
      setTimeout(() => {
        stopLoadingAnimation();
        index(weapons);
        console.log("Press any button to continue!");
      }, 1200);
    }

    //EDITIN'
    if (answers.buy_or_sell === "Editin'") {
      askMore(editQ).then((answers) => {
        const stopLoadingAnimation = startLoadingAnimation();
        setTimeout(() => {
          stopLoadingAnimation();
          show(weapons, answers.editQ);

          //Second Round of Questions ----------
          askMore(editQ2).then((answers2) => {
            let editTarget = weapons.find(
              (weapon) => weapon.id === answers.editQ
            );
            console.log(weapons, editTarget, answers.editQ, answers2);
            let updatedWeapons = update2(
              weapons,
              answers.editQ,
              answers2.changeName,
              answers2.changeCreator,
              answers2.changeDescription,
              answers2.changeBanned,
              answers2.changePrice,
              answers2.changeStock
            );
            console.log("UPDATED WEAPONS", updatedWeapons);
            writeJSONFile(".", "weapons.json", updatedWeapons);
          });
          //End of second round ----------
        }, 1200);
      });
    }
  })

  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });
