const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

inquirer
  .prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
  })
  // destructure name from the prompt object
  .then(({ name }) => {
    this.player = new Player(name);

    // test the object creation
    this.startNewBattle()
  });
};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }
     console.log('Your stats are as follows:');
    console.table(this.player.getStats());
  };

  Game.prototype.battle = function() {
    if (action === 'Use potion') {
        if (!this.player.getInventory()) {
          console.log("You don't have any potions!");
          return;
        }
      
        inquirer
        .prompt({
          type: 'list',
          message: 'Which potion would you like to use?',
          name: 'action',
          choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
        })
        .then(({ action }) => {
          const potionDetails = action.split(': ');
      
          this.player.usePotion(potionDetails[0] - 1);
          console.log(`You used a ${potionDetails[1]} potion.`);
        });
      }
    }
module.exports = Game;