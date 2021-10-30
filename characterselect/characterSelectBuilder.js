
var filtKey = { "role": "", "class": "" }
var role = ['Tank', "Dps", "Healing", "Support", "Stealth", "Social", "Crafting", "Utility", "Debuff", "Control"]

role = role.sort(function (a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
})

var job = ['Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Alchemist", "Captain", "Craftsman", "Gunslinger", "Investigator", "Martyr", "Necromancer", "Warden", "Warmage", "Witch", "Binder", "Channeler", "Gadgeteer", "Summoner"]

var mode = "build"
var id = 0

$(document).ready(function () {

    if (window.location.hash != null || window.location.hash != undefined) {
        //console.log("Hash exists")
        //console.log(window.location.hash)
        var key = window.location.hash
        var hashFilt = character.filter(k => k.id == Number(key.replace('#', '')))
        //console.log(hashFilt[0].firstName)
        id = hashFilt[0].id
        //for (p = 0; p < character.length; p++) {
        if (window.location.hash == '#' + hashFilt[0].id) {
            //console.log(p + ": " + character[p].firstName + " " + character[p].id)
            if (mode == "build") {
                renderBuilder(hashFilt[0].id)
            } else if (mode == "view") {
                renderProfile(hashFilt[0].id)
            }
            //}
        }
    }

    renderListView(mode)

    $('.main').on('click', '.tokenImg', function () {
        n = $(this).attr('id').replace('img', '')
        if (character[n].icons != undefined || character[n].icons != null) {
            src = ($(this).attr('src'))
            l = character[n].icons.length
            v = character[n].icons.indexOf(src)
            v += 1
            if (v >= l) {
                v = 0
            }

            //console.log(src + " : " + l + " : " + v)
            $(this).attr('src', character[n].icons[v])


        }
    })

    $('#newCharacter').on('click', function () {
        renderBuilder("new")
    })
    $('#copyCode').on('click', function () {
        copyToClipboard(character)
    })
    $('#modeChange').on('click', function () {
        if (mode == "build") {
            mode = "view"
            renderProfile(id)
        } else if (mode == "view") {
            mode = "build"
            renderBuilder(id)
        }
        renderListView(mode)
    })
    $('.main').on('click', '#ImpPeop', function () {
        //console.log("true")
        $('#importPeople').append('<input type="text" class="ImpPerson value=""> <textarea class="ImpPersonDesc"></textarea>')
    })
    $('.main').on('change', '#gen', function () {
        parseToJson()
    })
    /*
        for (i in character) {
            var url = 'icons/' + character[i].firstName + '.png'
            $.ajax({
                url: url,
                type: 'HEAD',
                async: false,
                error: function () {
                    console.log('false')
                    character[i].icon = "icons/Blank.png"
                    //$('.main').append('<p>'+url+'</p>')
                },
                success: function () {
                    character[i].icon = "icons/"+character[i].firstName+".png"
                }
            });
        }
    
        for (i in character) {
            
            var url = 'art/' + character[i].firstName + '.png'
            $.ajax({
                url: url,
                type: 'HEAD',
                async: false,
                error: function () {
                    console.log('false')
                    character[i].art = "art/Blank.png"
                    //$('.main').append('<p>'+url+'</p>')
                },
                success: function () {
                    character[i].art = "art/"+character[i].firstName+".png"
                }
            });
        }
    */

})

function renderProfile(n) {
    window.location.hash = n
    if (id != n) {
        id = n
    }
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
    $('.main').empty()
    if (n === "new") {
        character.push(
            {
                "name": "New",
                "firstName": "New",
                "id": character.length,
                "icon": "Blank.png",
                "icons": [""],
                "art": "Blank.png",
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
                            "Minor": [],
                            "Major": []
                        }
                    ]
                },
                "Notes": [""]

            }
        )
        n = character.length - 1
        renderListView(mode)
    }


    $('.main').css({ "margin-left": $('#sidebar').width() })
    $('.main').append("<table id='gen'>")
    console.log(n)
    window.location.hash = n

    if (id != n) {
        id = n
    }
    for (var key in character[n]) {
        buildBuilder(key, n)
    }
    $('.main').append('</table>')
}

