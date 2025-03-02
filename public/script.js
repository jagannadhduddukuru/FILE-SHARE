    document.getElementById('fileInput').addEventListener('change', function() {
        const fileInput = this;
        const fileNameDisplay = document.getElementById('fileNameDisplay');

        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            fileNameDisplay.textContent = "Selected file: " + fileName;
        } else {
            fileNameDisplay.textContent = ""; // Clear if no file is selected
        }
    });

    
async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const uploadBox = document.getElementById("uploadBox");

    if (fileInput.files.length === 0) {
        alert("Please select a file!");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/upload", { method: "POST", body: formData });
        const data = await response.json();

        if (data.fileId) {
            document.getElementById("fileCode").innerText = "File Code: " + data.fileId;
            document.getElementById("qrCode").src = data.qrCode;
            document.getElementById("qrCode").style.display = "block";

            // ✅ Show the uploaded file name inside uploadBox
            uploadBox.innerHTML = `<p>Uploaded File: <strong>${file.name}</strong></p>`;
        } else {
            alert("Error uploading file");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}



function downloadFile() {
    const fileId = document.getElementById("fileIdInput").value;
    if (!fileId) {
        alert("Enter a file code!");
        return;
    }

    window.location.href = "/download/" + fileId;
}
