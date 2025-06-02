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
    status.textContent = currentPlayer === 'X' ? "You won! 🎉" : "Riyansh won! 🤖";
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
  
  // Use minimax to find the best move
  const bestMove = findBestMove();
  makeMove(bestMove);
}

function findBestMove() {
  let bestScore = -Infinity;
  let bestMove = -1;
  
  // Try each empty cell
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === '') {
      gameState[i] = 'O';
      const score = minimax(gameState, 0, false);
      gameState[i] = '';
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  
  return bestMove;
}

function minimax(board, depth, isMaximizing) {
  // Check terminal states
  if (checkWinner('O')) return 10 - depth;
  if (checkWinner('X')) return depth - 10;
  if (isBoardFull()) return 0;
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinner(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === player;
    });
  });
}

function isBoardFull() {
  return gameState.every(cell => cell !== '');
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
}

// Initialize game
if (gameBoard) {
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  restartButton.addEventListener('click', restartGame);
}