let fieldContainer = document.querySelector(".field");
let makeGridButton = document.getElementById("create-button");
let clearFieldButton = document.getElementById("clear-button");
let eraseButton = document.getElementById("erase");
let paintButton = document.getElementById("paint");
let colorField = document.getElementById("color");
let borderButton = document.getElementById("border-button")

let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");

let draw = false;
let erase = false;


makeGridButton.addEventListener("click", ()=> {
    fieldContainer.innerHTML = "";
    let count = 0;
    let fieldWidth = fieldContainer.clientWidth;
    let cellSize = fieldWidth / heightInput.valueAsNumber;
    document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);
    for (let i = 0; i < widthInput.valueAsNumber; i++){
        let row = document.createElement("div");
        row.classList.add("grid-row");

        for (let j = 0; j < heightInput.valueAsNumber; j++){
            count += 1;
            let col = document.createElement("div");
            col.classList.add("grid-col")
            col.setAttribute("id", `col${count}`);
            col.addEventListener("mousedown", ()=> {
                draw = true;
                if (erase){
                    col.style.backgroundColor = "transparent";
                }
                else{
                    col.style.backgroundColor = colorField.value;
                }
            });

            col.addEventListener("mousemove", (e)=>{
                let elementID = e.target.id;
                paint(elementID);
            });
            col.addEventListener("mouseup", ()=>{
                draw = false;
            });

        row.appendChild(col);
        }
        fieldContainer.appendChild(row);
    }
});

function paint(elementID){
    let gridColumns = document.querySelectorAll(".grid-col");
    gridColumns.forEach((element)=>{
        if (element.id === elementID){
            if (draw && !erase){
                element.style.backgroundColor = colorField.value;
            }
            else if (draw && erase){
                element.style.backgroundColor = "transparent";
            }
        }
    })
}
clearFieldButton.addEventListener("click", ()=>{
    fieldContainer.innerHTML = ""
})
eraseButton.addEventListener("click", ()=>{
    erase = true;
    eraseButton.style.backgroundColor = "#AC5942";
    paintButton.style.backgroundColor = "#E27D60"
});
paintButton.addEventListener("click", ()=>{
    erase = false;
    paintButton.style.backgroundColor = "#AC5942";
    eraseButton.style.backgroundColor = "#E27D60"
});
borderButton.addEventListener("change", (event)=>{
    if (event.target.checked){
        document.documentElement.style.setProperty("--border-size", "1px")
    }
    else{
        document.documentElement.style.setProperty("--border-size", "0px")
    }
})