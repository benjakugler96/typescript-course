"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moveAnimal = (animal) => {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Animal movement speed: ${speed}`);
};
moveAnimal({ type: 'bird', flyingSpeed: 200 });
