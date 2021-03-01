let showbtn = document.querySelector("#showhide");
let sendinfo = document.querySelector("#stdlog");
let summition = document.querySelector("#send");
let students = [
    {
        name: "toka",
        class: 10,
        age: 24,
        degree: 90
},
{
    name: "ali",
    class: 10,
    age: 24,
    degree: 70
}, 

];
let tableheader = ["id","name","class","age","degree","grade","edit"];
let buttons = [
    {txt:'delete', classes:'btn btn-danger m-1'},
    {txt:'edit', classes:'btn btn-warning m-1'}
];

showbtn.addEventListener('click',function(e){
    if (this.innerText=="Show form"){
        this.innerText="hide form"
    }
    else{
        this.innerText="Show form"
    }
    document.querySelector('#stdlog').classList.toggle("d-none");
})

sendinfo.addEventListener('submit',function(e){
    e.preventDefault();
    let student = {
            name: this.elements.name.value,
            class: this.elements.class.value,
            age: this.elements.age.value,
            degree: this.elements.degree.value
    };
    students.push(student);
    this.reset;
    this.classList.toggle("d-none");
    showbtn.innerText = "Show form";
    showall();
})

let showall = function(){
    stdinfo.innerText='';
    students.forEach((student,i) => {
        tr = addnewelement('tr',stdinfo);
        tableheader.forEach(head =>{
            if (head == "id"){
                txt = i+1;
            }
            else if (head == "grade"){
                if (parseInt(students[i].degree) >= 90){
                    txt = "A";
                }
                else if (parseInt(students[i].degree) >= 80){
                    console.log("b");
                    txt = "B";
                }
                else if (parseInt(students[i].degree) >= 70){
                    txt = "C";
                }
                else if (parseInt(students[i].degree) >= 60){
                    txt = "D";
                }
                else {
                    txt = "F";
                }
            }
            else if (head == "edit"){
                txt = "";

            }
            else {
                txt = student[head];
            }
            td = addnewelement ('td',tr,txt);
        })
        buttons.forEach(button =>{
            btn = addnewelement('button',td,button.txt,button.classes);
            btn.addEventListener('click',function(e){
                if (button.txt == "delete") {
                    deletestudent (i);
                }
                else if (button.txt == "edit"){
                    editgrade(i);
                }
            })
           
        })

    })
}

let addnewelement  = function (el, parent , txt= "", style=''){
    myel = document.createElement(el);
    if (txt != ""){
        myel.innerText = txt;
    }
    if (style != ''){
        myel.classList = style;
    }
    parent.appendChild(myel);
    return myel
}

function deletestudent (index){
    students.splice(index,1);
    showall();
}

function editgrade (index){
    let degree= Number (prompt('enter new degree'));
    students[index].degree = degree;
    showall();
}

showall();