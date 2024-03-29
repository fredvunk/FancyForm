// Questions array
const questions = [
    {question: 'Enter Your First Name'},
    {question: 'Enter Your Last Name'},
    {question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/},
    {question: 'Create A Password', type: 'password'}

];

// Transition times
const shakeTime = 100;
const switchTime = 200;

// Init position at first question
let position = 0;


// Init DOM elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events

// Get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next btn click
nextBtn.addEventListener('click', validate);

// Input field Enter Click
inputField.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        validate();
    }
});

// Functions
function getQuestion() {
    // Get Current Question
    inputLabel.innerHTML = questions[position].question;
    // Get  Current Type
    inputField.type = questions[position].type || 'text';
    // Get Current Answer
    inputField.value = questions[position].answer || '';
    // Focus on Element
    inputField.focus();
    //Set Progress Bar width - variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';
    // Add user Icon or Back Arrow Depending on Question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas' +
        ' fa-user';
    showQuestion();
}

// Display Question to User
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

// Hide Question from User
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

// Transform To Create Shake MOtion
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}


// Validate Field
function validate() {
    // Make Sure Pattern Matches if There is one
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

// Field Input Fail
function inputFail() {
    formBox.className = 'error';
    // Repeat shake motion - set i to number of shakes
    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

// Field input Passed
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);
    // Store answer in Array
    questions[position].answer = inputField.value;

// Increment position
    position++;
    // If new question, hide current and get next
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100';
        // Form complete
        formComplete();
    }
}

// All Fields complete show h1 end
function formComplete() {
    console.log(questions);
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are Registered and will get an email shory`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}