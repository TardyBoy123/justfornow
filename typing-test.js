// Array of sample words to generate random text
const wordsArray = [
    "apple", "banana", "cherry", "dragonfruit", "elephant", "fantasy", "giraffe", "harmony", "iguana", "jellyfish",
    "kangaroo", "lemon", "mountain", "night", "orange", "piano", "quartz", "river", "strawberry", "tiger",
    "umbrella", "violet", "waterfall", "xylophone", "yellow", "zebra", "adventure", "bravery", "courage", "dolphin"
];

// Function to generate random text
function generateRandomText(wordCount) {
    let text = [];
    for (let i = 0; i < wordCount; i++) {
        text.push(wordsArray[Math.floor(Math.random() * wordsArray.length)]);
    }
    return text.join(' ');
}

document.getElementById('start-test').addEventListener('click', startTypingTest);

function startTypingTest() {
    const testTime = parseInt(document.getElementById('test-time').value);
    const textArea = document.getElementById('typed-text');
    const timeLeftDisplay = document.getElementById('time-left');
    const typingArea = document.getElementById('typing-area');
    const resultArea = document.getElementById('result');
    const textToTypeElement = document.getElementById('text-to-type');
    let timeLeft = testTime;
    let interval;

    // Generate random text and set it for the typing test
    const generatedText = generateRandomText(50); // Generate 50 words of random text
    textToTypeElement.textContent = generatedText;

    // Reset everything before starting the test
    textArea.value = '';
    typingArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    timeLeftDisplay.textContent = timeLeft;

    // Start the countdown
    interval = setInterval(function() {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(interval);
            endTypingTest(testTime); // Pass test time for WPM calculation
        }
    }, 1000);
}

function endTypingTest(testTime) {
    const typedText = document.getElementById('typed-text').value;
    const wordCount = typedText.trim().split(/\s+/).length;
    const wpm = Math.round((wordCount / testTime) * 60); // Calculate WPM based on time

    // Hide typing area and show result
    document.getElementById('typing-area').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('word-count').textContent = wordCount;
    document.getElementById('wpm').textContent = wpm;
}
