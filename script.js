// Game Data
const vocabulary = [
    { chinese: '你好', pinyin: 'nǐ hǎo', english: 'Hello', category: 'greetings' },
    { chinese: '谢谢', pinyin: 'xiè xie', english: 'Thank you', category: 'greetings' },
    { chinese: '再见', pinyin: 'zài jiàn', english: 'Goodbye', category: 'greetings' },
    { chinese: '我', pinyin: 'wǒ', english: 'I/Me', category: 'pronouns' },
    { chinese: '你', pinyin: 'nǐ', english: 'You', category: 'pronouns' },
    { chinese: '他', pinyin: 'tā', english: 'He/Him', category: 'pronouns' },
    { chinese: '她', pinyin: 'tā', english: 'She/Her', category: 'pronouns' },
    { chinese: '它', pinyin: 'tā', english: 'It', category: 'pronouns' },
    { chinese: '爱', pinyin: 'ài', english: 'Love', category: 'verbs' },
    { chinese: '猫', pinyin: 'māo', english: 'Cat', category: 'animals' },
    { chinese: '狗', pinyin: 'gǒu', english: 'Dog', category: 'animals' },
    { chinese: '水', pinyin: 'shuǐ', english: 'Water', category: 'food' },
    { chinese: '茶', pinyin: 'chá', english: 'Tea', category: 'food' },
    { chinese: '米饭', pinyin: 'mǐ fàn', english: 'Rice', category: 'food' },
    { chinese: '学校', pinyin: 'xué xiào', english: 'School', category: 'places' },
    { chinese: '老师', pinyin: 'lǎo shī', english: 'Teacher', category: 'people' },
    { chinese: '学生', pinyin: 'xué shēng', english: 'Student', category: 'people' },
    { chinese: '是', pinyin: 'shì', english: 'To be', category: 'verbs' },
    { chinese: '不是', pinyin: 'bù shì', english: 'Not to be', category: 'verbs' },
    { chinese: '有', pinyin: 'yǒu', english: 'To have', category: 'verbs' },
    { chinese: '没有', pinyin: 'méi yǒu', english: 'To not have', category: 'verbs' }
];

const levels = [
    { id: 1, name: 'Greetings', words: ['你好', '谢谢', '再见'] },
    { id: 2, name: 'Pronouns', words: ['我', '你', '他', '她', '它'] },
    { id: 3, name: 'Animals', words: ['猫', '狗'] },
    { id: 4, name: 'Food & Drink', words: ['水', '茶', '米饭'] },
    { id: 5, name: 'People', words: ['老师', '学生'] },
    { id: 6, name: 'Places', words: ['学校'] },
    { id: 7, name: 'Verbs', words: ['爱', '是', '不是', '有', '没有'] }
];

// Game State
let gameState = {
    username: '',
    xp: 0,
    level: 1,
    hearts: 5,
    streak: 0,
    lastLogin: null,
    dailyGoal: 100,
    dailyProgress: 0,
    unlockedLevels: [1],
    currentLesson: null,
    quizProgress: { current: 0, total: 5 },
    soundEnabled: true,
    darkMode: false,
    items: {
        hearts: 0,
        freeze: 0,
        doubleXP: 0
    },
    achievements: [],
    highScores: {}
};

