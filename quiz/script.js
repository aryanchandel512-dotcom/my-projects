// ======================== DATA ========================
        const allQuestions = {
            js: {
                easy: [
                    { question: "Which keyword declares a variable that cannot be reassigned?", options: ["var", "let", "const", "static"], answer: "const" },
                    { question: "How do you write 'Hello' in an alert box?", options: ["msg('Hello');", "alert('Hello');", "alertBox('Hello');", "console.log('Hello');"], answer: "alert('Hello');" }
                ],
                medium: [
                    { question: "Which method converts JSON to a JavaScript object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"], answer: "JSON.parse()" },
                    { question: "How do you find the number of elements in an array named 'myArray'?", options: ["myArray.size", "myArray.count", "myArray.length", "len(myArray)"], answer: "myArray.length" }
                ],
                hard: [
                    { question: "What is the output of `console.log(typeof null);`?", options: ["null", "undefined", "object", "string"], answer: "object" },
                    { question: "What is a 'closure' in JavaScript?", options: ["A function having access to its parent's scope, even after the parent has returned", "A way to lock a variable's value", "A built-in method for closing windows", "A type of syntax error"], answer: "A function having access to its parent's scope, even after the parent has returned" }
                ]
            },
            java: {
                easy: [
                    { question: "Which keyword is used to define a class in Java?", options: ["class", "public", "void", "static"], answer: "class" },
                    { question: "What is the file extension for compiled Java files?", options: [".java", ".class", ".jar", ".exe"], answer: ".class" }
                ],
                medium: [
                    { question: "What is the entry point of a Java program?", options: ["main()", "start()", "public static void main(String[] args)", "run()"], answer: "public static void main(String[] args)" },
                    { question: "Which keyword is used for inheritance?", options: ["inherits", "extends", "implements", "super"], answer: "extends" }
                ],
                hard: [
                    { question: "What is the parent class of all classes in Java?", options: ["Object", "Main", "Super", "Parent"], answer: "Object" },
                    { question: "Is Java 'pass-by-value' or 'pass-by-reference'?", options: ["Pass-by-reference", "It depends on the data type", "Pass-by-value", "Neither"], answer: "Pass-by-value" }
                ]
            },
            python: {
                easy: [
                    { question: "Which keyword defines a function in Python?", options: ["function", "def", "func", "define"], answer: "def" },
                    { question: "How do you create a single-line comment?", options: ["//", "/* */", "#", ""], answer: "#" }
                ],
                medium: [
                    { question: "What is the correct file extension for Python files?", options: [".pyth", ".pt", ".py", ".python"], answer: ".py" },
                    { question: "How do you get the number of items in a list 'my_list'?", options: ["len(my_list)", "my_list.length", "my_list.size()", "count(my_list)"], answer: "len(my_list)" }
                ],
                hard: [
                    { question: "What does `*args` do in a Python function definition?", options: ["It multiplies arguments", "It's a syntax error", "It passes a variable number of non-keyworded arguments", "It passes keyworded arguments"], answer: "It passes a variable number of non-keyworded arguments" },
                    { question: "What is a 'list comprehension' in Python?", options: ["A way to understand lists", "A detailed list documentation", "A concise way to create lists", "A method to compare two lists"], answer: "A concise way to create lists" }
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