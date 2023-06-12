const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Подключаем картинку
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let score = 0;

// отрисовка еды
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};


// обработчик событий
document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    // Такой способ не работает
    // switch (event.keyCode) {
    //     case 37 && dir != "right": dir = "left"; break;
    //     case 38 && dir != "down": dir = "up"; break;
    //     case 39 && dir != "left": dir = "right"; break;
    //     case 40 && dir != "up": dir = "down"; break;
    // }
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up";
    else if(event.keyCode == 39 && dir != "left")
        dir = "right";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down";
};

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            location.reload();
        }

    }
}


function drawGame() {
    // отрисовка карты
    ctx.drawImage(ground, 0, 0);

    // отрисовка еды
    ctx.drawImage(foodImg, food.x, food.y);

    // отрисовка змейки
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    };

    // Отрисовка текста
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // змейка съела еду
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }
    } else {
        snake.pop();
    }

    // если змейка ушла за границу
    if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game);
        location.reload();
    }

    // перемещение змейки
    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let  newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTail(newHead, snake)

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);