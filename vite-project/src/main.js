document.getElementById('uploadForm').onsubmit = async function(event) {
  event.preventDefault(); // Prevent default form submission
  alert('Form submitted');
  console.log('Form submitted');

  const fileInput = document.querySelector('input[type=file]');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    alert('File selected: ' + file.name);
    console.log('File selected:', file.name);

    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload the file using fetch
      const response = await fetch('https://supreme-space-computing-machine-wrgjw9prp79ph5995-8000.app.github.dev/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Assuming the server returns a JSON response
      const data = await response.json();
      alert('File uploaded successfully');
      console.log('File uploaded successfully:', data);

      // Display the uploaded file using Ruffle
      const swfContainer = document.getElementById('swfContainer');
      swfContainer.innerHTML = `<object data="https://supreme-space-computing-machine-wrgjw9prp79ph5995-8000.app.github.dev/uploads/${file.name}" class="full" id="myObject" width="1920" height="1080"></object>`;
    } catch (error) {
      alert('Error uploading file');
      console.error('Error uploading file:', error);
    }
  } else {
    alert('No file selected');
    console.error('No file selected');
  }
};
