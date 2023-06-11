
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

    // Click Event management
    $("#resumeBtn").on("click", () => {
        let requestedId = $("input[type='radio'][name='chosen-one']:checked").val();
        for (let i = 0; i<candidatesData.candidates.length; i++){
            if (candidatesData.candidates[i].id==requestedId){
                requestedPerson = candidatesData.candidates[i];
                break;
            }
        }
        let detailsTemplate = Handlebars.compile($("#requested-content").html());
        $('#details').html(detailsTemplate(requestedPerson));
        $('#download-resume').removeClass("unactive").addClass('active').siblings().removeClass('active').addClass("unactive");
    })

    $("#candidateBtn").on("click", () => {
        $('#candidate-form').removeClass("unactive").addClass('active').siblings().removeClass('active').addClass("unactive");
    })

    $("#newCandySub").on("click", () => {
        let formData = Array.from(document.querySelectorAll("#candidate-form input")).reduce((acc, input)=> ({...acc, [input.id]:input.value}), {});
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

