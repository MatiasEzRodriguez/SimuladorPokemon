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

    dealDamage(enemyPokemon){
        // Calculate damage multiplier
        // Calculate damage to enemy pokemon
    }
}

class Type {
    constructor(_name, _weak, _strong) {
        this.name = _name;
        this.weak = _weak;
        this.strong = _strong;
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
const userPokemon = charmander;

document.addEventListener('DOMContentLoaded', function() {
    generateUserPokemonButtons();
});

function generateUserPokemonButtons() {
    userPokemon.attacks.forEach(attk => {
        const button = document.createElement('button');
        button.innerHTML = attk.name + ' (' + attk.type + ')';
        button.addEventListener('click', () => turn(attk, iaPokemon));
        document.getElementById('attacksPlaceholder').appendChild(button);
    });

}

function turn(userPokemonAttack){
    userPokemonAttack.dealDamage(iaPokemon);
}

function attackIa() {
    var currentHpIa = document.getElementById('hpIa')
    var currentHpUser = document.getElementById('hpUser')
    if(currentHpIa.innerHTML>0 && currentHpUser.innerHTML>0){
        var attack1 = Math.random();
        var attack2 = Math.random();
        if(attack1>attack2){
           useTackleIa(tackle,userPokemon);
        }
        else {
            useWatergunIa(watergun,userPokemon);
        }
    }
}
function iaWin(pokemonUser,pokemonIa) {
    var currentHp = document.getElementById('hpUser');
    currentHp.innerHTML = 0;
    var attackLog = document.createElement('p');
    attackLog.innerHTML = pokemonUser.name + ' no puede continuar, ' + pokemonIa.name + ' es el ganador!';
    document.getElementById('combatLog').appendChild(attackLog);
}
function userWin(pokemonUser,pokemonIa) {
    var currentHp = document.getElementById('hpIa');
    currentHp.innerHTML = 0;
    var attackLog = document.createElement('p');
    attackLog.innerHTML = pokemonIa.name + ' no puede continuar, ' + pokemonUser.name + ' es el ganador!';
    document.getElementById('combatLog').appendChild(attackLog);
} 

function useTackleIa(tackle,pokemonUser) {
    var currentHp = document.getElementById('hpUser');
    var effectiveness = 1;
    var result = pokemonUser.type.weak.includes(tackle.type);
    if(result == true){
        effectiveness = effectiveness*2;
    }
    result = pokemonUser.type.strong.includes(tackle.type);
    if(result == true){
        effectiveness = effectiveness*0.5;
    }
    var damage = tackle.power*effectiveness;
    var actualHp = currentHp.innerHTML - damage;
    if(actualHp <= 0){
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Squirtle uso: ' + tackle.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
        iaWin(pokemonUser,iaPokemon);
    }
    else {
        currentHp.innerHTML = actualHp;
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Squirtle uso: ' + tackle.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
    }
}
function useWatergunIa(watergun,pokemonUser) {
    var currentHp = document.getElementById('hpUser');
    var effectiveness = 1;
    var result = pokemonUser.type.weak.includes(watergun.type);
    if(result == true){
        effectiveness = effectiveness*2;
    }
    result = pokemonUser.type.strong.includes(watergun.type);
    if(result == true){
        effectiveness = effectiveness*0.5;
    }
    var damage = Math.round(watergun.power*effectiveness);
    var actualHp = currentHp.innerHTML - damage;
    if(actualHp <= 0){
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Squirtle uso: ' + watergun.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
        iaWin(pokemonUser,iaPokemon);
    }
    else {
        currentHp.innerHTML = actualHp;
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Squirtle uso: ' + watergun.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
    }
}
function useScratch(scratch, pokemonIa) {
    var currentHpUser = document.getElementById('hpUser')
    var beginIa = Math.random();
    var beginUser = Math.random();
    if (beginIa>beginUser) { 
        attackIa();
        if(currentHpUser.innerHTML>0){
            playerScratch(scratch,pokemonIa);
        }
    }
    else{
        playerScratch(scratch,pokemonIa);
        attackIa();
    }
}

function playerScratch(scratch, pokemonIa) {
    var currentHp = document.getElementById('hpIa');
    var effectiveness = 1;
    var result = pokemonIa.type.weak.includes(scratch.type);
    if(result == true){
        effectiveness = effectiveness*2;
    }
    result = pokemonIa.type.strong.includes(scratch.type);
    if(result == true){
        effectiveness = effectiveness*0.5;
    }
    var damage = scratch.power*effectiveness;
    var actualHp = currentHp.innerHTML - damage;
    if(actualHp <= 0){
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Charmander uso: ' + scratch.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
        userWin(userPokemon,pokemonIa);
    }
    else {
        currentHp.innerHTML = actualHp;
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Charmander uso: ' + scratch.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
    }
}

function useEmber(ember, pokemonIa) {
    var currentHpUser = document.getElementById('hpUser')
    var beginIa = Math.random();
    var beginUser = Math.random();
    if (beginIa>beginUser) { 
        attackIa();
        if(currentHpUser.innerHTML>0){
            playerEmber(ember,pokemonIa);
        }
    }
    else{
        playerEmber(ember,pokemonIa);
        attackIa();
    }
}

function playerEmber(ember, pokemonIa) {
    var currentHp = document.getElementById('hpIa');
    var effectiveness = 1;
    var result = pokemonIa.type.weak.includes(ember.type);
    if(result == true){
        effectiveness = effectiveness*2;
    }
    result = pokemonIa.type.strong.includes(ember.type);
    if(result == true){
        effectiveness = effectiveness*0.5;
    }
    var damage = Math.round(ember.power*effectiveness);
    var actualHp = currentHp.innerHTML - damage;
    if(actualHp <= 0){
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Charmander uso: ' + ember.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
        userWin(userPokemon,pokemonIa);
    }
    else {
        currentHp.innerHTML = actualHp;
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Charmander uso: ' + ember.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
    }
}

function useThunderpunch(thunderpunch, pokemonIa) {
    var currentHpUser = document.getElementById('hpUser')
    var beginIa = Math.random();
    var beginUser = Math.random();
    if (beginIa>beginUser) { 
        attackIa();
        if(currentHpUser.innerHTML>0){
            playerThunderpunch(thunderpunch,pokemonIa);
        }
    }
    else{
        playerThunderpunch(thunderpunch,pokemonIa);
        attackIa();
    }
}

function playerThunderpunch(thunderpunch,pokemonIa){
    var currentHp = document.getElementById('hpIa');
    var effectiveness = 1;
    var result = pokemonIa.type.weak.includes(thunderpunch.type);
    if(result == true){
        effectiveness = effectiveness*2;
    }
    result = pokemonIa.type.strong.includes(thunderpunch.type);
    if(result == true){
        effectiveness = effectiveness*0.5;
    }
    var damage = thunderpunch.power*effectiveness;
    var actualHp = currentHp.innerHTML - damage;
    if(actualHp <= 0){
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Charmander uso: ' + thunderpunch.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
        userWin(userPokemon,pokemonIa);
    }
    else {
        currentHp.innerHTML = actualHp;
        var attackLog = document.createElement('p');
        attackLog.innerHTML = 'Charmander uso: ' + thunderpunch.name + ' ,causo ' + damage + ' de daño!';
        document.getElementById('combatLog').appendChild(attackLog);
    }
}


// document.getElementById('scratch').addEventListener('click', () => useScratch(scratch,pokemonIa));
// document.getElementById('ember').addEventListener('click', () => useEmber(ember,pokemonIa));
// document.getElementById('thunderpunch').addEventListener('click', () => useThunderpunch(thunderpunch,pokemonIa));

