//storing all the input fields and items rows into the variables
const myCheckboxFields = document.querySelectorAll("input[type=checkbox]");
const myQuantityFields = document.querySelectorAll("input[type=number]");
const myMenu = document.getElementById('menu');
// console.log(myMenu);

const myItems = myMenu.querySelectorAll("tr");
console.log(myItems);
// const studentName = document.getElementById('name').value;
// console.log(studentName);



const GST = 0.12;
const LIMIT = 6;


//This loop runs through all the checkboxes and adds an onchange event listener to each of them
for(let i=0; i<myCheckboxFields.length; i++){

        myCheckboxFields[i].addEventListener('change', function (evt) {
            
            //changing the value of input field for quantity to 1 whenever a corresponding checkbox is checked
            if(myCheckboxFields[i].checked === true){
                myQuantityFields[i].value = 1;
            }
            else{
                myQuantityFields[i].value = null;  //value is set to null back if the checkbox is unchecked
            }
            
            //limiting the number of selections
            if (document.querySelectorAll('input[type=checkbox]:checked').length > LIMIT) {
                alert("You can select maximum 6 items");
                myCheckboxFields[i].checked = false;
                myQuantityFields[i].value = null;
            }
        });
}


const myButton = document.getElementById('checkout');

//Onclick event for the checkout button, when it's pressed all the checked items will be selected and displayed in the bill
myButton.onclick = function(){

    //Bill div, in which there is a table and we'll just add new rows into this table using Javascript
    const myBill = document.getElementById('bill');
    const myBillDiv = document.getElementById('billDiv');
    const customerName = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    //selecting all the checked input fields and checking if the user has selected zero items
    if(document.querySelectorAll('input[type=checkbox]:checked').length === 0){
        alert('Please select at least one item');
        return;
    }

    //making the Bill div visible by using its style property 'visibility'
    myBillDiv.style.visibility = 'visible';
    
    document.getElementById('customer').innerHTML ="<strong>"+ customerName+"</strong><br>"+phone+"";

    //pushing the selected item's Table rows into the mySelectedItems array
    let mySelectedItems = [];
    for(let k=1; k<myItems.length; k++){
        // console.log(myItems[k].children[3]);
        if(myItems[k].children[2].children[0].checked === true){
            mySelectedItems.push(myItems[k]);
        }
    }

    //This code will delete all the rows from the previous Bill table, to avoid appending items to the previous bill and displaying the appended table
    const myNode = myBill;
    //This loop will run until the first child, that's Item ,  Quantity, Total row at index 0
    while (myNode.children[1]) {
      myNode.removeChild(myNode.lastChild);
    }
    

    let totalQuantity = 0;
    let totalAmount = 0;

    //This loop creates new rows and table data tags, and text nodes for the table data tags, and appends into the row first, and the new row appends to the table
    for(let i=0; i<mySelectedItems.length; i++){
        
        
        let quantity = mySelectedItems[i].children[3].children[0].value;
        
        if(!quantity){
            quantity = 0;
        }
        
        const newTableRow = document.createElement('tr');
        const newTd0 = document.createElement('td');
        const newTableData1 = document.createElement('td');
        const newTableData2 = document.createElement('td');
        const newTableData3 = document.createElement('td');

        const text0 = document.createTextNode(i+1);
        
        const newTableDataText1 = document.createTextNode(mySelectedItems[i].children[0].textContent);
        
        const newTableDataText2 = document.createTextNode(quantity);
        
        totalQuantity += Number(quantity);
        let amountOfItem = Number(mySelectedItems[i].children[1].textContent.match(/(\d+)/)[0]) * quantity;
        totalAmount += amountOfItem;

        const newTableDataText3 = document.createTextNode(amountOfItem);
        
        newTd0.appendChild(text0);
        newTableData1.appendChild(newTableDataText1);
        newTableData2.appendChild(newTableDataText2);
        newTableData3.appendChild(newTableDataText3);

        newTableRow.appendChild(newTd0);
        newTableRow.appendChild(newTableData1);
        newTableRow.appendChild(newTableData2);
        newTableRow.appendChild(newTableData3);
        
        myBill.appendChild(newTableRow);

    }


    const gstAmount = totalAmount * GST;
    const totalBill = totalAmount + gstAmount;

    let arr = ['---', totalQuantity, totalAmount,gstAmount,totalBill];
    let arr2 = ['---', 'Total Qty', 'Total Amt', 'GST', 'Total'];

    for(let j=0; j<5; j++){
        const newNode5 = document.createElement('tr');
        const newTd014 = document.createElement('td');
        newTd014.appendChild(document.createTextNode(''));
        const newTd14 = document.createElement('td');
    
        const newTd15 = document.createElement('td');
        
        const newTd16 = document.createElement('td');
        
        const textNode10 = document.createTextNode('');
        const bold7 = document.createElement('strong');
        // const bold8 = document.createElement('strong');
        const textNode11 = document.createTextNode(arr2[j]);
        
        bold7.appendChild(textNode11);
        const textNode12 = document.createTextNode(arr[j]);
        // bold8.appendChild(textNode12);
        newTd14.appendChild(textNode10);
        newTd15.appendChild(bold7);
        newTd16.appendChild(textNode12);
        // newTd014.className = 'td1';
        // newTd14.className = 'td1';
        // newTd15.className = 'td1';
        // newTd16.className = 'td1';
        // newTd14.style.textAlign = 'right';
        // newTd15.style.textAlign = 'center';
        // newTd16.style.textAlign = 'center';
        newNode5.appendChild(newTd014);
        newNode5.appendChild(newTd14);
            newNode5.appendChild(newTd15);
            newNode5.appendChild(newTd16);
            newNode5.className = 'tr1';
            myBill.appendChild(newNode5);

    }

};






