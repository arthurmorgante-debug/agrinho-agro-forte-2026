// ========================
// VARIÁVEIS GLOBAIS
// ========================

let quizCurrentQuestion = 0;
let quizScore = 0;
const quizQuestions = [
    {
        question: "O que devemos fazer para economizar água?",
        options: [
            { text: "Deixar torneira aberta", correct: false },
            { text: "Fechar a torneira quando não estiver usando", correct: true },
            { text: "Lavar calçada todos os dias", correct: false }
        ]
    },
    {
        question: "O que é reciclagem?",
        options: [
            { text: "Jogar lixo na rua", correct: false },
            { text: "Reutilizar materiais corretamente", correct: true },
            { text: "Queimar resíduos", correct: false }
        ]
    },
    {
        question: "Qual prática ajuda o meio ambiente?",
        options: [
            { text: "Desmatamento", correct: false },
            { text: "Poluição", correct: false },
            { text: "Plantio de árvores", correct: true }
        ]
    },
    {
        question: "O agro produz:",
        options: [
            { text: "Apenas máquinas", correct: false },
            { text: "Alimentos para a população", correct: true },
            { text: "Somente combustíveis", correct: false }
        ]
    },
    {
        question: "O que é sustentabilidade?",
        options: [
            { text: "Utilizar recursos sem preocupação", correct: false },
            { text: "Cuidar do meio ambiente para as futuras gerações", correct: true },
            { text: "Desperdiçar recursos naturais", correct: false }
        ]
    }
];

// ========================
// INICIALIZAÇÃO
// ========================

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeHeader();
    initializeHero();
    initializeAnimations();
    initializeQuiz();
    initializeBackToTop();
});

// ========================
// DARK MODE
// ========================

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        updateThemeIcon(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (isDark) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// ========================
// HEADER/NAVBAR
// ========================

function initializeHeader() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav')) {
            navMenu.classList.remove('active');
        }
    });

    // Header sticky com background
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ========================
// HERO SECTION
// ========================

function initializeHero() {
    const scrollBtn = document.getElementById('scrollBtn');
    const parallaxBg = document.getElementById('parallaxBg');

    scrollBtn.addEventListener('click', function() {
        document.getElementById('objetivo').scrollIntoView({ behavior: 'smooth' });
    });

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero');
        const heroRect = heroSection.getBoundingClientRect();

        if (heroRect.bottom > 0) {
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

// ========================
// ANIMAÇÕES AO ROLAR
// ========================

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================
// QUIZ
// ========================

function initializeQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    loadQuizQuestion();
}

function loadQuizQuestion() {
    if (quizCurrentQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const question = quizQuestions[quizCurrentQuestion];
    const questionElement = document.getElementById('quizQuestion');
    const optionsElement = document.getElementById('quizOptions');

    questionElement.textContent = `${quizCurrentQuestion + 1}. ${question.question}`;
    optionsElement.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option.text;
        button.addEventListener('click', function() {
            selectOption(option.correct, button);
        });
        optionsElement.appendChild(button);
    });

    updateProgressBar();
}

function selectOption(isCorrect, button) {
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(opt => {
        opt.disabled = true;
        const isCorrectOption = quizQuestions[quizCurrentQuestion].options.find(o => o.text === opt.textContent).correct;
        
        if (isCorrectOption) {
            opt.classList.add('correct');
        } else if (opt === button && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        quizScore++;
        button.classList.add('correct');
    }

    setTimeout(() => {
        quizCurrentQuestion++;
        loadQuizQuestion();
    }, 1500);
}

function updateProgressBar() {
    const progress = ((quizCurrentQuestion) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function showQuizResult() {
    const quizContent = document.querySelector('.quiz-content');
    const quizResult = document.getElementById('quizResult');
    const resultScore = document.getElementById('resultScore');
    const resultMessage = document.getElementById('resultMessage');

    quizContent.style.display = 'none';
    quizResult.classList.remove('hidden');

    resultScore.textContent = `${quizScore} de ${quizQuestions.length} acertos!`;

    let message = '';
    const percentage = (quizScore / quizQuestions.length) * 100;

    if (percentage === 100) {
        message = "🌟 Perfeito! Você é um especialista em sustentabilidade!";
    } else if (percentage >= 80) {
        message = "🎉 Excelente! Você sabe muito sobre sustentabilidade!";
    } else if (percentage >= 60) {
        message = "👏 Bom trabalho! Continue aprendendo sobre sustentabilidade!";
    } else if (percentage >= 40) {
        message = "💪 Continue estudando! Você pode melhorar!";
    } else {
        message = "📚 Não desista! Estude mais sobre sustentabilidade!";
    }

    resultMessage.textContent = message;
}

function resetQuiz() {
    quizCurrentQuestion = 0;
    quizScore = 0;
    document.querySelector('.quiz-content').style.display = 'block';
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('progressBar').style.width = '0%';
    loadQuizQuestion();
}

// ========================
// BACK TO TOP
// ========================

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================
// UTILS
// ========================

// Smooth scroll para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Detectar preferência de tema do sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!localStorage.getItem('theme')) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
        localStorage.setItem('theme', 'dark');
    }
}

// Listener para mudanças de preferência de tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeIcon(false);
        }
    }
});