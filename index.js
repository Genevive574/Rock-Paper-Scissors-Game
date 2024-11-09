setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);
  
  
  const ruleBtn = document.querySelector(".rules-btn");
  const closeBtn = document.querySelector(".close-btn");
  const modeRules = document.querySelector(".mode");
  
  const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  const choiceBtn = document.querySelectorAll(".choice-btn");
  const game = document.querySelector(".game");
  const resultAlpha = document.querySelector(".results");
  const resultBeta = document.querySelectorAll(".results-bar");
  
  const gameWinner = document.querySelector(".game-winner");
  const gameText = document.querySelector(".game-text");
  
  const playAgainBtn = document.querySelector(".play-again");
  
  const scoreNumber = document.querySelector(".score-number");
  let score = 0;
  
  
  choiceBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
  }
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  }
  
  function displayResults(results) {
    resultBeta.forEach((resultDiv, index) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[index].name}">
            <img src="images/icon-${results[index].name}.svg" alt="${results[index].name}" />
          </div>
        `;
      }, index * 1000);
    });
  
    game.classList.toggle("hidden");
    resultAlpha.classList.toggle("hidden");
  }
  
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        gameText.innerText = "you win";
        resultBeta[0].classList.toggle("winner");
        keepScore(1);
      } else if (aiWins) {
        gameText.innerText = "you lose";
        resultBeta[1].classList.toggle("winner");
        keepScore(-1);
      } else {
        gameText.innerText = "draw";
      }
      gameWinner.classList.toggle("hidden");
      resultAlpha.classList.toggle("show-winner");
    }, 1000);
  }
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  
  function keepScore(point) {
    score += point;
    scoreNumber.innerText = score;
  }
  
  
  playAgainBtn.addEventListener("click", () => {
    game.classList.toggle("hidden");
    resultAlpha.classList.toggle("hidden");
  
    resultBeta.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    gameText.innerText = "";
    gameWinner.classList.toggle("hidden");
    resultAlpha.classList.toggle("show-winner");
  });
  
  ruleBtn.addEventListener("click", () => {
    modeRules.classList.toggle("show-mode");
  });
  closeBtn.addEventListener("click", () => {
    modeRules.classList.toggle("show-mode");
  });