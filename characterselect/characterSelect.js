
var filtKey = { "role": "", "class": "" }
var role = ['Tank', "Dps", "Healing", "Support", "Stealth", "Social", "Crafting", "Utility", "Debuff", "Control"]
var viewMode = "list"
var artN = 0
var id = 0

role = role.sort(function (a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
})
var job = ['Artificer', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Alchemist", "Captain", "Craftsman", "Gunslinger", "Investigator", "Martyr", "Necromancer", "Warden", "Warmage", "Witch", "Channeler", "Binder", "Gadgeteer", "Summoner"]
$(document).ready(function () {


    if (window.location.hash != null || window.location.hash != undefined) {
        var key = window.location.hash
        var hashFilt = character.filter(k => k.id == Number(key.split('-')[0].replace(/[^0-9.]/g, '')))
        console.log(hashFilt[0])
        id = hashFilt[0].id
        /*if (key.includes('-')) {
            var auKey = key.split('-')[1]
            if (character[id].AU[auKey] != undefined) {
                console.log(auKey)
                au = true
                auName = auKey
                $('#auToggle').trigger('click')
            }
        }*/
        renderProfile(id)
    }

    $('#roleSelect').append('<button id="roleAll">All</button>')
    for (i = 1; i < role.length + 1; i++) {
        var r = role[i - 1]

        $('#roleSelect').append('<button id="' + r + '" class="role">' + r + '</button>')
        //if (i && i % 3 === 0) {
        //    $('#roleSelect').append('<br>')
        //}
    }
    $('#classSelect').append('<button id="jobAll">All</button>')
    for (i = 1; i < job.length + 1; i++) {
        var r = job[i - 1]

        $('#classSelect').append('<button id="' + r + '" class="job">' + r + '</button>')
        //if (i && i % 3 === 0) {
        //    $('#classSelect').append('<br>')
        //}
    }
    $('#classSelect').append('<button id="jobNone">None</button>')
    //$(".main").html(JSON.stringify(character, null, 2))
    $('.role').on('click', function () {
        var r = ($(this).attr('id'))
        //renderListView({ "role": r })
        filtKey.role = r
        renderListView()

        $('#roleFilt').html(" Role: " + r)

    })
    $('#roleAll').on('click', function () {
        filtKey.role = ""
        renderListView()
        $('#roleFilt').empty()
    })
    $('.job').on('click', function () {
        var r = ($(this).attr('id'))
        //renderListView({ "job": r })
        filtKey.class = r
        renderListView()

        $('#jobFilt').html(" Class: " + r)

    })
    $('#jobAll').on('click', function () {
        filtKey.class = ""
        renderListView()
        $('#jobFilt').empty()
    })
    $('#jobNone').on('click', function () {
        filtKey.class = "---"
        renderListView()
        $('#jobFilt').html(" Unknown Class")
    })
    $('#info').on('click', '#iconView', function () {
        if (viewMode === "list") {
            $(".main").empty()
            window.location.hash = ""
            viewMode = "icon"
            let appendText = "<div style=' display: flex; flex-wrap: wrap'>"
            for (i = 0; i < character.length; i++) { 
                appendText += " <button class='characterList' onclick='renderProfile("+i+")'><img class='tokenImg' src='"+ character[i].icon+"' width='150px;'><br>"+character[i].firstName + " "
            }
            appendText += "</div>"
            $('.main').append(appendText)
        } else {
            $(".main").empty()
            viewMode = "list"
            renderListView()
        }
    })
    renderListView()

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


    $('#clearMain').click(function () {
        $(".main").empty()
    })

    $('.main').css({ "margin-left": $('#sidebar').width() })
    $('.main').on('click', '.imgbutton', function () {

        if ($(this).attr("id") === "imgbuttonRight") {

            artN = adjust(artN, 1, character[id].art)
            $('#characterImg').attr('src', character[id].art[artN])
        } else if ($(this).attr("id") === "imgbuttonLeft") {

            artN = adjust(artN, -1, character[id].art)
            $('#characterImg').attr('src', character[id].art[artN])
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
    viewMode="list"
    //window.location.hash = character[n].id
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
    <tr><td colspan="2">Height:` + character[n].stats.height + `</td></tr>
    <tr><td colspan="2">Weight: `+ character[n].stats.weight + `</td></tr>
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
    bAppend += "<hr><h3 id='Notes'>Notes</h3><p>" + character[n].Notes.join('</p><p>') + "</p></b></h3>"
    navbar += "<a href='#Notes'>Notes</a><br>"
    if (character[id].art.length > 1) {
        bAppend += `<div id='img'><div class='imgbutton' id='imgbuttonLeft'>&#8592;</div><div class='imgbutton' id='imgbuttonRight'>&#8594;</div><img id='characterImg' src='` + character[id].art[artN] + `'></div>`
    } else {
        bAppend += `<div id='img'><img src="` + character[id].art[0] + `"></div>`
    }
    $('.mid').append(/*navbar + */"</div><br>" + bAppend)
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
        appendText += '<button class="characterList" onclick="renderProfile(' + filtChar[i].id + ')">' + num + ": " + character[filtChar[i].id].firstName + '</button><br>'

    }
    $('#info').html("   Count: " + character.length + ' characters<br><button id="random" onclick="renderProfile(Math.floor(Math.random() * (character.length - 1)) + 1)">Random Character</button><br><span id="iconView">Icon View</span>')
    $('#characterSelect').append(appendText)

}

function renderIconView() {
    console.log("Test!")
}

function adjust(x, n, char) {
    if ((x + n) < 0) {
        return char.length + x + n
    } else if ((x + n) >= char.length) {
        return char.length - (x + n)
    } else {
        return x + n
    }
}
