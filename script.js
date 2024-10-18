// Function to convert uploaded file to DNA sequence
function convertToDNA() {
    const fileInput = document.getElementById('fileInput');
    const binaryOutput = document.getElementById('binaryOutput');
    const dnaOutput = document.getElementById('dnaOutput');
    const decodedImage = document.getElementById('decodedImage');
    const decodedBinaryOutput = document.getElementById('decodedBinaryOutput');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryString = event.target.result.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
        const dnaString = binaryToDNA(binaryString);

        binaryOutput.textContent = binaryString;
        dnaOutput.textContent = dnaString;
        
        // Clear previous image
        decodedImage.src = '';
        decodedImage.style.display = 'none';
        decodedBinaryOutput.style.display = 'none';
    };

    if (file) {
        reader.readAsBinaryString(file);
    } else {
        alert('Please upload a file.');
    }
}

// Function to convert binary string to DNA
function binaryToDNA(binaryString) {
    const mapping = {
        '00': 'A',
        '01': 'T',
        '10': 'C',
        '11': 'G'
    };

    let dnaString = '';
    for (let i = 0; i < binaryString.length; i += 2) {
        const pair = binaryString.substr(i, 2);
        dnaString += mapping[pair] || '';
    }

    return dnaString;
}

// Function to copy text to clipboard
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Function to confirm decoding of DNA
function confirmDecode() {
    if (confirm("Do you want to decode the DNA sequence?")) {
        decodeDNA();
    }
}

// Function to decode DNA back to binary and retrieve image
function decodeDNA() {
    const dnaString = document.getElementById('dnaOutput').textContent;
    const binaryOutput = document.getElementById('decodedBinaryOutput');
    const decodedImage = document.getElementById('decodedImage');

    const binaryString = dnaToBinary(dnaString);
    binaryOutput.textContent = binaryString;
    binaryOutput.style.display = 'block';

    // Simulating the retrieval of the original image
    const imagePath = 'F:/data/data.jfif'; // Update this with the correct path to the decoded image
    decodedImage.src = imagePath;
    decodedImage.style.display = 'block';
}

// Function to convert DNA to binary
function dnaToBinary(dnaString) {
    const mapping = {
        'A': '00',
        'T': '01',
        'C': '10',
        'G': '11'
    };

    let binaryString = '';
    for (const char of dnaString) {
        binaryString += mapping[char] || '';
    }

    return binaryString;
}
