"use strict";
/*
Type Casting is when TS is not able to determine a type by itself and we as devs,
tell TS the type.
*/
const input = document.getElementById('input-element');
input.value = 'Hi there!';
// Alternative for React:
const inputAlt = document.getElementById('input-element');
inputAlt.value = 'Hi there Alt!';
// Alternative if we dont know if it can be null;
const inputAlt2 = document.getElementById('input-element');
if (inputAlt2) {
    inputAlt2.value = 'Hi there Alt2';
}
