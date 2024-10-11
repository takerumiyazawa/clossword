// 正解のクロスワード（ひらがな）
const correctAnswers = [
    ['あ', 'さ', 'け', 'え', 'ぐ'],
    ['た', 'き', 'ま', 'つ', 'り'],
    ['こ', 'う', 'り', 'ん', 'そ'],
    ['す', 'ち', 'つ', 'ど', 'あ'],
    ['な', 'か', 'ん', 'ら', 'ん']
];

// 有効なセル（1）にのみ入力を反映
const validCells = [
    [false, true, true, false, true],
    [true, false, true, true, true],
    [true, true, true, true, false],
    [true, false, false, true, false],
    [false, true, true, true, true]
];

// 最大文字数
const maxCharCount = [3, 0, 5, 4, 2];
const maxRowCharCount = [2, 5, 4, 5, 4];

// 各列の開始行を指定
const startRow = [1, 1, 0, 1, 0];
// 各行の開始列を指定
const startCol = [1, 0, 0, 0, 1];

// 列ごとの入力内容をクロスワードに反映する関数
function insertColumn() {
    for (let col = 0; col < 5; col++) {
        // 列1はスキップ
        if (col === 1) {
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
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cellId = `cell-${row}-${col}`;
            const userInput = document.getElementById(cellId).value;

            // disabled なセルはスキップ
            if (!validCells[row][col]) {
                continue;
            }

            if (userInput === correctAnswers[row][col]) {
                document.getElementById(cellId).classList.add('correct');
                document.getElementById(cellId).classList.remove('incorrect');
            } else  {
                document.getElementById(cellId).classList.add('incorrect');
                document.getElementById(cellId).classList.remove('correct');
            }
        }
    }
}