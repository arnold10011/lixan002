const gameArea = document.getElementById('gameArea');
const hitsDisplay = document.getElementById('hits');
const missesDisplay = document.getElementById('misses');
const gameTitle = document.getElementById('gameTitle'); // Для изменения текста заголовка
const body = document.querySelector('body'); // Для управления всем содержимым страницы

let hits = 0;  // Количество попаданий
let misses = 0; // Количество промахов
let ballCount = 0; // Текущее количество шариков на экране
const maxBalls = 10; // Максимальное количество шариков

// Функция для создания нового шарика
function createBall() {
    // Если количество шариков достигло максимума, не создаем новый
    if (ballCount >= maxBalls) return;

    const ball = document.createElement('div');
    ball.classList.add('ball');
    // Позиционируем шарик в случайном месте в игровом поле
    const x = Math.random() * (gameArea.clientWidth - 50); // 50 - это размер шарика
    const y = Math.random() * (gameArea.clientHeight - 50);
    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    // Задаем случайную скорость и направление движения
    const speedX = Math.random() * 2 + 1; // Скорость по оси X (1 - 3)
    const speedY = Math.random() * 2 + 1; // Скорость по оси Y (1 - 3)

    let directionX = Math.random() < 0.5 ? 1 : -1; // Направление по оси X
    let directionY = Math.random() < 0.5 ? 1 : -1; // Направление по оси Y

    // Функция для движения шарика
    function moveBall() {
        let currentX = parseFloat(ball.style.left);
        let currentY = parseFloat(ball.style.top);

        // Обновляем позиции шарика
        currentX += speedX * directionX;
        currentY += speedY * directionY;

        // Если шарик выходит за пределы экрана, меняем направление
        if (currentX <= 0 || currentX >= gameArea.clientWidth - 50) {
            directionX *= -1;
        }

        if (currentY <= 0 || currentY >= gameArea.clientHeight - 50) {
            directionY *= -1;
        }

        // Устанавливаем новые координаты
        ball.style.left = `${currentX}px`;
        ball.style.top = `${currentY}px`;
    }

    // Начинаем движение шарика с интервалом
    const moveInterval = setInterval(moveBall, 10); // Обновляем каждую 10мс

    // Устанавливаем обработчик события на клик по шарику
    ball.addEventListener('click', () => {
        clearInterval(moveInterval); // Останавливаем движение при клике
        ball.style.transform = 'scale(0)';
        setTimeout(() => {
            ball.remove();
            ballCount--; // Уменьшаем количество шариков
            hits++; // Увеличиваем счетчик попаданий
            hitsDisplay.textContent = hits; // Обновляем отображение попаданий
            createBall(); // Создаём новый шарик
        }, 300); // Убираем шарик с экрана через 300мс
    });

    // Ожидаем, пока шарик не выйдет за пределы экрана
    setTimeout(() => {
        if (ball.parentNode) { // Если шарик всё ещё на экране
            misses++; // Увеличиваем счетчик промахов
            missesDisplay.textContent = misses; // Обновляем отображение промахов
            ball.remove(); // Убираем шарик с экрана
            ballCount--; // Уменьшаем количество шариков
            createBall(); // Создаём новый шарик
        }
    }, 5000); // Через 5 секунд шарик исчезает автоматически, если по нему не кликнули

    // Увеличиваем количество шариков
    ballCount++;
    // Добавляем шарик в игровую зону
    gameArea.appendChild(ball);
}

// Функция для старта игры
function startGame() {
    // Первоначальное создание 3 шариков
    for (let i = 0; i < 3; i++) {
        createBall();
    }

    // Постепенное появление новых шариков
    setInterval(() => {
        createBall();
    }, 1500); // Новые шарики появляются каждые 1.5 секунды
}

// Проверка на 8 промахов и вывод сообщения
function checkForLoser() {
    if (misses >= 8) {
        // Убираем все элементы игры
        gameArea.style.display = 'none';  // Скрываем игровую зону
        hitsDisplay.style.display = 'none';  // Скрываем счетчик попаданий
        missesDisplay.style.display = 'none';  // Скрываем счетчик промахов

        // Отображаем сообщение
        const message = document.createElement('div');
        message.id = 'gameOverMessage';
        message.textContent = "LOL LEXAN UNSKILL LLLL";
        message.style.position = 'absolute';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.fontSize = '3rem';
        message.style.fontWeight = 'bold';
        message.style.color = '#ff5733';
        message.style.textShadow = '2px 2px 10px rgba(0, 0, 0, 0.6)';
        body.appendChild(message);
        
        // Останавливаем игру
        clearInterval();
    }
}

// Запускаем игру при загрузке страницы
startGame();

// Проверка промахов каждые 1 секунду
setInterval(checkForLoser, 1000);