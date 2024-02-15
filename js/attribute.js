
// function plates_left(){
//     let plates_left_count ;
//     if(window.XMLHttpRequest)
//     {
//       obj=new XMLHttpRequest();
//     }
//     else
//     {
//       obj=new ActiveXObject('Microsoft.XMLHTTP');
//     }
//     obj.open("GET","https://khasbiryani.000webhostapp.com/reader.php",true);
//     obj.send();
//     obj.onreadystatechange=function()
//     {
//     if(obj.readyState==4 && obj.status==200)
//     {
//         // return obj.responseText;
//       value=obj.responseText;
//                 // console.log(value);
//                 plates_left_count = value;
//                 console.log(plates_left_count);


//             }
//             }
//             console.log(plates_left_count);
//             return plates_left_count;

// }

function plates_left() {
    // Create a Promise object
     return new Promise((resolve, reject) => {
      // Create the AJAX request
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "https://khasbiryani.000webhostapp.com/reader.php", true);
  
      // Handle response received
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Parse and resolve with extracted value
            // console.log(xhr.responseText);
            let platesLeftCount = xhr.responseText; // assuming JSON response
            resolve(platesLeftCount);
          } else {
            // Reject with error information
            reject(new Error("Error fetching data: " + xhr.statusText));
          }
        }
      };
  
      // Send the request
      xhr.send();
    });
  }

  function getOrderDate() {
    // Create a Promise object
     return new Promise((resolve, reject) => {
      // Create the AJAX request
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "https://khasbiryani.000webhostapp.com/getorderingdate.php", true);
  
      // Handle response received
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Parse and resolve with extracted value
            // console.log(xhr.responseText);
            let orderingDate= xhr.responseText; // assuming JSON response
            resolve(orderingDate);
          } else {
            // Reject with error information
            reject(new Error("Error fetching data: " + xhr.statusText));
          }
        }
      };
  
      // Send the request
      xhr.send();
    });
  }
  
  // Using the function
  
function check_plates_order(){
    plates_left()
    .then(platesLeft => {
        console.log(platesLeft);
        var numOptions = platesLeft; // Update this to your desired number of options
      
        // Select your select element
        var selectElement = $("#count");
      
        // Loop through the numbers and create options
        for (var i = 1; i <= numOptions; i++) {
          selectElement.append("<option value='" + i + "'>" + i + "</option>");
        }
    })
    .catch(error => {
      console.error("Error retrieving plates:", error);
    });

}
function update_plates_left(){


    plates_left()
    .then(platesLeft => {
        plates_left_count = platesLeft;
    document.getElementById('plates-left').innerHTML = plates_left_count;
        console.log(platesLeft);
    if(plates_left_count==0){
        $(".order-now-btn").addClass("hide");
    }
    else{
        
            if ($('.order-now-btn').hasClass('hide')) {
              $('.order-now-btn').removeClass('hide');
            }
         
          
    }
    })
    .catch(error => {
      console.error("Error retrieving plates:", error);
    });
    
}

$(document).ready(function() {
$(".order_submit").click(function(){
    console.log("check form submitting");
    const orderingDate = document.getElementById("orderingdate");
    const fname = document.getElementById("fname");
    const phone = document.getElementById("phone");
    const address = document.getElementById("add");
    const area = document.getElementById("area");   
    const count = document.getElementById("count");
    let alertBox = document.querySelector(".alert-box");
    let isValid = true;

    
  
    // Check for empty required fields
    if (fname.value.trim() === "") {
      alertBox.innerHTML = "Please enter your full name.";
      if (alertBox.classList.contains("hide")) {
        alertBox.classList.remove('hide');
      }
      isValid = false;
      fname.focus();
      return;
    } else if (phone.value.trim() === "") {
        alertBox.innerHTML = "Please enter your phone number.";
        if (alertBox.classList.contains("hide")) {
            alertBox.classList.remove('hide');
          }
      isValid = false;
      phone.focus();
      return;
    } else if (address.value.trim() === "") {
        alertBox.innerHTML = "Please enter your address.";
        if (alertBox.classList.contains("hide")) {
            alertBox.classList.remove('hide');
          }
      isValid = false;
      address.focus();
      return;
    } else if (area.value === "") {
        alertBox.innerHTML = "Please select your area.";
        if (alertBox.classList.contains("hide")) {
            alertBox.classList.remove('hide');
          }
      isValid = false;
      area.focus();
      return;
    } else if (count.value === "") {
        alertBox.innerHTML = "Please select the number of plates.";
        if (alertBox.classList.contains("hide")) {
            alertBox.classList.remove('hide');
          }
      isValid = false;
      count.focus();
      return;
    }
  
    // Check phone number format
    if (phone.value.trim().length !== 10 || isNaN(phone.value.trim())) {
        alertBox.innerHTML = "Please enter a valid 10-digit phone number.";
        if (alertBox.classList.contains("hide")) {
            alertBox.classList.remove('hide');
          }
      isValid = false;
      phone.focus();
      return;
    }
  
    // Submit the form if all validations pass
    if (isValid) {
        if (!alertBox.classList.contains("hide")) {
            alertBox.classList.add('hide');
          }
          let dataDump = orderingDate.value.trim()+"$"+fname.value.trim()+"$"+phone.value.trim()+"$"+address.value.trim()+"$"+area.value.trim()+"$"+count.value.trim()+"$"+document.getElementById("comment").value.trim();
      // Optionally add further processing or validation here
      put_data_dump(dataDump)
      .then(res => {
        console.log(res);
        if(res=="success"){
            window.location.href="thankyou.html";
        }
        else{
            alert("order not place, please refresh and try again!");
        }
        
    })
    .catch(error => {
      console.error("Error retrieving orderingDate:", error);
    });
      
    }


}
    
);
});


function ordering_for(){
    getOrderDate()
    .then(orderingDate => {
        console.log(orderingDate);
        const [month, day, year] = orderingDate.split('-');
        let dateValue = `${year}-${month}-${day}`;
        document.getElementById("orderingdate").value = dateValue;
    })
    .catch(error => {
      console.error("Error retrieving orderingDate:", error);
    });
    
}

function put_data_dump(dataDump){
    return new Promise((resolve, reject) => {
        // Create the AJAX request
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://khasbiryani.000webhostapp.com/putdatadump.php?dataDump="+dataDump, true);
    
        // Handle response received
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // Parse and resolve with extracted value
              // console.log(xhr.responseText);
              let res= xhr.responseText; // assuming JSON response
              resolve(res);
            } else {
              // Reject with error information
              reject(new Error("Error fetching data: " + xhr.statusText));
            }
          }
        };
    
        // Send the request
        xhr.send();
      });
}