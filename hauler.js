 var roleHauler = {
	
	run: function(creep) {
	    
	    var haulPriority = 1;
	    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

//Toggle between refill mode and haul mode
	    
		if (creep.carry.energy == 0) {
			creep.memory.hauling = false;
			//creep.say('⛉Refilling⛉')
		}
		
		if (creep.carry.energy == creep.carryCapacity) {
			creep.memory.hauling = true;
			//creep.say('⛊Hauling⛊')
		}
		
//Set conditions to satisfy different haul priority levels

        if (creep.memory.hauling == false) {
            haulPriority = 0;
        }
        
        if (creep.memory.hauling && creep.room.energyAvailable > creep.room.energyCapacityAvailable) {
            haulPriority = 1;
        }
        
        if (creep.memory.hauling && constructionSites.length > 0){
            haulPriority = 2;

        }
        
//        else {
 //           haulPriority = 3;
 //
 
//Set behaviour for each haul priority level
//console.log(haulPriority);
switch (haulPriority){
	
	case 0:
		var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
		    if (droppedEnergy) {
		    	if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
			        creep.moveTo(droppedEnergy);
		    	}
			}

		var energyContainers = _.filter(Game.structures, function(structure) {
			if (structure == STRUCTURE_CONTAINER && structure.store > creep.carryCapacity){
			    console.log('broken containers');
			}
		});
				if (energyContainers.length > 0) {
					if (creep.withdraw(energyContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(energyContainers[0]);
					}
				}
	break;
	
	case 1:
	    var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
	        if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	            creep.moveTo(spawn);
	        }
	break;
	
	case 2:
	    var buildTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
	    if (creep.build(buildTarget) == ERR_NOT_IN_RANGE){
	        creep.moveTo(buildTarget);
	    }
	break;
			
	case 3:
	    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
	        creep.moveTo(creep.room.controller);
	    }
	break;
	
	default: 
	console.log('unexpected value for haulPriority');
	break;
}
			

	}
};

module.exports = roleHauler;