// DOM Elements
const elements = {
    loginScreen: document.getElementById('loginScreen'),
    dashboardScreen: document.getElementById('dashboardScreen'),
    mapScreen: document.getElementById('mapScreen'),
    lessonScreen: document.getElementById('lessonScreen'),
    quizScreen: document.getElementById('quizScreen'),
    matchScreen: document.getElementById('matchScreen'),
    writingScreen: document.getElementById('writingScreen'),
    shopScreen: document.getElementById('shopScreen'),
    profileScreen: document.getElementById('profileScreen'),
    settingsScreen: document.getElementById('settingsScreen'),
    
    // Stats
    heartsCount: document.getElementById('heartsCount'),
    xpCount: document.getElementById('xpCount'),
    levelCount: document.getElementById('levelCount'),
    streakCount: document.getElementById('streakCount'),
    
    // Dashboard
    dashboardXP: document.getElementById('dashboardXP'),
    dashboardLevel: document.getElementById('dashboardLevel'),
    dashboardStreak: document.getElementById('dashboardStreak'),
    dailyGoalProgress: document.getElementById('dailyGoalProgress'),
    
    // Buttons
    startBtn: document.getElementById('startBtn'),
    continueBtn: document.getElementById('continueBtn'),
    shopBtn: document.getElementById('shopBtn'),
    profileBtn: document.getElementById('profileBtn'),
    
    // Level Map
    levelPath: document.getElementById('levelPath'),
    
    // Lesson
    lessonWord: document.getElementById('lessonWord'),
    lessonPinyin: document.getElementById('lessonPinyin'),
    lessonTranslation: document.getElementById('lessonTranslation'),
    listenBtn: document.getElementById('listenBtn'),
    nextLessonBtn: document.getElementById('nextLessonBtn'),
    
    // Quiz
    questionText: document.getElementById('questionText'),
    optionsGrid: document.getElementById('optionsGrid'),
    quizProgress: document.getElementById('quizProgress'),
    questionNum: document.getElementById('questionNum'),
    totalQuestions: document.getElementById('totalQuestions'),
    
    // Match Pairs
    pairsGrid: document.getElementById('pairsGrid'),
    resetPairsBtn: document.getElementById('resetPairsBtn'),
    
    // Writing
    writingTarget: document.getElementById('writingTarget'),
    writingCanvas: document.getElementById('writingCanvas'),
    clearCanvasBtn: document.getElementById('clearCanvasBtn'),
    nextCharBtn: document.getElementById('nextCharBtn'),
    
    // Profile
    profileAvatar: document.getElementById('profileAvatar'),
    profileUsername: document.getElementById('profileUsername'),
    profileJoinDate: document.getElementById('profileJoinDate'),
    profileTotalXP: document.getElementById('profileTotalXP'),
    profileLevel: document.getElementById('profileLevel'),
    profileStreak: document.getElementById('profileStreak'),
    lessonsCompleted: document.getElementById('lessonsCompleted'),
    
    // Settings
    darkModeToggle: document.getElementById('darkModeToggle'),
    soundToggle: document.getElementById('soundToggle'),
    resetProgressBtn: document.getElementById('resetProgressBtn')
};

// Audio Context
let audioContext;

// Initialize App
function init() {
    loadGame();
    setupEventListeners();
    updateUI();
    
    // Check for daily streak
    checkDailyStreak();
}

function setupEventListeners() {
    // Login
    elements.startBtn.addEventListener('click', startGame);
    
    // Navigation
    elements.continueBtn.addEventListener('click', showMap);
    elements.shopBtn.addEventListener('click', showShop);
    elements.profileBtn.addEventListener('click', showProfile);
    
    // Lesson
    elements.listenBtn.addEventListener('click', () => speakText(elements.lessonWord.textContent));
    elements.nextLessonBtn.addEventListener('click', startQuiz);
    
    // Match Pairs
    elements.resetPairsBtn.addEventListener('click', startMatchPairs);
    
    // Writing
    elements.clearCanvasBtn.addEventListener('click', clearCanvas);
    elements.nextCharBtn.addEventListener('click', nextWritingChar);
    
    // Settings
    elements.darkModeToggle.addEventListener('change', toggleDarkMode);
    elements.soundToggle.addEventListener('change', toggleSound);
    elements.resetProgressBtn.addEventListener('click', resetProgress);
    
    // Canvas
    setupCanvas();
}

// Game Logic
function startGame() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter a username');
        return;
    }
    
    gameState.username = username;
    gameState.lastLogin = new Date().toISOString();
    saveGame();
    
    showDashboard();
}

function showDashboard() {
    switchScreen('dashboardScreen');
    updateDashboard();
}

function showMap() {
    switchScreen('mapScreen');
    renderLevelMap();
}

function showLesson(levelId) {
    const level = levels.find(l => l.id === levelId);
    if (!level) return;
    
    gameState.currentLesson = level;
    switchScreen('lessonScreen');
    renderLesson();
}

function renderLesson() {
    const word = vocabulary.find(v => v.chinese === gameState.currentLesson.words[0]);
    if (!word) return;
    
    elements.lessonWord.textContent = word.chinese;
    elements.lessonPinyin.textContent = word.pinyin;
    elements.lessonTranslation.textContent = word.english;
}

