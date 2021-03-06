
let title = document.getElementById('title');
let prix = document.getElementById('prix');
let taxe = document.getElementById('taxe');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let update = document.getElementById('update');
let total = document.getElementById('total');
let mood = "create"
let temp ;
let search = document.getElementById("search");
let data_search = []


function getTotals(){
    if(prix.value != ''){
        let result = (+prix.value + +taxe.value + +ads.value) - +discount.value ;
        total.innerHTML = result;
        total.style.background = '#040'
    }else{
        total.style.background = "#a00d02"
    }
}


let datapro ;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
}else{
    datapro = []; 
}


submit.onclick = function(){
    let newPro = {
        title : title.value,
        prix : prix.value,
        taxe : taxe.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,
    }
    if(mood == "create"){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
               datapro.push(newPro);
               localStorage.setItem('product',     JSON.stringify(datapro)     );            
            }

        }else{
            datapro.push(newPro); 
            localStorage.setItem('product',     JSON.stringify(datapro)     );            
        }
        clearData();
        showData();
   
    }else{
        datapro[temp] = newPro;
        mood = "create";
        submit.innerHTML = "create";
        count.style.display = "block";
        clearData();
        showData(); 
    }

}

//showData();
function clearData(){
    title.value = "";
    prix.value = "";
    taxe.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = '';
    category.value = "";

}

function showData(){
    let table = '';
    if(search.innerHTML == ''){
        for(let i = 0; i < datapro.length ;i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].prix}</td>
        <td>${datapro[i].taxe}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button id="update" onclick="updete_item(${i})"> update</button></td>
        <td><button id="delete" onclick="delete_item(${i})"> delete</button></td>
             </tr>
        `;
    }
    }else{
        
        for(let i = 0; i < data_search.length ;i++){
            table += `
            <tr>
            <td>${i}</td>
            <td>${data_search[i].title}</td>
            <td>${data_search[i].prix}</td>
            <td>${data_search[i].taxe}</td>
            <td>${data_search[i].ads}</td>
            <td>${data_search[i].discount}</td>
            <td>${data_search[i].total}</td>
            <td>${data_search[i].category}</td>
            <td><button id="update" onclick="updete_item(${i})"> update</button></td>
            <td><button id="delete" onclick="delete_item(${i})"> delete</button></td>
                 </tr>
            `;
        }
    }
    

    document.getElementById('tbody').innerHTML = table;    
    let btn_delete = document.getElementById('deletAll');
    if(datapro.length > 0){
        btn_delete.innerHTML = `<button onclick = "delete_all()"> delete All (${datapro.length})</button>` ;
    }else{
        btn_delete.innerHTML = '';  
    }
}
showData()
function updete_item(i){
    title.value = datapro[i].title;
    prix.value = datapro[i].prix;
    taxe.value = datapro[i].taxe;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotals();
    count.style.display = "none";
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    temp = i ;
}

function delete_item(i){
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro);
    showData()
}
function delete_all(){
    localStorage.clear()
    datapro.splice(0)
    showData()
    
}

let searchMood = 'title';
function getSearchmood(id){
    search.focus()
    if(id == "search_name"){
        searchMood = 'title'
        search.placeholder = 'search by title'
    }else{
        searchMood = 'category'

        search.placeholder = 'search by category'
    }
}
function search_value(value){
    table = "";
    if(searchMood == 'title'){
        for(let i=0; i<datapro.length; i++){
            if(datapro[i].title.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].prix}</td>
                <td>${datapro[i].taxe}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button id="update" onclick="updete_item(${i})"> update</button></td>
                <td><button id="delete" onclick="delete_item(${i})"> delete</button></td>
                     </tr>
                `;                
            }
        }
        document.getElementById('tbody').innerHTML = table;

    }else{
        for(let i=0; i<datapro.length; i++){

        if(datapro[i].category.includes(value)){
            table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].prix}</td>
            <td>${datapro[i].taxe}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button id="update" onclick="updete_item(${i})"> update</button></td>
            <td><button id="delete" onclick="delete_item(${i})"> delete</button></td>
                 </tr>
            `;                
        }
    }
        document.getElementById('tbody').innerHTML = table;
    }
    

    }


