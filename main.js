/* Use the following builds at the following ranks:

0 -  
Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'miner'});
Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'hauler'});
1
2
3
4
5
6
7
8

*/


var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');

module.exports.loop = function () {

    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
	var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
    }
	
	for(var name in Memory.creeps) {
       if(!Game.creeps[name]) {
			delete Memory.creeps[name];
        }
    }
	
	if(miners.length < 3){
		Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'miner'});
	}
	
	if(haulers.length < miners.length * 2){
		Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'hauler'});
	}
	
}