function startQuiz() {
    switchScreen('quizScreen');
    gameState.quizProgress.current = 0;
    startNextQuestion();
}

function startNextQuestion() {
    if (gameState.quizProgress.current >= gameState.quizProgress.total) {
        endQuiz();
        return;
    }
    
    gameState.quizProgress.current++;
    elements.questionNum.textContent = gameState.quizProgress.current;
    elements.totalQuestions.textContent = gameState.quizProgress.total;
    
    const currentWord = vocabulary.find(v => v.chinese === gameState.currentLesson.words[gameState.quizProgress.current - 1]);
    if (!currentWord) return;
    
    // Generate question
    const isChineseToEnglish = Math.random() > 0.5;
    const question = isChineseToEnglish ? currentWord.chinese : currentWord.english;
    const correctAnswer = isChineseToEnglish ? currentWord.english : currentWord.chinese;
    
    elements.questionText.textContent = isChineseToEnglish ? 
        `What does "${question}" mean?` : 
        `How do you say "${question}" in Chinese?`;
    
    // Generate options
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
        const option = isChineseToEnglish ? randomWord.english : randomWord.chinese;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    // Render options
    elements.optionsGrid.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option === correctAnswer, btn);
        elements.optionsGrid.appendChild(btn);
    });
    
    // Update progress bar
    const progress = (gameState.quizProgress.current / gameState.quizProgress.total) * 100;
    elements.quizProgress.style.width = `${progress}%`;
}

function checkAnswer(isCorrect, button) {
    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        button.classList.add('correct');
        playSound('correct');
        addXP(20);
        setTimeout(startNextQuestion, 1000);
    } else {
        button.classList.add('wrong');
        playSound('wrong');
        gameState.hearts--;
        updateHearts();
        setTimeout(startNextQuestion, 1000);
    }
}

function endQuiz() {
    const xpGained = gameState.quizProgress.total * 20;
    addXP(xpGained);
    
    // Unlock next level
    const currentLevelIndex = levels.findIndex(l => l.id === gameState.currentLesson.id);
    if (currentLevelIndex < levels.length - 1) {
        const nextLevel = levels[currentLevelIndex + 1];
        if (!gameState.unlockedLevels.includes(nextLevel.id)) {
            gameState.unlockedLevels.push(nextLevel.id);
        }
    }
    
    saveGame();
    showLevelUp(xpGained);
}

function showLevelUp(xpGained) {
    document.getElementById('newLevel').textContent = gameState.level;
    document.getElementById('levelUpXP').textContent = xpGained;
    document.getElementById('levelUpModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    showDashboard();
}

function restoreHearts() {
    if (gameState.xp >= 50) {
        gameState.xp -= 50;
        gameState.hearts = 5;
        updateUI();
        saveGame();
        closeModal('gameOverModal');
    } else {
        alert('Not enough XP!');
    }
}

// Match Pairs Game
function startMatchPairs() {
    switchScreen('matchScreen');
    const words = vocabulary.slice(0, 8);
    const pairs = [...words, ...words];
    pairs.sort(() => Math.random() - 0.5);
    
    elements.pairsGrid.innerHTML = '';
    pairs.forEach(pair => {
        const card = document.createElement('div');
        card.className = 'pair-card';
        card.textContent = Math.random() > 0.5 ? pair.chinese : pair.english;
        card.onclick = () => flipCard(card, pair);
        elements.pairsGrid.appendChild(card);
    });
}

let flippedCards = [];
let matchedPairs = 0;

function flipCard(card, pair) {
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    flippedCards.push({ card, pair });
    
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.pair.chinese === card2.pair.chinese) {
            card1.card.classList.add('matched');
            card2.card.classList.add('matched');
            matchedPairs++;
            playSound('correct');
            
            if (matchedPairs === 8) {
                setTimeout(() => {
                    addXP(50);
                    showDashboard();
                }, 1000);
            }
        } else {
            setTimeout(() => {
                card1.card.classList.remove('flipped');
                card2.card.classList.remove('flipped');
                playSound('wrong');
            }, 1000);
        }
        flippedCards = [];
    }
}

// Writing Practice
function showWriting() {
    switchScreen('writingScreen');
    nextWritingChar();
}

