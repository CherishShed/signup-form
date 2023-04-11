import states from './betterstates.json' assert {type: 'json'};

var stateNames = states.map((state) => state.stateName);

stateNames.forEach((state) => {
    let option = document.createElement("option");
    $(option).text(state);
    option.value = state;
    $("#state").append(option);
})

$("#state").change(() => {
    $("#lga option").remove();
    $("#lga").append("<option value='' disabled selected>~Select a Local Government~</option>");
    let chosenState = states.filter((state) => state.stateName === $("#state").val());
    let lgas = chosenState[0].lgas;
    lgas.forEach((lga) => {
        let option = document.createElement("option");
        $(option).text(lga);
        option.value = lga;
        $("#lga").append(option);
    })
})