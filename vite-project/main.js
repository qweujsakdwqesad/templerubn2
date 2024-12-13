document.getElementById('uploadForm').onsubmit = function(event) {
  alert('Form submitted');
  console.log('Form submitted');
  setTimeout(() => {
    const swfContainer = document.getElementById('swfContainer');
    const fileInput = document.querySelector('input[type=file]');
    if (fileInput.files.length > 0) {
      const filename = fileInput.files[0].name;
      alert('File selected: ' + filename);
      console.log('File selected:', filename);
      swfContainer.innerHTML = `<object data="http://upreme-space-computing-machine-wrgjw9prp79ph5995-3000.app.github.dev/uploads/${filename}" class="full" id="myObject" width="800" height="600"></object>`;
    } else {
      alert('No file selected');
      console.error('No file selected');
    }
  }, 2000); // Wait for 2 seconds for the upload to complete (adjust as needed)
  return true;
};
