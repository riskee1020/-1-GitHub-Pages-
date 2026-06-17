const story =
{
    start:
    {
        text: "你醒來在一片神秘森林...",

        image: "forest.gif",

        choices: [
            { text: "往前走", next: "forest" }
        ]
    },

    forest:
    {
        text: "你遇到一隻奇怪的小貓。",

        image: "cat.gif",

        choices: [
            { text: "摸牠", next: "good" },
            { text: "忽略牠", next: "bad" }
        ]
    },

    good:
    {
        text: "貓咪帶你找到寶藏！",

        image: "goodend.jpg",

        choices: [
            { text: "yipeee", next: "treasure" }
        ]
    },

    bad:
    {
        text: "你迷路了...",

        image: "badend.jpg",

        choices: [
            { text: "重新開始", next: "start" }
        ]
    },

    treasure:
    {
        text: "你發現一個閃閃發光的寶箱，要打開嗎？",

        image: "treasure.gif",

        choices:
            [
                {
                    text: "打開寶箱",
                    next: "openTreasure"
                },

                {
                    text: "不打開",
                    next: "fakeChoice"
                }
            ]
    },

    openTreasure:
    {
        text: "我很抱歉，我應該要記得你之前說的，我們不該預設對方的話是有惡意的，我也不該那樣發脾氣，在你生病之後我才發現這些事是多麼的小，而我卻忽略更重要的事情!我希望你能趕快好起來，我也會一直在你身邊，愛你呦(抱抱)",

        image: "goodend.gif",

        choices: [
            { text: "重新開始", next: "start" }
        ]
    }
};

const textBox = document.getElementById("text");
const image = document.getElementById("sceneImage");
const choicesBox = document.getElementById("choices");

let typingSpeed = 30;

function typeText(text, callback) {
    textBox.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            textBox.innerHTML += text[i];
            i++;
            setTimeout(typing, typingSpeed);
        }
        else {
            callback();
        }
    }

    typing();
}

function setImage(src) {
    image.style.opacity = 0;

    setTimeout(() => {
        image.src = "images/" + src;
        image.style.opacity = 1;

    }, 500);
}

function showChoices(choices) {
    choicesBox.innerHTML = "";

    choices.forEach((choice, i) => {
        const button = document.createElement("button");

        button.innerText = choice.text;

        // ❌ 假選項（不能點 + 飄動）
        if (choice.next === "fakeChoice") {
            button.classList.add("fakeButton");

            button.onclick = null;
        }
        // ✔ 正常選項
        else {
            button.onclick = () => showScene(choice.next);
        }

        choicesBox.appendChild(button);

        // ✨ 出現動畫
        setTimeout(() => {
            button.style.opacity = 1;
            button.style.transform = "translateY(0px)";
        }, 300 * i);
    });
}

function showScene(id) {
    const scene = story[id];

    setImage(scene.image);

    typeText(scene.text, () => {
        showChoices(scene.choices || []);
    });
}

// 開始
showScene("start");