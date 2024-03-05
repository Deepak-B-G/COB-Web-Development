const textInput = document.getElementById('text-input');
const wordCountDisplay = document.getElementById('word-count');

textInput.addEventListener('input', function () {
    const text = this.value;
    const wordCount = countWords(text);
    wordCountDisplay.textContent = `Word Count: ${wordCount}`;
});

function countWords(text) {
    // Split text by non-alphabetic characters and count non-empty words
    const words = text.trim().split(/[^a-zA-Z]+/).filter(word => word !== '');
    return words.length;
}
