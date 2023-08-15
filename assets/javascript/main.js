

try {
    // wings in society
    const wingsArray = ["A", "B", "C", "D", "E", "F", "G"];

    var wing = document.getElementById("wing");
    for (a = 0; a < wingsArray.length; a++) {
        var wingOp = document.createElement("option");
        wingOp.innerText = wingsArray[a];
        wing.appendChild(wingOp);
    }

    // make array of flats
    const flat = [];
    for (i = 100; i <= 1000; i += 100) {
        for (j = 1; j <= 4; j++) {
            var x = j + i;
            flat.push(x);
        }
    }

    // creat flats option
    var flats = document.getElementById("flat");
    for (a = 0; a < flat.length; a++) {
        var flatOp = document.createElement("option");
        flatOp.innerText = flat[a];
        flats.appendChild(flatOp);
    }
} catch (err) {
    console.log(err);
}

///////////// form-registration
// store data in local storage
try {
    document.getElementById("form-submit").addEventListener("click", saveData);
    function saveData() {
        // // cheak form validation
        if (document.getElementById("wing").selectedIndex == 0) {
            document.getElementById('wing-p').innerHTML = "Please Select wing!";
            document.getElementById('wing-p').style.color = "red";
        }
        else if (document.getElementById('flat').selectedIndex == 0) {
            document.getElementById('flat-p').innerHTML = "Please Select Flat!"
            document.getElementById('flat-p').style.color = "red";
        }
        else if (document.getElementById('owner').selectedIndex == 0) {
            document.getElementById('owner-p').innerHTML = "Please Select Owner or Tenent!"
            document.getElementById('owner-p').style.color = "red";
        } else {
            // get form values
            var lwing = document.getElementById("wing").value;
            var lflat = document.getElementById("flat").value;
            var lowner = document.getElementById("owner").value;
            var lname = document.getElementById("name").value;
            var lmobile = document.getElementById("mobile").value;
            var lemail = document.getElementById("email").value;
            var ldob = document.getElementById("dob").value;
            var luser = document.getElementById("user").value;
            var lpassword = document.getElementById("password").value;

            // creat object for store values of form
            const person = {
                wing: lwing,
                flat: lflat,
                owner: lowner,
                name: lname,
                mobile: lmobile,
                email: lemail,
                dob: ldob,
                user: luser,
                password: lpassword
            };
            // save the sign up data object to localstorage...
            localStorage.setItem("Resi" + lwing + lflat, JSON.stringify(person));
            // regiter successfully msg
            document.getElementById('main').style.opacity = "0.33";
            document.getElementById("sub-msg").style.display = "block";
            document.getElementById("sub-msg").animate(
                [
                    { opacity: "0" },
                    { transform: "scale(0) translate(-700px)" },
                    { opacity: "1" },
                    { transform: "scale(1) translate(0)" },
                ],
                {
                    duration: 1500,
                    interation: 1,
                }
            );
            console.log("data Saved");
            document.getElementById('signup-form').reset();
        }
    }
}
catch (err) {
    console.log('registration page Error' + err);
}

// after submite ok button
try {
    document.getElementById('sub-ok').addEventListener('click', subOk);
    function subOk() {
        document.getElementById('sub-msg').style.display = 'none';
        document.getElementById('main').style.opacity = "1";
    }
} catch (error) {
    console.log(error);
}

// reset form button
try {
    document.getElementById("form-reset").addEventListener("click", document.getElementById("signup-form").reset());
} catch (error) {
    console.log(error);
}

///////////// Login page
try {
    document.getElementById('login-btn').addEventListener("click", check);
    function check() {
        if (document.getElementById('login-uid').value === "" || document.getElementById('login-pw').value === "") {
            document.getElementById('uid-p').innerHTML = "Required!";
            document.getElementById('uid-p').style.color = "red";
            document.getElementById('pw-p').innerHTML = "Required!";
            document.getElementById('pw-p').style.color = "red";
        }
        // get localstorage data and cheak user id an pw are match or not 
        let flag = 1;
        const userDataArray = Object.keys(localStorage);
        for (let x of userDataArray) {
            if (x.substring(0, 4) === "Resi") {
                const userIP = JSON.parse(localStorage.getItem(x));
                if (document.getElementById("login-uid").value === userIP.user && document.getElementById('login-pw').value === userIP.password) {
                    localStorage.setItem("activeUser", userIP);
                    window.location.href = "admin.html";
                    flag = 0;
                }
            }
        }
        if (flag) {
            document.getElementById('uid-p').innerHTML = "Can't Find The match";
            document.getElementById('uid-p').style.color = "red";
            return;
        }
    }

} catch (error) {
    console.log("Loginpage Error" + error);
}

