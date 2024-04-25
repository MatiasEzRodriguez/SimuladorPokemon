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

    dealDamage(attackerPokemon, enemyPokemon, owner) {
        if (attackerPokemon.currentHp > 0 && enemyPokemon.currentHp > 0) {
            // Calculate damage multiplier
            var effectiveness = 1;
            var result = enemyPokemon.type.weak.includes(this.type);
            if (result == true) {
                effectiveness = effectiveness * 2;
            }
            result = enemyPokemon.type.strong.includes(this.type);
            if (result == true) {
                effectiveness = effectiveness * 0.5;
            }
            // Calculate damage to enemy pokemon
            var damage = Math.round(this.power * effectiveness);
            enemyPokemon.currentHp -= damage;
            // Add to combat log
            addToCombatLog(attackerPokemon.name + '(' + owner + ')' + ' uso ' + this.name + ', ' + enemyPokemon.name + ' sufrio ' + damage + ' puntos de daño.');
        }
    }
}


// Types
const fire = new Type('fire', ['water', 'ground'], ['fire', 'grass', 'bug']);
const water = new Type('water', ['electric', 'grass'], ['water', 'fire', 'ground']);
const electric = new Type('electric', ['ground', 'grass'], ['electric', 'water']);
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
const pikachu = new Pokemon('pikachu', electric, 100, 100, [tackle, thunderpunch]);

let iaPokemon = squirtle;
let userPokemon = charmander;

const pokemonBench = [squirtle, charmander, pikachu];

function generatePokemon(basePokemon) {
    var newPokemon = new Pokemon(basePokemon.name, basePokemon.type, basePokemon._hp, basePokemon.currentHp, basePokemon.attacks);
    return newPokemon;
}

function choosePokemonIa() {
    var pokemonNameInMatch = document.getElementById('iaInMatch');
    var pokemonTypeInMatch = document.getElementById('typeIa');
    var selectPokemon = document.getElementById('selectIa').value;
    var selectedPokemon = pokemonBench.find((pokemon) => pokemon.name == selectPokemon)
    iaPokemon = generatePokemon(selectedPokemon);
    pokemonNameInMatch.innerHTML = iaPokemon.name;
    pokemonTypeInMatch.innerHTML = iaPokemon.type.name;
}

function choosePokemonUser() {
    var pokemonNameInMatch = document.getElementById('userInMatch');
    var pokemonTypeInMatch = document.getElementById('typeUser');
    var selectPokemon = document.getElementById('selectUser').value;
    var selectedPokemon = pokemonBench.find((pokemon) => pokemon.name == selectPokemon)
    userPokemon = generatePokemon(selectedPokemon);
    pokemonNameInMatch.innerHTML = userPokemon.name;
    pokemonTypeInMatch.innerHTML = userPokemon.type.name;
    removeUserPokemonButtons();
    generateUserPokemonButtons();
}
function hideSelect() {
    document.getElementById('selectPokemons').style.display = 'none';
    document.getElementById('matchStats').style.display = 'block';
}

function iChooseYouHandler (){
    choosePokemonIa();
    choosePokemonUser();
    hideSelect();
}

document.getElementById('iChooseYou').addEventListener('click', () => iChooseYouHandler());

document.addEventListener('DOMContentLoaded', function () {
    generateIaBench();
    generateUserBench();
});

function generateIaBench() {
    pokemonBench.forEach((pokemon) => {
        var pokemonOption = document.createElement('option');
        pokemonOption.innerHTML = pokemon.name;
        pokemonOption.value = pokemon.name;
        document.getElementById('selectIa').appendChild(pokemonOption);
    });
}

function generateUserBench() {
    pokemonBench.forEach((pokemon) => {
        var pokemonOption = document.createElement('option');
        pokemonOption.innerHTML = pokemon.name;
        pokemonOption.value = pokemon.name;
        document.getElementById('selectUser').appendChild(pokemonOption);
    });
}


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
    if (iaPokemon.currentHp > 0 && userPokemon.currentHp > 0) {
        var attackNumber = iaPokemon.attacks.length;
        var attackChosen = generateRandomInt(attackNumber);
        iaPokemon.attacks[attackChosen].dealDamage(iaPokemon, userPokemon, 'Ia');
    }
}

function addToCombatLog(message) {
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

function turn(userPokemonAttack) {
    var beginIa = Math.random();
    var beginUser = Math.random();
    while (beginIa == beginUser) {
        beginIa = Math.random();
    }

    if (beginIa > beginUser) {
        attackIa();
        if (userPokemon.currentHp <= 0) {
            iaWin();
        }
        userPokemonAttack.dealDamage(userPokemon, iaPokemon, 'user');
        if (iaPokemon.currentHp <= 0) {
            userWin();
        }
    }
    if (beginIa < beginUser) {
        userPokemonAttack.dealDamage(userPokemon, iaPokemon, 'user');
        if (iaPokemon.currentHp <= 0) {
            userWin();
        }
        attackIa();
        if (userPokemon.currentHp <= 0) {
            iaWin();
        }
    }
}