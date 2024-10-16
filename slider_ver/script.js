// 正解のクロスワード（ひらがな）
const correctAnswers = [
    ['　', 'こ', 'う', 'だ', 'い'],
    ['め', 'い', 'げ', 'ん', '　'],
    ['ん', '　', '　', 'ち', 'り'],
    ['き', 'が', 'ん', '　', 'ね'],
    ['ょ', 'か', '　', 'き', 'ん']
];

// 有効なセル（1）にのみ入力を反映
const validCells = [
    [false, true, true, true, true],
    [true, true, true, true, false],
    [true, false, false, true, true],
    [true, true, true, false, true],
    [true, true, false, true, true]
];

// 最大文字数
const maxCharCount = [4, 2, 0, 0, 3];
const maxRowCharCount = [4, 4, 2, 3, 2];

// 各列の開始行を指定
const startRow = [1, 3, 0, 0, 2];
// 各行の開始列を指定
const startCol = [1, 0, 3, 0, 3];

// キーワードのためのセル指定
const specialCells = [
    [1, 0], 
    [3, 1], 
    [3, 4]
];

// 列ごとの入力内容をクロスワードに反映する関数
function insertColumn() {
    for (let col = 0; col < 5; col++) {
        // 列2,3はスキップ
        if (col === 2 || col===3) {
            continue;
        }

        const inputElement = document.getElementById(`input-col-${col}`);
        const inputValue = inputElement.value;

        // 入力文字数が指定された最大文字数を超えないか確認
        if (inputValue.length > maxCharCount[col]) {
            alert(`列 ${col} には${maxCharCount[col]}文字までしか入力できません`);
            return;
        }

        // 指定された位置から入力を反映
        const start = startRow[col];
        for (let i = 0; i < inputValue.length; i++) {
            const cellId = `cell-${start + i}-${col}`;
            if (validCells[start + i][col]) {
                document.getElementById(cellId).value = inputValue[i];
                document.getElementById(cellId).classList.remove('correct', 'incorrect');
            }
        }
    }

    // 行ごとの入力をクロスワードに反映
    for (let row = 0; row < 5; row++) {
        const inputElement = document.getElementById(`input-row-${row}`);
        const inputValue = inputElement.value;

        // 入力文字数が指定された最大文字数を超えないか確認
        if (inputValue.length > maxRowCharCount[row]) {
            alert(`行 ${row} には${maxRowCharCount[row]}文字までしか入力できません`);
            return;
        }

        // 指定された位置から入力を反映
        const start = startCol[row];
        for (let i = 0; i < inputValue.length; i++) {
            const cellId = `cell-${row}-${start + i}`;
            if (validCells[row][start + i]) {
                document.getElementById(cellId).value = inputValue[i];
                document.getElementById(cellId).classList.remove('correct', 'incorrect');
            }
        }
    }
}

// 正誤判定を行う関数
function checkAnswers() {
    let correctCount = 0;
    let specialCorrectCount = 0;

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            let input = document.getElementById(`cell-${row}-${col}`);
            if (!validCells[row][col]) continue;
            if (input.value === correctAnswers[row][col]) {
                input.classList.add('correct');
                input.classList.remove('incorrect');
                correctCount++;// 特定のセルが正解しているか確認
                if (isSpecialCell(row, col)) {
                    specialCorrectCount++;
                }
            } else {
                input.classList.add('incorrect');
                input.classList.remove('correct');
            }
        }
    }

    // 特定の5つのセルがすべて正解ならcorrect.htmlにリダイレクト
    if (specialCorrectCount === 3) {
        window.location.href = 'correct.html';
    }
}

// 特定のセルかどうかを判定する関数
function isSpecialCell(row, col) {
    for (let i = 0; i < specialCells.length; i++) {
        if (specialCells[i][0] === row && specialCells[i][1] === col) {
            return true;
        }
    }
    return false;
}   


//スライド
document.addEventListener('DOMContentLoaded', function() {
    function initializeCarousel(carouselContainerId, prevBtnId, nextBtnId) {
        const carouselContainer = document.getElementById(carouselContainerId);
        const carouselItems = carouselContainer.querySelectorAll('.carousel-item');
        let currentIndex = 0;

        function showSlide(index) {
            const offset = -index * 100;
            carouselItems.forEach(item => {
                item.style.transform = `translateX(${offset}%)`;
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            showSlide(currentIndex);
        }

        document.getElementById(nextBtnId).addEventListener('click', nextSlide);
        document.getElementById(prevBtnId).addEventListener('click', prevSlide);

        // スライダーの初期化
        showSlide(currentIndex);
    }

    // 1つ目のカルーセルを初期化
    initializeCarousel('carousel-container-1', 'prevBtn1', 'nextBtn1');

    // 2つ目のカルーセルを初期化
    initializeCarousel('carousel-container-2', 'prevBtn2', 'nextBtn2');
});
