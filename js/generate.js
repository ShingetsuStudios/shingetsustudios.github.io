function randomArrayValue(array) {
    var index = Math.floor(Math.random() * (array.length - 1));
    return array[index];
}

function randomArrayValueWithURL(array) {
    var value = randomArrayValue(array);
    var url = getURL(value);
    return [url, value];
}

function randomPercentage(allowZero) {
    return random(allowZero ? 0 : 1, 100);
}

function randomHeight(min, max) {
    var inches = random(min, max);
    var feet = Math.floor(inches / 12);

    return [feet, inches % 12];
}

function randomWeight(min, max) {
    var pounds = random(min, max);
    var kilos = Math.round(pounds / 2.20462);

    return [pounds, kilos];
}

function formatPercentage(percent, lessThanHalf, moreThanHalf) {
    var text = "";

    if(percent < 50) {
        percent = 50 - percent;
        text = lessThanHalf;
    }
    else if(percent > 50) {
        percent -= 50;
        text = moreThanHalf;
    }
    else {
        text = lessThanHalf + "/" + moreThanHalf;
    }

    return [percent, text];
}

function randomColor() {
    return random(0, 256 * 256 * 256 - 1);
}

function setCardContent(name, text, replaceValues) {
    var card = getCardContent(name);

    for(var i = 0; i < replaceValues.length; i++) {
        text = text.replace("{" + i + "}", replaceValues[i]);
    }

    card.innerHTML = text;
}

function setColor(boxDisplay, color) {
    var colorHex = "#" + color.toString(16).toUpperCase();
    boxDisplay.getElementsByClassName("color-box")[0].style.backgroundColor = colorHex;
    boxDisplay.getElementsByClassName("color-text")[0].textContent = colorHex;
}

function createColorBox(index) {
    var boxDisplay = document.createElement("div");
    var colorBox = document.createElement("div");
    var colorText = document.createElement("p");

    boxDisplay.className = "color-box-display";
    colorBox.className = "color-box";
    colorText.className = "color-text";

    colorBox.id = "color-box-" + (index + 1);
    colorText.id = "color-text-" + (index + 1);

    colorBox.addEventListener("click", function() {
        setColor(boxDisplay, randomColor());
    });

    boxDisplay.appendChild(colorBox);
    boxDisplay.appendChild(colorText);

    setColor(boxDisplay, randomColor());

    return boxDisplay;
}

function rerollRace(array) {
    setCardContent("race", '<p>You are a(n) <a href="{0}" target="_blank">{1}</a>.</p>', randomArrayValueWithURL(array));
}

function rerollRaceHumanoid() {
    rerollRace(racesHumanoid);
}

function rerollRaceAnimal() {
    rerollRace(racesAnimal);
}

function rerollGender() {
    setCardContent("gender", "<p>You express yourself as {0}% {1}.</p>", formatPercentage(randomPercentage(false), "masculine", "feminine"));
}

function rerollHeight() {
    setCardContent("height", "<p>You are {0}'{1}\" tall.</p>", randomHeight(minHeightInches, maxHeightInches));
}

function rerollWeight() {
    setCardContent("weight", "<p>You weigh {0} lbs ({1} kg).</p>", randomWeight(minWeightPounds, maxWeightPounds));
}

function rerollStrength() {
    setCardContent("strength", "<p>You are {0}% {1}.</p>", formatPercentage(randomPercentage(false), "weak", "strong"));
}

function rerollHair(style = true, length = true) {
    var card = getCardContent("hair");
    var lengthText = "";
    var styleText = "";
    var lengthRegex = card.innerHTML.match(/(\d+'\d+")/);
    var styleRegex = card.innerHTML.match(/<a.*>[a-zA-Z0-9]+<\/a>/);

    if(length === true || lengthRegex === null) {
        var lengthResult = randomHeight(minHairInches, maxHairInches);
        lengthText = lengthResult[0] + "'" + lengthResult[1] + "\"";
    }
    else {
        lengthText = lengthRegex[0];
    }

    if(style === true || styleRegex === null) {
        var styleResult = randomArrayValueWithURL(hairStyles);
        styleText = '<a href="' + styleResult[0].replace(" ", "+") + ' ">' + styleResult[1] + '</a>';
    }
    else {
        styleText = styleRegex[0];
    }

    setCardContent("hair", "<p>Your hair is {0} long and in a(n) {1} style.</p>", [lengthText, styleText]);
}

function rerollEndowment() {
    setCardContent("endowment", "<p>You are {0}% {1}.</p>", formatPercentage(randomPercentage(false), "unendowed", "well-endowed"));
}

function rerollJob(includeFurry = true) {
    var array = jobs;

    if(includeFurry === true) {
        array = array.concat(jobsFurry);
    }

    setCardContent("job", '<p>You work as a(n) <a href="{0}" target="_blank">{1}</a>.</p>', randomArrayValueWithURL(array));
}

function rerollColorScheme() {
    var colorBoxes = document.getElementsByClassName("color-box-display");

    while(colorBoxes[0]) {
        colorBoxes[0].parentNode.removeChild(colorBoxes[0]);
    }

    var count = document.getElementById("color-box-count").value;

    for(var i = 0; i < count; i++) {
        var box = createColorBox(i);
        document.getElementById("color-box-container").appendChild(box);
    }
}

function generate() {
    rerollRaceHumanoid();
    rerollGender();
    rerollHeight();
    rerollWeight();
    rerollStrength();
    rerollHair();
    rerollEndowment();
    rerollJob();
    rerollColorScheme();
}

function getCardContent(name) {
    return document.getElementById(name + "-card").getElementsByClassName("card-content")[0];
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getURL(search) {
    return "https://www.google.com/search?tbm=isch&q=" + search;
}
