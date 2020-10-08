console.log(firebase)
var lst=document.getElementById("list");
firebase.database().ref("Todolist").on('child_added',function(data){

    var li=document.createElement("li");
    var litext=document.createTextNode(data.val().task);
    li.appendChild(litext);
    
 
    
    
    var editbtn =document.createElement("button");
    var edittext =document.createTextNode("Edit");
    editbtn.appendChild(edittext)
    editbtn.setAttribute("class","btn");
    editbtn.setAttribute("id",data.val().key);
    editbtn.setAttribute("onclick","onEdit(this)");
    li.appendChild(editbtn);
     
    
    todoitem.value="";
   
    var delbtn =document.createElement("button");
    var deltext =document.createTextNode("Delete");
    delbtn.appendChild(deltext)
    delbtn.setAttribute("class","btnn");
    delbtn.setAttribute("id",data.val().key);
    delbtn.setAttribute("onclick","onDelete(this)");
    li.appendChild(delbtn);
    
    todoitem.value="";
   
    console.log(li)
    lst.appendChild(li);
    
    


})
    

    

function addtodo(){
    var todoitem=document.getElementById("todoitem").value;
    var database=firebase.database().ref("Todolist");
    var key=database.push().key;
    var data={
        key:key,
        task:todoitem,

    }
    database.child(key).set(data);
    todoitem.value="";
} 
function delall(){
    firebase.database().ref("Todolist").remove()
    lst.innerHTML="";
    

}
function onDelete(e){
    console.log(e.id)
    firebase.database().ref("Todolist").child(e.id).remove();
    e.parentNode.remove();
   
    
}





function onEdit(e){
    var val=prompt("What to do next?",e.parentNode.firstChild.nodeValue);
  
    var edittodo={
        key:e.id,
        task:val,
    }
    firebase.database().ref("Todolist").child(e.id).set(edittodo);
    e.parentNode.firstChild.nodeValue=val;
}


