
import data from './data.json' assert {type: 'json'};

let candidatesData = JSON.parse(localStorage.getItem("candidatesData"));

let list = document.getElementById("candidates-list");

let template = Handlebars.compile(document.getElementById("candidates-list-template").innerHTML);


if (candidatesData == null) {
    localStorage.setItem("candidatesData", JSON.stringify(data))
    list.innerHTML = template(data);
}
else {
    list.innerHTML = template(candidatesData)
}


$(document).ready(function () {


    $("#resumeBtn").on("click", () => {
        let requestedId = $("input[type='radio'][name='chosen-one']:checked").val();
        let requestedPerson = "";
        for (let i = 0; i<candidatesData.candidates.length; i++){
            if (candidatesData.candidates[i].id==requestedId){
                requestedPerson = candidatesData.candidates[i];
                break;
            }
        }
        let detailsTemplate = Handlebars.compile($("#requested-content").html())
        $('#details').html(detailsTemplate(requestedPerson));
        $('#download-resume').removeClass("unactive").addClass('active').siblings().removeClass('active').addClass("unactive");
    })

    $("#candidateBtn").on("click", () => {
        $('#candidate-form').removeClass("unactive").addClass('active').siblings().removeClass('active').addClass("unactive");
    })

    $("#newCandySub").on("click", () => {
        let name = $("#name").val();
        let age = Number($("#age").val());
        let qualification = $("#qualification").val();
        
        candidatesData.candidates.push({"id": candidatesData.candidates.length+1, "name": name, "age": age, "qualification": qualification});
        localStorage.setItem("candidatesData", JSON.stringify(candidatesData))
        console.log(candidatesData)
    })



});

