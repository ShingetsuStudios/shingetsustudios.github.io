
var filtKey = { "role": "", "class": "" }
var role = ['Tank', "Dps", "Healing", "Support", "Stealth", "Social", "Crafting", "Utility", "Debuff", "Control"]

role = role.sort(function (a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
})

var template =
{
    "name": "Name",
    "firstName": "First Name",
    "id": 0,
    "icon": "icons/n.png",
    "art": "art/n.png",
    "backstory": {
        "Quote": ["---", ""],
        "Physical Description": [""],
        "Personality": [""],
        "Homes": [""],
        "General Abilities": ["<b></b> - "],
        "Bio": [""],
        "Important People": [
            { "": [""] }
        ],
        "Goals": [
            {
                "<u>Minor</u>": [],
                "<u>Major</u>": []
            }
        ]
    },
    "stats": {
        "birthday": "",
        "age": 0,
        "height": "",
        "weight": 0,
        "skin": "",
        "eye": "",
        "hair": ""
    },
    "class": [
        "Class"
    ],
    "subclass": [
        "SClass"
    ],
    "background": "",
    "race": "race",
    "abilities": "",
    "role": ["Dps", "Social"],
    "orientation": "",
    "pronouns": "He/Him",
    "alignment": "Neutral"
}
var job = ['Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Alchemist", "Captain", "Craftsman", "Gunslinger", "Investigator", "Martyr", "Necromancer", "Warden", "Warmage", "Witch", "Channeler", "Binder", "Gadgeteer", "Summoner"]
$(document).ready(function () {

    renderListView()

    $('#newCharacter').on('click', function () {
        renderBuilder("new")
    })
    $('#copyCode').on('click', function () {
        copyToClipboard(character)
    })
    $('#addCharacter').on('click', function () {
        parseToJson()
    })
    $('.main').on('click', '#ImpPeop', function () {
        //console.log("true")
        $('#importPeople').append('<input type="text" class="ImpPerson value=""> <textarea class="ImpPersonDesc"></textarea>')
    })

})

function renderProfile(n) {
    $(".main").empty()
    //var toAppend = "<h2>" + character[n].name + "</h2><img src='" + character[n].art + "' style='width:auto; height:300px;'>"
    toAppend = `<div ><table id= "characterIcon" style="float: right; width: 22em; border-spacing: 2px; text-align: center; position: fixed; right: 0px;">
    <tbody><tr><th colspan="2">
    <h2>` + character[n].name + `</h2></th></tr>
    <tr><td colspan="2"><img id= "`+ character[n].id + `img" class="tokenImg" src="` + character[n].icon + `" width= "300px;"></td></tr>
    <tr><td colspan="2">Class: `+ character[n].class.join(', ') + `</td></tr>
    <tr><td colspan="2">Subclass: `+ character[n].subclass.join(', ') + `</td></tr>
    <tr><td colspan="2">Background: `+ character[n].background + `</td></tr>
    <tr><td colspan="2">Race: `+ character[n].race + `</td></tr>
    <tr><td colspan="2">Alignment: `+ character[n].alignment + `</td></tr>
    <tr><td colspan="2">Age: `+ character[n].stats.age + `</td></tr>
    <tr><td colspan="2">Height/Weight: `+ character[n].stats.height + `/ ` + character[n].stats.weight + `lbs</td></tr>
    <tr><td colspan="2">Pronouns: `+ character[n].pronouns + `</td></tr>
    <tr><td colspan="2">Orientation: `+ character[n].orientation + `</td></tr>
    </tbody></table>
    </div><div class='mid'>
    </div>`
    //</div><div class = "mid"></div>`
    $(".main").append(toAppend)
    $('.mid').css({ 'margin-right': $('#characterIcon').width() })
    navbar = "<div id='navBar'>"
    bAppend = ""
    for (var key in character[n].backstory) {
        if (key === "Important People" || key === "Goals") {
            bAppend += "<hr><h3 id='" + key.replace(' ', '-') + "'><b>" + key + "</b></h3>"
            for (i = 0; i < character[n].backstory[key].length; i++) {

                for (var keys in character[n].backstory[key][i]) {
                    bAppend += "<p><b>" + keys + "</b>: " + character[n].backstory[key][i][keys].join('</p><p>') + '</p>'//<br>'
                }
            }
        } else if (key === "Quote") {

            bAppend += "<h3 style = 'display:none;' id='" + key.replace(' ', '-') + "'><b>" + key + "</b></h3>"
            bAppend += '<i>"' + character[n].backstory[key].slice(0, character[n].backstory[key].length - 1) + '"</i><br>'
            bAppend += character[n].backstory[key].slice(character[n].backstory[key].length - 1)
            //bAppend += "<p><i>" + character[n].backstory[key].join('</p><p>') + '</p>'


        } else {

            bAppend += "<hr><h3 id='" + key.replace(' ', '-') + "'><b>" + key + "</b></h3><p>" + character[n].backstory[key].join('</p><p>') + '</p>'
        }
        if (key === "Quote") {

        } else {
            navbar += "<a href='#" + key.replace(' ', '-') + "'>" + key + "</a><br>"
        }
    }
    bAppend += `<img src="` + character[n].art + `">`
    $('.mid').append(navbar + "</div><br>" + bAppend)
}

function renderBuilder(n) {
    if (typeof (n) === "number") {
        //console.log(character[n].name)
    } else if (n === "new") {
        character.push(
            {
                "name": "New",
                "firstName": "New",
                "id": character.length,
                "icon": "icons/" + character.length + ".png",
                "art": "art/" + character.length + ".png",
                "class": [
                    ""
                ],
                "subclass": [
                    ""
                ],
                "background": "",
                "race": "",
                "role": [],
                "orientation": "",
                "pronouns": "",
                "alignment": "",
                "stats": {
                    "birthday": "",
                    "age": 0,
                    "height": "",
                    "weight": 0,
                    "skin": "",
                    "eye": "",
                    "hair": ""
                },
                "backstory": {
                    "Quote": ["---", ""],
                    "Physical Description": [""],
                    "Personality": [""],
                    "Homes": [""],
                    "General Abilities": ["<b></b> - "],
                    "Bio": [""],
                    "Important People": [
                        { "": [""] }
                    ],
                    "Goals": [
                        {
                            "<u>Minor</u>": [],
                            "<u>Major</u>": []
                        }
                    ]
                }

            }
        )
        n = character.length
        renderListView()
    }

    $('.main').empty()
    $('.main').css({ "margin-left": $('#sidebar').width() })
    $('.main').append("<table id='gen'>")
    for (var key in character[n]) {
        buildBuilder(key, n)
    }
    $('.main').append('</table>')
}

function buildBuilder(key, n) {
    if (key === "id" || key === "icon" || key === "art") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <span id=' + key + '>' + character[n][key] + '<br></tr>')
    } else if (typeof (character[n][key]) === "number") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="number" id=Gen' + key + ' value="' + character[n][key] + '"></tr>')
    } else if (typeof (character[n][key]) === "string") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="string" class = "input" id=Gen' + key + ' value="' + character[n][key] + '"></tr>')
    } else if (character[n][key].constructor.name == "Array") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="string" class = "input" id=Gen' + key + ' value="' + character[n][key].join(', ') + '"></tr>')
    } else if (typeof (character[n][key]) === "object") {
        if (key === "backstory") {
            $('#gen').append('<tr><td><br> </td><td>Backstory</td></tr>')
            //$('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> </tr>')

            $('#gen').append('<tr><td><b>Quote:</b></td><td><input type="text" id="GenQuote"  class = "input" value="' + character[n][key].Quote[0] + '"><br><input type="text" id="GenQuoter" value="' + character[n][key].Quote[1] + '"></tr>')

            $('#gen').append('<tr><td><b>Physical Description:</b></td><td><textarea id="GenDesc">' + character[n][key]["Physical Description"].join('\n') + '</textarea> </tr>')

            $('#gen').append('<tr><td><b>Personality:</b></td><td><textarea id="GenPers">' + character[n][key].Personality.join('\n') + '</textarea> </tr>')

            $('#gen').append('<tr><td><b>Homes:</b></td><td><textarea id="GenHomes">' + character[n][key].Homes.join('\n') + '</textarea> </tr>')

            $('#gen').append('<tr><td><b>General Abilities:</b></td><td><textarea id="GenAbil">' + character[n][key]["General Abilities"].join('\n') + '</textarea> </tr>')

            $('#gen').append('<tr><td><b>Bio:</b></td><td><textarea id="GenBio">' + character[n][key].Bio.join('\n') + '</textarea> </tr>')

            $('#gen').append('<tr><td><b>Important People:</b></td><td><button id="ImpPeop">New Person</button><br> <div id="importPeople"></div></tr>')
            for (p = 0; p < character[n][key]["Important People"].length; p++) {
                var tempArray = Object.keys(character[n][key]["Important People"][p])
                $('#importPeople').append('<input type="text" class="ImpPerson" value="' + tempArray[0] + '"><br> <textarea class="ImpPersonDesc">' + character[n][key]["Important People"][p][tempArray[0]] + '</textarea><br>')
                //console.log(tempArray[0])
            }

            $('#gen').append('<tr><td><b>Goals:</b></td><td>Minor:<br><textarea id="GenMiGoal">' + character[n][key].Goals[0]["<u>Minor</u>"].join('\n') + '</textarea><br>Major<br><textarea id="GenMaGoal">' + character[n][key].Goals[0]["<u>Major</u>"].join('\n') + '</textarea> </tr>')
        } else if (key === "stats") {
            $('#gen').append('<tr><td><br> </td><td>Stats</td></tr>')
            for (sKey in character[n][key]) {
                //console.log(character[n][key][sKey])
                //$('#gen').append('<tr><td><b>' + SentanceCase(sKey) + ':</b></td><td>'+character[n][key][sKey]+'</td></tr>')
                if (typeof (character[n][key][sKey]) === "number" || typeof (character[n][key][sKey]) === "string") {
                    $('#gen').append('<tr><td><b>' + SentanceCase(sKey) + ':</b></td><td> <input type="' + typeof (character[n][key][sKey]) + '" class = "input" id=Gen' + sKey + ' value="' + character[n][key][sKey] + '"></tr>')
                }
            }
        }
    } else {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> "' + character[n][key] + '"</tr>')
        //console.log(key + " : " + typeof (character[n][key]))

    }
}

