let questionForm = document.getElementById('question-form'),
    questionInput = document.getElementById('question'),
    answerBtn = document.getElementById('answer'),
    responseDiv = document.getElementById('response'),
    recognizeBtn = document.getElementById('recognize');

questionForm.onsubmit = function() {
    processQuestion(questionInput.value.trim());
    return false;
}

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition,
    recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onstart = function() {
    disableControls(true);
}

recognition.onerror = function() {
    disableControls(false);
    respond('Please try again');
}

recognition.onresult = function(e) {
    disableControls(false);
    questionInput.value = e.results[0][0].transcript;
    processQuestion(e.results[0][0].transcript);
}

recognizeBtn.onclick = function() {
    recognition.start();
}

function processQuestion(question) {
    question = question.trim();
    if (question.length > 0) {
        disableControls(true);
        // Wolfram Alpha does not support cross-origin requests
        fetch(`wolfram_speech_api.php?q=${encodeURIComponent(question)}`).then(response => {
            if (response.ok) {
                response.text().then(text => {
                    if (text.trim().length == 0) {
                        text = "There is no answer available.";
                    }
                    respond(text);
                    disableControls(false);
                });
            }
        });
    }
}

function respond(response) {
    responseDiv.innerHTML = response;
    sayInEnglish(response);
}

function sayInEnglish(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

function disableControls(val) {
    answerBtn.disabled = val;
    recognizeBtn.disabled = val;
    questionInput.disabled = val;
}
