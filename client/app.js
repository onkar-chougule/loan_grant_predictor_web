function getGraduationStatus(){
    var uiGrad=document.getElementsByName("uiGraduationStatus");
    for(var i in uiGrad){
        if(uiGrad[i].checked){
            return parseInt(i);
        }
    }
}

function getGender(){
    var uiGender=document.getElementsByName("uiGender");
    for (var i in uiGender){
        if(uiGender[i].checked){
            return parseInt(i);
        }
    }
}

function getEmploy(){
    var uiEmploy=document.getElementsByName("uiEmploy");
    for (var i in uiEmploy){
        if(uiEmploy[i].checked){
            return parseInt(i);
        }
    }
}

function getCred(){
    var uiCred=document.getElementsByName("uiCred");
    for (var i in uiCred){
        if (uiCred[i].checked){
            return parseInt(i);
        }
    }
}

function getMarr(){
    var uiMarr=document.getElementsByName("uiMarr");
    for (var i in uiMarr){
        if(uiMarr[i].checked){
            return parseInt(i);
        }
    }
}

function getDep(){
    var uiDep=document.getElementsByName("uiDep");
    for (var i in uiDep){
        if(uiDep[i].checked){
            return parseInt(i);
        }
    }
}

function getArea(){
    var uiProp=document.getElementsByName("uiProp");
    for(var i in uiProp){
        if(uiProp[i].checked){
            return parseInt(i)+10;
        }
    }
}

function toemploy(employStatus){
    if(employStatus==1){
        return "Self-Employed";
    }
    else{
        return "not Self-Employed";
    }
}

function togender(genderStatus){
    if(genderStatus==1){
        return "Male";
    }
    else{
        return "Female";
    }
}


function onClick(){

    // var _status=getGraduationStatus();
    // document.getElementById("_status").innerHTML=_status;
    // console.log(_status);
    var graduationStatus=getGraduationStatus();
    var genderStatus=getGender();
    var employStatus=getEmploy();
    var credStatus=getCred();
    var marrStatus=getMarr();
    var depStatus=getDep();
    var areaStatus=getArea();
    var loanAmmount=document.getElementById("uiLoanAmmount");
    var loanAmmountTerm=document.getElementById("uiLaterm");
    var appIncome=document.getElementById("uiAppIncome");
    var coAppIncome=document.getElementById("uiCoAppIncome");
    // document.getElementById("amm_status").innerHTML= "The loan ammount is equal to "+parseFloat(loanAmmount.value).toString();

    var new_var=document.getElementById("ed_status");
    // document.getElementById("gend_status").innerHTML=" Recorded Gender is "+togender(genderStatus)+" Applicant is "+toemploy(employStatus)+" Credit Score is "+credStatus+" maritial status "+ marrStatus+" dependents "+depStatus+" area is "+areaStatus+" loan ammount "+ loanAmmount.value+" term "+loanAmmountTerm.value+" app Income "+appIncome.value+"coapp Income"+ coAppIncome.value;
    // document.getElementById("emp_status").innerHTML=employStatus.toString();


    var url="http://127.0.0.1:5000/get_graduation_status";
    $.post(url,{
        gender:genderStatus,
        self_employed:employStatus,
        credit_history:credStatus,
        married:marrStatus,
        dependents:depStatus,
        education:graduationStatus,
        applicantincome:parseFloat(appIncome.value),
        coapplicantincome:parseFloat(coAppIncome.value),
        loanammount:parseFloat(loanAmmount.value),
        loan_ammount_term:parseFloat(loanAmmountTerm.value),
        property_area:areaStatus
    },function(data,status){
        console.log(data.status_into_10);
        new_var.innerHTML="The education status is "+data.status_into_10.toString();
        console.log(status);

    });
}

function getResult(){
    var graduationStatus=getGraduationStatus();
    var genderStatus=getGender();
    var employStatus=getEmploy();
    var credStatus=getCred();
    var marrStatus=getMarr();
    var depStatus=getDep();
    var areaStatus=getArea();
    var loanAmmount=document.getElementById("uiLoanAmmount");
    var loanAmmountTerm=document.getElementById("uiLaterm");
    var appIncome=document.getElementById("uiAppIncome");
    var coAppIncome=document.getElementById("uiCoAppIncome");
    var result=document.getElementById("uiResult");

    var url="http://127.0.0.1:5000/get_result";
    $.post(url,{
        gender:genderStatus,
        self_employed:employStatus,
        credit_history:credStatus,
        married:marrStatus,
        dependents:depStatus,
        education:graduationStatus,
        applicantincome:parseFloat(appIncome.value),
        coapplicantincome:parseFloat(coAppIncome.value),
        loanammount:parseFloat(loanAmmount.value),
        loan_ammount_term:parseFloat(loanAmmountTerm.value),
        property_area:areaStatus
    },function(data,status){
        console.log("loasing results");
        result.innerHTML=data.result.toString();
        console.log(status);
    });
}
