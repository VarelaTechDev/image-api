document.getElementById('loadImage').addEventListener('click', () => {
  const folderSelect = document.getElementById('folderSelect');
  const selectedFolder = folderSelect.value;

  if (selectedFolder === 'base') {
    const apiUrl = 'http://localhost:4000/ai';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        document.getElementById('aiImage').src = data.url;
      })
      .catch(error => console.error('Error:', error));
  } else {
    if (selectedFolder) {
      const apiUrl = `http://localhost:4000/ai/${selectedFolder}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          document.getElementById('aiImage').src = data.url;
        })
        .catch(error => console.error('Error:', error));
    }
  }
});
