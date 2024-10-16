// 特定のセルの座標
const specialCells = [
    [1, 0], 
    [3, 1], 
    [3, 4]
];

// ページ読み込み時に特定のセルから文字を抜き出して表示
window.onload = function () {
    let extractedString = '';

    // 特定のセルから文字を抽出
    for (let i = 0; i < specialCells.length; i++) {
        const row = specialCells[i][0];
        const col = specialCells[i][1];
        const cellValue = document.getElementById(`cell-${row}-${col}`).value;
        extractedString += cellValue;
    }

    // 抜き出した文字列を表示
    document.getElementById('extracted-letters').innerText = '特徴: ' + extractedString;
};
