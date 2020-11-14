"use strict";
const add = (a, b) => {
    // Type check first
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
};
