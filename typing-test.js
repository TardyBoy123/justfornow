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

    // Predefined text (you can modify it as needed)
    const providedText = `In a world where technology evolves at an unprecedented pace, the ethics of artificial intelligence pose significant dilemmas. Consider a self-driving car programmed to minimize harm. Faced with an unavoidable accident, should it prioritize the lives of its passengers over pedestrians? This moral quandary challenges utilitarian principles, questioning whether the greater good is truly served by sacrificing one for many. Furthermore, as AI becomes more autonomous, we must confront issues of accountability. When an algorithm makes a decision that results in harm, who bears responsibility—the programmer, the user, or the machine itself? Such ethical dilemmas require humanity to balance innovation with compassion, ensuring that technological advancements remain anchored in the core values of justice and empathy. Hence, thoughtful discourse is crucial in guiding ethical frameworks that govern AI development, safeguarding human dignity in the digital age.`;

    textToTypeElement.textContent = providedText;

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
            endTypingTest(providedText, testTime); // Pass the provided text and test time for WPM calculation
        }
    }, 1000);
}

function endTypingTest(providedText, testTime) {
    const typedText = document.getElementById('typed-text').value;
    const typedWords = typedText.trim().split(/\s+/).length;
    const rawWPM = Math.round((typedWords / testTime) * 60); // Calculate Raw WPM

    // Split provided text and typed text into words for accuracy calculation
    const providedWords = providedText.split(/\s+/);
    const typedWordsArray = typedText.trim().split(/\s+/);
    
    // Calculate accuracy by comparing each word
    let correctWords = 0;
    for (let i = 0; i < typedWordsArray.length; i++) {
        if (providedWords[i] === typedWordsArray[i]) {
            correctWords++;
        }
    }

    const accuracy = (correctWords / providedWords.length) * 100; // Accuracy as a percentage
    const adjustedWPM = Math.round((rawWPM * (accuracy / 100))); // Adjust WPM based on accuracy

    // Hide typing area and show result
    document.getElementById('typing-area').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');

    // Display results
    document.getElementById('word-count').textContent = typedWords;
    document.getElementById('wpm').textContent = `${rawWPM} WPM (Raw) / ${adjustedWPM} WPM (Adjusted for Accuracy: ${accuracy.toFixed(2)}%)`;
}
