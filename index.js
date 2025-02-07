let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submet= document.getElementById('submet');
let mood="create";
let temp;
 //اجمالي السعر
function getTotal(){
if(price.value !=0){
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML= result;
    total.style.background= "#196";
}
else{
    total.innerHTML='';
    total.style.background= "brown";
}
}

// اعداد المنتجات الجديده
let additem;
if(localStorage.Product != null){
    additem = JSON.parse(localStorage.getItem('product'))
    ;}
 else{
    additem = [];
 }
submet.onclick = function addProduct(){
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
 
    }
    if(title.value !=''&&price.value != ''&&category.value !=''&&count.value <100){
if(mood==="create"){
    if(newProduct.count > 1){
      for(let i = 0; i < newProduct.count; i++)  {
 additem.push(newProduct);}}
else{
    additem.push(newProduct);
}}
else{
    additem[temp]   = newProduct;
    mood="create";
    submet.innerHTML="create";
    count.style.display="block";
}clearProduct();}
 localStorage.setItem('product', JSON.stringify(additem))
 
 
 showProduct();
}
// delete data from input
 function clearProduct(){
    title.value="";
    price.value=""; 
     taxes.value="";
     ads.value="";
     discount.value="";
     total.innerHTML="";
     category.value="";
     count.value="";
 }
 // show data from local storage
 function showProduct(){
  getTotal();
    let table='';  
    for(let i=0 ;i<additem.length;i++){
      
        table+=`
       <tr>
        <td>${i+1}</td>
                <td>${additem[i].title}</td>
                <td>${additem[i].price}</td>
                <td>${additem[i].taxes}</td>
                <td >${additem[i].ads}</td>
                <td>${additem[i].discount}</td>
                <td>${additem[i].total}</td>
                <td>${additem[i].category}</td>
              
                <td><button onclick="updatedata(${i})" id="update"> update</button></td>
                <td><button onclick="deletadata(${i})" id="delete">delete</button> </td>
            </tr> 
        `

    }
    document.getElementById('tbody').innerHTML=table; console.log(table)
 let btndelete= document.getElementById('deleteall');
  if (additem.length>0){
   btndelete.innerHTML=`<button onclick="deleteAll()">Delete All(${additem.length})</button> `

 } else{
    btndelete.innerHTML=""
}
}
 showProduct();

// delete product
   function deletadata(i) {
    additem.splice(i,1);
    localStorage.Product=JSON.stringify(additem);
    showProduct()
   }
  
function deleteAll(){
 localStorage.clear();
    additem.splice(0);
    showProduct()
}

// update product  data  from local storage
function updatedata(i){
    title.value=additem[i].title;
    price.value=additem[i].price; 
     taxes.value=additem[i].taxes;
     ads.value=additem[i].ads;
     discount.value=additem[i].discount;
    getTotal();
     category.value=additem[i].category;
    count.style.display="none";
    submet.innerHTML="update"
    mood="update";
    temp=i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// search product by title and category
let searchMood="title";
function getsearch(id){   
    let search=document.getElementById("search");
    search.focus();
    if(id=="searchtitle"){
        searchMood="title";
        search.placeholder="Search by Title";
    }
    else{
        searchMood="category";
        search.placeholder="Search by Category";
    }
    
}
// search product 
function searchProduct(value){
 let table=''; 
if(searchMood=="title"){
    for(let i=0; i<additem.length; i++){
        if(additem[i].title.includes(value)){
            
            table+=`
           <tr>
            <td>${i}</td>
                    <td>${additem[i].title}</td>
                    <td>${additem[i].price}</td>
                    <td>${additem[i].taxes}</td>
                    <td >${additem[i].ads}</td>
                    <td>${additem[i].discount}</td>
                    <td>${additem[i].total}</td>
                    <td>${additem[i].category}</td>
                  
                    <td><button onclick="updatedata(${i})" id="update"> update</button></td>
                    <td><button onclick="deletadata(${i})" id="delete">delete</button> </td>
                </tr> 
            `
    
        }
    
        }}
    else{
        for(let i=0; i<additem.length; i++){
            if(additem[i].category.includes(value)){
                
                table+=`
               <tr>
                <td>${i}</td>
                        <td>${additem[i].title}</td>
                        <td>${additem[i].price}</td>
                        <td>${additem[i].taxes}</td>
                        <td >${additem[i].ads}</td>
                        <td>${additem[i].discount}</td>
                        <td>${additem[i].total}</td>
                        <td>${additem[i].category}</td>
                      
                        <td><button onclick="updatedata(${i})" id="update"> update</button></td>
                        <td><button onclick="deletadata(${i})" id="delete">delete</button> </td>
                    </tr> 
                `
        
            }
        
            }
    }

 
 document.getElementById('tbody').innerHTML=table;
}