function parseToJson() {
    var id = Number($('#id').html().replace('<br>', ''))
    var iP = []
    var iPer = []

    $(".ImpPerson").each(function () {
        var tVal = {}
        tVal[$(this).val()] = []
        iP.push(tVal)
        iPer.push($(this).val())
    })
    $('.ImpPersonDesc').each(function (i) {
        iP[i][iPer[i]].push($(this).val())
    })
    var tempJSON =
    {
        "name": $('#Genname').val(),
        "firstName": $('#GenfirstName').val(),
        "id": id,
        "icon": "icons/" + id + ".png",
        "art": "art/" + id + ".png",
        "backstory": {
            "Quote": [$('#GenQuote').val(), $('#GenQuoter').val()],
            "Physical Description": $('#GenDesc').val().split('\n'),
            "Personality": $('#GenPers').val().split('\n'),
            "Homes": $('#GenHomes').val().split('\n'),
            "General Abilities": $('#GenAbil').val().split('\n'),
            "Bio": $('#GenBio').val().split('\n'),
            "Important People": iP,
            "Goals": [
                {
                    "<u>Minor</u>": $('#GenMiGoal').val().split('\n'),
                    "<u>Major</u>": $('#GenMaGoal').val().split('\n')
                }
            ]
        },
        "stats": {
            "birthday": $('#Genbirthday').val(),
            "age": $('#Genage').val(),
            "height": $('#Genheight').val(),
            "weight": $('#Genweight').val(),
            "skin": $('#Genskin').val(),
            "eye": $('#Geneye').val(),
            "hair": $('#Genhair').val()
        },
        "class": $('#Genclass').val().split(', '),
        "subclass": $('#Gensubclass').val().split(', '),
        "background": $('#Genbackground').val(),
        "race": $('#Genrace').val(),
        "role": $('#Genrole').val().split(', '),
        "orientation": $('#Genorientation').val(),
        "pronouns": $('#Genpronouns').val(),
        "alignment": $('#Genalignment').val()

    }
    console.log(tempJSON)
    character[id] = tempJSON
    renderListView()
}

function SentanceCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderListView() {
    $('#characterSelect').empty()
    var filtChar = character.filter(function (item) {
        for (var key in filtKey) {
            if (key === "role" && filtKey[key] != "") {
                if (item[key].indexOf(filtKey[key]) == -1) {
                    return false
                }
            } else if (key === "class" && filtKey[key] != "") {
                if (item[key].indexOf(filtKey[key]) == -1) {
                    return false
                }
            }
        }
        return true
    })
    var appendText = ""
    for (i = 0; i < filtChar.length; i++) {
        var num = filtChar[i].id + 1
        appendText += '<button class="characterList" onclick="renderBuilder(' + filtChar[i].id + ')">' + num + ": " + character[filtChar[i].id].firstName + '</button><br>'

    }
    $('#info').html("   Count: " + character.length + " characters")
    $('#characterSelect').append(appendText)

}

function copyToClipboard(element) {
    navigator.clipboard.writeText("var character = "+JSON.stringify(character)).then(() => {
        // on success
    }, (e) => {
        // on error
    });
    document.execCommand("copy");
}