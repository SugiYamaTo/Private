let clickCount = 0;
let bgmPlaying = false; // BGMの初期状態をオフに
const clickSound = new Audio('click.mp3'); // クリック音
const resetSound = new Audio('reset.mp3'); // 再建音
const bgm = new Audio('bgm.mp3'); // BGM
const images = ['image1.jpg', 'image2.jpg']; // 使用する画像の配列
let currentImageIndex = 0; // 現在の画像インデックス

// 初期状態でBGMをオフにし、ボタンを設定
document.addEventListener('DOMContentLoaded', () => {
    const titleMessage = document.getElementById('titleMessage');
    const infoMessage = document.getElementById('infoMessage');
    const warningMessage = document.getElementById('warningMessage');
    const resetButton = document.querySelector('.reset-button');
    const imageElement = document.getElementById('image');

    titleMessage.style.display = 'block';
    setTimeout(() => {
        titleMessage.style.display = 'none';
    }, 10000); // 10秒後にタイトルを非表示

    setTimeout(() => {
        infoMessage.style.display = 'block';
        setTimeout(() => {
            infoMessage.style.display = 'none';
        }, 3000); // 3秒後にインフォメーションを非表示
    }, 1000); // 1秒後にインフォメーションを表示

    // BGMの初期設定
    bgm.loop = true; // BGMをループさせる
    bgm.volume = 0.65; // BGMの音量を65%
    bgm.pause(); // BGMを一時停止

    // 画像のクリックイベントの設定
    imageElement.addEventListener('click', () => {
        if (bgmPlaying) {
            clickSound.play();
            clickCount++;
            if (clickCount === 10) {
                warningMessage.style.display = 'block';
                setTimeout(() => {
                    warningMessage.style.display = 'none';
                }, 2000); // 2秒後に警告を非表示
                clickCount = 0; // カウントリセット
                bgm.pause(); // BGMを停止
            }
            // 画像を切り替える処理
            if (currentImageIndex === 0) {
                currentImageIndex = 1; // 2枚目に切り替え
                imageElement.src = images[currentImageIndex]; // 画像のソースを更新
                resetButton.style.display = 'block'; // ボタンを表示
            }
        }
    });

    // 再建ボタンの設定
    resetButton.addEventListener('click', () => {
        resetSound.play();
        resetButton.style.display = 'none'; // ボタンを非表示にする
        setTimeout(() => {
            clickCount = 0; // カウントリセット
            currentImageIndex = 0; // 1枚目に戻す
            imageElement.src = images[currentImageIndex]; // 画像のソースを更新
            bgm.pause(); // BGMを停止
        }, 500); // 0.5秒のディレイを追加
    });

    // BGMコントロールボタンの設定
    const bgmControl = document.getElementById('bgmControl');
    bgmControl.addEventListener('click', () => {
        if (bgmPlaying) {
            bgm.pause();
            bgmPlaying = false;
            bgmControl.innerText = "BGM ON"; // ボタンのテキスト変更
        } else {
            bgm.play();
            bgmPlaying = true;
            bgmControl.innerText = "BGM OFF"; // ボタンのテキスト変更
        }
    });
});
