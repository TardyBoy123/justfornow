document.getElementById('start-test').addEventListener('click', startTypingTest);

function startTypingTest() {
    const testTime = parseInt(document.getElementById('test-time').value);
    const textArea = document.getElementById('typed-text');
    const textToType = document.getElementById('text-to-type').innerText;
    const timeLeftDisplay = document.getElementById('time-left');
    const typingArea = document.getElementById('typing-area');
    const resultArea = document.getElementById('result');
    let timeLeft = testTime;
    let interval;

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
            endTypingTest();
        }
    }, 1000);
}

function endTypingTest() {
    const typedText = document.getElementById('typed-text').value;
    const wordCount = typedText.trim().split(/\s+/).length;
    
    // Hide typing area and show result
    document.getElementById('typing-area').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('word-count').textContent = wordCount;
}
