const questions = [{
  question: "What is the capital city of Canada?",
  answers: [
    { option: "Toronto", status: false},
    { option: "Montreal", status: false},
    { option: "Ottawa", status: true},
    { option: "Vancouver", status: false}
  ]
},
{
  question: "The capital of Thailand, known for its ornate temples and bustling street markets, is ?",
  answers: [
    { option: "Bangkok", status: true},
    { option: "Chiang Mai", status: false},
    { option: "Phuket", status: false},
    { option: "Pattaya", status: false}
  ]
},
{
  question: "The city known for Brandenburg Gate is ?",
  answers: [
    { option: "Paris", status: false},
    { option: "Rome", status: false},
    { option: "Berlin", status: true},
    { option: "Madrid", status: false}
  ]
},
{
  question: "Hagia Sophia is located in ?",
  answers: [
    { option: "Istanbul", status: true},
    { option: "Ankara", status: false},
    { option: "Izmir", status: false},
    { option: "Antalya", status: false}
  ]
},
{
  question: "The capital of Uruguay, situated on the shores of the Rio de la Plata, is ?",
  answers: [
    { option: "Punta del Este", status: false},
    { option: "Montevideo", status: true},
    { option: "Colonia del Sacramento", status: false},
    { option: "Salto", status: false}
  ]
}
];
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextElement = document.getElementById("next-btn");
let questionIndex = 0;
let score = 0;

function startQuiz(){
  questionIndex = 0;
  score = 0;
  nextElement.innerHTML = "Next";
  showQuestion();
}
function showQuestion(){
  removeButtons()
  let currentQuestion = questions[questionIndex];
  let questionno = questionIndex + 1;
  questionElement.innerHTML = questionno + ". " + currentQuestion.question;
  currentQuestion.answers.forEach(
    answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.option;
    button.classList.add("btn");
    answerElement.appendChild(button);
    if(answer.status){
      button.dataset.status = answer.status;
    }
    button.addEventListener("click", selectAnswer);
  }
)
}
function removeButtons(){
  nextElement.style.display = "none";
  while(answerElement.firstChild){
    answerElement.removeChild(answerElement.firstChild);
  }
}
function selectAnswer(e){
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.status === "true";
  if(isCorrect){
    selectedbtn.classList.add("correct");
    score++;
  }else{
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerElement.children).forEach(button => {
    if(button.dataset.status === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextElement.style.display = "block";
}
function showScore(){
  removeButtons();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextElement.innerHTML = "Play again";
  nextElement.style.display = "block";
}
function handleNextButton(){
  questionIndex++;
  if(questionIndex<questions.length){
    showQuestion();
  }else{
    showScore();
  }
}
nextElement.addEventListener("click", ()=>{
  if(questionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})
startQuiz();