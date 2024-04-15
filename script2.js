class Type {
    constructor(_name, _weak, _strong) {
        this.name = _name;
        this.weak = _weak;
        this.strong = _strong;
    }
}
class Pokemon {
    constructor(_name, _type, _hp, _currentHp, _attacks) {
        this.name = _name;
        this.type = _type;
        this.hp = _hp;
        this.currentHp = _currentHp;
        this.attacks = _attacks;
    }
}

class Attack {
    constructor(_name, _type, _power) {
        this.name = _name;
        this.type = _type;
        this.power = _power;
    }

    dealDamage(attackerPokemon,enemyPokemon){
        if(attackerPokemon.currentHp>0 && enemyPokemon.currentHp>0){
            // Calculate damage multiplier
            var effectiveness = 1;
            var result = enemyPokemon.type.weak.includes(this.type);
            if(result == true){
                effectiveness = effectiveness*2;
            }
            result = enemyPokemon.type.strong.includes(this.type);
            if(result == true){
                effectiveness = effectiveness*0.5;
            }
            // Calculate damage to enemy pokemon
            var damage = Math.round(this.power*effectiveness);
            enemyPokemon.currentHp -= damage;
            // Add to combat log
            addToCombatLog(attackerPokemon.name + ' uso ' + this.name + ', ' + enemyPokemon.name + ' sufrio ' + damage + ' puntos de daño.');
        }
    }
}


// Types
const fire = new Type('fire',['water','ground'], ['grass','bug']);
const water = new Type('water', ['electric','grass'], ['fire','ground']);
const electric = new Type('electric', ['ground','grass'], ['water']);
const normal = new Type('normal', ['fight'], null);

// Attacks
const tackle = new Attack('tackle', 'normal', 20);
const scratch = new Attack('scratch', 'normal', 20);
const watergun = new Attack('watergun', 'water', 15);
const ember = new Attack('ember', 'fire', 15);
const thunderpunch = new Attack('thunderpunch', 'electric', 15);

// Pokemons
const charmander = new Pokemon('charmander', fire, 100, 100, [scratch, ember, thunderpunch]);
const squirtle = new Pokemon('squirtle', water, 100, 100, [tackle, watergun]);
const pikachu  = new Pokemon('pikachu', electric, 100, 100, [tackle, thunderpunch]);

const iaPokemon = squirtle;
let userPokemon = charmander;

const userPokemonBench = [charmander, pikachu];

function choosePokemonUser() {
    var selectPokemon = document.getElementById('selectUser').value;
    var selectedPokemon = userPokemonBench.find((pokemon) => pokemon.name == selectPokemon)
    userPokemon = selectedPokemon;
    removeUserPokemonButtons();
    generateUserPokemonButtons();
    return userPokemon;
}

document.getElementById('iChooseYou').addEventListener('click', () => choosePokemonUser());

document.addEventListener('DOMContentLoaded', function() {
    generateUserPokemonButtons();
});

function generateUserPokemonButtons() {
    userPokemon.attacks.forEach(attk => {
        const button = document.createElement('button');
        button.innerHTML = attk.name + ' (' + attk.type + ')';
        button.addEventListener('click', () => turn(attk));
        document.getElementById('attacksPlaceholder').appendChild(button);
    });

}

function removeUserPokemonButtons() {
    let attackButtons = document.getElementById('attacksPlaceholder');
    while (attackButtons.hasChildNodes()) {
        attackButtons.removeChild(attackButtons.firstChild);
      }
}

function generateRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function attackIa() {
    if(iaPokemon.currentHp>0 && userPokemon.currentHp>0){
        var attackNumber = iaPokemon.attacks.length;
        var attackChosen = generateRandomInt(attackNumber);
        iaPokemon.attacks[attackChosen].dealDamage(iaPokemon,userPokemon);
    }
}

function addToCombatLog(message){
    var hpUser = document.getElementById('hpUser');
    hpUser.innerHTML = userPokemon.currentHp;
    var hpIa = document.getElementById('hpIa');
    hpIa.innerHTML = iaPokemon.currentHp;
    var attackLog = document.createElement('p');
    attackLog.textContent = message;
    document.getElementById('combatLog').appendChild(attackLog);
}

function iaWin() {
    userPokemon.currentHp = 0;
    addToCombatLog(userPokemon.name + ' no puede continuar, ' + iaPokemon.name + ' es el ganador!');
}
function userWin() {
    iaPokemon.currentHp = 0;
    addToCombatLog(iaPokemon.name + ' no puede continuar, ' + userPokemon.name + ' es el ganador!');
} 

function turn(userPokemonAttack){
    var beginIa = Math.random();
    var beginUser = Math.random();
    while(beginIa == beginUser) {
        beginIa = Math.random();
    }
    
    if(beginIa>beginUser){
        attackIa();
        if(userPokemon.currentHp <= 0){
            iaWin();
        }
        userPokemonAttack.dealDamage(userPokemon,iaPokemon);
        if(iaPokemon.currentHp <= 0){
            userWin();
        }
    }
    if(beginIa<beginUser){
        userPokemonAttack.dealDamage(userPokemon,iaPokemon);
        if(iaPokemon.currentHp <= 0){
            userWin();
        }
        attackIa();
        if(userPokemon.currentHp <= 0){
            iaWin();
        }
    }
}