let currentWritingChar = '你';
let isDrawing = false;
let context;

function setupCanvas() {
    context = elements.writingCanvas.getContext('2d');
    
    elements.writingCanvas.addEventListener('mousedown', startDrawing);
    elements.writingCanvas.addEventListener('mousemove', draw);
    elements.writingCanvas.addEventListener('mouseup', stopDrawing);
    elements.writingCanvas.addEventListener('mouseleave', stopDrawing);
    
    // Touch support
    elements.writingCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e.touches[0]);
    }, { passive: false });
    elements.writingCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    }, { passive: false });
    elements.writingCanvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    context.beginPath();
    context.moveTo(e.clientX - elements.writingCanvas.getBoundingClientRect().left,
                   e.clientY - elements.writingCanvas.getBoundingClientRect().top);
}

function draw(e) {
    if (!isDrawing) return;
    context.lineTo(e.clientX - elements.writingCanvas.getBoundingClientRect().left,
                  e.clientY - elements.writingCanvas.getBoundingClientRect().top);
    context.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    context.clearRect(0, 0, elements.writingCanvas.width, elements.writingCanvas.height);
}

function nextWritingChar() {
    const randomWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    currentWritingChar = randomWord.chinese;
    elements.writingTarget.textContent = currentWritingChar;
    clearCanvas();
}

// Shop
function showShop() {
    switchScreen('shopScreen');
    updateShopDisplay();
}

function buyItem(itemType) {
    const costs = { hearts: 50, freeze: 100, double: 200 };
    const cost = costs[itemType];
    
    if (gameState.xp >= cost) {
        gameState.xp -= cost;
        gameState.items[itemType]++;
        playSound('correct');
        updateUI();
        saveGame();
    } else {
        alert('Not enough XP!');
    }
}

// Profile
function showProfile() {
    switchScreen('profileScreen');
    updateProfile();
}

// Settings
function toggleDarkMode() {
    gameState.darkMode = elements.darkModeToggle.checked;
    document.body.setAttribute('data-theme', gameState.darkMode ? 'dark' : 'light');
    saveGame();
}

function toggleSound() {
    gameState.soundEnabled = elements.soundToggle.checked;
    saveGame();
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress?')) {
        localStorage.removeItem('chinigo_save');
        location.reload();
    }
}

// Audio Functions
function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
}

// Enhanced speech functionality for all buttons
function addSpeechToButtons() {
    // Add speech to lesson buttons
    if (elements.listenBtn) {
        elements.listenBtn.addEventListener('click', () => {
            const word = elements.lessonWord.textContent;
            speakText(word);
        });
    }
    
    // Add speech to quiz options
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('option-btn')) {
            setTimeout(() => {
                speakText(e.target.textContent);
            }, 500);
        }
    });
    
    // Add speech to match pairs cards
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('pair-card')) {
            setTimeout(() => {
                speakText(e.target.textContent);
            }, 500);
        }
    });
    
    // Add speech to level nodes
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('level-node')) {
            const levelId = parseInt(e.target.textContent);
            const level = levels.find(l => l.id === levelId);
            if (level) {
                setTimeout(() => {
                    speakText(level.words[0]);
                }, 500);
            }
        }
    });
}

// Speech Recognition for speaking practice
let recognition;
let isListening = false;

function initSpeechRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            checkSpeakingAnswer(transcript);
        };
        
        recognition.onend = () => {
            isListening = false;
        };
    }
}

function startSpeakingPractice(targetWord) {
    if (!recognition) return;
    
    if (isListening) {
        recognition.stop();
        isListening = false;
        return;
    }
    
    recognition.start();
    isListening = true;
}

function checkSpeakingAnswer(userAnswer) {
    // Simple similarity check for Chinese characters
    const targetWord = elements.lessonWord.textContent;
    
    // For Chinese, we'll check if the user said the correct character
    if (userAnswer.includes(targetWord)) {
        playSound('correct');
        addXP(10);
    } else {
        playSound('wrong');
        gameState.hearts--;
        updateHearts();
    }
}

function playSound(type) {
    if (!gameState.soundEnabled) return;
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'wrong') {
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// Utility Functions
function switchScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenId).classList.add('active');
}

