let fieldContainer = document.querySelector(".field");
let makeGridButton = document.getElementById("create-button");
let clearFieldButton = document.getElementById("clear-button");
let eraseButton = document.getElementById("erase");
let paintButton = document.getElementById("paint");
let colorField = document.getElementById("color");

let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");

let draw = false;
let erase = false;



makeGridButton.addEventListener("click", ()=> {
    fieldContainer.innerHTML = "";
    let count = 0;
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
});
paintButton.addEventListener("click", ()=>{
    erase = false;
})