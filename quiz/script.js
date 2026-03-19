
const allQuestions = {
    js: {
        easy: [
            { question: "Which keyword declares a variable that cannot be reassigned?", options: ["var", "let", "const", "static"], answer: "const" },
            { question: "How do you write 'Hello' in an alert box?", options: ["msg('Hello');", "alert('Hello');", "alertBox('Hello');", "console.log('Hello');"], answer: "alert('Hello');" },
            { question: "Which symbol is used for comments?", options: ["//", "#", "<!-- -->", "**"], answer: "//" },
            { question: "Which company developed JavaScript?", options: ["Google", "Microsoft", "Netscape", "IBM"], answer: "Netscape" },
            { question: "Which keyword declares block-scoped variable?", options: ["var", "let", "define", "int"], answer: "let" }
        ],
        medium: [
            { question: "Which method converts JSON to JS object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"], answer: "JSON.parse()" },
            { question: "How to get array length?", options: ["size", "count", "length", "len()"], answer: "length" },
            { question: "Which function runs after page load?", options: ["onload()", "ready()", "init()", "start()"], answer: "onload()" },
            { question: "Which keyword is used for promises?", options: ["async", "await", "promise", "resolve"], answer: "await" },
            { question: "Which operator checks equality & type?", options: ["==", "=", "===", "!="], answer: "===" }
        ],
        hard: [
            { question: "typeof null returns?", options: ["null", "object", "undefined", "string"], answer: "object" },
            { question: "What is closure?", options: ["Scope access after parent returns", "Loop", "Event", "Error"], answer: "Scope access after parent returns" },
            { question: "What is event bubbling?", options: ["Top-down", "Bottom-up", "Parallel", "None"], answer: "Bottom-up" },
            { question: "Which method clones object?", options: ["Object.assign()", "clone()", "copy()", "spread"], answer: "Object.assign()" },
            { question: "What is hoisting?", options: ["Move declarations to top", "Delete vars", "Compile error", "Looping"], answer: "Move declarations to top" }
        ]
    },
    java: {
          easy: [
      { question: "Keyword to define class?", options: ["class", "public", "void", "static"], answer: "class" },
      { question: "Compiled file extension?", options: [".java", ".class", ".jar", ".exe"], answer: ".class" },
      { question: "Which keyword prints output?", options: ["print", "System.out.println", "echo", "console"], answer: "System.out.println" },
      { question: "Java is?", options: ["Compiled", "Interpreted", "Both", "None"], answer: "Both" },
      { question: "Default value of int?", options: ["0", "null", "undefined", "1"], answer: "0" }
    ],
    medium: [
      { question: "Entry point?", options: ["main()", "start()", "public static void main(String[] args)", "run()"], answer: "public static void main(String[] args)" },
      { question: "Inheritance keyword?", options: ["inherits", "extends", "implements", "super"], answer: "extends" },
      { question: "Interface keyword?", options: ["interface", "class", "abstract", "implements"], answer: "interface" },
      { question: "Exception handling keyword?", options: ["catch", "error", "try", "throw"], answer: "try" },
      { question: "Array index starts at?", options: ["0", "1", "-1", "depends"], answer: "0" }
    ],
    hard: [
      { question: "Parent class?", options: ["Object", "Main", "Super", "Parent"], answer: "Object" },
      { question: "Java is?", options: ["Pass-by-reference", "Pass-by-value", "Both", "None"], answer: "Pass-by-value" },
      { question: "JVM stands for?", options: ["Java Virtual Machine", "Java Variable Method", "Joint VM", "None"], answer: "Java Virtual Machine" },
      { question: "Which is thread class?", options: ["Thread", "Runnable", "Process", "Executor"], answer: "Thread" },
      { question: "Garbage collection does?", options: ["Deletes unused memory", "Compiles code", "Runs code", "Stores data"], answer: "Deletes unused memory" }
    ]
  },

 
    python: {
          easy: [
        { question: "Keyword for function?", options: ["function", "def", "func", "define"], answer: "def" },
        { question: "Comment symbol?", options: ["//", "#", "/* */", "--"], answer: "#" },
        { question: "Python is?", options: ["Compiled", "Interpreted", "Both", "None"], answer: "Interpreted" },
        { question: "List uses?", options: ["[]", "{}", "()", "<>"], answer: "[]" },
        { question: "Print function?", options: ["echo()", "print()", "log()", "write()"], answer: "print()" }
    ],
        medium: [
            { question: "File extension?", options: [".py", ".pt", ".python", ".p"], answer: ".py" },
            { question: "Length of list?", options: ["len()", "size()", "count()", "length"], answer: "len()" },
            { question: "Dictionary symbol?", options: ["{}", "[]", "()", "<>"], answer: "{}" },
            { question: "Loop keyword?", options: ["loop", "for", "iterate", "repeat"], answer: "for" },
            { question: "Conditional keyword?", options: ["if", "when", "check", "case"], answer: "if" }
        ],
            hard: [
                { question: "*args means?", options: ["Multiply args", "Error", "Multiple arguments", "Keyword args"], answer: "Multiple arguments" },
                { question: "List comprehension?", options: ["Docs", "Compare lists", "Create lists concisely", "Loop only"], answer: "Create lists concisely" },
                { question: "Lambda is?", options: ["Named function", "Anonymous function", "Loop", "Class"], answer: "Anonymous function" },
                { question: "GIL stands for?", options: ["Global Interpreter Lock", "General Input Lock", "Global Index List", "None"], answer: "Global Interpreter Lock" },
                { question: "Tuple is?", options: ["Mutable", "Immutable", "Dynamic", "None"], answer: "Immutable" }
            ]
}
};

        let state = {
            currentQuestions: [], currentQuestionIndex: 0, score: 0,
            timer: null, timeRemaining: 30,
            currentCategory: '', currentDifficulty: '',
            loggedInUser: null, users: []
        };

        const loadState = () => {
            state.loggedInUser = localStorage.getItem('loggedInUser') || null;
            state.users = JSON.parse(localStorage.getItem('users')) || [];
        };

        const saveState = () => {
            if (state.loggedInUser) {
                localStorage.setItem('loggedInUser', state.loggedInUser);
            } else {
                localStorage.removeItem('loggedInUser');
            }
            localStorage.setItem('users', JSON.stringify(state.users));
        };
        
        const pageSections = document.querySelectorAll('.page-section');
        const navButtons = document.querySelectorAll('.nav-links button');
        const authStatusEl = document.getElementById('auth-status');
        const questionTextEl = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const timerDisplay = document.getElementById('timer-display');
        const progressDisplay = document.getElementById('progress-display');
        const progressBar = document.getElementById('progress-bar');
        const finalScoreEl = document.getElementById('final-score');
        const scorePercentageEl = document.getElementById('score-percentage');
        const feedbackMessageEl = document.getElementById('feedback-message');
        const historyList = document.getElementById('history-list');
        const historyMessage = document.getElementById('history-message');

        const renderPage = (page) => {
            pageSections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${page}-screen`).classList.add('active');
            navButtons.forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.querySelector(`.nav-links [data-page="${page}"]`);
            if (activeBtn) activeBtn.classList.add('active');
            if (page === 'history') renderHistory();
        };

        const updateAuthStatus = () => {
            if (state.loggedInUser) {
                authStatusEl.innerHTML = `<div class="user-greeting"><i class="fas fa-user"></i><span>Welcome, ${state.loggedInUser}!</span></div><button onclick="logout()">Logout</button>`;
            } else {
                authStatusEl.innerHTML = `<button id="login-nav-btn" data-page="login"><i class="fas fa-sign-in-alt"></i> Login</button><span>/</span><button id="register-nav-btn" data-page="register"><i class="fas fa-user-plus"></i> Register</button>`;
                document.getElementById('login-nav-btn').onclick = () => renderPage('login');
                document.getElementById('register-nav-btn').onclick = () => renderPage('register');
            }
        };

        const loginUser = (username, password) => {
            const user = state.users.find(u => u.username === username && u.password === password);
            if (user) {
                state.loggedInUser = username;
                saveState();
                updateAuthStatus();
                showToast('Login successful!', 'success');
                renderPage('home');
            } else {
                showToast('Invalid username or password.', 'error');
            }
        };

        const registerUser = (username, password) => {
            if (username.length < 4 || password.length < 6) {
                showToast('Username must be 4+ and password 6+ characters.', 'error'); return;
            }
            if (state.users.some(u => u.username === username)) {
                showToast('Username already exists.', 'error'); return;
            }
            state.users.push({ username, password, history: [] });
            saveState();
            showToast('Registration successful! Please log in.', 'success');
            renderPage('login');
        };

        const logout = () => {
            state.loggedInUser = null;
            saveState();
            updateAuthStatus();
            renderPage('login');
            showToast('Logged out successfully.', 'success');
        };
        window.logout = logout;

        const saveQuizHistory = () => {
            if (!state.loggedInUser) return;
            const userIndex = state.users.findIndex(u => u.username === state.loggedInUser);
            if (userIndex !== -1) {
                const quizResult = {
                    category: state.currentCategory,
                    difficulty: state.currentDifficulty,
                    score: state.score,
                    totalQuestions: state.currentQuestions.length,
                    date: new Date().toLocaleDateString(),
                };
                state.users[userIndex].history.unshift(quizResult);
                state.users[userIndex].history = state.users[userIndex].history.slice(0, 10);
                saveState();
            }
        };

        const renderHistory = () => {
            if (!state.loggedInUser) {
                historyMessage.textContent = 'Please login to view your quiz history.';
                historyList.innerHTML = ''; return;
            }
            const user = state.users.find(u => u.username === state.loggedInUser);
            if (user && user.history && user.history.length > 0) {
                historyMessage.textContent = 'Your 10 most recent quiz attempts:';
                historyList.innerHTML = user.history.map(item => `
                    <li class="history-item">
                        <div><strong>${item.category.toUpperCase()} Quiz</strong> (${item.difficulty})</div>
                        <div>Score: <strong>${item.score}/${item.totalQuestions}</strong> (${Math.round((item.score/item.totalQuestions)*100)}%)</div>
                        <div class="quiz-meta"><span>Taken on: ${item.date}</span></div>
                    </li>`).join('');
            } else {
                historyMessage.textContent = 'You have not completed any quizzes yet.';
                historyList.innerHTML = '';
            }
        };

        const generateCertificate = () => {
            if (!state.loggedInUser) { showToast('Please login to get a certificate.', 'error'); return; }
            document.getElementById('certificate-name').textContent = state.loggedInUser;
            document.getElementById('certificate-category').textContent = state.currentCategory.toUpperCase();
            document.getElementById('certificate-difficulty').textContent = state.currentDifficulty;
            document.getElementById('certificate-score').textContent = `${state.score}/${state.currentQuestions.length}`;
            document.getElementById('certificate-date').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('certificate-container').style.display = 'block';
            window.print();
            document.getElementById('certificate-container').style.display = 'none';
        };

        const chooseCategory = (category) => {
             if (!state.loggedInUser) { showToast("Please login to start a quiz.", 'error'); renderPage('login'); return; }
            state.currentCategory = category;
            document.getElementById('difficulty-category-title').textContent = category.toUpperCase();
            renderPage('difficulty');
        };

        const startQuizWithDifficulty = (difficulty) => {
            state.currentDifficulty = difficulty;
            state.currentQuestions = shuffleArray(allQuestions[state.currentCategory][difficulty]);
            state.currentQuestionIndex = 0;
            state.score = 0;
            renderPage('quiz');
            renderQuestion();
        };

        const shuffleArray = (array) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };

        const renderQuestion = () => {
            if (state.currentQuestionIndex >= state.currentQuestions.length) {
                endQuiz(); return;
            }
            const currentQuestion = state.currentQuestions[state.currentQuestionIndex];
            questionTextEl.textContent = currentQuestion.question;
            optionsContainer.innerHTML = '';
            const optionPrefixes = ['A', 'B', 'C', 'D'];
            shuffleArray([...currentQuestion.options]).forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option-btn');
                button.innerHTML = `<span class="option-prefix">${optionPrefixes[index]}</span><span class="option-text">${option}</span>`;
                button.onclick = () => checkAnswer(option, currentQuestion.answer);
                optionsContainer.appendChild(button);
            });
            // PROGRESS BAR FIX: Use (index + 1) for a more intuitive progress
            const progress = ((state.currentQuestionIndex + 1) / state.currentQuestions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressDisplay.textContent = `Question ${state.currentQuestionIndex + 1}/${state.currentQuestions.length}`;
            startTimer();
        };

        const startTimer = () => {
            clearInterval(state.timer);
            state.timeRemaining = 30;
            updateTimerDisplay();
            state.timer = setInterval(() => {
                state.timeRemaining--;
                updateTimerDisplay();
                if (state.timeRemaining <= 0) handleTimeout();
            }, 1000);
        };

        const updateTimerDisplay = () => {
            timerDisplay.textContent = `${state.timeRemaining}s`;
            timerDisplay.style.color = state.timeRemaining <= 10 ? 'var(--incorrect-color)' : 'var(--accent-color)';
        };

        const checkAnswer = (selectedOption, correctAnswer) => {
            clearInterval(state.timer);
            const optionButtons = optionsContainer.querySelectorAll('.option-btn');
            optionButtons.forEach(btn => {
                btn.disabled = true;
                const optionText = btn.querySelector('.option-text').textContent;
                if (optionText === correctAnswer) btn.classList.add('correct');
                else if (optionText === selectedOption) btn.classList.add('incorrect');
            });
            if (selectedOption === correctAnswer) {
                state.score++;
                showToast('Correct!', 'success');
            } else {
                showToast(`Incorrect! The answer was: ${correctAnswer}`, 'error');
            }
            setTimeout(nextQuestion, 2000);
        };
        
        const handleTimeout = () => {
            clearInterval(state.timer);
            const correctAnswer = state.currentQuestions[state.currentQuestionIndex].answer;
            checkAnswer(null, correctAnswer);
            showToast('Time is up!', 'error');
        };

        const nextQuestion = () => {
            state.currentQuestionIndex++;
            renderQuestion();
        };

        const endQuiz = () => {
            clearInterval(state.timer);
            saveQuizHistory();
            renderPage('results');
            const totalQuestions = state.currentQuestions.length;
            const percentage = Math.round((state.score / totalQuestions) * 100);
            finalScoreEl.textContent = `${state.score}/${totalQuestions}`;
            scorePercentageEl.textContent = `(${percentage}%)`;
            let feedback = '';
            if (percentage === 100) feedback = "Perfect score! You're a programming wizard! 🧙‍♂️";
            else if (percentage >= 80) feedback = "Excellent job! You really know your stuff! 👍";
            else if (percentage >= 50) feedback = "Good effort! Keep practicing! 💪";
            else feedback = "Don't give up! Review and try again! 📚";
            feedbackMessageEl.textContent = feedback;
        };

        const showToast = (message, type) => {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 3000);
        };

        const addToastStyles = () => {
            const style = document.createElement('style');
            style.textContent = `.toast { position: fixed; bottom: -100px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 4px; color: white; font-weight: 500; transition: bottom 0.5s ease-in-out; z-index: 1000; } .toast.show { bottom: 20px; } .toast-success { background-color: var(--correct-color); } .toast-error { background-color: var(--incorrect-color); }`;
            document.head.appendChild(style);
        };
        
        document.addEventListener('DOMContentLoaded', () => {
            loadState();
            addToastStyles();
            updateAuthStatus();
            
            if (state.loggedInUser) {
                renderPage('home');
            } else {
                renderPage('login');
            }

            document.getElementById('home-btn').addEventListener('click', () => {
                if (state.loggedInUser) renderPage('home');
                else renderPage('login');
            });
            document.getElementById('history-btn').addEventListener('click', () => renderPage('history'));

            document.getElementById('category-btns-container').addEventListener('click', (e) => {
                const categoryBtn = e.target.closest('.category-btn');
                if (categoryBtn) chooseCategory(categoryBtn.dataset.category);
            });
            
            document.getElementById('difficulty-btns-container').addEventListener('click', (e) => {
                const difficultyBtn = e.target.closest('.difficulty-btn');
                if (difficultyBtn) startQuizWithDifficulty(difficultyBtn.dataset.difficulty);
            });

            document.getElementById('back-to-home-btn').addEventListener('click', () => renderPage('home'));
            document.getElementById('restart-btn').addEventListener('click', () => chooseCategory(state.currentCategory));
            document.getElementById('certificate-btn').addEventListener('click', generateCertificate);
            document.getElementById('home-results-btn').addEventListener('click', () => renderPage('home'));
            document.getElementById('home-history-btn').addEventListener('click', () => renderPage('home'));

            document.getElementById('login-form').addEventListener('submit', (e) => {
                e.preventDefault();
                loginUser(document.getElementById('login-username').value, document.getElementById('login-password').value);
            });
            document.getElementById('register-form').addEventListener('submit', (e) => {
                e.preventDefault();
                registerUser(document.getElementById('register-username').value, document.getElementById('register-password').value);
            });

            document.getElementById('register-link').addEventListener('click', (e) => { e.preventDefault(); renderPage('register'); });
            document.getElementById('login-link').addEventListener('click', (e) => { e.preventDefault(); renderPage('login'); });
        });
