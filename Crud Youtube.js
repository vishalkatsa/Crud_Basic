let UserAllData = [];

let V_name = document.querySelector('#Name');
let V_email = document.querySelector('#Email');
let V_mobile = document.querySelector('#Mobile');

let V_submit_S = document.querySelector('#Submit');

let V_Form_emrty = document.querySelector("#Form_emrty");

let sub = true;


V_submit_S.addEventListener("click", (pageNot_reload) => {
    const nameValue = V_name.value.trim();
    const emailValue = V_email.value.trim();
    const mobileValue = V_mobile.value.trim();

    if (nameValue === '' || emailValue === '' || mobileValue === '') {
        alert('Please fill in all required fields.');
        pageNot_reload.preventDefault();
    }
     else if (mobileValue.length < 10) {
        alert('mobile must be at least 10 characters.');
        pageNot_reload.preventDefault();
    } 
    else {
        pageNot_reload.preventDefault();
        DataSubmit();/// type input data submit 
        Form_emrty();/// form submit complite form reset
        GetData();/// Get localStorage data to display or html page 
    }

});


function Form_emrty() { /// form submit complite form reset
    V_Form_emrty.reset("")
}

function DataSubmit() { /// type input data submit 
    UserAllData.push({
        Name: V_name.value,
        Email: V_email.value,
        Mobile: V_mobile.value
    });
    SetDataOnLocalStorage() /// Submit data sent localStorage 
}

function SetDataOnLocalStorage() {  /// Submit data sent localStorage
    localStorage.setItem("UserAllData", JSON.stringify(UserAllData))
}


let tbody_Data_tr;
const GetData = () => { /// Get localStorage data to display html page 
    UserAllData = JSON.parse(localStorage.getItem("UserAllData")) ?? '[]'
    if (UserAllData.length === 0) {
        document.querySelector("#tbody").innerHTML = "";
        return;
    }
    tbody_Data_tr = ""
    UserAllData.map((data, index) => {

        tbody_Data_tr +=
            `
        <tr key=${index}>
            <td class="td1" >${index + 1}</td>
            <td class="td1" >${data.Name}</td>
            <td class="td1" >${data.Email}</td>
            <td class="td1" >${data.Mobile}</td>
            <td class="td1" id="edit" onclick="edit(${index})"> <span class="material-symbols-outlined">sync_alt</span></td>
            <td class="td1" id="delId" onclick="deleteAV(${index})"><i class="fa-solid fa-rectangle-xmark"></i></td>
        </tr>  
        `
        document.querySelector("#tbody").innerHTML = tbody_Data_tr;
    })
}
GetData()
// //// Delete ////
const deleteAV = (index) => { /// click this button 
    UserAllData.splice(index, 1);
    localStorage.setItem("UserAllData", JSON.stringify(UserAllData)); /// data set on localStorage
    GetData() /// this space data delete 
}

// //// Edit or Update ////
 let UpdateForm = ""
const edit = (index) => { /// click and than 
     UpdateForm = /// edit data sent on input 
        `
        <form id="Form_emrty">
            <label for="Name">Full Name</label>
            <input id="NameUP" value="${UserAllData[index].Name}" type="text">

            <label for="Email">Email Address</label>
            <input id="EmailUP" value="${UserAllData[index].Email}" type="email">

            <label for="Mobile">Mobile Number</label>
            <input id="MobileUP" value="${UserAllData[index].Mobile}" type="number" >

            <input id="SubmitUP" onclick="updateSubmit(${index})" type="Submit"> 
        </form>
        `
    document.querySelector("#Form_emrty").innerHTML = UpdateForm;
}

const updateSubmit = (index) => { /// edit after click on submit button then 
    let V_NameUP = document.querySelector('#NameUP');
    let V_EmailUP = document.querySelector('#EmailUP');
    let V_MobileUP = document.querySelector('#MobileUP');

    UserAllData[index] = { /// edit value 
        Name: V_NameUP.value,
        Email: V_EmailUP.value,
        Mobile: V_MobileUP.value,
    };
    localStorage.setItem("UserAllData", JSON.stringify(UserAllData)); /// edit value sent localStorage 
    GetData() /// Get LocalStorage and place html page 
}

// document.getElementById("demo").innerHTML = "vishal";


