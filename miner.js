// Idea is to create a miner role which adapts to our tech level

var roleMiner = {
	
//If I'm not full on energy, I need to go mining
	
	run: function(creep) {
		if (creep.carry.energy < creep.carryCapacity){
			var energyNode = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
				if(creep.harvest(energyNode) == ERR_NOT_IN_RANGE){
					creep.moveTo(energyNode);
				}
				if(creep.harvest(energyNode) == OK){
				    creep.room.createConstructionSite(creep, STRUCTURE_CONTAINER);
				}
			
//Once I'm full, if there isn't anybody to haul for me, I had better bring this stuff back home
			
		} else if (_.filter(Game.creeps, (creep) => creep.memory.role == 'hauler') <= 0) {
				
				var spawn = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_SPAWN);
					}
				});
			        if(spawn.length > 0){
				    	if(creep.transfer(spawn[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
						    creep.moveTo(spawn[0]);
				}
			}

//Otherwise I'll drop it so that it can be picked up by a hauler

		} else {
		    creep.drop(RESOURCE_ENERGY);
		}
	}
	
	
};

module.exports = roleMiner;