function buildBuilder(key, n) {
    if (key === "Notes") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <textarea id="GenNotes" class="input">' + character[n][key].join('\n') + '</textarea></td></tr>')
    } else if (key === "id") { // || key === "icon" || key === "art") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <span id=' + key + '>' + character[n][key] + '<br></tr>')
    } else if (typeof (character[n][key]) === "number") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="number" id=Gen' + key + ' value="' + character[n][key] + '"></tr>')
    } else if (typeof (character[n][key]) === "string") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="string" class = "input" id=Gen' + key + ' value="' + character[n][key] + '"></tr>')
    } else if (character[n][key].constructor.name == "Array") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="string" class = "input" id=Gen' + key + ' value="' + character[n][key].join(', ') + '"></tr>')
    } else if (typeof (character[n][key]) === "object") {
        if (key === "stats") {
            $('#gen').append('<tr><td><br> </td><td><b><u>Stats</b></u></td></tr>')
            for (sKey in character[n][key]) {
                //console.log(character[n][key][sKey])
                //$('#gen').append('<tr><td><b>' + SentanceCase(sKey) + ':</b></td><td>'+character[n][key][sKey]+'</td></tr>')
                if (typeof (character[n][key][sKey]) === "number" || typeof (character[n][key][sKey]) === "string") {
                    $('#gen').append('<tr><td><b>' + SentanceCase(sKey) + ':</b></td><td> <input type="' + typeof (character[n][key][sKey]) + '" class = "input" id=Gen' + sKey + ' value="' + character[n][key][sKey] + '"></td></tr>')
                }
            }
        } else if (key === "backstory") {
            $('#gen').append('<tr><td><br> </td><td><b><u>Backstory</u></b></td></tr>')
            //$('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> </tr>')

            $('#gen').append('<tr><td><b>Quote:</b></td><td><input type="text" id="GenQuote"  class = "input" value="' + character[n][key].Quote[0] + '"><br><input type="text" id="GenQuoter" value="' + character[n][key].Quote[1] + '"></tr>')

            $('#gen').append('<tr><td><b>Physical Description:</b></td><td><textarea id="GenDesc">' + character[n][key]["Physical Description"].join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>Personality:</b></td><td><textarea id="GenPers">' + character[n][key].Personality.join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>Homes:</b></td><td><textarea id="GenHomes">' + character[n][key].Homes.join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>General Abilities:</b></td><td><textarea id="GenAbil">' + character[n][key]["General Abilities"].join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>Bio:</b></td><td><textarea id="GenBio">' + character[n][key].Bio.join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>Important People:</b></td><td><button id="ImpPeop">New Person</button><br> <div id="importPeople"></div></td></tr>')
            for (p = 0; p < character[n][key]["Important People"].length; p++) {
                var tempArray = Object.keys(character[n][key]["Important People"][p])
                $('#importPeople').append('<input type="text" class="ImpPerson" value="' + tempArray[0] + '"><br> <textarea class="ImpPersonDesc">' + character[n][key]["Important People"][p][tempArray[0]] + '</textarea><br>')
                //console.log(tempArray[0])
            }

            $('#gen').append('<tr><td><b>Goals:</b></td><td>Minor:<br><textarea id="GenMiGoal">' + character[n][key].Goals[0]["Minor"].join('\n') + '</textarea><br>Major<br><textarea id="GenMaGoal">' + character[n][key].Goals[0]["Major"].join('\n') + '</textarea> </td></tr>')
        }
    } else {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> "' + character[n][key] + '"</td></tr>')
        //console.log(key + " : " + typeof (character[n][key]))

    }
}

function parseToJson() {
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
        "icon": $('#Genicon').val(),
        "icons": $('#Genicons').val() ? $('#Genicons').val().split(', ') : "",
        "art": $('#Genart').val(),
        "class": $('#Genclass').val().split(', '),
        "subclass": $('#Gensubclass').val().split(', '),
        "background": $('#Genbackground').val(),
        "race": $('#Genrace').val(),
        "role": $('#Genrole').val().split(', '),
        "orientation": $('#Genorientation').val(),
        "pronouns": $('#Genpronouns').val(),
        "alignment": $('#Genalignment').val(),
        "stats": {
            "birthday": $('#Genbirthday').val(),
            "age": $('#Genage').val(),
            "height": $('#Genheight').val(),
            "weight": Number($('#Genweight').val()),
            "skin": $('#Genskin').val(),
            "eye": $('#Geneye').val(),
            "hair": $('#Genhair').val()
        },
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
                    "Minor": $('#GenMiGoal').val().split('\n'),
                    "Major": $('#GenMaGoal').val().split('\n')
                }
            ]
        },
        "Notes": $('#GenNotes').val().split('\n')

    }
    console.log(tempJSON)

    var sorted = Object.keys(tempJSON)
    sorted.push(sorted.splice(sorted.indexOf("backstory"), 1)[0]);
    sorted.push(sorted.splice(sorted.indexOf("Notes"), 1)[0]);

    var tempOBJ = {}
    for (i = 0; i < sorted.length; i++) {
        tempOBJ[sorted[i]] = tempJSON[sorted[i]]
    }

    character[id] = tempOBJ
    renderListView(mode)
}

function SentanceCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderListView(m) {
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
    var onClick = ""
    if (m == "build") {
        onClick = "renderBuilder"
    } else if (m == "view") {
        onClick = "renderProfile"
    }
    for (i = 0; i < filtChar.length; i++) {
        var num = filtChar[i].id + 1
        appendText += '<button class="characterList" onclick="' + onClick + '(' + filtChar[i].id + ')">' + num + ": " + character[filtChar[i].id].firstName + '</button><br>'

    }
    $('#info').html("   Count: " + character.length + " characters")
    $('#characterSelect').append(appendText)

}

function copyToClipboard(element) {
    navigator.clipboard.writeText("var character = " + JSON.stringify(character, null, 3)).then(() => {
        // on success
    }, (e) => {
        // on error
    });
    document.execCommand("copy");
}