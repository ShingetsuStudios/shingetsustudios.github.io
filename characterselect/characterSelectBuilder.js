
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
var au = false
var auName = "Default"

$(document).ready(function () {

    if (window.location.hash != null || window.location.hash != undefined) {
        var key = window.location.hash
        var hashFilt = character.filter(k => k.id == Number(key.split('-')[0].replace(/[^0-9.]/g, '')))
        console.log(hashFilt[0])
        id = hashFilt[0].id
        if (key.includes('-')) {
            var auKey = key.split('-')[1]
            if (character[id].AU[auKey] != undefined) {
                console.log(auKey)
                au = true
                auName = auKey
                $('#auToggle').trigger('click')
            }
        }
        if (mode == "build") {
            renderBuilder(id)
        } else if (mode == "view") {
            renderProfile(id)
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
    $('#random').on('click', function () {
        if (mode == "build") {
            renderBuilder(Math.floor(Math.random() * (character.length - 1)) + 1)
        } else if (mode == "view") {
            renderProfile(Math.floor(Math.random() * (character.length - 1)) + 1)
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
            $(this).html("Build")
        } else if (mode == "view") {
            mode = "build"
            renderBuilder(id)
            $(this).html("Preview")
        }
        renderListView(mode)
    })
    $('.main').on('click', '#ImpPeop', function () {
        //console.log("true")
        let imp = $('.ImpPerson').length 
        $('#importPeople').append('<div id="Important-People-'+imp+'"><input type="text" class="ImpPerson value=""><button id="Important-People-'+imp+'-Remove" class="Important-People-Remove" style="float: right;">Remove</button><br> <textarea class="ImpPersonDesc"></textarea></div>')
    })
    $('.main').on('change', '#gen', function () {
        parseToJson()
    })
    $('.main').on('click', ".Important-People-Remove", function () {
        character[id].backstory["Important People"].splice([Number($(this).attr("id").replace('-Remove', '').replace('Important-People-', ''))], 1)
        $('#' + $(this).attr("id").replace('-Remove', '')).remove()
    })
    $('body').on('click', '.toggleButton', function () {
        if ($(this).attr('id') == "auToggle") {
            $('#toggleDefault').addClass("auSelected")
            //$('#auToggled').empty()
            $(this).toggleClass("toggledButton");
            $('#auToggled').toggle()
            $('#auAdd').toggle()

            if ($(this).hasClass("toggledButton")) {
                au = true
            } else {
                auName = "Default"
                au = false


            }
        } else if ($(this).hasClass("auTitle")) {
            var auNameSet = ($(this).html())
            //console.log(auNameSet, auName, au)
            if (auNameSet != "Default") {
                au = true
            }
            auName = auNameSet
            renderMode(id)
            $('#toggle' + auNameSet).addClass('auSelected')
            $('.auTitle').each(function () {
                if ($(this).attr('id') != 'toggle' + auNameSet) {
                    $(this).removeClass('auSelected')
                }
            })

            if (auName != "Default") {
                window.location.hash = id + '-' + auName
            } else {
                window.location.hash = id
            }


        }
    })
    $('.main').on('click', '#auAdd', function () {

        $('#' + $(this).attr('id') + "d").toggle()
        var auNameSet = prompt("What AU are we exploring today?", "");
        if (auNameSet != null && auNameSet != "") {
            $('#auToggled').append('<button id="toggle' + auNameSet + '" class="toggleButton auTitle auSelected">' + auNameSet + '</button>')
            au = true
            auName = auNameSet
            renderMode(id)
            $('#toggle' + auNameSet).addClass('auSelected')

        }

    })


})

function renderProfile(n) {
    if (window.location.hash.split('-')[0].replace(/[^0-9.]/g, '') != n) {
        window.location.hash = n
    }
    if (id != n) {
        id = n
    }
    bAppend = ""
    if (Object.keys(character[n].AU).length != 0) {
        bAppend += "<button id='toggleDefault' class='toggleButton auTitle auSelected'>Default</button>"
    }
    if (au && auName != "Default" && character[n].AU[auName] != undefined) {
        char = character[n].AU[auName]
    } else {
        char = character[n]
    }
    for (let u in character[n].AU) {
        bAppend += '<button id="toggle' + u + '" class="toggleButton auTitle">' + u + '</button>'
    }
    bAppend += "<br><br>"
    $(".main").empty()
    //var toAppend = "<h2>" + char.name + "</h2><img src='" + char.art + "' style='width:auto; height:300px;'>"
    toAppend = `<div ><table id= "characterIcon" style="float: right; width: 22em; border-spacing: 2px; text-align: center; position: fixed; right: 0px;">
    <tbody><tr><th colspan="2">
    <h2>` + char.name + `</h2></th></tr>
    <tr><td colspan="2"><img id= "`+ char.id + `img" class="tokenImg" src="` + char.icon + `" width= "300px;"></td></tr>
    <tr><td colspan="2">Class: `+ char.class.join(', ') + `</td></tr>
    <tr><td colspan="2">Subclass: `+ char.subclass.join(', ') + `</td></tr>
    <tr><td colspan="2">Background: `+ char.background + `</td></tr>
    <tr><td colspan="2">Race: `+ char.race + `</td></tr>
    <tr><td colspan="2">Alignment: `+ char.alignment + `</td></tr>
    <tr><td colspan="2">Age: `+ char.stats.age + `</td></tr>
    <tr><td colspan="2">Height/Weight: `+ char.stats.height + `/ ` + char.stats.weight + `lbs</td></tr>
    <tr><td colspan="2">Pronouns: `+ char.pronouns + `</td></tr>
    <tr><td colspan="2">Orientation: `+ char.orientation + `</td></tr>
    </tbody></table>
    </div><div class='mid'>
    </div>`
    //</div><div class = "mid"></div>`
    $(".main").append(toAppend)
    $('.mid').css({ 'margin-right': $('#characterIcon').width() })
    navbar = "<div id='navBar'>"

    for (var key in char.backstory) {
        if (key === "Important People" || key === "Goals") {
            bAppend += "<hr><h3 id='" + key.replace(' ', '-') + "'><b>" + key + "</b></h3>"
            for (i = 0; i < char.backstory[key].length; i++) {

                for (var keys in char.backstory[key][i]) {
                    bAppend += "<p><b>" + keys + "</b>: " + char.backstory[key][i][keys].join('</p><p>') + '</p>'//<br>'
                }
            }
        } else if (key === "Quote") {

            bAppend += "<h3 style = 'display:none;' id='" + key.replace(' ', '-') + "'><b>" + key + "</b></h3>"
            bAppend += '<i>"' + char.backstory[key].slice(0, char.backstory[key].length - 1) + '"</i><br>'
            bAppend += char.backstory[key].slice(char.backstory[key].length - 1)
            //bAppend += "<p><i>" + char.backstory[key].join('</p><p>') + '</p>'

            //} else if (key === "AU"){
        } else {

            bAppend += "<hr><h3 id='" + key.replace(' ', '-') + "'><b>" + key + "</b></h3><p>" + char.backstory[key].join('</p><p>') + '</p>'
        }
        if (key === "Quote") {

        } else {
            navbar += "<a href='#" + key.replace(' ', '-') + "'>" + key + "</a><br>"
        }
    }
    bAppend += `<img src="` + char.art + `">`
    $('.mid').append(/*navbar + "</div>*/  bAppend)
}

function renderBuilder(n) {
    $('.main').empty()


    $('.main').css({ "margin-left": $('#sidebar').width() })
    $('.main').append("<table id='gen'>")
    //console.log(n)
    if (window.location.hash.split('-')[0].replace(/[^0-9.]/g, '') != n) {
        window.location.hash = n
    }

    if (id != n) {
        id = n
        auName = "Default"
        au = false
        $('#auToggle').trigger("click")
    }

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
    if (au && character[id].AU[auName] == undefined && auName != "Default") {
        let auTemp = Object.assign({}, character[id])
        delete auTemp.AU
        character[id].AU[auName] = auTemp
        delete character[id].AU[auName].AU
    }
    let display = "display:none;"
    if (au) {
        display = ""
    }
    $('#gen').append('<tr><td><button class="toggleButton" id="auToggle">AU</button><button id="auAdd" style="display:none;">Add AU</button></td><td id="auToggled" style="' + display + '"><button id="toggleDefault" class="toggleButton auTitle">Default</button></td></tr>')
    for (let u in character[id].AU) {
        $('#auToggled').append('<button id="toggle' + u + '" class="toggleButton auTitle">' + u + '</button>')
    }
    //console.log(auName)
    if (au && auName != "Default") {
        for (var key in character[n].AU[auName]) {
            buildBuilder(key, character[n].AU[auName])
        }
    } else {
        for (var key in character[n]) {
            buildBuilder(key, character[n])
        }
    }
    $('.main').append('</table>')
}

function buildBuilder(key, char) {
    if (key === "Notes") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <textarea id="GenNotes" class="input">' + char[key].join('\n') + '</textarea></td></tr>')
    } else if (key === "id") { // || key === "icon" || key === "art") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <span id=' + key + '>' + char[key] + '<br></tr>')
    } else if (typeof (char[key]) === "number") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="number" id=Gen' + key + ' value="' + char[key] + '"></tr>')
    } else if (typeof (char[key]) === "string") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="string" class = "input" id=Gen' + key + ' value="' + char[key] + '"></tr>')
    } else if (char[key].constructor.name == "Array") {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> <input type="string" class = "input" id=Gen' + key + ' value="' + char[key].join(', ') + '"></tr>')
    } else if (typeof (char[key]) === "object") {
        if (key === "stats") {
            $('#gen').append('<tr><td><br> </td><td><b><u>Stats</b></u></td></tr>')
            for (sKey in char[key]) {
                //console.log(char[key][sKey])
                //$('#gen').append('<tr><td><b>' + SentanceCase(sKey) + ':</b></td><td>'+char[key][sKey]+'</td></tr>')
                if (typeof (char[key][sKey]) === "number" || typeof (char[key][sKey]) === "string") {
                    $('#gen').append('<tr><td><b>' + SentanceCase(sKey) + ':</b></td><td> <input type="' + typeof (char[key][sKey]) + '" class = "input" id=Gen' + sKey + ' value="' + char[key][sKey] + '"></td></tr>')
                }
            }
        } else if (key === "backstory") {
            $('#gen').append('<tr><td><br> </td><td><b><u>Backstory</u></b></td></tr>')
            //$('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> </tr>')

            $('#gen').append('<tr><td><b>Quote:</b></td><td><input type="text" id="GenQuote"  class = "input" value="' + char[key].Quote[0] + '"><br><input type="text" id="GenQuoter" value="' + char[key].Quote[1] + '"></tr>')

            $('#gen').append('<tr><td><b>Physical Description:</b></td><td><textarea id="GenDesc">' + char[key]["Physical Description"].join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>Personality:</b></td><td><textarea id="GenPers">' + char[key].Personality.join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>Homes:</b></td><td><textarea id="GenHomes">' + char[key].Homes.join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>General Abilities:</b></td><td><textarea id="GenAbil">' + char[key]["General Abilities"].join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>Bio:</b></td><td><textarea id="GenBio">' + char[key].Bio.join('\n') + '</textarea> </td></tr>')

            $('#gen').append('<tr><td><b>Important People:</b></td><td><button id="ImpPeop">New Person</button><br> <div id="importPeople"></div></td></tr>')
            for (p = 0; p < char[key]["Important People"].length; p++) {
                var tempArray = Object.keys(char[key]["Important People"][p])
                $('#importPeople').append('<div id="Important-People-' + p + '"><input type="text" class="ImpPerson" value="' + tempArray[0] + '"> <button id= "Important-People-' + p + '-Remove" class="Important-People-Remove" style="float: right;">Remove</button><br> <textarea class="ImpPersonDesc">' + char[key]["Important People"][p][tempArray[0]] + '</textarea><br></div>')
                //console.log(tempArray[0])
            }

            $('#gen').append('<tr><td><b>Goals:</b></td><td>Minor:<br><textarea id="GenMiGoal">' + char[key].Goals[0]["Minor"].join('\n') + '</textarea><br>Major<br><textarea id="GenMaGoal">' + char[key].Goals[0]["Major"].join('\n') + '</textarea> </td></tr>')
        }
    } else {
        $('#gen').append('<tr><td><b>' + SentanceCase(key) + ':</b></td><td> "' + char[key] + '"</td></tr>')
        //console.log(key + " : " + typeof (char[key]))

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
        "Notes": $('#GenNotes').val().split('\n'),
        "AU": {}

    }
    //console.log(tempJSON)

    var sorted = Object.keys(tempJSON)
    sorted.push(sorted.splice(sorted.indexOf("backstory"), 1)[0]);
    sorted.push(sorted.splice(sorted.indexOf("Notes"), 1)[0]);

    var tempOBJ = {}
    for (i = 0; i < sorted.length; i++) {
        tempOBJ[sorted[i]] = tempJSON[sorted[i]]
    }

    if (!au) {
        character[id] = tempOBJ
    } else {

        delete tempOBJ.AU
        character[id].AU[auName] = tempOBJ
    }
    console.log(tempOBJ)
    renderListView(mode)
}

function SentanceCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function renderMode(m) {
    if (mode == "build") {
        renderBuilder(m)
    } else if (mode == "view") {
        renderProfile(m)
    }

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
        appendText += '<button class="characterList" onclick="' + onClick + '(' + filtChar[i].id + ');au=false;">' + num + ": " + character[filtChar[i].id].firstName + '</button><br>'

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