function updateUI() {
    // Update header stats
    elements.heartsCount.textContent = gameState.hearts;
    elements.xpCount.textContent = gameState.xp;
    elements.levelCount.textContent = gameState.level;
    elements.streakCount.textContent = gameState.streak;
    
    // Update dashboard
    updateDashboard();
    
    // Update profile
    updateProfile();
    
    // Update theme
    if (gameState.darkMode) {
        document.body.setAttribute('data-theme', 'dark');
        elements.darkModeToggle.checked = true;
    }
    
    // Update sound
    elements.soundToggle.checked = gameState.soundEnabled;
}

function updateDashboard() {
    elements.dashboardXP.textContent = gameState.xp;
    elements.dashboardLevel.textContent = gameState.level;
    elements.dashboardStreak.textContent = gameState.streak;
    
    const progress = Math.min(100, (gameState.dailyProgress / gameState.dailyGoal) * 100);
    const progressFill = document.getElementById('dailyProgressFill');
    const progressText = document.getElementById('dailyProgressText');
    const goalCompleted = document.querySelector('.goal-completed');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${gameState.dailyProgress}/${gameState.dailyGoal} XP`;
    }
    
    if (goalCompleted) {
        if (gameState.dailyProgress >= gameState.dailyGoal) {
            goalCompleted.style.display = 'block';
        } else {
            goalCompleted.style.display = 'none';
        }
    }
}

function renderLevelMap() {
    elements.levelPath.innerHTML = '';
    
    levels.forEach(level => {
        const node = document.createElement('div');
        node.className = 'level-node';
        node.textContent = level.id;
        
        if (gameState.unlockedLevels.includes(level.id)) {
            node.classList.add('completed');
            node.onclick = () => showLesson(level.id);
        } else if (gameState.unlockedLevels.includes(level.id - 1)) {
            node.classList.add('active');
            node.onclick = () => showLesson(level.id);
        } else {
            node.classList.add('locked');
        }
        
        elements.levelPath.appendChild(node);
    });
}

function updateProfile() {
    if (gameState.username) {
        elements.profileUsername.textContent = gameState.username;
        elements.profileAvatar.textContent = gameState.username.charAt(0).toUpperCase();
    }
    
    if (gameState.lastLogin) {
        const date = new Date(gameState.lastLogin);
        elements.profileJoinDate.textContent = `Joined: ${date.toLocaleDateString()}`;
    }
    
    elements.profileTotalXP.textContent = gameState.xp;
    elements.profileLevel.textContent = gameState.level;
    elements.profileStreak.textContent = gameState.streak;
    
    // Calculate lessons completed
    const lessonsCompleted = gameState.unlockedLevels.length - 1;
    elements.lessonsCompleted.textContent = lessonsCompleted;
}

function addXP(amount) {
    const multiplier = gameState.items.doubleXP > 0 ? 2 : 1;
    const xpGained = amount * multiplier;
    
    gameState.xp += xpGained;
    
    // Check level up
    const newLevel = Math.floor(gameState.xp / 100) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        showLevelUp(xpGained);
    }
    
    updateUI();
    saveGame();
}

function updateHearts() {
    if (gameState.hearts <= 0) {
        document.getElementById('gameOverModal').style.display = 'block';
    }
    updateUI();
}

function checkDailyStreak() {
    if (!gameState.lastLogin) return;
    
    const lastLoginDate = new Date(gameState.lastLogin);
    const today = new Date();
    const diffTime = today - lastLoginDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        gameState.streak++;
    } else if (diffDays > 1) {
        gameState.streak = 0;
    }
    
    // Reset daily progress if it's a new day
    if (diffDays >= 1) {
        gameState.dailyProgress = 0;
    }
    
    updateUI();
}

function saveGame() {
    localStorage.setItem('chinigo_save', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('chinigo_save');
    if (saved) {
        gameState = JSON.parse(saved);
        if (gameState.username) {
            showDashboard();
        }
    }
}

// Initialize the app
function init() {
    loadGame();
    setupEventListeners();
    updateUI();
    
    // Initialize speech functionality
    addSpeechToButtons();
    initSpeechRecognition();
    
    // Check for daily streak
    checkDailyStreak();
}

// Call init
init();
