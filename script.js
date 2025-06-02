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
});

// Re-initialize on window resize to handle dynamic content
window.addEventListener('resize', () => {
  revealElements.forEach(element => {
    element.classList.remove('active');
  });
  revealOnScroll();
});

// Game Widget Functionality
function toggleGame() {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.classList.toggle('active');
  if (gameContainer.classList.contains('active')) {
    startGame();
  }
}

// Game Logic
let currentPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

function startGame() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  updateStatus();
}

function handleCellClick(e) {
  const cell = e.target;
  const index = Array.from(cell.parentNode.children).indexOf(cell);

  if (gameBoard[index] !== '' || !gameActive) return;

  // Player's move (O)
  makeMove(index, 'O');
  
  if (checkWin()) {
    gameActive = false;
    updateStatus(`You won! 🎉`);
    return;
  }

  if (checkDraw()) {
    gameActive = false;
    updateStatus(`It's a draw! 🤝`);
    return;
  }

  // Bot's move (X)
  setTimeout(() => {
    if (gameActive) {
      const botMove = getBotMove();
      makeMove(botMove, 'X');
      
      if (checkWin()) {
        gameActive = false;
        updateStatus(`Bot wins! 🤖`);
        return;
      }

      if (checkDraw()) {
        gameActive = false;
        updateStatus(`It's a draw! 🤝`);
        return;
      }
    }
  }, 500);
}

function makeMove(index, player) {
  gameBoard[index] = player;
  const cell = document.querySelectorAll('.cell')[index];
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  currentPlayer = player === 'X' ? 'O' : 'X';
  updateStatus();
}

function getBotMove() {
  const availableMoves = gameBoard.map((cell, index) => cell === '' ? index : null).filter(cell => cell !== null);
  
  // Check for winning move (X)
  for (let move of availableMoves) {
    gameBoard[move] = 'X';
    if (checkWin()) {
      gameBoard[move] = '';
      return move;
    }
    gameBoard[move] = '';
  }
  
  // Check for blocking move (O)
  for (let move of availableMoves) {
    gameBoard[move] = 'O';
    if (checkWin()) {
      gameBoard[move] = '';
      return move;
    }
    gameBoard[move] = '';
  }

  // Take center if available
  if (gameBoard[4] === '') return 4;

  // Take opposite corner if player has a corner
  const corners = [0, 2, 6, 8];
  const oppositeCorners = {
    0: 8,
    2: 6,
    6: 2,
    8: 0
  };
  
  for (let corner of corners) {
    if (gameBoard[corner] === 'O' && gameBoard[oppositeCorners[corner]] === '') {
      return oppositeCorners[corner];
    }
  }

  // Take a corner
  const availableCorners = corners.filter(corner => gameBoard[corner] === '');
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take a side
  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(side => gameBoard[side] === '');
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }

  // Take any available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] !== '' && 
           gameBoard[a] === gameBoard[b] && 
           gameBoard[a] === gameBoard[c];
  });
}

function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}

function updateStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message || `Your turn (${currentPlayer})`;
}

function restartGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'O';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  updateStatus();
}