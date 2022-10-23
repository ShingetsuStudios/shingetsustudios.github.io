var selectedCharacters = []
$(document).ready(function () {
  onReady()
})

function onReady() {
  

    selectedCharacters = ($('#ids').text().split(', '))
    //$('#test').html(JSON.stringify(character, null, 2))

    $('.topnav').html('<div class="folder">')
    for (i = 0; i < selectedCharacters.length; i++) {
        $('.topnav').append('<span id="cs-' + selectedCharacters[i] + '" class="cs">' + character[selectedCharacters[i]].firstName + '</span>')
    }
    $('.topnav').append('</div>')
    renderProfile(selectedCharacters[0])
    $('#cs-' + selectedCharacters[0]).addClass('active')

    $('.cs').on('click', function () {
        renderProfile(Number($(this).attr('id').replace('cs-', '')))
    })

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
}

function renderProfile(n) {
    $(".main").empty()
    $('.active').removeClass('active')
    $('#cs-' + n).addClass('active')
    //var toAppend = "<h2>" + character[n].name + "</h2><img src='" + character[n].art + "' style='width:auto; height:300px;'>"
    toAppend = `<div ><table id= "characterIcon" style="float: right; width: 22em; border-spacing: 2px; text-align: center; position: fixed; right: 0px;">
    <tbody><tr><th colspan="2">
    <h2>` + character[n].name + `</h2><hr></th></tr>
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
        if (key === "Important People"|| key === "Goals") {
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