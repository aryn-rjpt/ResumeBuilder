
import data from './data.json' assert {type: 'json'};

let candidatesData = JSON.parse(localStorage.getItem("candidatesData"));

let list = document.getElementById("candidates-list");

let template = Handlebars.compile(document.getElementById("candidates-list-template").innerHTML);


if (candidatesData == null) {
    localStorage.setItem("candidatesData", JSON.stringify(data))
    candidatesData = data;
    list.innerHTML = template(data);
}
else {
    list.innerHTML = template(candidatesData)
}

$(document).ready(function () {

    let requestedPerson = "";
    let skillCount = 0;
    let achievementCount = 0;
    let experienceCount = 0;
    let educationCount = 0;
    let countVals = {
        "experience": 0,
        "achievement": 0,
        "education": 0,
    }
    let candyFormTempCompiled = Handlebars.compile($("#candy-form-template").html());

    let formSubmitBtn = $("#newCandySub");
    formSubmitBtn.before(candyFormTempCompiled({"capitalized": "Experiences", lowercase: "experience"}));
    formSubmitBtn.before(candyFormTempCompiled({"capitalized": "Achievements", lowercase: "achievement"}));
    formSubmitBtn.before(candyFormTempCompiled({"capitalized": "Education", lowercase: "education"}));

    // Click Event management
    $("#resumeBtn").on("click", () => {
        let requestedId = $("input[type='radio'][name='chosen-one']:checked").val();
        if (requestedId==undefined){
            $("#noCandyChosen").css("display", "block");
        }
        else{
            $("#noCandyChosen").css("display", "none");

            for (let i = 0; i<candidatesData.candidates.length; i++){
                if (candidatesData.candidates[i].id==requestedId){
                    requestedPerson = candidatesData.candidates[i];
                    break;
                }
            }
            let detailsTemplate = Handlebars.compile($("#requested-content").html());
            $('#details').html(detailsTemplate(requestedPerson));
            $('#download-resume').removeClass("unactive").addClass('active').siblings().removeClass('active').addClass("unactive");
        };
    })

    $("#candidateBtn").on("click", () => {
        $('#candidate-form').removeClass("unactive").addClass('active').siblings().removeClass('active').addClass("unactive");
    })

    $("#newSkill").on("click", ()=>{
        $("#skills>div").append(`<input type="text" id="skill${++skillCount}" class="multipleInput skills-input" name="skill${skillCount}">`)
        $(`#skill${skillCount}`).focus();
        if (skillCount==7){
            $("#newSkill").remove();
        }
        return false;
    })

    $(".addBtn").on("click", function(){
        let what = this.id.slice(4);
        $(this).before(`<input type="text" id=${what}${++(countVals[what])}" class="multipleInput" name=${what}${countVals[what]}">`);
        $(this).prev().focus();
        if (countVals[what]==4){
            $(this).remove();
        }
        return false;
    })

    $("#newCandySub").on("click", () => {
        let formData = Array.from(document.querySelectorAll("#candidate-form input")).reduce((acc, input)=> ({...acc, [input.id]:input.value}), {});
        console.log(formData);
        candidatesData.candidates.push({"id": candidatesData.candidates.length+1, ...formData});
        localStorage.setItem("candidatesData", JSON.stringify(candidatesData))
    })


    $("input[name='templateBtns']").on("click", function(){
        $('.resume-template').css("display","flex");
        let chosenTemplale = this.value;
        let compiledChosenTemplale = Handlebars.compile($("#"+chosenTemplale+"template").html());
        $('#finalResume').html(compiledChosenTemplale(requestedPerson))
    })



});

