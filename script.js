function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Form Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.form');

if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and forms
      tabBtns.forEach(b => b.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked button and corresponding form
      btn.classList.add('active');
      const formId = `${btn.dataset.tab}Form`;
      const form = document.getElementById(formId);
      if (form) {
        form.classList.add('active');
      }
    });
  });
}

// Form Submission
const contactForm = document.getElementById('contactForm');
const feedbackForm = document.getElementById('feedbackForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email')?.value || '',
      subject: document.getElementById('subject')?.value || '',
      message: document.getElementById('message')?.value || ''
    };

    try {
      const response = await fetch('https://formspree.io/f/xrbkgbwg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again later.');
      console.error('Error:', error);
    }
  });
}

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('feedbackName')?.value || '',
      email: document.getElementById('feedbackEmail')?.value || '',
      type: document.getElementById('feedbackType')?.value || '',
      message: document.getElementById('feedbackMessage')?.value || ''
    };

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Feedback submitted successfully!');
        feedbackForm.reset();
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      alert('Failed to submit feedback. Please try again later.');
      console.error('Error:', error);
    }
  });
}

// Chatbot functionality
function toggleChat() {
  const chatContainer = document.querySelector('.chat-container');
  chatContainer.classList.toggle('active');
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  
  if (message) {
    addMessage(message, 'user');
    const response = getBotResponse(message);
    setTimeout(() => {
      addMessage(response, 'bot');
    }, 500);
    input.value = '';
  }
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = `<p>${text}</p>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // About section responses
  if (lowerMessage.includes('about') || lowerMessage.includes('who are you')) {
    return "I'm Riyansh Singh, a passionate Full Stack Developer specializing in HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. I'm currently expanding my expertise in data science and generative AI.";
  }
  
  // Education responses
  if (lowerMessage.includes('education') || lowerMessage.includes('degree')) {
    return "I have a B.Tech. Bachelor's Degree in Artificial Intelligence & Data Science.";
  }
  
  // Skills responses
  if (lowerMessage.includes('skills') || lowerMessage.includes('expertise')) {
    return "My technical skills include Frontend Development (HTML, CSS, JavaScript, React), Backend Development (Node.js, Express, MongoDB, Python), and Data Science (Python, Pandas, NumPy, Scikit-learn). I also have strong soft skills in Communication, Problem Solving, and Team Collaboration.";
  }
  
  // Experience responses
  if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
    return "I have experience in both Frontend and Backend Development. I'm experienced in HTML, CSS, and Python, intermediate in Node.js and Git, and have basic knowledge of JavaScript, TypeScript, and MongoDB.";
  }
  
  // Projects responses
  if (lowerMessage.includes('projects') || lowerMessage.includes('work on')) {
    return "I've worked on various projects including a student management system. You can find more details about my projects in the Projects section of my portfolio.";
  }
  
  // Contact responses
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return "You can reach me at itsyourriyansh@gmail.com or connect with me on LinkedIn at linkedin.com/in/riyansh-singh-swe/";
  }
  
  // Achievements responses
  if (lowerMessage.includes('achievements') || lowerMessage.includes('awards')) {
    return "I've earned several achievements including Google Cloud Certification (Professional Cloud Developer), Hackathon Winner at University Tech Fest, Academic Excellence (Dean's List), and recognition as a Top Contributor in Hacktoberfest.";
  }
  
  // Special response for Ekta
  if (lowerMessage.includes('ekta') || lowerMessage.includes('girlfriend') || lowerMessage.includes('girl friend') || lowerMessage.includes('special someone') || lowerMessage.includes('love') || lowerMessage.includes('relationship')) {
    return "Ekta is my wonderful girlfriend! She's an amazing person who brings so much joy and positivity to my life. We share beautiful moments together and support each other in our journey. She's not just my partner but also my best friend and my biggest supporter. I'm truly grateful to have her in my life! 💖";
  }
  
  // Default response
  return "I'm not sure about that. You can ask me about Riyansh's experience, skills, education, projects, or contact information.";
}

// Scroll Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Remove the active class when element is out of view
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element comes into view
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
};

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  
  // Re-initialize on window resize to handle responsive changes
  window.addEventListener('resize', () => {
    revealElements.forEach(element => {
      element.classList.remove('active');
    });
    revealOnScroll();
  });
});

// Tic Tac Toe Game
const gameBoard = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X'; // X is human, O is AI
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let gamesPlayed = 0;
let gamesWon = 0;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (gameState[cellIndex] !== '' || !gameActive || currentPlayer === 'O') return;

  makeMove(cellIndex);
  
  if (gameActive) {
    setTimeout(() => {
      makeAIMove();
    }, 500);
  }
}

function makeMove(cellIndex) {
  gameState[cellIndex] = currentPlayer;
  cells[cellIndex].textContent = currentPlayer;
  cells[cellIndex].classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    gameActive = false;
    if (currentPlayer === 'X') {
      gamesWon++;
      status.textContent = "You won! 🎉";
    } else {
      status.textContent = "Riyansh won! 🤖";
    }
    highlightWinningCells();
    return;
  }

  if (checkDraw()) {
    gameActive = false;
    status.textContent = "It's a draw! 🤝";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = currentPlayer === 'X' ? "Your turn" : "Riyansh's turn...";
}

function makeAIMove() {
  if (!gameActive) return;

  // Determine AI difficulty based on games played
  const difficulty = Math.min(gamesPlayed, 10);
  const shouldAllowWin = gamesWon === 0 && gamesPlayed >= 10;

  // Try to win or block based on difficulty
  let move = findBestMove(difficulty, shouldAllowWin);
  if (move !== -1) {
    makeMove(move);
    return;
  }

  // If no strategic move, make a random move
  const emptyCells = gameState
    .map((cell, index) => cell === '' ? index : null)
    .filter(cell => cell !== null);
  
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    makeMove(emptyCells[randomIndex]);
  }
}

function findBestMove(difficulty, shouldAllowWin) {
  // Check for winning move (if allowed)
  if (shouldAllowWin) {
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === '') {
        gameState[i] = 'O';
        if (checkWin()) {
          gameState[i] = '';
          return i;
        }
        gameState[i] = '';
      }
    }
  }

  // Block player's winning move (always)
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === '') {
      gameState[i] = 'X';
      if (checkWin()) {
        gameState[i] = '';
        return i;
      }
      gameState[i] = '';
    }
  }

  // Create fork opportunities (higher difficulty)
  if (difficulty >= 5) {
    const forkMove = findForkMove();
    if (forkMove !== -1) return forkMove;
  }

  // Take center if available (medium difficulty)
  if (difficulty >= 3 && gameState[4] === '') return 4;

  // Take corners if available (medium difficulty)
  if (difficulty >= 3) {
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => gameState[corner] === '');
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
  }

  // Take edges if available (lower difficulty)
  if (difficulty >= 2) {
    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter(edge => gameState[edge] === '');
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }
  }

  return -1;
}

function findForkMove() {
  // Check for potential fork opportunities
  const forkPatterns = [
    [0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0],
    [3, 4, 5], [3, 5, 4], [4, 3, 5], [4, 5, 3], [5, 3, 4], [5, 4, 3],
    [6, 7, 8], [6, 8, 7], [7, 6, 8], [7, 8, 6], [8, 6, 7], [8, 7, 6]
  ];

  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === '') {
      gameState[i] = 'O';
      let forkCount = 0;
      
      for (const pattern of forkPatterns) {
        if (pattern.every(index => gameState[index] === 'O' || index === i)) {
          forkCount++;
        }
      }

      gameState[i] = '';
      if (forkCount >= 2) return i;
    }
  }

  return -1;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return gameState.every(cell => cell !== '');
}

function highlightWinningCells() {
  winningCombinations.forEach(combination => {
    if (combination.every(index => gameState[index] === currentPlayer)) {
      combination.forEach(index => {
        cells[index].classList.add('winning');
      });
    }
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = "Your turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winning');
  });
  gamesPlayed++;
}

// Initialize game
if (gameBoard) {
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  restartButton.addEventListener('click', restartGame);
}