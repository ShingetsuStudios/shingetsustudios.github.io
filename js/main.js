var minWeightPounds = 1;
var maxWeightPounds = 500;
var minHeightInches = 6;
var maxHeightInches = 180;     // 15 ft
var minHairInches = 1;
var maxHairInches = 180;

document.addEventListener("DOMContentLoaded", function() {
    generate();
}, false);

document.getElementById("race-humanoid").addEventListener("click", function() {
    rerollRaceHumanoid();
}, false);

document.getElementById("race-animal").addEventListener("click", function() {
    rerollRaceAnimal();
}, false);

document.getElementById("gender-reroll").addEventListener("click", function() {
    rerollGender();
}, false);

document.getElementById("height-reroll").addEventListener("click", function() {
    rerollHeight();
}, false);

document.getElementById("weight-reroll").addEventListener("click", function() {
    rerollWeight();
}, false);

document.getElementById("strength-reroll").addEventListener("click", function() {
    rerollStrength();
}, false);

document.getElementById("hair-style").addEventListener("click", function() {
    rerollHair(true, false);
}, false);

document.getElementById("hair-length").addEventListener("click", function() {
    rerollHair(false, true);
}, false);

document.getElementById("endowment-reroll").addEventListener("click", function() {
    rerollEndowment();
}, false);

document.getElementById("job-exclude").addEventListener("click", function() {
    rerollJob(false);
}, false);

document.getElementById("job-include").addEventListener("click", function() {
    rerollJob(true);
}, false);

document.getElementById("color-scheme-reroll").addEventListener("click", function() {
    rerollColorScheme();
}, false);
