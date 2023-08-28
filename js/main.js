"use strict";
{
  const timer = document.getElementById("timer");

  const btn = document.getElementById("btn");

  const header = document.querySelector("header");

  let endTime;
  let elaspedTime;
  let intervalId;

  function checkTime() {
    // 残り時間＝終了時刻ｰ現在時刻
    elaspedTime = endTime - new Date().getTime();
    // (3)タイマーの終了
    if (button_2.classList.contains("inactive") ) {
      clearInterval(intervalId);
    }

    const totalSeconds = Math.floor(elaspedTime / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const minutesFormatted = String(minutes).padStart(2, "0");
    const secondsFormatted = String(seconds).padStart(2, "0");

    timer.textContent = `${minutesFormatted}:${secondsFormatted}`;
  }

  // (1)終了時刻を求める
  btn.addEventListener("click", () => {
    endTime = new Date().getTime() + 300 * 1000;
    btn.disabled = true;
    header.classList.remove("question");

    // (2)残り時間を求める
    intervalId = setInterval(() => {
      checkTime();
    }, 100);
  });

  const quizzes = [
    [
      "問1.しっかり確認すべき時は「目で確認する」だけでなく、「声を出して、指を指して」する必要がある。その理由は何ですか？",
      "問1の正解は？",
      "選択肢A「聴覚、筋肉」に刺激を与えて、「脳」が活性化して注意力が向上するから",
      "選択肢B「聴覚、筋肉」に刺激を与えて、「シックス・センス」が活性化して注意力が向上するから",
      "選択肢C「聴覚、筋肉」に刺激を与えて、「直感力」が活性化して注意力が向上するから",
      0,
      1,
      1,
      1,
    ],
    [
      "問2.人間の「行動特性」の組み合わせで正しいのはどれですか？",
      "問2の正解は？",
      "選択肢A 「錯覚」「逃避行動」「忍耐行動」「近道行動」",
      "選択肢B「錯覚」「不注意」「省略行動」「近道行動」",
      "選択肢C「楽観行動」「不注意」「悲観行動」「近道行動」",
      1,
      1,
      1,
      1,
    ],
    [
      "問3.人間の「意識レベル」の説明として正しいのはどれですか？",
      "問3の正解は？",
      "選択肢A「3」段階あり、「小さく」なるほど集中・緊張した状態",
      "選択肢B「4」段階あり、「大きく」なるほど集中・緊張した状態",
      "選択肢C「5」段階あり、「大きく」なるほど集中・緊張した状態",
      2,
      1,
      1,
      1,
    ],
    [
      "問4.「指差呼称」をすることによって「意識レベル」が切り替えられるが、切り替わった後の「意識レベル」は?",
      "問4の正解は？",
      "選択肢A レベル「3」",
      "選択肢B レベル「5」",
      "選択肢C レベル「C」",
      0,
      1,
      1,
      1,
    ],
    ["問5.本日の「指差し呼称」の教育を受けた後の感想として正しいのは？", "問5の正解は？", "選択肢A「今日の教育は「指差呼称」だったの？全然聞いてなかった!」", "選択肢B「指差し呼称なんてめんどくさい。やらない!」", "選択肢C「指差し呼称の有効性を理解できた。今後実践しよう!」", 2, 1, 1, 1],
  ];

  function render(quiz) {
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    h2.textContent = quiz[0];
    h3.textContent = quiz[1];

    const ul = document.createElement("ul");
    const li0 = document.createElement("li");
    li0.textContent = quiz[2];

    li0.addEventListener("click", () => {
      if (li0.classList.contains("correct")) {
        li0.classList.remove("correct");
      } else if (li0.classList.contains("wrong")) {
        li0.classList.remove("wrong");
      } else if (quiz[5] === 0) {
        li0.classList.add("correct");
        quiz[6] = 0;
      } else if (quiz[5] !== 0) {
        li0.classList.add("wrong");
      }
    });

    const li1 = document.createElement("li");
    li1.textContent = quiz[3];
    li1.addEventListener("click", () => {
      if (li1.classList.contains("correct")) {
        li1.classList.remove("correct");
      } else if (li1.classList.contains("wrong")) {
        li1.classList.remove("wrong");
      } else if (quiz[5] === 1) {
        li1.classList.add("correct");
        quiz[7] = 0;
      } else if (quiz[5] !== 1) {
        li1.classList.add("wrong");
      }
    });

    const li2 = document.createElement("li");
    li2.textContent = quiz[4];
    li2.addEventListener("click", () => {
      if (li2.classList.contains("correct")) {
        li2.classList.remove("correct");
      } else if (li2.classList.contains("wrong")) {
        li2.classList.remove("wrong");
      } else if (quiz[5] === 2) {
        li2.classList.add("correct");
        quiz[8] = 0;
      } else if (quiz[5] !== 2) {
        li2.classList.add("wrong");
      }
    });

    ul.appendChild(li0);
    ul.appendChild(li1);
    ul.appendChild(li2);

    section.appendChild(h2);
    section.appendChild(h3);
    section.appendChild(ul);
    header.appendChild(section);
  }

  quizzes.forEach((quiz) => {
    render(quiz);
  });

  console.log(quizzes);

  const button_2 = document.querySelector("#button_2");
  button_2.addEventListener("click", () => {
    if (button_2.classList.contains("inactive")) {
      return;
    }
    button_2.classList.add("inactive");
    confirm(
      "次は「答え合わせスタート」をクリック！その後で各問の「判定ボタン」をクリック！"
    );

    class Panel {
      constructor(answer, number, loc) {
        this.answer = answer;
        this.number = number;
        this.loc = loc;
        this.judge = this.answer === this.number;

        console.log(this.judge);
        console.log(this.judgeCount);

        const section = document.createElement("section");
        section.classList.add("panel");

        this.img = document.createElement("img");
        this.img.src = this.getRandamImage();

        this.timeoutId = undefined;

        this.stop = document.createElement("div");
        this.stop.textContent = `第${this.loc}問判定`;
        this.stop.classList.add("stop");
        this.stop.addEventListener("click", () => {
          if (this.stop.classList.contains("inactive")) {
            return;
          }
          this.stop.classList.add("inactive");
          clearTimeout(this.timeoutId);

          panelsLeft--;

          if (panelsLeft === 0) {
            checkResult();
            setTimeout(() => {
              confirm(
                "試験お疲れです！！左下の「解説」をチェックして復習してな！"
              );
            }, 2000);
          }
        });

        section.appendChild(this.img);
        section.appendChild(this.stop);

        const main = document.querySelector("main");
        main.appendChild(section);
      }

      getRandamImage() {
        const images = [
          "img/f_f_event_01.png",
          "img/f_f_event_02.png",
          "img/f_f_event_03.png",
          "img/f_f_event_04.png",
          "img/f_f_event_05.png",
          "img/f_f_business_06.png",
          "img/f_f_business_07.png",
          "img/f_f_business_08.png",
          "img/f_f_business_09.png",
          "img/f_f_business_10.png",
          "img/f_f_object_11.png",
          "img/f_f_object_12.png",
        ];

        return images[Math.floor(Math.random() * images.length)];
      }

      spin() {
        this.img.src = this.getRandamImage();
        this.timeoutId = setTimeout(() => {
          this.spin();
        }, 100);
      }

      isUnmatched() {
        if (this.judge) {
          this.match();
        } else {
          this.unmatch();
        }
      }

      match() {
        this.img.src = "img/correctAnswer_0bg.png";
        this.stop.textContent = `第${this.loc}問正解!`;
        this.stop.style.opacity = 1;
      }

      unmatch() {
        this.img.classList.add("unmatched");
        this.img.src = "img/wrongAnswer_1bg.png";
        this.stop.textContent = `第${this.loc}問残念!`;
      }
    }

    const panels = [
      new Panel(0, quizzes[0][6], 1),
      new Panel(0, quizzes[1][7], 2),
      new Panel(0, quizzes[2][8], 3),
      new Panel(0, quizzes[3][6], 4),
      new Panel(0, quizzes[4][8], 5),
    ];

    function checkResult() {
      if (panels[0].isUnmatched()) {
      }
      if (panels[1].isUnmatched()) {
      }
      if (panels[2].isUnmatched()) {
      }
      if (panels[3].isUnmatched()) {
      }
      if (panels[4].isUnmatched()) {
      }
    }

    let panelsLeft = 5;

    const spin = document.getElementById("spin");
    spin.addEventListener("click", () => {
      if (spin.classList.contains("inactive")) {
        return;
      }
      spin.classList.add("inactive");
      panels.forEach((panel) => {
        panel.spin();
      });
    });
  });

  let moveItem = document.querySelector(".moveItem");
  let footer = document.querySelector("footer");
  let message = document.querySelector(".message");
  let end = document.querySelector(".end");
  end.appendChild(message);
  footer.classList.remove("moveItem");
  message.classList.remove("message");
  const base = document.getElementById("base");
  base.addEventListener("change", () => {
    footer.classList.add("moveItem");
    message.classList.add("message");
    message.textContent = "テスト終了！";
  });
}
