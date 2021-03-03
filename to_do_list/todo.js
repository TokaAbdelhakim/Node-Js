const readitem=() =>{
    let items = localStorage.getItem('items');
    if (items == null){
        items = [];
    }
    else {
        items = JSON.parse(items);
    }
    return items;
}

const writeitem=(items) =>{
    items = JSON.stringify(items);
    localStorage.setItem("items",items);   /// es2aly hena
}

const createNewElement=(parent, elemet, txt, classes)=>{
    myNewEle = document.createElement(elemet)
    parent.appendChild(myNewEle)
    if(txt!='') myNewEle.innerText = txt
    if(classes!='') myNewEle.classList = classes
    return myNewEle
}

let list = document.querySelector("#list");
const createList = (Mytasks) =>{
    list.innerText = "";
    if (Mytasks.length == 0){
        createNewElement(list,'div','no tasks found', 'my-3 alert alert-danger');
    }
    else{
        Mytasks.forEach((element, i) => {
           // element.status? c="bg-secondary":c="bg-muted"
            div = createNewElement(list, 'div', '',
            'col-12 border border-3 rounded container');
            createNewElement(div, 'h5', element.title,'');
            btn =  createNewElement(div, 'button', 'Delete', 'btn btn-danger float-end' )
            btn.addEventListener('click', function(e){deleteitem(i)})
        });
    }
}

function deleteitem(i){
    Mytasks.splice(i, 1);
    writeitem (Mytasks);
    createList (Mytasks);
}

document.querySelector("#addTask").addEventListener('submit',function(e){
    e.preventDefault();

    let item = {
        title: this.elements.taskTitle.value,
    }
    Mytasks.push(item);
    writeitem (Mytasks);
    createList (Mytasks);
    this.reset();
})

let Mytasks = readitem();
createList (Mytasks);