///////////// user Dashboard
// Complain
try {
    function writeComplain() {
        document.getElementById("comp-model").style.display = "block";
        document.getElementById("main").style.opacity = "0.33";
        document.getElementById("comp-model").style.transition = "all 1.5s linear";
        document.getElementById("comp-model").classList.add("tindownin");
    }
    // add complian in localstorage
    function saveComplain() {
        var compTitle = document.getElementById('comp-title').value;
        var compDisp = document.getElementById('comp-disp').value;
        const complain = {
            cTitle: compTitle,
            cDisp: compDisp
        };
        localStorage.setItem("comp" + Date.now(), JSON.stringify(complain));
        document.getElementById('comp-model').style.display = "none";
        document.getElementById("comp-done").style.display = "block";
        setTimeout(compDone, 2000);
        function compDone() {
            document.getElementById("comp-done").style.width = "0";
            document.getElementById("comp-done").style.display = "none";
        }
        document.getElementById("main").style.opacity = "1";
    }
    // get data from localstorage and show in table 
    const lsData = Object.keys(localStorage);
    for (let x of lsData) {
        if (x.substring(0, 4) === 'comp') {
            var compObj = JSON.parse(localStorage.getItem(x));
            var comptable = document.getElementById("comp-table");
            var compRow = comptable.insertRow(1);
            compRow.insertCell(0).innerHTML = 1;
            compRow.insertCell(1).innerHTML = compObj.cTitle;
            compRow.insertCell(2).innerHTML = compObj.cDisp;
            compRow.insertCell(3).innerHTML = "-";
            compRow.insertCell(4).innerHTML = "-";
            compRow.insertCell(5).innerHTML = "Pending";
        }
    }

} catch (error) {
    console.log("userDashboard Error" + error);
}

///////////// Resident units

// get data from localstorage...and view in table
// make array of keys in localstorage
try {
    const userDataArray = Object.keys(localStorage);
    var inNo = 1;
    for (let x of userDataArray) {
        if (x.substring(0, 4) === "Resi") {
            var userData = JSON.parse(localStorage.getItem(x));
            var unitTable = document.getElementById("resi-units");
            var row = unitTable.insertRow(inNo);
            var cel0 = row.insertCell(0);
            var cel1 = row.insertCell(1);
            var cel2 = row.insertCell(2);
            var cel3 = row.insertCell(3);
            var cel4 = row.insertCell(4);
            var cel5 = row.insertCell(5);
            var cel6 = row.insertCell(6);
            cel0.innerHTML = inNo++;
            cel1.innerHTML = userData.wing;
            cel2.innerHTML = userData.flat;
            cel3.innerHTML = userData.name;
            cel4.innerHTML = userData.owner;
            cel5.innerHTML = userData.email;
            cel6.innerHTML = '<button class="btn btn-success btn-sm fw-bolder" onclick="view()">View</button>';
        }
    }
    cel6.addEventListener("click", view);
    function view() {
        console.log("view");
    }

} catch (error) {
    console.log("ResidentUnit errror =" + error);
}

///////////// accounts

