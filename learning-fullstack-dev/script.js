// Player stats and inventory
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;

// Monster stats
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealth = document.querySelector("#monsterHealth");

// Text
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

// Buttons
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

// Data
const monsters = [
  {
    name: "Slime",
    health: 15,
    damage: 10,
    xp: 2,
    gold: 13,
    death:
      'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "Fanged Beast",
    health: 60,
    damage: 10,
    xp: 8,
    gold: 13,
    death:
      'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "Dragon",
    health: 300,
    damage: 10,
    xp: 20,
    gold: 100,
    death:
      'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
];

const inventory = ["stick"];

const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];

const locations = [
  {
    name: "Town",
    description:
      "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.",
    buttons: ["Go to store", "Go to cave", "Fight dragon"],
    buttonFuncs: [goToStore, goToCave, fightDragon],
  },
  {
    name: "Store",
    description: "You enter the store, what do you buy?",
    buttons: ["Buy 10 heatlh (10 gold)", "Buy weapon (30 gold)", "Leave shop"],
    buttonFuncs: [buyHealth, buyWeapon, sellWeapon, goToTown],
  },
  {
    name: "Cave",
    description: "You enter the cave, you see some monsters. What do you do?",
    buttons: ["Fight slime", "Fight fanged beast", "Leave cave"],
    buttonFuncs: [fightSlime, fightFangedBeast, goToTown],
  },
  {
    name: "Dungeon",
    description: "You are fighting a monster. What do you do?",
    buttons: ["Attack", "Dodge", "Run"],
    buttonFuncs: [attack, dodge, goToTown],
  },
  {
    name: "Dragon",
    description: "You enter the dragon's lair, what do you do?",
    buttons: ["Fight dragon", "Leave lair"],
    buttonFuncs: [fightDragon, goToTown],
  },
  {
    name: "Easteregg",
    description:
      "You found the easteregg! Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    buttons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
];

// Start game
goToTown();

// Functions

function update(location) {
  buttons = locations[location].buttons;
  buttonFuncs = locations[location].buttonFuncs;
  lengthOfButtons = locations[location].buttons.length;
  description = locations[location].description;

  // If empty
  if (lengthOfButtons == 0) {
    return;
  }

  // If fighting
  if (fighting != -1) {
    monsterStats.style.display = "none";
  }

  text.innerHTML = description;
  buttons.forEach((button, index) => {
    document.querySelector(`#button${index + 1}`).innerHTML = button;
  });

  buttonFuncs.forEach((buttonFunc, index) => {
    if (lengthOfButtons < 3) {
      document.querySelector(`#button${3}`).style.display = "none";
      document.querySelector(`#button${index + 1}`).onclick = buttonFunc;
    } else {
      document.querySelector(`#button${3}`).style.display = "inline-block";
      document.querySelector(`#button${index + 1}`).onclick = buttonFunc;
    }
  });
}

function goToTown() {
  update(0);
}

function goToStore() {
  update(1);
}

function goToCave() {
  update(2);
}

function dragonDen() {
  update(4);
}

function fightSlime() {
  fighting = 0;
  goFight(fighting);
}

function fightFangedBeast() {
  fighting = 1;
  goFight(fighting);
}

function fightDragon() {
  fighting = 2;
  goFight(fighting);
}

function goFight(monster) {
  update(3);
  monsterHealth = monsters[monster].health;
  monsterStats.style.display = "block";
  monsterName.innerHTML = monsters[monster].name;
  monsterHealth.innerHTML = monsterHealth;
}

function attack() {
    text.innerHTML = `The ${monsters[fighting].name} attacks...`;
    text.innerHTML += `You attack it with your ${weapons[currentWeapon].name}.`
    monsterHealth -= weapons[-1].power;
}

function dodge(monster) {}

function buyHealth() {
  // If they don't have enough gold
  if (gold < 10) {
    text.innerHTML = "You don't have enough gold.";
    return;
  }

  health += 10;
  gold -= 10;
  healthText.innerHTML = health;
  goldText.innerHTML = gold;
  text.innerHTML = "You bought 10 health for 10 gold.";
}

function buyWeapon() {
  // If they don't have enough gold
  if (gold < 30) {
    text.innerHTML = "You don't have enough gold.";
    return;
  }
  // if they have full health
  inventory.push("Dagger");
  gold -= 30;
  goldText.innerHTML = gold;
  text.innerHTML = `You now have a dagger. In your inventory you have: ${inventory.join(", ")}`;
}

function sellWeapon() {}

function leaveShop() {
  text.innerHTML = "You left the shop.";
  goToTown();
}
