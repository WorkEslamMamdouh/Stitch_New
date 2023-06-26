


//$("#Btn_fileUpload").click(function (e) {
//    uploadFile();
//});



function uploadFile() {
    debugger
    var fileInput = document.getElementById("fileUploadInput");
    var file = fileInput.files[0];

    $("#fileName").val("" + file.name+"")
     

    var formData = new FormData();
    formData.append("fileUpload", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/FileUpload/Upload"); // Replace with your server endpoint URL
    xhr.onload = function () {
        if (xhr.status === 200) {
            // File uploaded successfully
            console.log("File uploaded!");
            alert("File uploaded!")
        } else {
            // File upload failed
            console.error("File upload failed!");
            alert("File upload failed!")
        }
    };
    xhr.send(formData);
}


function Download() {

    debugger



    
    var url = encodeURIComponent(localStorage.getItem('GloplePath'));
    var filename = localStorage.getItem('NameFile');
     
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            saveAs(blob, filename);
            alert('Done Download')
        })
        .catch(error => {
            console.error("Error:", error);
        });

     
}