try {
    document.getElementById('invoice').addEventListener('click', invoiceCanvas);
    function invoiceCanvas() {
        document.getElementById('accounts-sec').animate(
            [
                // key frames
                { transform: "scale(0)" },
                { display: "none" },
            ],
            {
                // timming option
                duration: 700,
                interation: 1,
            }
        );
        document.getElementById('create-invoice').style.display = "block";
        document.getElementById('create-invoice').animate(
            [
                // key frames
                { transform: "translateX(700px)" },
                { transform: 'translateX(0px)' },
            ],
            {
                // timming option
                duration: 1000,
                interation: 1,
            }
        );

        document.getElementById('accounts-sec').style.display = 'none';
    }

    // Invoice validation
    document.getElementById('select-member').addEventListener('change', slMember);

    function slMember() {
        if (document.getElementById('select-member').selectedIndex == 2) {
            document.getElementById('wing').disabled = false;
        } else if (document.getElementById('select-member').selectedIndex == 3) {
            document.getElementById('wing').disabled = false;
            document.getElementById('flat').disabled = false;
        }
    }

    // create invoice function
    var invoiceInput = document.querySelectorAll('#invoice-form input');
    class invoice {
        constructor(period, stdate, enddate, number, member, category, wing, flat, amount, disc) {
            this.period = period;
            this.stdate = stdate;
            this.enddate = enddate;
            this.number = number;
            this.member = member;
            this.category = category;
            this.wing = wing;
            this.flat = flat;
            this.amount = amount;
            this.disc = disc;
        }
        // save data in localstorage method create
        saveInvoiceLS() {
            const invoice = {
                period: this.period,
                stdate: this.stdate,
                enddate: this.enddate,
                number: this.number,
                member: this.member,
                category: this.category,
                wing: this.wing,
                flat: this.flat,
                amount: this.amount,
                disc: this.disc,
            };
            localStorage.setItem("invoice", JSON.stringify(invoice));
        }
    }

    document.getElementById('invoice-btn').addEventListener('click', createInvoice);
    function createInvoice() {
        var inPeriod = document.getElementById('period').value;
        var inStDate = document.getElementById('startdate').value;
        var inEndDate = document.getElementById('enddate').value;
        var inNumber = document.getElementById('in-number').value;
        var inMember = document.getElementById('select-member').value;
        var inCategory = document.getElementById('category').value;
        var inWing = document.getElementById('wing').value;
        var inFlat = document.getElementById('flat').value;
        var inAmount = document.getElementById('amount').value;
        var inDisp = document.getElementById('disp').value;

        if (inPeriod === "" || inStDate === "" || inEndDate === "" || inNumber === "" || inMember === "" || inCategory === "" || inWing === "" || inFlat === "" || inAmount === "" || inDisp === "") {
            document.getElementById('form-val').innerHTML = 'Please Fill up all Details!!';
            document.getElementById('form-val').style.color = 'red';
        } else {
            const invoice1 = new invoice(inPeriod, inStDate, inEndDate, inNumber, inMember, inCategory, inWing, inFlat, inAmount, inDisp);
            localStorage.setItem('invoiceData' + Date.now(), JSON.stringify(invoice1));
            document.getElementById("invoice-form").reset();
            document.getElementById("in-done").style.display = "block";
            document.getElementById("in-done").animate(
                [
                    { transform: "translate(500px , -30px)" },
                    { transform: "translate(0px, -30px)" },
                ],
                {
                    duration: 700,
                    interation: 1,
                }
            );
            setTimeout(inDone, 5000);
            function inDone() {
                document.getElementById('in-done').style.scale = 0;
                document.getElementById('in-done').style.display = "none";
            }
        }
    }
    // get invoice data from localstorage and show in table
    const lsData = Object.keys(localStorage);
    for (let x of lsData) {
        if (x.substring(0, 11) === "invoiceData") {
            var inObj = JSON.parse(localStorage.getItem(x));
            // showing data in accounts table
            var accountTable = document.getElementById('acc-table');
            var accRow = accountTable.insertRow(1);
            accRow.insertCell(0).innerHTML = 1;
            accRow.insertCell(1).innerHTML = inObj.number;
            accRow.insertCell(2).innerHTML = "Name";
            accRow.insertCell(3).innerHTML = inObj.wing + "-" + inObj.flat;
            accRow.insertCell(4).innerHTML = inObj.category;
            accRow.insertCell(5).innerHTML = inObj.amount;
            accRow.insertCell(6).innerHTML = "Pending";
            accRow.insertCell(7).innerHTML = inObj.enddate;
            accRow.insertCell(8).innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
        }
    }
} catch (error) {
    console.log("Acconuts error : " + error);
}

// resposive 
try {
    var tables = document.querySelectorAll('table');
    tables.forEach(function (table) {
        table.classList.add("table-responsive");
    });

} catch (error) {
    console.log("resposive error" + error);
}

// logout
function logOut() {
    document.getElementById('lo-sec').style.display = "block";
    document.getElementById("lo-sec").animate(
        [
            { transform: "translate(-60px,-500px)" },
            { transform: "translate(-60px,-50px)" },
        ],
        {
            duration: 500,
            interation: 1,
        });

    document.getElementById('main').style.filter = "blur(1px)";
}
function loYes() {
    window.location.href = "login.html";
}
function loNo() {
    document.getElementById('lo-sec').style.display = 'none';
    document.getElementById('main').style.filter = "blur(0)";

}