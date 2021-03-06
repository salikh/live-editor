# Mind the Gap 冬季ワークショップ Javascript/Processing.js {#ref-help}

*   [はじめに][PJSStep0]
    *   [独立のワークショップ資料](http://bit.ly/mtg-winter-js)
*   [Step 1: キャンバス][PJSStep1]
*   [Step 2: 色][PJSStep2]
*   [Step 3: アニメーション][PJSStep3]
*   [Step 4: マウスの使い方][PJSStep4]
*   [Step 5: キーボードの使い方][PJSStep5]
*   [Step 6: シミュレーション][PJSStep6]
*   [Step 7: 画像と音][PJSStep7]
*   [Step 8: ゲームサンプル][PJSStep8]
*   [作品の提出フォーム](https://forms.gle/kqJvxbtT3UsX4muR8)
*   [アンケート](http://bit.ly/mtg-survey-2021)
*   ヘルプ
    *   [索引][index]
    *   [ツール][Tools]
    *   [デモ][Demos]
    *   [ゲーム][Games]
    *   [画像リスト][ImageLibrary]
    *   [音のリスト][SoundLibrary]

# はじめに {#ref-PJSStep0}

このワークショップの目的は、皆さんにプログラミングを体験していただき、コンピューターサイエンスは誰でも気軽に楽しめるものだということを知っていただくことです。そこで、本日は皆さんに簡単なゲームかアニメーションを作っていただきます。

今回はJavascriptというプログラミング言語を使います。プログラミング言語にはライブラリというものがあります。ライブラリとはプログラムの再利用できる部品をあつめたものです。Javascriptの場合は、他のプログラミング言語と比べて、ライブラリが特に豊富です。本日はProcessing.jsというJavascriptのライブラリを使ってプログラムを作ります。今回は本ワークショップ専用のページを使いますが、Javascriptはライブラリの種類も多く、様々な使い方があり、とても実用的なプログラミング言語です。

左側にプログラムを打ち込んで実行すると右側のキャンバスに結果が表示されます。

機能の説明やサンプルプログラムはヘルプから見られます。プログラムを打ち込むと自動的に実行されて、すぐにキャンバスに結果がでます。右側キャンパス下のRestartボタンを押すことで再実行できます。


プログラムに何か問題があるとキャンバスの上に「Oh noes!」というメッセージが出ます。この場合、プログラムの修正が必要です。「Show me where」をクリックすると、プログラムの問題がある部分を示してくれます。不明な点があれば、社員のTAに遠慮なく質問してください。

![oh-noes](images/oh-noes.png)

ワークショップ中に出ているサンプルプログラムは全てヘルプに含まれています。タイピングが難しい場合や、いちいち入力していると講義に追い付けなくなりそうな場合は、ヘルプから読み込むことができます。

![Help button](images/help1.png)
![Help link](images/help2.png)
![Load program](images/load1.png)

開発中に別のサンプルプログラムを試したいときは、「New」 ボタンをクリックします。すると新しいタブが開いて新たにサンプルプログラムが表示されます。元のタブに戻ると、これまでのプログラムが継続して編集できます。

![New program](images/new1.png)

「Program name」のところを使ってプログラムに名前をつけることができます。「My projects」をクリックすると、前に編集したプログラムのリストが出ますので、前に作ったプログラムに簡単に戻れます。

プログラムの中に現れる単語や関数が分からないときは、ヘルプを使ってみましょう。

次は[ステップ1][PJSStep1]へ。

# ステップ１: キャンバス {#ref-PJSStep1}

コンピューターグラフィックでは、x座標は数学と同じように右に向かって増えますが、y座標は普通の数学とは反対で下に向かって増えます。

プログラムを書く画面のときはキャンバスはいつも約 400 × 400ですが、フルスクリーン（Fullscreen ボタンをクリック）でプログラムを実行するときはみなさんのパソコンの画面の大きさによってキャンパスのサイズが変わります。width や height の変数を使って大きさを調べることができます。

```render
function arrow(x1, y1, x2, y2) {                                                                    
  line(x1, y1, x2, y2);                                                                             
  var x = x2-x1;
  var y = y2-y1;
  var l = sqrt(x*x+y*y);                                                                            
  x = x / l * 10;                                                                                   
  y = y / l * 10;
  var alpha = 45;
  line(x2, y2, x2 - x*cos(alpha) + y*sin(alpha), y2 - x*sin(alpha) - y*cos(alpha));                 
  line(x2, y2, x2 - x*cos(-alpha) + y*sin(-alpha), y2 - x*sin(-alpha) - y*cos(-alpha));             
} 
  
size(150, 150, "2D");
arrow(10, 20, width-20, 20);                                                                        
arrow(20, 10, 20, height-20);                                                                       
fill(0);
text("(0,0)", 1, 11);
text("x", width-20, 37);                                                                            
text("y", 30, height-15); 
```

```example
// WidthAndHeightExample
fill(0,0,0);
textSize(15);
text("width: " + width, 10, 50);
text("height: " + height, 10, 80);
```

同じように、座標を使って様々な図形を描くことができます。
よく使うのは rect(), ellipse(), line() です。

![images/rect.png](images/rect.png)
![images/ellipse.png](images/ellipse.png)
![images/line.png](images/line.png)

例えば、こちらのプログラムを打ち込んでみましょう。　または、ヘルプの中に「Step1」にクリックして、そのプログラムの「読み込む」ボタンを押しましょう。

```prerender
// RectEllipseLine
rect(10, 10, 80, 40);
ellipse(50, 75, 80, 40);
line(10, 60, 90, 90);
```

キャンバスに右のような絵が表示されたでしょうか？
プログラムを構成する一つ一つの行を命令といいます。Javascriptでは、各命令は必ずセミコロン( ; )で終わらなければいけません。

数字で絵を描くと不便なので、環境に一つの役に立つツール組み込んでいます。　プログラムの中に数字のところにクリックすると、スライダーが出てきます。スライダーをマウスで押しなら左右動かすと、数字が変わって、キャンバスの絵もすぐに反応します。

![Adjust constant](images/adjust.png)

それでは、今習ったことを使ってみましょう。

**問題１**：雪だるまを描きましょう。完成したプログラムに名前をつけましょう。
例に限らず、好きなような形の雪だるまにしましょう。

例として以下の雪だるまいかがでしょうか。

```render
// Snowman
size(300, 300, "2D");
ellipse(150, 250, 100, 100);
ellipse(150, 170, 80, 80);
ellipse(150, 110, 60, 60);
```

```hidden
// Snowman1
ellipse(150, 250, 100, 100);
ellipse(150, 170, 80, 80);
ellipse(150, 110, 60, 60);
```

できましたか？

次は、[ステップ2][PJSStep2]へ。

# ステップ2: 色 {#ref-PJSStep2}

今までの絵は白黒でしたが、それではつまらないので、色を加えてみましょう。ProcessingではRGBまたはRGBAカラーモデルを採用しています。RGBはR=Red (赤)、G=Green (緑)、B=Blue (青)から成り立っています。右の図はRGBのカラーミックスのイメージです。RGBそれぞれに0から255の数字で色の強さを指定します。

各図形はペンで図形の縁が描画され、内部を塗りつぶします。色を設定する命令はそれぞれにあり、ペンの色は stroke() で、塗りつぶす色は fill()で設定します。

```render
function posToColor(x, y) {
  if (x < width/2 && y < height/2) {
    return color((width/2-x)/width*512, (height/2-y)/height*512, 0);
  } else if (x < width/2) {
    return color(220);
  } else if (y < height/2) {
    return color(0, (height/2-y)/height*512, (x-width/2)/width*512);
  } else {
    return color((y-height/2)/height*512, 0, (x-width/2)/width*512);
  }
}

size(200, 200, "2D");

for (var x = 0; x < width; x++) {
  for (var y = 0; y < height; y++) {
    set(x, y, posToColor(x, y));
  }
}

fill(255);
textSize(height/20);
text("(255,0,0)", 5, height/2-5);
fill(0);
textAlign(LEFT, TOP);
text("(255,255,0)", 5, 2);
textAlign(RIGHT, TOP);
text("(0,255,255)", width-5, 2);
textAlign(CENTER, TOP);
text("(0,255,0)", width/2, 2);
textAlign(LEFT, BASELINE);
fill(255);
text("(0,0,0)", width/2+2, height/2-2);
textAlign(RIGHT, BASELINE);
text("(0,0,255)", width-2, height/2);
fill(0);
textAlign(LEFT, BOTTOM);
text("(255,0,0)", width/2+2, height-2);
textAlign(RIGHT, BOTTOM);
text("(255,0,255)", width-2, height-2);
```

例えば、こちらのプログラムを打ち込んでみましょう。

```prerender
// FillExample
fill(0, 255, 0);  // 塗りつぶす色
stroke(0, 0, 255);  // ペンの色
ellipse(50, 50, 80, 80);
```

右側にあるの絵のようになりましたか？

色の設定は、数字だけではなくて、UIツールでもできます。コードの `fill()` や`stroke()`の中の数値（245や250など）をクリックしてみてください。

![Color tool](images/color1.png)
![Color tool](images/color2.png)

プログラム中に出てくる、`//`から始まる文章は、コメントと呼びます。コンピューターはコメントを無視するので、プログラムの説明を入れたいときに便利です。

RGBAカラーモデルはRGBに加えてA=Alpha(透明度)が設定できます。例えば、内部を塗らない楕円を描くことができます：

```prerender
// FillExampleAlpha
fill(0, 0, 0, 0);  // アルファは0だから、塗りつぶさない
ellipse(50, 50, 80, 80);
```

色を使わないで、明るさだけを設定するときは、RGB 3つの数は同じになるので、省略することができます:
`fill(0);`は`fill(0,0,0);`と同じ意味です。 

塗りつぶさないときは`noFill();`も使えます。

では、雪だるまに色を着けてみましょう。

**問題２**：前に作った雪だるまに色を着けましょう。右に色付けの例を示します。好きな色にしてもいいです。　前に作った雪だるまのプログラムがなくなったら、「My projects」のボタンを押して戻ることができます。

```render
// SnowmanColor
size(300, 300, "2D");
strokeWeight(5);
stroke(255, 100, 100);
ellipse(150, 250, 100, 100);
stroke(100, 255, 100);
ellipse(150, 170, 80, 80);
stroke(100, 100, 255);
ellipse(150, 110, 60, 60);
```

```hidden
// SnowmanColor
strokeWeight(5);
stroke(255, 100, 100);
ellipse(150, 250, 100, 100);
stroke(100, 255, 100);
ellipse(150, 170, 80, 80);
stroke(100, 100, 255);
ellipse(150, 110, 60, 60);
```

次は[ステップ3][PJSStep3]へ。

# ステップ3: アニメーション {#ref-PJSStep3}

今日のワークショップの目的は皆さんに自分で簡単なゲームを作ってもらうことなので、単に図形を描くだけでは足りません。図形を動かしてみましょう。

そのためには、同じプログラムを何回も繰り返し実行する必要があります。Processingにはアニメーションを作るのための仕組みがすでに含まれています。

一回だけ実行したいプログラムの部分はそのまま書き、何回も繰り返し実行したい部分はfunction draw() { ... }の中に書くと、簡単なアニメーションを作れます。
このように{}で囲ったプログラムの部分は「関数」といいます。 関数は自由に作れますが、draw()という関数は特別で、自動的に何回も繰り返して実行されます。

![execution diagram](images/execution-diagram.png)

いくつかの例を見てみましょう。

```prerender
// FrameCountTooFast
textSize(50); // 文字を大きくする
fill(0);      // 文字を黒にする

function draw() {
  text(frameCount, 10, 50);
}
```

速すぎて何が起きたかよくわかりません。実行をもう少し遅くするには`frameRate()`を使います。`draw()`が一回実行されたときを一つのフレームとして考えると、フレーム・レートは一秒あたり何回`draw()`が呼ばれるかを示します。

```prerender
// FrameCountOverwrite
textSize(50); // 文字を大きくする
fill(0);      // 文字を黒にする
frameRate(1); // フレームをゆっくり出す
background(255);

function draw() {
  text(frameCount, 10, 50);
}
```

今回はわかりやすくなりましたね。同じところに連続で１、２、３などの数字を表示しています。`frameCount`はプログラムが開始されてから表示されたフレーム数を表しています。結果として`draw()`の実行ごとに0から1ずつ増えた数が重ねて描画されます。

次は番号が重ならないようにしましょう。新しい番号を表示する前にキャンバスをクリアすることで、新しい番号がはっきり見えます。キャンバスをクリアするためにはbackground()を使います。background()には前と同様にRGBの形式で色を指定できます。

```prerender
// FrameCount
textSize(50); // 文字を大きくする
fill(0);      // 文字を黒にする
frameRate(1); // フレームをゆっくり出す

function draw() {
  background(200);  // キャンバスをグレーに塗りつぶす
  text(frameCount, 10, 50);
}
```

この例で出てきた`frameCount`は変数といいます。他の変数の例をみてみましょう。

```
var x = 0;
```

`var`を使って新しい変数を作りました。変数を使って、アニメーションを作りましょう。以下のプログラムをヘルプから読み込みしましょう。

```prerender
// VariableExample

var x = 0;

function draw() {
  background(255);
  ellipse(x, 50, 80, 80);
  x = x + 1;
  if (x > width) {
    x = 0;
  }
}
```

この例では、`draw()`を実行のたびにx変数の値を１づつ増やします。`if`文を使って、右側にたどり着いたら左側にもどします。`if`文は「条件分岐」と呼ぶこともあります。

**問題３**：draw()やframeCountまたは自分で作った変数を使って好きなように雪だるまのアニメーションを作りましょう。何か分からないことがあったら質問してください。

```render
size(300, 300, "2D");
frameRate(30);
var x = 150, y = 170;

function draw() {
  background(220);
  strokeWeight(5);
  stroke(255, 100, 100);
  ellipse(x, y+80, 100, 100);
  stroke(100, 255, 100);
  ellipse(x-10*cos(frameCount*5), y, 80, 80);
  stroke(100, 100, 255);
  ellipse(x+10*sin(frameCount*5), y-60, 60, 60);
}
```

できましたか？　ヘルプのStep３の最後に「表示」のボタンを押して、一つのアニメーションの例を見てみましょう。

```hidden
// WavingColoredSnowman
size(300, 300, "2D");
frameRate(30);
var x = 150, y = 170;

function draw() {
  background(220);
  strokeWeight(5);
  stroke(255, 100, 100);
  ellipse(x, y+80, 100, 100);
  stroke(100, 255, 100);
  ellipse(x-10*cos(frameCount*5), y, 80, 80);
  stroke(100, 100, 255);
  ellipse(x+10*sin(frameCount*5), y-60, 60, 60);
}
```

次は[ステップ4][PJSStep4]へ。

# ステップ4: マウスの使い方 {#ref-PJSStep4}

ゲームを作るにはユーザーからの入力を処理する必要があります。まずはマウスを使ってみましょう。プログラムの実行中にマウスがキャンバスの中に入ると、変数 mouseX と mouseY にマウスの位置が設定されます。

```prerender
// CircleFollowsMouse
function draw() {
  background(255);  // 白
  ellipse(mouseX, mouseY, 20, 20);
}
```

マウスをキャンバス内で動かしてみましょう。丸がマウスについてくるのがわかるでしょう。

ちなみに、Javascriptでは関数を定義する方法はいくつかあります。こちらのプログラムは前のプログラムと全く同じ意味です。

```prerender
// CircleFollowsMouse
var draw = function() {
  background(255);  // 白
  ellipse(mouseX, mouseY, 20, 20);
};
```

では、ユーザーがマウスをクリックしたらキャンバスを黒くしてみましょう。
ユーザーがマウスをクリックしたことに反応するためには、`mousePressed()`関数を定義します。この関数は、マウスのボタンが押されたときに呼ばれます。次のプログラムを実行して、マウスをキャンバス内でクリックすると、一瞬だけキャンバスが黒くなります。


```prerender
// ClickedTooShort
function draw() {
  background(255);  // 白
  ellipse(mouseX, mouseY, 20, 20);
  frameRate(10);
}

function mousePressed() {
  background(0);  // 黒
}
```

なぜキャンバスが黒のままにならないのでしょうか。それは、`draw()`関数が繰り返し実行され、`draw()`の中にキャンバスを白く塗りつぶす命令`background(255, 255, 255)`があるからです。

マウスをクリックした後、キャンバスを一瞬だけではなくずっと黒にするには、どうすればいいでしょうか。

ここで変数が役に立ちます。ただ前と違って、Processingの標準の変数ではなくて、自分で新しい変数を作ります。変数を作るには、var c = 255;のような文をプログラムに追加します。この = 255 は変数の値を指定しています。c は変数の名前です。マウスがクリックされたときに `mousePressed()` が呼ばれるので、その中で変数の値を変えることができます。

```prerender
// ClickedBlack
var c = 255;

function draw() {
  background(c);
  ellipse(mouseX, mouseY, 20, 20);
  frameRate(10);
}

function mousePressed() {
  c = 0;
}
```

ここでは、プログラムの実行を始めた時に変数 c が作られて、最初の値は 255 になっています。変数の値が 255 なので、`background(c);` はキャンバスを白く塗りつぶします。ユーザがマウスをクリックすると、`mousePressed()` が呼ばれて、変数 c の値が 0 になります。その後は、`background(c);` という命令はキャンバスを黒く塗りつぶすことになります。

**問題4**: 雪だるまをマウスと一緒に動かしてみましょう。

```hidden
// SnowmanFollowsMouse
draw = function() {
  background(220);
  ellipse(mouseX, mouseY+80, 100, 100);
  ellipse(mouseX, mouseY, 80, 80);
  ellipse(mouseX, mouseY-60, 60, 60);
};
```

次は[ステップ5][PJSStep5]へ。

# ステップ5: キーボードの使い方 {#ref-PJSStep5}

ゲーム機には普通マウスはついてないので、キーパッドで遊ぶことが多いでしょう。では、ゲーム機のようにキーボードを使って遊べるようにするにはどうすればいいでしょうか。

Processingでは、キーボードの使い方はマウスととても似ています。キーボードのボタンが押されるたびに `keyPressed()` 関数が呼ばれます。次の例を見ましょう。その関数の中で`keyCode` を参照すると、押されたキーが分かります。

```prerender
var x = 50;

function draw() {
  background(220);
  ellipse(x, 50, 30, 30);
}

function keyPressed() {
  if (keyCode === LEFT) {
    x = x - 5;
  }
  if (keyCode === RIGHT) {
      x = x + 5;
  }
}
```

このプログラムでは丸を描いています。実行し、キャンバス内をクリックして、左右の矢印キーを押してみましょう。

**問題5**: 雪だるまをキーボードの左右矢印キーで動かしてみましょう。

```hidden
// SnowmanKeyboard
var x = 150;

function draw() {
  background(220);
  ellipse(x, 250, 100, 100);
  ellipse(x, 170, 80, 80);
  ellipse(x, 110, 60, 60);
}

function keyPressed() {
  if (keyCode === LEFT) {
    x = x - 5;
  }
  if (keyCode === RIGHT) {
      x = x + 5;
  }
}
```

次は[ステップ6][PJSStep6]へ。

# ステップ6: シミュレーション {#ref-PJSStep6}

ゲームのなかのオブジェクトは動きが現実と近いと現実と近いと遊びやすくなります。たとえば、重力で落ちるボールはどのようにプログラムで表現すればよいのでしょうか？これはシミュレーションを使って実装できます。ボールのシミュレーションには位置と速度が必要です。重力の場合は加速度は定数です。

```prerender
// FallingBall
var y = 10;
var vy = 0;

function draw() {
  // シミュレーション
  y = y + vy;     // 縦位置
  vy = vy + 0.1;  // 加速
  // アニメーション
  background(220);
  ellipse(50, y, 30, 30);
}
```

ボールのシミュレーションに２つの変数を使います。`y`は縦方向の位置、`vy`は縦方向の速度を表しています。`draw()`は一秒に10回呼ばれ、毎回新しい位置と速度を計算します。シミュレーションの計算の後、キャンバスを書き直すことでアニメーションを実装します。

以上のシミュレーションではボールが一回キャンバスの下に落ちたらキャンバスから消えてしまいます。ボールをゲームから消えさせないようにキャンバスの端からバウンドさせることもできます。
プログラムの実行の世界では端というものが存在しないので、プログラムは「壁にぶつかったか」という条件を調べなければいけません。

```prerender
// BouncingBall
var y = 10;
var vy = 0;

function draw() {
  y = y + vy;     // 縦位置
  vy = vy + 0.1;  // 加速
  if (y > height) {  // 床に当たる条件
    y = height;
    vy = -6;
  }
  background(220);
  ellipse(50, y, 30, 30);
}
```



この例では、円が床に当たっているかどうかという条件を調べています。`y`軸は下向きなので、キャンバスの下の部分のY座標は`height`です。シミュレーションの計算の結果でボールが床に当たったかどうかの条件は `y > height`で調べられます。

ボールが床に当たった時にボールに上向きの速度を与えれば、本物のボールのようにバウンドします。


**問題6:** 雪だるまを飛ばせてみましょう。

```hidden
// SnowmanBounce

var x = 150;
var y = height;
var vy = -2;

function draw() {
  y = y + vy;
  vy = vy + 0.1;
  if (y > height) {
    y = height;
    vy = -5;
  }
  background(220);
  ellipse(x, y-50, 100, 100);
  ellipse(x, y-130, 80, 80);
  ellipse(x, y-190, 60, 60);
}

function keyPressed() {
  if (keyCode === LEFT) {
    x = x - 5;
  }
  if (keyCode === RIGHT) {
      x = x + 5;
  }
}
```

次は[ステプ7][PJSStep7]へ。

# ステップ7: 画像と音 {#ref-PJSStep7}

以前はゲーム作り基本を学びましたが、 楽しいゲームを作るために画像や音が欠かせないものです。 簡単な画像や音のエフェクトの使い方を紹介します。

```prerender
// BananaImage
imageMode(CENTER);
image(getImage("cc0/banana-200x113"), 50, 50, 100, 67);
```

`imageMode`は画像の写し方を設定します。 `CENTER`(中心)を設定すると座標の(x,y)の点に画像の中心が写します。 `CORNER`(角)を設定すると(x,y)の点に左上角が写します。

```render
var img = getImage("cc0/baloon1-170x200.png");
size(300, 200, "2D");
frameRate(1);
textSize(16);
fill(0);
textAlign(LEFT, TOP);
strokeWeight(5);
function draw() {
  background(220);
  fill(0);
  if (frameCount % 2 === 0) {
    imageMode(CENTER);
    image(img, width/2, height/2, 85, 100);
    text("imageMode(CENTER);", 2, 5);
  } else {
    imageMode(CORNER);
    image(img, width/2, height/2, 85, 100);
    text("imageMode(CORNER);", 2, 5);
  }
  point(width/2, height/2);
  text("(x,y)", width/2, height/2);
}
```

画像をいくつか用意しましたので、[画像リスト][ImageLibrary]でご確認ください。

音の場合も、音のデータを用意する必要があります。`getSound()`を呼ぶことによって音のデータを用意します。用意されたデータを変数（ここでは`sound`）に保存しておき、適切なときに`playSound()`命令を使って再生します。音の場合は、再生に時間がかかりますが、その間もプログラムは実行し続ます。

```prerender
// MeowExample
var sound = getSound("cc0/meow.ogg");
function mouseClicked() {
  playSound(sound);
}
function draw() {
  if (!sound.audio.paused) {
    background(220);
    fill(0); textSize(20);
    text("Meow", 5, 20);
  } else {
    background(220);
  }
}
```

音をいくつか用意しましたので、[音のリスト][SoundLibrary]を見てください。

次は[ステップ8][PJSStep8]へ。

# ステップ8: ゲームサンプル {#ref-PJSStep8}

次のプログラムをサンプルとして使って自由自在ゲームを作ってみましょう。 以下に部分ごとに説明あります。

```example
// RocketLandingExample

var fire = getImage("cc0/fire2-134x200");
var rocket = getImage("cc0/rocket-168x300");
var rocket_fire = getImage("cc0/rocket1-168x300");
var explosion = getSound("cc0/explosion.ogg");
var roar = getSound("cc0/roar.ogg");
var win = getSound("cc0/win.ogg");

var x;
var y;
var vy;

var burning = false;
var gameOver = false;

function initVars() {
  x = 100;
  y = 10;
  vy = 0;
  gameOver = false;
  burning = false;
}

frameRate(20);
imageMode(CENTER);
initVars();

function draw() {
  y = y + vy;
  vy = vy + 0.2;
  
  if (y > height - 30) {
    if (abs(vy) > 3) {
      background(200);
      image(fire, x, y-25, 65, 100);
      playSound(explosion);
    } else {
      playSound(win);
    }
    noLoop();
    gameOver = true;
    return;
  }
  
  background(100);
  if (burning) {
    image(rocket_fire, x, y, 34, 60);
    burning = false;
  } else {
    image(rocket, x, y, 34, 60);
  }
}

function burn() {
  burning = true;
  vy -= 2;
  playSound(roar);
}

function keyPressed() {
  if (gameOver) {
    initVars();
    loop();
    return;
  }
  burn();
}

function mousePressed() {
  if (gameOver) {
    initVars();
    loop();
    return;
  }
  burn();
}
```

以下はサンプルゲームの簡単な説明です。


まずは使う画像をロードします。

```
var fire = getImage("cc0/fire2-134x200");
var rocket = getImage("cc0/rocket-168x300");
var rocket_fire = getImage("cc0/rocket1-168x300");
```

次は音を用意します。

```
var explosion = getSound("cc0/explosion.ogg");
var roar = getSound("cc0/roar.ogg");
var win = getSound("cc0/win.ogg");
```

ゲームの状態を保つために変数を作ります。

```
var x;
var y;
var vy;

var burning = false;
var gameOver = false;
```

プログラムの一度の実行で、何回もゲームできるようにしますので、ゲームを最初の状態に戻す関数を用意します。（初期化する関数といいます）。

```
function initVars() {
  x = 100;
  y = 10;
  vy = 0;
  gameOver = false;
  burning = false;
}
```

プログラムの最初のところ、フレームレートと画像の表示方法を設定します。または、初期化の関数を呼びます。

```
frameRate(20);
imageMode(CENTER);
initVars();
```

フレームごとに呼ばれる`draw()`関数の中でシミュレーションを行います。

```
function draw() {
  y = y + vy;
  vy = vy + 0.2;
```

シミュレーションの後、ゲームが終わったかどうかを調べます。このゲームはロケットが着陸したらゲームが終わりますので、`y > height-30`の条件をチェックします。ロケットの位置を中心の座標を使ってあらわしているので、y が height - (画像の高さの半分) の時に、ちょうどロケットの下がキャンバスの一番下と一致(つまりロケットが着陸)します。この例ではロケットの画像の高さが 60 なので、その半分を引いた `height - 30` と y を比較します。

```
  if (y > height - 30) {
    if (abs(vy) > 3) {
      background(200);
      image(fire, x, y-25, 65, 100);
      playSound(explosion);
    } else {
      playSound(win);
    }
    noLoop();
    gameOver = true;
    return;
  }
```

着陸条件を満たしていたら、安全に着陸できたかどうかしらべます。速度が速すぎたら(`abs(vy) > 3`), 着陸失敗として、ロケットが爆発するアニメーションを表示します。成功の場合も失敗の場合も、`noLoop()`を呼んでアニメ−ションを一旦止めます。なぜかというと、次のゲームが始まるまではアニメーションは必要ないからです。

まだ着陸していない場合(上の`y > height - 30`の条件を満たしていない場合)は、アニメーションを行います。

```
  background(100);
  if (burning) {
    image(rocket_fire, x, y, 34, 60);
    burning = false;
  } else {
    image(rocket, x, y, 34, 60);
  }
```

ここでは、burningの変数をチェックして、ロケットの画像は炎付きの画像を表示するか、炎なしの画像を表示するかを決めます。

ロケットのエンジンが掛かる場合のシミュレーションをする関数も作ります。

```
function burn() {
  burning = true;
  vy -= 2;
  playSound(roar);
}
```

なぜ関数が必要なのかというと、マウスでもキーボードでもゲームできるようにしたいからです。

キーボードを使うためにkeyPressed()の関数を定義します。

```
function keyPressed() {
  if (gameOver) {
    initVars();
    loop();
    return;
  }
  burn();
}
```

キーボードには２つの機能があります。ゲームが終わった状態であれば、ゲーム状態をイニシャライズして新しいゲームをスタートします。そのためにloop()を呼んでアニメーションも再開します。ゲームの最中の場合(`gameOver`は偽の場合)はエンジンを掛けるシミュレーションが呼ばれます(`burn();`)。


同じように、マウスがクリックされたら、同じ対応します。

```
function mousePressed() {
  if (gameOver) {
    initVars();
    loop();
    return;
  }
  burn();
}
```

これでゲームの完成です。

他のゲームは[サンプルゲーム][Games]にご参照ください。

# ツール {#ref-Tools}

*   [軸を示す][ShowAxes]
*   [座標を示す][ShowCoordinates]
*   [色を選ぶ][ColorTool]
*   [長方形を描く][RectangleTool]
*   [楕円を描く][EllipseTool]
*   [keyCodeを調べる][keyCodes]

# ShowAxes

このプログラムは軸をお見せします。

```prerender
// CanvasAxes
function arrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  var x = x2-x1;
  var y = y2-y1;
  var l = sqrt(x*x+y*y);
  x = x / l * 10;
  y = y / l * 10;
  var alpha = 45;
  line(x2, y2, x2 - x*cos(alpha) + y*sin(alpha), y2 - x*sin(alpha) - y*cos(alpha));
  line(x2, y2, x2 - x*cos(-alpha) + y*sin(-alpha), y2 - x*sin(-alpha) - y*cos(-alpha));
}

arrow(10, 20, 90, 20);
arrow(20, 10, 20, 90);
fill(0);
text("(0,0)", 1, 11);
text("x", 80, 37);
text("y", 30, 85);
```

# ShowCoordinates

このプログラムは座標をお見せします。マウスをキャンバス内で動かしてみてください。

```prerender
// ShowCoordinates
size(200, 200, "2D");

function draw() {
  background(220);
  textSize(20);
  fill(0);
  text("("+mouseX+","+mouseY+")", 80, 110);
}
```

# ColorTool

マウスを動かじながら、色を選ぶ

```prerender
// ColorsDemo2
function posToColor(x, y) {
  if (x < width/2 && y < height/2) {
    return color((width/2-x)/width*512, (height/2-y)/height*512, 0);
  } else if (x < width/2) {
    return color(220);
  } else if (y < height/2) {
    return color(0, (height/2-y)/height*512, (x-width/2)/width*512);
  } else {
    return color((y-height/2)/height*512, 0, (x-width/2)/width*512);
  }
}

size(300, 300, "2D");
for (var x = 0; x < width; x++) {
  for (var y = 0; y < height; y++) {
    set(x, y, posToColor(x, y));
  }
}

fill(0);
textSize(height/20);
text("(255,0,0)", 5, height/2-5);
text("(255,255,0)", 5, 20);
textAlign(RIGHT, TOP);
text("(0,255,255)", width-5, 2);
textAlign(CENTER, TOP);
text("(0,255,0)", width/2, 2);
textAlign(LEFT, BASELINE);
fill(255);
text("(0,0,0)", width/2+2, height/2-2);
textAlign(RIGHT, BASELINE);
text("(0,0,255)", width-2, height/2);
fill(0);
textAlign(LEFT, BOTTOM);
text("(255,0,0)", width/2+2, height-2);
textAlign(RIGHT, BOTTOM);
text("(255,0,255)", width-2, height-2);

function draw() {
  var c = posToColor(mouseX, mouseY);
  noStroke();
  fill(c);
  rect(width/10, 6*height/10, 3*width/10, 3*height/10);
  fill(250);
  rect(width/10, 9*height/10, 3*width/10, height/15);
  fill(0);
  textSize(height/27);
  textAlign(LEFT, BASELINE);
  text("color("+red(c)+","+green(c)+","+blue(c)+")", width/10, height*19/20);
}

function mouseClicked() {
  var c = posToColor(mouseX, mouseY);
  println("color("+red(c)+","+green(c)+","+blue(c)+")");
}
```

# EllipseTool

このプログラムは楕円を書く命令をお見せします。キャンバス内でマウス・ドラッグしてみてください。

```prerender
// EllipseTool

var x1, y1, x2, y2;
var pressed = false;

function draw() {
  background(220);
  if (pressed) {
    x2 = mouseX;
    y2 = mouseY;
  }
  if (x2 !== x1) {
    fill(255);
    ellipse(x1, y1, (x2-x1)*2, (y2-y1)*2);
  }
  textSize(18);
  fill(0);
  text("ellipse("+x1+","+y1+","+((x2-x1)*2)+","+((y2-y1)*2)+")", 10, height-10);
}

function mousePressed() {
  if (!pressed) {
    x1 = mouseX;
    y1 = mouseY;
    pressed = true;
  }
}

function mouseReleased() {
  if (pressed) {
    x2 = mouseX;
    y2 = mouseY;
    pressed = false;
    println("ellipse("+x1+","+y1+","+((x2-x1)*2)+","+((y2-y1)*2)+")");
  }
}
```

# RectangleTool

このプログラムは長方形を書く命令をお見せします。キャンバス内でマウス・ドラッグしてみてください。

```prerender
// RectangleTool

var x1, y1, x2, y2;
var pressed = false;

function draw() {
  background(220);
  if (pressed) {
    x2 = mouseX;
    y2 = mouseY;
  }
  if (x2 !== x1) {
    fill(255);
    rect(x1, y1, (x2-x1), (y2-y1));
  }
  textSize(20);
  fill(0);
  text("rect("+x1+","+y1+","+(x2-x1)+","+(y2-y1)+")", 10, height-10);
}

function mousePressed() {
  if (!pressed) {
    x1 = mouseX;
    y1 = mouseY;
    pressed = true;
  }
}

function mouseReleased() {
  if (pressed) {
    x2 = mouseX;
    y2 = mouseY;
    pressed = false;
    println("rect("+x1+","+y1+","+(x2-x1)+","+(y2-y1)+")");
  }
}
```

# 音のリスト {#ref-SoundLibrary}

```prerender
// SoundExample
var sound = getSound("cc0/explosion.ogg");
function mousePressed() {
  playSound(sound);
}
```

*   `cc0/coin.ogg` <audio src="sounds/cc0/coin.ogg" controls/>
*   `cc0/tututun.ogg` <audio src="sounds/cc0/tututun.ogg" controls/>
*   `cc0/didin.ogg` <audio src="sounds/cc0/didin.ogg" controls/>
*   `cc0/rururun.ogg` <audio src="sounds/cc0/rururun.ogg" controls/>
*   `cc0/bells.ogg` <audio src="sounds/cc0/bells.ogg" controls/>
*   `cc0/strings.ogg` <audio src="sounds/cc0/strings.ogg" controls/>
*   `cc0/ugh.ogg` <audio src="sounds/cc0/ugh.ogg" controls/>
*   `cc0/bang.ogg` <audio src="sounds/cc0/bang.ogg" controls/>
*   `cc0/ding.ogg` <audio src="sounds/cc0/ding.ogg" controls/>
*   `cc0/cannon.ogg` <audio src="sounds/cc0/cannon.ogg" controls/>
*   `cc0/growl.ogg` <audio src="sounds/cc0/growl.ogg" controls/>
*   `cc0/explosion.ogg` <audio src="sounds/cc0/explosion.ogg" controls/>
*   `cc0/clicks.ogg` <audio src="sounds/cc0/clicks.ogg" controls/>
*   `cc0/fireworks.ogg` <audio src="sounds/cc0/fireworks.ogg" controls/>
*   `cc0/meow.ogg` <audio src="sounds/cc0/meow.ogg" controls/>
*   `cc0/dog.ogg` <audio src="sounds/cc0/dog.ogg" controls/>
*   `cc0/frog.ogg` <audio src="sounds/cc0/frog.ogg" controls/>
*   `cc0/roar.ogg` <audio src="sounds/cc0/roar.ogg" controls/>
*   `cc0/launch.ogg` <audio src="sounds/cc0/launch.ogg" controls/>
*   `cc0/shot.ogg` <audio src="sounds/cc0/shot.ogg" controls/>
*   `cc0/win.ogg` <audio src="sounds/cc0/win.ogg" controls/>
*   `rpg/battle-magic.mp3` <audio src="sounds/rpg/battle-magic.mp3" controls/>
*   `rpg/battle-spell.mp3` <audio src="sounds/rpg/battle-spell.mp3" controls/>
*   `rpg/giant-yah.mp3` <audio src="sounds/rpg/giant-yah.mp3" controls/>
*   `rpg/coin-jingle.mp3` <audio src="sounds/rpg/coin-jingle.mp3" controls/>
*   `rpg/hit-thud.mp3` <audio src="sounds/rpg/hit-thud.mp3" controls/>
*   `rpg/hit-whack.mp3` <audio src="sounds/rpg/hit-whack.mp3" controls/>
*   `rpg/battle-swing.mp3` <audio src="sounds/rpg/battle-swing.mp3" controls/>
*   `rpg/metal-chime.mp3` <audio src="sounds/rpg/metal-chime.mp3" controls/>
*   `rpg/water-slosh.mp3` <audio src="sounds/rpg/water-slosh.mp3" controls/>
*   `rpg/hit-clop.mp3` <audio src="sounds/rpg/hit-clop.mp3" controls/>
*   `rpg/metal-clink.mp3` <audio src="sounds/rpg/metal-clink.mp3" controls/>
*   `rpg/step-heavy.mp3` <audio src="sounds/rpg/step-heavy.mp3" controls/>
*   `rpg/water-bubble.mp3` <audio src="sounds/rpg/water-bubble.mp3" controls/>
*   `rpg/door-open.mp3` <audio src="sounds/rpg/door-open.mp3" controls/>
*   `rpg/hit-splat.mp3` <audio src="sounds/rpg/hit-splat.mp3" controls/>
*   `rpg/giant-no.mp3` <audio src="sounds/rpg/giant-no.mp3" controls/>
*   `rpg/giant-hyah.mp3` <audio src="sounds/rpg/giant-hyah.mp3" controls/>
*   `retro/whistle2.mp3` <audio src="sounds/retro/whistle2.mp3" controls/>
*   `retro/hit1.mp3` <audio src="sounds/retro/hit1.mp3" controls/>
*   `retro/thruster-short.mp3` <audio src="sounds/retro/thruster-short.mp3" controls/>
*   `retro/jump1.mp3` <audio src="sounds/retro/jump1.mp3" controls/>
*   `retro/whistle1.mp3` <audio src="sounds/retro/whistle1.mp3" controls/>
*   `retro/hit2.mp3` <audio src="sounds/retro/hit2.mp3" controls/>
*   `retro/laser2.mp3` <audio src="sounds/retro/laser2.mp3" controls/>
*   `retro/boom2.mp3` <audio src="sounds/retro/boom2.mp3" controls/>
*   `retro/coin.mp3` <audio src="sounds/retro/coin.mp3" controls/>
*   `retro/laser1.mp3` <audio src="sounds/retro/laser1.mp3" controls/>
*   `retro/laser4.mp3` <audio src="sounds/retro/laser4.mp3" controls/>
*   `retro/jump2.mp3` <audio src="sounds/retro/jump2.mp3" controls/>
*   `retro/rumble.mp3` <audio src="sounds/retro/rumble.mp3" controls/>
*   `retro/laser3.mp3` <audio src="sounds/retro/laser3.mp3" controls/>
*   `retro/thruster-long.mp3` <audio src="sounds/retro/thruster-long.mp3" controls/>
*   `retro/boom1.mp3` <audio src="sounds/retro/boom1.mp3" controls/>

# 画像リスト {#ref-ImageLibrary}

```prerender
// ImageExample
imageMode(CENTER);
var img = getImage("cc0/baloon1-170x200.png");
image(img, 50, 50, 85, 100);
```

*   cc0/baloon1-170x200.png
    ![cc0/baloon1-170x200.png](images/cc0/baloon1-170x200.png)
*   cc0/baloon2-158x200.png
    ![cc0/baloon2-158x200.png](images/cc0/baloon2-158x200.png)
*   cc0/banana-200x113.png
    ![cc0/banana-200x113.png](images/cc0/banana-200x113.png)
*   cc0/baseball-200x171.png
    ![cc0/baseball-200x171.png](images/cc0/baseball-200x171.png)
*   cc0/cat1-200x134.png
    ![cc0/cat1-200x134.png](images/cc0/cat1-200x134.png)
*   cc0/cat2-185x200.png
    ![cc0/cat2-185x200.png](images/cc0/cat2-185x200.png)
*   cc0/cat3-134x200.png
    ![cc0/cat3-134x200.png](images/cc0/cat3-134x200.png)
*   cc0/dog1-200x188.png
    ![cc0/dog1-200x188.png](images/cc0/dog1-200x188.png)
*   cc0/dog2-180x200.png
    ![cc0/dog2-180x200.png](images/cc0/dog2-180x200.png)
*   cc0/dog3-179x200.png
    ![cc0/dog3-179x200.png](images/cc0/dog3-179x200.png)
*   cc0/face1-150x200.png
    ![cc0/face1-150x200.png](images/cc0/face1-150x200.png)
*   cc0/face2-171x200.png
    ![cc0/face2-171x200.png](images/cc0/face2-171x200.png)
*   cc0/face3-188x200.png
    ![cc0/face3-188x200.png](images/cc0/face3-188x200.png)
*   cc0/face4-106x200.png
    ![cc0/face4-106x200.png](images/cc0/face4-106x200.png)
*   cc0/face5-163x200.png
    ![cc0/face5-163x200.png](images/cc0/face5-163x200.png)
*   cc0/face6-155x200.png
    ![cc0/face6-155x200.png](images/cc0/face6-155x200.png)
*   cc0/fire1-200x123.png
    ![cc0/fire1-200x123.png](images/cc0/fire1-200x123.png)
*   cc0/fire2-134x200.png
    ![cc0/fire2-134x200.png](images/cc0/fire2-134x200.png)
*   cc0/football1-200x200.png
    ![cc0/football1-200x200.png](images/cc0/football1-200x200.png)
*   cc0/football2-200x200.png
    ![cc0/football2-200x200.png](images/cc0/football2-200x200.png)
*   cc0/kiwi-200x200.png
    ![cc0/kiwi-200x200.png](images/cc0/kiwi-200x200.png)
*   cc0/rose-200x161.png
    ![cc0/rose-200x161.png](images/cc0/rose-200x161.png)
*   cc0/rocket-168x300.png
    ![cc0/rocket-168x300.png](images/cc0/rocket-168x300.png)
*   cc0/rocket1-168x300.png
    ![cc0/rocket1-168x300.png](images/cc0/rocket1-168x300.png)
*   cc0/smoke-200x195.png
    ![cc0/smoke-200x195.png](images/cc0/smoke-200x195.png)
*   cc0/sunflower-130x200.png
    ![cc0/sunflower-130x200.png](images/cc0/sunflower-130x200.png)
*   cc0/tennisball-200x197.png
    ![cc0/tennisball-200x197.png](images/cc0/tennisball-200x197.png)
*   cc0/Walker44.png ![cc0/Walker44.png](images/cc0/Walker44.png)
*   cc0/fuzzy-white-64x64.png
    ![cc0/fuzzy-white-64x64.png](images/cc0/fuzzy-white-64x64.png)
*   cc0/fuzzy-black-64x64.png
    ![cc0/fuzzy-black-64x64.png](images/cc0/fuzzy-black-64x64.png)
*   seasonal/xmas-scene-holly-border.png ![seasonal/xmas-scene-holly-border.png](images/seasonal/xmas-scene-holly-border.png)
*   seasonal/fireworks-scattered.png ![seasonal/fireworks-scattered.png](images/seasonal/fireworks-scattered.png)
*   seasonal/penguin-with-presents.png ![seasonal/penguin-with-presents.png](images/seasonal/penguin-with-presents.png)
*   seasonal/snow-crystal3.png ![seasonal/snow-crystal3.png](images/seasonal/snow-crystal3.png)
*   seasonal/fireworks-in-sky.png ![seasonal/fireworks-in-sky.png](images/seasonal/fireworks-in-sky.png)
*   seasonal/xmas-tree.png ![seasonal/xmas-tree.png](images/seasonal/xmas-tree.png)
*   seasonal/disco-ball.png ![seasonal/disco-ball.png](images/seasonal/disco-ball.png)
*   seasonal/snownoes.png ![seasonal/snownoes.png](images/seasonal/snownoes.png)
*   seasonal/xmas-tree-with-presents.png ![seasonal/xmas-tree-with-presents.png](images/seasonal/xmas-tree-with-presents.png)
*   seasonal/stocking-empty.png ![seasonal/stocking-empty.png](images/seasonal/stocking-empty.png)
*   seasonal/father-winston.png ![seasonal/father-winston.png](images/seasonal/father-winston.png)
*   seasonal/hopper-partying.png ![seasonal/hopper-partying.png](images/seasonal/hopper-partying.png)
*   seasonal/gingerbread-family.png ![seasonal/gingerbread-family.png](images/seasonal/gingerbread-family.png)
*   seasonal/reindeer-with-hat.png ![seasonal/reindeer-with-hat.png](images/seasonal/reindeer-with-hat.png)
*   seasonal/hopper-elfer.png ![seasonal/hopper-elfer.png](images/seasonal/hopper-elfer.png)
*   seasonal/gingerbread-man.png ![seasonal/gingerbread-man.png](images/seasonal/gingerbread-man.png)
*   seasonal/hopper-reindeer.png ![seasonal/hopper-reindeer.png](images/seasonal/hopper-reindeer.png)
*   seasonal/snow-crystal1.png ![seasonal/snow-crystal1.png](images/seasonal/snow-crystal1.png)
*   seasonal/snowman.png ![seasonal/snowman.png](images/seasonal/snowman.png)
*   seasonal/santa-with-bag.png ![seasonal/santa-with-bag.png](images/seasonal/santa-with-bag.png)
*   seasonal/snow-crystal2.png ![seasonal/snow-crystal2.png](images/seasonal/snow-crystal2.png)
*   seasonal/red-nosed-winston.png ![seasonal/red-nosed-winston.png](images/seasonal/red-nosed-winston.png)
*   landscapes/clouds-from-plane.png ![landscapes/clouds-from-plane.png](images/landscapes/clouds-from-plane.png)
*   landscapes/mountains-in-hawaii.png ![landscapes/mountains-in-hawaii.png](images/landscapes/mountains-in-hawaii.png)
*   landscapes/lava.png ![landscapes/lava.png](images/landscapes/lava.png)
*   landscapes/fields-of-grain.png ![landscapes/fields-of-grain.png](images/landscapes/fields-of-grain.png)
*   landscapes/lake.png ![landscapes/lake.png](images/landscapes/lake.png)
*   food/grapes.png ![food/grapes.png](images/food/grapes.png)
*   food/strawberries.png ![food/strawberries.png](images/food/strawberries.png)
*   food/dumplings.png ![food/dumplings.png](images/food/dumplings.png)
*   food/potato-chips.png ![food/potato-chips.png](images/food/potato-chips.png)
*   food/ice-cream.png ![food/ice-cream.png](images/food/ice-cream.png)
*   food/mushroom.png ![food/mushroom.png](images/food/mushroom.png)
*   food/berries.png ![food/berries.png](images/food/berries.png)
*   food/cake.png ![food/cake.png](images/food/cake.png)
*   food/oysters.png ![food/oysters.png](images/food/oysters.png)
*   food/pasta.png ![food/pasta.png](images/food/pasta.png)
*   food/tomatoes.png ![food/tomatoes.png](images/food/tomatoes.png)
*   food/sushi.png ![food/sushi.png](images/food/sushi.png)
*   food/broccoli.png ![food/broccoli.png](images/food/broccoli.png)
*   food/chocolates.png ![food/chocolates.png](images/food/chocolates.png)
*   food/fish_grilled-snapper.png ![food/fish_grilled-snapper.png](images/food/fish_grilled-snapper.png)
*   food/croissant.png ![food/croissant.png](images/food/croissant.png)
*   food/brussels-sprouts.png ![food/brussels-sprouts.png](images/food/brussels-sprouts.png)
*   food/fruits.png ![food/fruits.png](images/food/fruits.png)
*   food/potatoes.png ![food/potatoes.png](images/food/potatoes.png)
*   food/shish-kebab.png ![food/shish-kebab.png](images/food/shish-kebab.png)
*   food/bananas.png ![food/bananas.png](images/food/bananas.png)
*   food/hamburger.png ![food/hamburger.png](images/food/hamburger.png)
*   food/coffee-beans.png ![food/coffee-beans.png](images/food/coffee-beans.png)

# Processing.js 夏期ワークショップ {#ref-workshopSep}

*   [はじめに][WhackACircle0]
*   Step 1: 円が１個
    *   [Step 1.1: 円を描いてみる][WhackACircle11]
    *   [Step 1.2: コメントを書きましょう][WhackACircle12]
    *   [Step 1.3: 様々な色][WhackACircle13]
    *   [Step 1.4: ◯をランダムに表示][WhackACircle14]
    *   [Step 1.5: 円を「動かす」][WhackACircle15]
    *   [Step 1.6: クリックして文字を表示する][WhackACircle16]
    *   [Step 1.7: クリック回数を表示する][WhackACircle17]
    *   [Step 1.8: コードを整理しよう][WhackACircle18]
    *   [Step 1.9: 円をクリックしたらスコアを増やす][WhackACircle19]
*   Step 2: 円が 9 個
    *   [Step 2.1: 9 個の円を一定の場所に表示する][WhackACircle21]
    *   [Step 2.2: 各円を表示するかどうかをランダムに決める][WhackACircle22]
    *   [Step 2.3: 課題][WhackACircle23]
*   迷路を右手法で解く
    *   [1. キャラクタを表示][Maze1]
    *   [2. キャラクターを動かす][Maze2]
    *   [3. 壁の検出][Maze3]
    *   [4. 右手法][Maze4]
    *   [5. ゴールの検出][Maze5]
    *   [6. 完成プログラム][Maze6]
*   最短ルート探し
    *   [1. 空迷路][LabyrinthBlank]
    *   [2. 地図作り][LabyrinthMapper]
    *   [3. 最短の道][LabyrinthSearch]
    *   [4. 道の作り直し][LabyrinthBacktrace]
    *   [5. 完成版][LabyrinthSolver]
*   [索引][index]
*   [デモ][Demos]
*   [ゲーム][Games]

# はじめに {#ref-WhackACircle0}

今回は Scratch のようにブロックでコードを書くプログラミング言語ではなく、文字で書かれたプログラミング言語で、簡単なゲームを作ってみましょう。

このゲームは午前中に Scratch で作った「猫たたき」のように円が現れたり消えたりして、円をクリックできたら得点がもらえるゲームです。

```render
// WhackACircle0
function circle(x, y, r) {
}
var width = 300;
var margin = 50;
var radius = 50;
var step = (width - 2*margin)/2;
function maru(col, row) {
  fill(0, 255, 0);
  stroke(255, 0, 0);
  strokeWeight(3);
  ellipse(margin + col*step, margin + row*step, radius, radius);
}

size(300, 300, "2D");
background(255);
maru(0, 0);
maru(1, 0);
maru(1, 1);
maru(2, 1);
maru(0, 2);
maru(2, 2);
fill(0);
textSize(18);
text("スコア:2", 10, 20);

function draw() {
  exit();
}
```

## Processing って何？

Processing は絵などを描けるプログラミング言語です。アプリ開発などで広く使われている Java
というプログラミング言語に近いので、Processing をマスターできたらあと一歩で Java でプログラムを書いて実際のエンジニアになれます。

## Processing で作る <strike>「猫たたき」</strike> 「◯たたき」

では、本番に入って Processing のコードを書いてみましょう！

## Step 1: 円が１個

最初のステップでは円１個だけをランダムに表示し、ユーザーがクリックできたらスコアを１増やします。

[Step 1.1: 円を描いてみる][WhackACircle11]

# Step 1.1: 円を描いてみる {#ref-WhackACircle11}

[前に戻る][WhackACircle0]

まず円を描いてみましょう！以下のコードを入力して実行したら、円が描かれます。

```prerender
// Circle
size(100, 100, "2D");
ellipse(50, 50, 10, 10);
```

このプログラムには命令が２つ含まれています。最初の命令は `size(100, 100);` です。これはキャンバスの大きさを 100 × 100
にする命令です。これを指定して実行すると、四角いキャンバスが現れます。括弧の中に数字が 2
つ入っています。この数字を引数と呼びます。値を変えて実行すると、違うサイズのキャンバスが現れます。例えば、`size(500, 300);`
にすると、横長のキャンバスができたり、`size(200, 600);` にすると、縦長のキャンバスができます。

次の命令は `ellipse(50, 50, 10, 10);` です。これはキャンバスに円を描く命令です。この命令には 4 つの引数が必要です。最初の 2
つは円の中心点の位置を指定します。値を変えて実行し、円の位置を動かしてみましょう。最後の 2
つの引数は円の横と縦の直径を指定します。英語がわかる人は気づいたかもしれませんが、ellipse
という単語は円という意味ではなくて、楕円という意味です。円は必ず横と縦の直径が等しいですが、この命令で 2
つの値を違う大きさにすると円ではなく、楕円が描かれます。値を変えて実行してみましょう。

この 2 つの命令には行の最後に `;` **セミコロン**
があります。セミコロンは命令が終わったことを意味します。これがないと実行できたり、できなかったり、またはプログラムが思った通りに動かない場合があります。また、セミコロンを書き忘れると、赤い線が出てきます。この赤い線はコードの中でどこかで書き間違えているという意味なので、赤い線を見たら間違いを探してコードを修正してください。

![Missing semicolon warning](images/missing_semicolon.png)

[Step 1.2: コメントを書きましょう][WhackACircle12]

# Step 1.2: コメントを書きましょう {#ref-WhackACircle12}

[前に戻る][WhackACircle11]

以下のコードを入力して実行してみましょう。

```example
// WhackACircle11
// キャンバスの大きさを 300 x 300 にする
size(300, 300, "2D");
// 中心座標が (150, 150)、直径が 10 の円を描く
ellipse(150, 150, 10, 10);
```

今回のコードには日本語の説明が入っています。これを**コメント**と呼びます。コメントに書かれた内容はコンピュータは実行しません。コメントは、コードを説明するためのもので、他人にコードを共有するときに相手の人が速く理解できるように記述します。誰かとコードを共有しなくてもコードが長くなると、自分でも１行１行の意味を忘れてしまうこともあるので、コメントをつける習慣を身につけましょう。

[Step 1.3: 様々な色][WhackACircle13]

# Step 1.3: 様々な色 {#ref-WhackACircle13}

[前に戻る][WhackACircle12]

色を変えてみましょう。以下のコードを入力して実行してみましょう。

```example
// WhackACircle12
// キャンバスの大きさを 300 × 300 にする
size(300, 300, "2D");
// キャンバスを白で塗ります
background(255, 255, 255);
// 円の中身を緑色にする
fill(0, 255, 0);
// 円周を赤にする
stroke(255, 0, 0);
// 線の太さを 2 にする
strokeWeight(2);
// 中心座標が (150, 150)、直径が 40 の円を描く
ellipse(150, 150, 40, 40);
```

各命令の意味はコメントで説明されています。ここで注目してほしいのは色の指定方法です。すべての色に関する命令は 3
つの数値を必要とします。これはパソコンやTVで使用される画面の色の表示のしかたに由来します。画面で表示される色は３つの原色から表現されています。この原色は光の原色で、**赤**、**緑**、**青**で、RGB
(Red, Green, Blue) と呼ばれています。それぞれの値は0 から 255 まで指定できます。すべての値が 0 の場合は黒で、すべての値が 255
の場合は白になります。

![Color chart](images/colors.png)

[Step 1.4: ◯をランダムに表示][WhackACircle14]

# Step 1.4: ◯をランダムに表示 {#ref-WhackACircle14}

[前に戻る][WhackACircle13]

円をランダムな場所に表示します。以下のコードを入力して数回実行してみましょう。

```example
// RandomCircle
// キャンバスの大きさを 300 × 300 にする
size(300, 300, "2D");
// キャンバスを白で塗る
background(255, 255, 255);
// 円の中身を緑色にする
fill(0, 255, 0);
// 円周を赤にする
stroke(255, 0, 0);
// 線の太さを 2 にする
strokeWeight(2);

// ランダムな座標を生成する
var x = random(0, 300);
var y = random(0, 300);

// 中心座標が (x, y)、直径が 40 の円を描く
ellipse(x, y, 40, 40);
```

実行される度に円の場所が変わることがわかります。そこで `var x = random(0, 300);`
という命令に注目してください。この命令は変数を定義します。変数はデータを一時的に保存するものです。Scratch
ではこのように変数を作って様々なブロックが現れますね。

![Scratch variable](images/scratch_variable.png)

変数を初めて使うときには、変数を「**定義**」して、変数の名前・型・初期値を決めます。名前と型は定義した後で変更できませんが、値は後から変更できます。

    var x = random(0, 300);

上記の文は、 `int`（整数）型の変数 `x` を定義し、初期値を `random(0, 300)`、つまり 0 から 300 までの乱数とします。`x` と
`y` の変数は円を描く命令に使われます。円の中心座標が今までの 150, 150 のかわりに `x`, `y` となり、命令が `ellipse(x, y,
40, 40);` になっています。

[Step 1.5: 円を「動かす」][WhackACircle15]

# Step 1.5: 円を「動かす」 {#ref-WhackACircle15}

[前に戻る][WhackACircle14]

今までは円を一回描くだけですが、次は円を繰り返しランダムな場所に描いてみます。以下のコードを入力して実行してみましょう。

```example
// WhackACircle15
// 初期化・一回だけ実行される
// キャンバスの大きさを 300 × 300 にする
size(300, 300, "2D");
// 滑らかに描く
smooth();
// 1 秒間に 30 回描く
frameRate(30);

// ずっと実行される
function draw() {
  // キャンバスを白で塗る
  background(255, 255, 255);
  // 円の内部を緑色で塗る
  fill(0, 255, 0);
  // 円周を赤色で描く
  stroke(255, 0, 0);
  // 線の太さを 2 にする
  strokeWeight(2);

  // ランダムな座標を生成する
  var x = random(0, 300);
  var y = random(0, 300);

  // 中心座標が (x, y)、直径が 40 の円を描く
  ellipse(x, y, 40, 40);
}
```

実行すると、円が高速でランダムな場所で現れます。今回のプログラムには、`function draw() { ...
}` という書き方が出てきます。これらは**メソッド**と呼びます。メソッドは複数の命令をまとめて、１個の命令として使えるようにします。

Scratch では、各ブロック（例：ペンを下ろす）がメソッドだと考えても間違いではないでしょう。Processing
でメソッドを定義することは、Scratch でブロック定義を使用して他のブロックをまとめるのに似ています。次の例を見てみましょう。

![Scratch method](images/scratch_method.png)

Scratch と同様、Processing でも `size(300, 300);` などの命令がメソッドの呼び出しです。

Step 1.5 の Processing のプログラムでは、`setup` と `draw`
というメソッドを定義しています。これは特別なメソッドです。`setup` はプログラムが始まったらすぐに 1 回だけ実行されます。`draw` は
`setup` が実行されたあとに、ずっと実行されます。定義文の構成を説明します。最初の `void`
はこのメソッドを実行しても何の値も返さないという意味を宣言しています。値を返すメソッドもあり、`random` はその例の 1
つで指定された範囲からランダムな値を返します。

これから、値の返すメソッドを定義していきます。メソッド名のあとの括弧には何も入っていない `setup()`
のようなメソッドは引数を取りません。引数を取るメソッドも続きのステップで定義します。

さて、問題です。今のプログラムでは円が高速で動いています。もっとゆっくり動かすことができるでしょうか？コードとコメントを読んで、表示の頻度を 1 秒に 1
回に変えましょう。

[Step 1.6: クリックして文字を表示する][WhackACircle16]

# Step 1.6: クリックして文字を表示する {#ref-WhackACircle16}

[前に戻る][WhackACircle15]

以下のコードを入力して実行してみましょう。

```example
// WhackACircle16
size(300,300, "2D");
framerate(1);

// マウスをクリックしたら実行される
function mouseClicked() {
  // 文字の色を黒にする
  fill(0, 0, 0);
  // 文字の大きさを 30 にする
  textSize(30);
  // 座標 (150, 150) に「こんにちは」という文字を表示
  text("こんにちは", 150, 150);
}
```

上記のプログラムでは `mouseClicked()`
というメソッドが定義されています。これも特別なメソッドで、キャンバスにマウスでクリックした際にだけこのメソッドが実行されます。このようなきっかけを**イベント**と呼びます。そして、イベントが起こると実行されるメソッドを**イベントハンドラ**と呼びます。

[Step 1.7: クリック回数を表示する][WhackACircle17]

# Step 1.7: クリック回数を表示する {#ref-WhackACircle17}

[前に戻る][WhackACircle16]

以下のコードを入力して実行してみましょう。

```example
// WhackACircle17
var score = 0;

size(300,300, "2D");
background(255, 255, 255);
frameRate(1);

function draw() {
  // キャンバスを白で塗る
  background(255, 255, 255);
  // 文字の色を黒にする
  fill(0, 0, 0);
  // 文字の大きさを 15 にする
  textSize(15);
  // 座標 (10, 20) にスコアを表示
  text("スコア: " + str(score), 10, 20);
}

// マウスをクリックしたら実行されるイベントハンドラ
function mouseClicked() {
  // score の値を増やす
  score = score + 1;
}
```

上記のプログラムはメソッドの外で `score` という変数を定義しています。そして、マウスをクリックするたびにその値を 1
ずつ増やして表示します。値を増やす命令は、`score = score + 1`
と数学的にはありえない等式のようですが、これは等式ではなくて右の値を左の変数に代入する命令です。

[Step 1.8: コードを整理しよう][WhackACircle18]

# Step 1.8: コードを整理しよう {#ref-WhackACircle18}

[前に戻る][WhackACircle17]

以下のコードを入力して実行してみましょう。

```example
// WhackACircle18
// 円の中心の座標
var x;
var y;

// 円の半径
var radius = 20;

// スコアを初期化
var score = 0;

// 初期化・一回だけ実行される
// キャンバスの大きさを 300 × 300 にする
size(300, 300, "2D");
// キャンバスを白で塗ります
background(255, 255, 255);
// 滑らかに描く
smooth();
// 1 秒間、1 回描く
frameRate(1);

// 座標 (x, y) に円を描く
function drawCircle(x, y) {
  // 円の中身を緑色にする
  fill(0, 255, 0);
  // 円周を赤にする
  stroke(255, 0, 0);
  // 線の太さを 2 にする
  strokeWeight(2);
  // 中心座標が (x, y)、直径が radius * 2 の円を描く
  ellipse(x, y, radius * 2, radius * 2);
}

// スコアを表示
function drawScore() {
  // 文字の色を黒にする
  fill(0, 0, 0);
  // 文字の大きさを 15 にする
  textSize(15);
  // スコアを文字にして、座標 (20, 40) に表示する
  text("スコア: " + str(score), 20, 40);
}

// ずっと実行される
function draw() {
  // キャンバスを白で塗ります
  background(255, 255, 255);
  // ランダムな座標を生成する
  x = random(0, 300);
  y = random(0, 300);
  // 中心座標が (x, y) の円を描く
  drawCircle(x, y);
  // スコアの文字を表示する
  drawScore();
}

// マウスをクリックしたら実行されるイベントハンドラ
function mouseClicked() {
  // score の値を増やす
  score = score + 1;
}
```

上記は円を描くプログラムとスコアを表示するプログラムをあわせたものです。そこにコードをまとめるために `drawCircle` と `drawScore`
というメソッドを定義しています。この 2 つのメソッドの内容を `draw` に直接書くと、長くなって分かりにくくなります。そこで
2つの別々のメソッドにまとめています。

この状態ではどこをクリックしてもスコアが増えてしまいます。次は、円をクリックした場合にだけスコアが増えるようにコードを変更してみましょう。

[Step 1.9: 円をクリックしたらスコアを増やす][WhackACircle19]

# Step 1.9: 円をクリックしたらスコアを増やす {#ref-WhackACircle19}

[前に戻る][WhackACircle18]

mouseClicked メソッドのコードを次のように書き換えて実行してみましょう。

    // ユーザーがマウスをクリックしたら実行されるイベントハンドラ
    function mouseClicked() {
      // 円の中心点とマウスをクリックした場所との距離が radius より小さかったら
      if (dist(x, y, mouseX, mouseY) < radius) {
        // score の値を増やす
        score = score + 1;
      }
    }

ここでは条件文を使っています。**条件文**の構成は `if( ... ) { ... }`
です。括弧の中に条件を書きます。条件が満たされる場合、中括弧の中のコードが実行されます。

上記で使われている条件はコメントで説明されています。`dist()` メソッドは Processing でもともと定義されているメソッドで、 2
つの点の間の距離を計算します。

これで最初のステップが完成です。

今までの完成プログラムはこちらで確認できます。

```hidden
// WhackACircle19
// 円の中心の座標
var x;
var y;

// 円の半径
var radius = 20;

// スコアを初期化
var score = 0;

// 初期化・一回だけ実行される
// キャンバスの大きさを 300 × 300 にする
size(300, 300, "2D");
// キャンバスを白で塗ります
background(255, 255, 255);
// 滑らかに描く
smooth();
// 1 秒間、1 回描く
frameRate(1);

// 座標 (x, y) に円を描く
function drawCircle(x, y) {
  // 円の中身を緑色にする
  fill(0, 255, 0);
  // 円周を赤にする
  stroke(255, 0, 0);
  // 線の太さを 2 にする
  strokeWeight(2);
  // 中心座標が (x, y)、直径が radius * 2 の円を描く
  ellipse(x, y, radius * 2, radius * 2);
}

// スコアを表示
function drawScore() {
  // 文字の色を黒にする
  fill(0, 0, 0);
  // 文字の大きさを 15 にする
  textSize(15);
  // スコアを文字にして、座標 (20, 40) に表示する
  text("スコア: " + str(score), 20, 40);
}

// ずっと実行される
function draw() {
  // キャンバスを白で塗ります
  background(255, 255, 255);
  // ランダムな座標を生成する
  x = random(0, 300);
  y = random(0, 300);
  // 中心座標が (x, y) の円を描く
  drawCircle(x, y);
  // スコアの文字を表示する
  drawScore();
}

// ユーザーがマウスをクリックしたら実行されるイベントハンドラ
function mouseClicked() {
  // 円の中心点とマウスをクリックした場所との距離が radius より小さかったら
  if (dist(x, y, mouseX, mouseY) < radius) {
    // score の値を増やす
    score = score + 1;
  }
}
```

## Step 2: 円が 9 個

円を９個に増やして、表示するかどうかをランダムに変えてみます。

[Step 2.1: 9 個の円を一定の場所に表示する][WhackACircle21]

# Step 2.1: 9 個の円を一定の場所に表示する {#ref-WhackACircle21}

[前に戻る][WhackACircle19]

コードを次のように書き換えて実行してみましょう。 `circleX` と `circleY` は新しいメソッドです。古い `draw`
メソッドは消してください。

```
// WhackACircle21
// i 番目の円の x 座標を返す (iは円の番号を表す0から8までの整数)
var circleX(i) {
  return (int)(i / 3) * 100 + 50;
}
// i 番目の円の y 座標を返す (iは円の番号を表す0から8までの整数)
var circleY(i) {
  return (i % 3) * 100 + 50;
}

// ずっと実行される
function draw() {
  // キャンバスを白で塗る
  background(255, 255, 255);

  // i を 0 から 8 まで繰り返す
  var i = 0;
  while (i < 9) {
    // 座標 (circleX(i), circleY(i)) に円を描く
    drawCircle(circleX(i), circleY(i));
    // 次の円に移る
    i = i + 1;
  }

  // スコアの文字を表示する
  drawScore();
}
```

上記のコードは 9 個の円を描きます。円は 0 番から 8 番までの番号にします。各円の x 座標と y 座標はそれぞれ `circleX` と
`circleY` で計算します。`draw`
メソッド内では、`while`-ループを使って円を描きます。これは繰り返しを意味します。`while`-文の構成は `while( ... ) { ... }`
です。条件分岐の `if`
に近いですが、条件が満たされる限り中括弧のコードが永遠に実行されます。このようなプログラムを書くときには、ループからいつか出るように条件を設定する注意をしなければなりません。上記のコードでは、最初は
`i` を 0 に設定して、中括弧の最後のコードで 1 ずつ `i` を増やしています。

今までの完成プログラムはこちらで確認できます。

```hidden
// WhackACircle21
// 円の中心の座標
var x;
var y;

// 円の半径
var radius = 20;

// スコアを初期化
var score = 0;

// 初期化・一回だけ実行される
// キャンバスの大きさを 300 × 300 にする
size(300, 300, "2D");
// キャンバスを白で塗ります
background(255, 255, 255);
// 滑らかに描く
smooth();
// 1 秒間、1 回描く
frameRate(1);


// 座標 (x, y) に円を描く
function drawCircle(x, y) {
  // 円の中身を緑色にする
  fill(0, 255, 0);
  // 円周を赤にする
  stroke(255, 0, 0);
  // 線の太さを 2 にする
  strokeWeight(2);
  // 中心座標が (x, y)、直径が radius * 2 の円を描く
  ellipse(x, y, radius * 2, radius * 2);
}

// スコアを表示
function drawScore() {
  // 文字の色を黒にする
  fill(0, 0, 0);
  // 文字の大きさを 15 にする
  textSize(15);
  // スコアを文字にして、座標 (10, 20) に表示する
  text("スコア: " + str(score), 10, 20);
}

// i 番目の円の x 座標を返す (iは円の番号を表す0から8までの整数)
var circleX(i) {
  return (int)(i / 3) * 100 + 50;
}
// i 番目の円の y 座標を返す (iは円の番号を表す0から8までの整数)
var circleY(i) {
  return (i % 3) * 100 + 50;
}

// ずっと実行される
function draw() {
  // キャンバスを白で塗る
  background(255, 255, 255);

  // i を 0 から 8 まで繰り返す
  var i = 0;
  while (i < 9) {
    // 座標 (circleX(i), circleY(i)) に円を描く
    drawCircle(circleX(i), circleY(i));
    // 次の円に移る
    i = i + 1;
  }

  // スコアの文字を表示する
  drawScore();
}

// ユーザーがマウスをクリックしたら実行されるイベントハンドラ
function mouseClicked() {
  // 円の中心点とマウスをクリックした場所との距離が radius より小さかったら
  if (dist(x, y, mouseX, mouseY) < radius) {
    // score の値を増やす
    score = score + 1;
  }
}
```

[Step 2.2: 各円を表示するかどうかをランダムに決める][WhackACircle22]

# Step 2.2: 各円を表示するかどうかをランダムに決める {#ref-WhackACircle22}

[前に戻る][WhackACircle21]

コードを次のように書き換えて実行してみましょう。

```
// WhackACircle22
// 円がそれぞれ現れているかを記憶する
boolean[] shown = new boolean[9];

// ずっと実行される
function draw() {
  // キャンバスを白で塗る
  background(255, 255, 255);

  // i を 0 から 8 まで繰り返す
  var i = 0;
  while (i < 9) {
    // 50% の確率で表示される
    if (random(100) < 50) {
      // i 番の円を表示する
      shown[i] = true;
      drawCircle(circleX(i), circleY(i));
    } else {
      // i 番の円を表示しない
      shown[i] = false;
    }
    i = i + 1;
  }

  // スコアの文字を表示する
  drawScore();
}

// マウスをクリックしたら実行されるイベントハンドラ
function mouseClicked() {
  var i = 0;
  while (i < 9) {
    // 円の中心点とマウスをクリックした場所との距離が radius より小さかったら
    if (shown[i] &&
        dist(circleX(i), circleY(i), mouseX, mouseY) < radius) {
      // score の値を増やす
      score = score + 1;
    }
    i = i + 1;
  }
}
```

上記のコードでは、各円が表示されているかを記憶する変数を用意します。メソッドの外の定義文は以下のようになっています。

    boolean[] shown = new boolean[9];

これは今まで違う変数の種類です。`boolean` は真理値型を指します。値が `true`（真） あるいは `false`（偽）の 2
つだけです。また`boolean` のあとの `[]` はこの変数を配列に定義する意味をします。配列は 1
つの変数で複数の値を記憶できるような変数です。そして、配列のサイズは初期値の `new boolean[9]` で指定しています。サイズは 9 で番号は 0
から 8 までになっています。

この配列は `draw` の中で値が決まります。そして、`mouseClicked` の中で値を使っています。

これでプログラムが完成です！実行して遊んでみてください。

```hidden
// WhackACircle22
// 円の中心の座標
var x;
var y;

// 円の半径
var radius = 20;

// スコアを初期化
var score = 0;

// 初期化・一回だけ実行される
// キャンバスの大きさを 300 × 300 にする
size(300, 300, "2D");
// キャンバスを白で塗ります
background(255, 255, 255);
// 滑らかに描く
smooth();
// 1 秒間、1 回描く
frameRate(1);

// 座標 (x, y) に円を描く
function drawCircle(x, y) {
  // 円の中身を緑色にする
  fill(0, 255, 0);
  // 円周を赤にする
  stroke(255, 0, 0);
  // 線の太さを 2 にする
  strokeWeight(2);
  // 中心座標が (x, y)、直径が radius * 2 の円を描く
  ellipse(x, y, radius * 2, radius * 2);
}

// スコアを表示
function drawScore() {
  // 文字の色を黒にする
  fill(0, 0, 0);
  // 文字の大きさを 15 にする
  textSize(15);
  // スコアを文字にして、座標 (10, 20) に表示する
  text("スコア: " + str(score), 10, 20);
}

// i 番目の円の x 座標を返す (iは円の番号を表す0から8までの整数)
var circleX(i) {
  return (int)(i / 3) * 100 + 50;
}
// i 番目の円の y 座標を返す (iは円の番号を表す0から8までの整数)
var circleY(i) {
  return (i % 3) * 100 + 50;
}

// 円がそれぞれ現れているかを記憶する
boolean[] shown = new boolean[9];

// ずっと実行される
function draw() {
  // キャンバスを白で塗る
  background(255, 255, 255);

  // i を 0 から 8 まで繰り返す
  var i = 0;
  while (i < 9) {
    // 50% の確率で表示される
    if (random(100) < 50) {
      // i 番の円を表示する
      shown[i] = true;
      drawCircle(circleX(i), circleY(i));
    } else {
      // i 番の円を表示しない
      shown[i] = false;
    }
    i = i + 1;
  }

  // スコアの文字を表示する
  drawScore();
}

// マウスをクリックしたら実行されるイベントハンドラ
function mouseClicked() {
  var i = 0;
  while (i < 9) {
    // 円の中心点とマウスをクリックした場所との距離が radius より小さかったら
    if (shown[i] &&
        dist(circleX(i), circleY(i), mouseX, mouseY) < radius) {
      // score の値を増やす
      score = score + 1;
    }
    i = i + 1;
  }
}
```

[Step 2.3: 課題][WhackACircle23]

# Step 2.3: 課題 {#ref-WhackACircle23}

[前に戻る][WhackACircle22]

このプログラムはまだまだ改良できます。次の点を直す方法を考えて実装してみてください。

*   円をクリックしてもすぐにスコアが更新されません。すぐにスコアが更新されるように改良してみましょう。
*   クリックして円に当たらなかった際、スコアをマイナスしてみましょう。
*   1 秒間に何回も円をクリックしてスコアを増やせてしまいます。円をクリックしたらその円がすぐに消えるなどの対策を実装してみましょう。

[前に戻る][WhackACircle22]

# 1. キャラクターを表示 {#ref-Maze1}

まずは迷路を表示しましょう。 下にある「読み込む」ボタンを押してから画面の左上にある 「実行」ボタンをおしましょう。

```example
// Maze1
var imgLabyrinth = getImage("cc0/labyrinth1.png");
size(360, 360, "2D");  // キャンバスの大きさの設定
image(imgLabyrinth, 1, 1, 360, 360); // 迷路の表示
```

そして、キャラクターを表示しましょう。キャラクターはマウスのカーソル のところに表示されます。Processing.jsでは画像はスクラッチのスプライトのよう
ではなく、スタンプのようなものです。なので、もともとの背景を壊さないように [get()]を使って画像を保存して、あと背景を回復をしなければなりません。

```example
// Maze1
var imgLabyrinth = getImage("cc0/labyrinth1.png");
var imgWalker = getImage("cc0/Walker44.png");

size(360, 360, "2D");  // キャンバスの大きさの設定
image(imgLabyrinth, 1, 1, 360, 360); // 迷路の表示
imageMode(CENTER);

// キャラクターの大きさ、ピクセル単位
var s = 44;
// キャラクターの座標。
var x = 176, y = 314;
var imgSave = null;
function draw() {
  if (imgSave !== null) {
    image(imgSave, x, y, s, s);
  }
  x = mouseX;
  y = mouseY;
  imgSave = get(x-s/2, y-s/2, s, s);
  image(imgWalker, x, y, s, s);
}
```

次は[2. キャラクターを動かす][Maze2]

# 2. キャラクターを動かす {#ref-Maze2}

[前に戻る][Maze1]

キャラクターを動かすために、次のコードを足してみましょう。

    // 進む方向
    var dx = 0;
    var dy = -1;

    function draw() {  // この関数は繰り返し呼ばれている.
      image(imgWalker, x, y);
      x += dx;
      y += dy;
    }

結果はこのようなスケッチになります。

```hidden
// Maze2
var imgLabyrinth = getImage("cc0/labyrinth1.png");
var imgWalker = getImage("cc0/Walker44.png");

size(360, 360, "2D");  // キャンバスの大きさの設定
image(imgLabyrinth, 1, 1, 360, 360); // 迷路の表示
imageMode(CENTER);

// キャラクターの大きさ、ピクセル単位
var s = 44;
// キャラクターの座標
var x = 176, y = 314;

// 進む方向
var dx = 0;
var dy = -1;

var imgSave = null;
function draw() {  // この関数は繰り返し呼ばれている.
  if (imgSave !== null) {
    image(imgSave, x, y, s, s);
  }
  x += dx;
  y += dy;
  imgSave = get(x-s/2, y-s/2, s, s);
  image(imgWalker, x, y);
}
```

キャラクターは壁を無視して動いてます。 `imgSave =
get(...)`や`image(imgSave,...)`をしなければ、キャラクターは壁に当たると壁を消して穴を開けてしまいます。
これは、実際には壁ではなくてただの背景画像が表示されているだけだからです。壁が実際にあるように見せるのが、プログラマの仕事です。

次は[3. 壁の検出][Maze3]

# 3. 壁の検出 {#ref-Maze3}

[前に戻る][Maze2]

壁を検出するには[get()]関数を利用して、指定した位置のピクセルの色を調べます。[imageMode]([CENTER])の設定によって、キャラクターの位置はスタンプの中心を示すようになるので、キャラクターの進行方向の前の位置を調べましょう。

その前に、dx,
dyには常に０か１の値しか与えないようにします。たとえば、下は（０，１）、上は（０，−１）、右は（１，０）、左は（−１，０）です。最初の設定では上方向にしましょう。

    var dx = 0;
    var dy = -1;

こうしておくと、 `(x+(s/2)*dx, y+(s/2)*dy)`
は常にキャラクターのちょうど前のピクセルを指すようになります。ここに３ピクセル足せば、キャラクターの少し前の位置になります。これが壁に当たったら[noLoop()]によってプログラムの実行を止めましょう。

    function wallAhead() {
      // キャラクターの３ピクセル前に調べよう.
      var c = get(x+dx*(s/2+3), y+dy*(s/2+3));
    　// 黒を検出しよう。
      return brightness(c) < 50;
    }

    function draw() {
      ...
      if (wallAhead()) {
        noLoop(); // 実行を停止する
      }
      ...
    }

スケッチこんな漢字になったでしょうか？

```hidden
// Maze3
var imgLabyrinth = getImage("cc0/labyrinth1.png");
var imgWalker = getImage("cc0/Walker44.png");

size(360, 360, "2D");  // キャンバスの大きさの設定
image(imgLabyrinth, 1, 1, 360, 360); // 迷路の表示
imageMode(CENTER);

// キャラクターの大きさ、ピクセル単位
var s = 44;

// キャラクターの座標
var x = 176, y = 314;

// 進む方向
var dx = 0;
var dy = -1;

var imgSave = null;
function draw() {  // この関数は繰り返し呼ばれている.
  if (imgSave !== null) {
    image(imgSave, x, y, s, s);
  }
  if (wallAhead()) {
    noLoop(); // 実行を停止する
  }
  x += dx;
  y += dy;
  imgSave = get(x-s/2, y-s/2, s, s);
  image(imgWalker, x, y);
}

var wallAhead() {
  // キャラクターの３ピクセル前に調べよう.
  var c = get(x+dx*(s/2+3), y+dy*(s/2+3));
　// 黒を検出しよう。
  return brightness(c) < 50;
}
```

止まる代わりにその場で回ってみましょう。

    function turnLeft() {
      var tmp = dx;
      dx = dy;
      dy = -tmp;
    }

    function draw() {
      ...
      if (wallAhead()) {
        turnLeft();
      }
      ...
    }

ついでなので、前に動かす指示を関数としてまとめましょう。

    function moveForward() {
      x += dx;
      y += dy;
    }

    function draw() {
      ...
      if (wallAhead()) {
        turnLeft();
      }
      moveForward();
      ...
    }

完成スケッチはこちらです。

```hidden
// Maze3
var imgLabyrinth = getImage("cc0/labyrinth1.png");
var imgWalker = getImage("cc0/Walker44.png");

size(360, 360, "2D");  // キャンバスの大きさの設定
image(imgLabyrinth, 1, 1, 360, 360); // 迷路の表示
imageMode(CENTER);

// キャラクターの大きさ、ピクセル単位
var s = 44;

// キャラクターの座標
var x = 176, y = 314;

// 進む方向
var dx = 0;
var dy = -1;

var imgSave = null;
var wallAhead() {
  // キャラクターの３ピクセル前に調べよう.
  var c = get(x+dx*(s/2+3), y+dy*(s/2+3));
　// 黒を検出しよう。
  return brightness(c) < 50;
}

function moveForward() {
  x += dx;
  y += dy;
}

function turnLeft() {
  var tmp = dx;
  dx = dy;
  dy = -tmp;
}

function draw() {  // この関数は繰り返し呼ばれている.
  if (imgSave !== null) {
    image(imgSave, x, y, s, s);
  }
  if (wallAhead()) {
    turnLeft();
  }
  moveForward();
  imgSave = get(x-s/2, y-s/2, s, s);
  image(imgWalker, x, y);
}
```

これだけでもキャラクターが少しは賢くみえてきましたが、動かしているとすぐに無限ループに入ってしまいます。

次は[4. 右手法][Maze4]

# 4. 右手法 {#ref-Maze4}

[前に戻る][Maze3]

右手法を実装するには、右側の壁を検出し、壁がない場合は右側に曲がることが必要になります。だいたいこのような感じでしょうか。

    function turnRight() {
      var tmp = dx;
      dx = -dy;
      dy = tmp;
    }

    function wallRight() {
      var rx = -dy;
      var ry = dx;
      var c = get(x + rx*(s/2+4), y + ry*(s/2+4));
      return brightness(c) < 50;
    }

    function draw() {
      ...
      if (!wallRight()) {
        turnRight();
      } else if (wallAhead()) {
        turnLeft();
      }
      moveForward();
      ...
    }

上のプログラムは一回右に曲がってしまうと、キャラクターが無限ループに入ってしまうため上手く動きません。原因は右側を検出する関数が1ピクセルしか確認していないため、キャラクター全体が曲がった先に入れないときにも
true を返してしまうからです。

キャラクターのサイズに合わせて検出してみましょう。

    function wallAhead() {
      var wallFound = false;
      var rx = -dy;
      var ry = dx;
      for (var i = -s/2-1; i < s/2+1; i++) {
        var c = get(x+dx*(s/2+3)+rx*i, y+dy*(s/2+3)+ry*i);
        wallFound = wallFound || brightness(c) < 50;
      }
      return wallFound;
    }

    function wallRight() {
      var rx = -dy;
      var ry = dx;
      var wallFound = false;
      for (var i = -s/2-1; i <= s/2+1; i++) {
        var c = get(x + rx*(s/2+3)+dx*i, y + ry*(s/2+3)+dy*i);
        wallFound = wallFound || brightness(c) < 50;
      }
      return wallFound;
    }

それでも他にも問題が残ってます。右に空き通路を検出すると、キャラクターはまた無限ループに入ってしまいます。今度の原因は、右に曲がったすぐ後に右側に壁がないとキャラクターがすぐにまた右に曲がってしまうことです。これを直すには、曲がってから数ピクセルはまっすぐに進む必要があります。

    function draw() {
      if (!wallRight()) {
        turnRight();
        moveForward();
        moveForward();
      } else if (wallAhead()) {
        turnLeft();
      }
      moveForward();
    }

完成スケッチこちらです。

```hidden
// Maze4
var imgLabyrinth = getImage("cc0/labyrinth1.png");
var imgWalker = getImage("cc0/Walker44.png");

size(360, 360, "2D");  // キャンバスの大きさの設定
image(imgLabyrinth, 1, 1, 360, 360); // 迷路の表示
imageMode(CENTER);

// キャラクターの大きさ、ピクセル単位
var s = 44;

// キャラクターの座標
var x = 176, y = 314;

// 進む方向
var dx = 0;
var dy = -1;

var imgSave = null;

function wallAhead() {
  var wallFound = false;
  var rx = -dy;
  var ry = dx;
  for (var i = -s/2-1; i < s/2+1; i++) {
    var c = get(x+dx*(s/2+3)+rx*i, y+dy*(s/2+3)+ry*i);
    wallFound = wallFound || brightness(c) < 50;
  }
  return wallFound;
}

function wallRight() {
  var rx = -dy;
  var ry = dx;
  var wallFound = false;
  for (var i = -s/2-1; i <= s/2+1; i++) {
    var c = get(x + rx*(s/2+3)+dx*i, y + ry*(s/2+3)+dy*i);
    wallFound = wallFound || brightness(c) < 50;
  }
  return wallFound;
}



function moveForward() {
  x += dx;
  y += dy;
}

function turnLeft() {
  var tmp = dx;
  dx = dy;
  dy = -tmp;
}

function turnRight() {
  var tmp = dx;
  dx = -dy;
  dy = tmp;
}

function draw() {  // この関数は繰り返し呼ばれている.
  if (imgSave !== null) {
    image(imgSave, x, y, s, s);
  }
  if (!wallRight()) {
    turnRight();
    moveForward();
    moveForward();
  } else if (wallAhead()) {
    turnLeft();
  }
  moveForward();
  imgSave = get(x-s/2, y-s/2, s, s);
  image(imgWalker, x, y);
}
```

ここまでのプログラムで、キャラクターは迷路の中をうまく動くはずです。まだ問題がある場合、以下の点を確認しましょう。

*   `dx`, `dy`には-1/0/1の以外の値を与えない。
*   右側に空き通路を検出する関数はキャラクターが確実に入れる広さか確認する。

次は[5. ゴールの判定][Maze5]

# 5. ゴールの判定 {#ref-Maze5}

[前に戻る][Maze4]

最後にゴールの判定をする機能を加えてみましょう。ゴールの判定は壁の検出に似ていますが、黒の代わりに緑か調べなければなりません。

    function reachedGoal() {
      var c = get(x+dx*(s/2+3), y+dy*(s/2+3));
      return red(c) < 50 && green(c) > 50;
    }

    function draw() {
      ...
      if (reachedGoal()) {
        fill(0,0,0);  // black.
        text("Finish!", x+s/2, y);
        exit();
      }
      ...
    }

次は[6. 完成プログラム][Maze6]

# 6. 完成プログラム {#ref-Maze6}

[前に戻る][Maze5]

**挑戦**: 別の迷路を解いてみよう

別の迷路を解いてみましょう。2箇所の「labyrinth1.png」をに変えたら、別の迷路に挑戦できます。使用可能の迷路は

*   `labyrinth1.png`
*   `labyrinth2.png`
*   `labyrinth3.png`
*   `labyrinth4.png`

完成させたプログラムは全ての迷路を解けるでしょうか？

```example
// Maze5
var imgLabyrinth = getImage("cc0/labyrinth1.png");
var imgWalker = getImage("cc0/Walker44.png");

size(360, 360, "2D");  // キャンバスの大きさの設定
image(imgLabyrinth, 1, 1, 360, 360); // 迷路の表示
imageMode(CENTER);

// キャラクターの大きさ、ピクセル単位
var s = 44;

// キャラクターの座標
var x = 176, y = 314;

// 進む方向
var dx = 0;
var dy = -1;

var imgSave = null;

function reachedGoal() {
  var c = get(x+dx*(s/2+3), y+dy*(s/2+3));
  return red(c) < 50 && green(c) > 50;
}

function wallAhead() {
  var wallFound = false;
  var rx = -dy;
  var ry = dx;
  for (var i = -s/2-1; i < s/2+1; i++) {
    var c = get(x+dx*(s/2+3)+rx*i, y+dy*(s/2+3)+ry*i);
    wallFound = wallFound || brightness(c) < 50;
  }
  return wallFound;
}

function wallRight() {
  var rx = -dy;
  var ry = dx;
  var wallFound = false;
  for (var i = -s/2-1; i <= s/2+1; i++) {
    var c = get(x + rx*(s/2+3)+dx*i, y + ry*(s/2+3)+dy*i);
    wallFound = wallFound || brightness(c) < 50;
  }
  return wallFound;
}

function moveForward(c) {
  x += c*dx;
  y += c*dy;
}

function turnLeft() {
  var tmp = dx;
  dx = dy;
  dy = -tmp;
}

function turnRight() {
  var tmp = dx;
  dx = -dy;
  dy = tmp;
}

function draw() {  // この関数は繰り返し呼ばれている.
  if (imgSave !== null) {
    image(imgSave, x, y, s, s);
  }
  if (reachedGoal()) {
    fill(0,0,0);  // black.
    text("Finish!", x+s/2, y);
    exit();
  }
  if (!wallRight() && !wallAhead()) {
    turnRight();
    var hitWall = false;
    for (var i = 0; i < 2; i++) {
      if (!wallAhead() && !wallRight()) {
        moveForward(1);
      } else {
        hitWall = true;
        break;
      }
    }
    if (!hitWall) {
      //moveForward(-2);
      turnLeft();
    }
  } else if (wallAhead()) {
    turnLeft();
  }
  moveForward(1);
  imgSave = get(x-s/2, y-s/2, s, s);
  image(imgWalker, x, y);
}
```

# 補足：顔を描く {#ref-DrawFace}

左側にあるプログラムを実行したら、右側にある実行キャンバスにさまざまな 絵や形状を描けます。位置を指定のために座標を使います。左上は(0,0)です。
座標の最初の数は左右を表して、最後の数は上下を表しています。

```prerender
size(200, 200, "2D");
fill(0);
textSize(10);

ellipse(0, 0, 10, 10);
text("(0, 0)", 10, 10);

ellipse(200, 0, 10, 10);
text("(200, 0)", 160, 10);

ellipse(0, 200, 10, 10);
text("(0, 200)", 10, 190);
```

では、丸を描きましょう。丸を描くために`ellipse()`という関数を使います。
`ellipse()`を呼ぶときは4つの数を指定します。最初2つの数は中心の座標を表します。
最後の2つの数は横幅と高さを表しています。例えば、縦の長い丸を描いてみましょう。 顔に似ているでしょうか？

```prerender
size(200, 200, "2D");
fill(255, 200, 180); // 肌色
ellipse(100, 100, 150, 180);
```

鼻を描くために三角を使いましょう。三角を描くために`triangle()`という関数を使います。
この関数を呼ぶときに数を6つを指定しなければなりません。それは三角の3つの点は各2つづつの座標です。

```prerender
fill(100, 255, 100); // 緑
size(200, 200, "2D");
triangle(100, 90, 90, 120, 110, 120);
```

口と目を前と同じように`ellipse()`を使いましょう。次の見本のプログラムに進む前に 自分で目と口を描いてみましょう。

```prerender
size(200, 200, "2D");
fill(255, 200, 180); // 肌色
ellipse(100, 100, 150, 180);  // 顔
fill(100, 255, 100); // 緑
triangle(100, 90, 90, 120, 110, 120); // 鼻
fill(0, 0, 150); // 青
ellipse(60, 75, 30, 5); // 左目
ellipse(140, 75, 30, 5); // 右目
fill(255, 130, 120); // 赤
ellipse(100, 160, 60, 15); // 口
```

# 補足：繰り返し（ループ） {#ref-Loop}

同じ命令を何回も繰り返すためにループを使います。

```prerender
// LoopExample
fill(0);
for (var i = 1; i <= 5; i++) {　// 1から5まで数えます。
  text(str(i), 10, 10+i*10);
}
```

条件を調べることは「if」文でできます。

```prerender
// LoopExample
fill(0);
for (var i = 1; i <= 5; i++) {　// 1から5まで数えます。
  if (i % 2 === 1) {  // 奇数かどうか調べます
    text(str(i), 10, 10+i*10);
  }
}
```

# 補足：イベント {#ref-Events}

プログラムの実行中でユーザの入力に対応するにはいくつかの方法ありますが、 こちらで**イベント**を紹介します。ユーザーはマウスクリックしたときに
[mouseClicked()]という関数が呼ばれます。

```example
// マウスがクリックした時に実行されます。
function mouseClicked() {　
  // 長方形の中か外か判断する。
  if (60 <= mouseX && mouseX <= 140 &&
      60 <= mouseY && mouseY <= 140) {
    speak("ピンポン");
  } else {
    speak("ぶぶ");
  }
}

// 設定。実行の最初に実行されます。
size(200, 200, "2D");   // キャンバスの大きさを設定する。
background(200);　// 灰色に塗る。
stroke(0);　　　　 // 筆色を黒にする。
rect(60, 60, 80, 80);  // 長方形を描く。
```

マウスイベントについてもっと詳しくは[マウス][Mouse]に参考ください。

# マウス {#ref-Mouse}

マウスの入力は[イベント][Events]によって行う。イベントのリスト:

*   [mouseClicked()] マウスはクリックされたとき
*   [mousePressed()] マウスのボタンが押されたとき
*   [mouseReleased()] マウスのボタンが話されたとき
*   [mouseMoved()] マウスが動いたとき
*   [mouseDragged()] マウスが押されたままに動いたとき
*   [mouseOver()] マウスのカーソルはキャンバスに入ったとき
*   [mouseOut()] マウスのカーソルがキャンバスから離れたとき
*   [mouseX], [mouseY] マウスのXとY座標
*   [mouseButton] マウスイベントの関数の中は押されたボタンを表す

## 参考

*   [draw()]
*   [noLoop()]
*   [loop()]

# draw

スケッチを実行すると、`setup()`関数が1回呼ばれた後、`draw()`関数が繰り返し呼ばれます。 `draw()`関数の中で画面を更新することでアニメーションを実現することができます。 `draw()`関数を1秒間に何回呼ぶかは`frameRate()`で設定できます。

```prerender
// DrawExample
frameRate(1);  // 1秒に1回呼ぶ
fill(0);  // 描画色を黒に設定。
textSize(30);

function draw() {
  background(200);
  text(frameCount, 10, 30);
}
```

関連項目: [frameRate()], [frameCount]

# frameRate

`frameRate(x)`は`draw()`が呼ばれる頻度を設定します。 括弧の中には`draw()`関数を1秒間に何回呼ぶかを指定します。 たとえば、`frameRate(10)`を実行すると、`draw()`の実行が終わってから 次に`draw()`を呼ぶまで0.1秒待ちます。`frameRate(1)`では1秒待ちます。

```prerender
// FrameRateExample
frameRate(1);  // 1秒に1回呼ぶ
fill(0);  // 描画色を黒に設定。
textSize(30);

function draw() {
  background(200);
  text(frameCount, 10, 30);
}

function mousePressed() {
    frameRate(5);
}

function mouseReleased() {
    frameRate(1);
}
```

関連項目: [frameCount], [draw()].

# frameCount

`frameCount`は`draw()`が呼ばれた回数です。

```prerender
// FrameCountExample
frameRate(1);  // 1秒に1回呼ぶ
fill(0);  // 描画色を黒に設定。
textSize(30);

function draw() {
  background(200);
  text(frameCount, 10, 30);
}
```

関連項目: [frameRate()], [draw()].

# width

`width`はキャンバスの横幅です。

```prerender
// WidthAndHeightExample
fill(0);
textSize(15);
text("width: " + width, 10, 50);
text("height: " + height, 10, 80);
```

普段は約400ですが、環境によって違います。例えば、フルスクリーン(全画面)モードだと、画面の大きさによります。

関連項目: [size()], [height]

# height

`height`はキャンバスの縦幅です。

```prerender
// WidthAndHeightExample
fill(0);
textSize(15);
text("width: " + width, 10, 50);
text("height: " + height, 10, 80);
```

普段は約400ですが、環境によって違います。例えば、フルスクリーン(全画面)モードだと、画面の大きさによります。

関連項目: [size()], [width]

# print

`print`はメッセージを表示します。メッセージはキャンバス内の下にでてきます。`println()`と違って、メッセージの後で改行しません。

呼び方:`print(message);`

関連項目:[println()]。

# println

`println()`はメッセージを表示します。メッセージはキャンバス内の下にでてきます。`print()`と違って、メッセージの後で改行します。

呼び方:`println(message);`

関連項目:[print()]。

# インデックス {#ref-index}

正式なProcessing.jsのマニュアルはこちら:
<a href='https://www.khanacademy.org/computer-programming/new/pjs#scratchpad-tabs' target='_blank'>https://www.khanacademy.org/computer-programming/new/pjs#scratchpad-tabs</a>.

## 実行

*   [function draw() {...}][draw] アニメーションのフレームを描くための関数
*   [noLoop()] `draw()`の実行を停止。マウスやキーボードの関数は実行されます。
*   [exit()] 実行を終了する

## アニメーション

*   [noLoop()] アニメーションの繰り返しを止める
*   [loop()] アニメーションの繰り返しを再開する
*   [millis()] 実行時間をミリ秒単位で返す
*   [frameRate()] `draw()`の呼び方の頻度の設定
*   [frameCount] `draw()`が何回呼ばれたかカウント

## キャンバス

*   [background()] キャンバスを色で塗る
*   [size()] キャンバスの大きさを設定する
*   [width], [height] 横幅、縦幅
*   [dist()] 2点間の距離を計算する

## 図形

*   [ellipse()] 楕円
*   [rect()] 長方形
*   [triangle()] 三角形
*   [line()] 直線
*   [arc()] 円弧
*   [point()] 点

## 筆の設定や色

*   [color()]は色を表す値を作る
*   [fill()], [noFill()] 塗りつぶしの色を設定する
*   [stroke()], [noStroke()] ペンの色を設定する
*   [strokeCap()] ペンの端の形を設定する
*   [strokeWeight()] ペンの太さを設定する
*   [red()], [green()], [blue()], [hue()], [saturation()], [brightness()]

## 画像

*   [image()] 画像を写す
*   [imageMode()] 画像の写し方の設定
*   [getImage()]  画像データを読み込む
*   [get()] 画像データをキャンバスから抽出する

## 文字

*   [text()] 文字を表示する
*   [textSize()] 文字の大きさを設定する
*   [textAlign()] 文字の写し方を設定する
*   [textFont()] 字体を設定する
*   [loadFont()] 字体を読み込みする

## [マウス][Mouse]

*   [mouseClicked()] マウスのボタンがクリックされたとき
*   [mouseDragged()] マウスを押したまま動かしたときに呼ばれます
*   [mouseMoved()] マウスカーソルを動かしたときに呼ばれます
*   [mousePressed()] マウスのボタンが押されたとき
*   [mouseReleased()] マウスのボタンが離されたとき
*   [mouseOver()] マウスがキャンバス内に入ったとき
*   [mouseOut()] マウスがキャンバスの外に出たとき
*   [mouseX], [mouseY], [pmouseX], [pmouseY] マウスのX座標とY座標
*   [mouseButton] マウスイベント関数の中で押されたボタンを表す
*   [cursor()] マウスカーソルの形を変える

## キーボード

*   [keyPressed()], [keyReleased()], [keyTyped()] キーボードのイベント関数
*   [key], [keyCode], [keyIsPressed] 押されたキーの変数
*   [keyCodes] キーコードの一覧

## 言語の基礎

*   条件付き実行
    *   [if], [else]
*   [ループ][Loop]
    *   [for], [while], [do]
    *   [continue], [break]
*   switch文
    *   [switch], [case], [default]

## 定数

*   [PI], [HALF_PI], [QUARTER_PI], [TWO_PI].

## 数学関数

*   [abs()]
*   [ceil()], [floor()], [round()]
*   [sin()], [cos()], [tan()]
*   [random()] 乱数
*   [radians()]


# radians

`radians()`は与えられた角度を°からラジアンに変更する。

```prerender
// RadianExample
size(200, 100, "2D"); fill(0); textSize(20);
var x = 60;
text('x = ' + x, 10, 30);
text('radians(x) = ' + radians(x), 10, 60);
```

関連項目: [sin()], [cos()], [tan()]


# size

`size(x_size, y_size, "2D")`はキャンバスの大きさを定めます。スケッチの実行の最初に一回だけ呼ばなければいけない関数です。

```prerender
// キャンバスの大きさを300×200に設定します。
size(300, 200, "2D");
// キャンバスをピンクで塗りつぶします。
background(250, 200, 200);
```

# background

キャンバスを一つの色で塗りつぶします。色を指定する方法は2つあります。 1個の数値を指定した場合は、グレースケールで明るさを指定します。 0は黒、255は白、その中間は数値に応じた灰色を意味します。例えば

```prerender
// BackgroundExample
// キャンバスを灰色に塗ります。
background(150);
```

3個の数値を指定した場合は、RGBモデルで任意の色を指定できます。 R (赤)・G (緑)・B (青)それぞれを0から255までの数値で指定します。


```prerender
// BackgroundExample
// キャンバスを赤で塗ります。
background(255, 0, 0);
```

# loop

スケッチの実行ループが止まっているときに`loop()`を呼ぶと、実行ループを再開します。

```prerender
// NoLoopExample
fill(0); textSize(20);

function draw() {
  background(220);
  text(frameCount, 5, 25);
}

function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}
```

関連項目: [draw()], [noLoop()]

# noLoop

スケッチの実行ループを停止します。 なお、マウスなどのイベントが発生したときは対応する関数が呼ばれるので、 スケッチの実行が完全に停止するわけではありません。

```prerender
// NoLoopExample
fill(0); textSize(20);

function draw() {
  background(220);
  text(frameCount, 5, 25);
}

function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}
```

関連項目: [draw()], [loop()].

# Demos

*   簡単なデモ
    *   [ImageSave]
    *   [ImageRotate]
*   [Drawing]
*   [ChaseTheCircle]
*   [DrawFace]

# ImageRotate

このプログラムは、画像を回しています。

```prerender
// ImageRotateExample
var img = getImage("cc0/cat2-185x200.png");
imageMode(CENTER);

function draw() {
  var angle = (mouseX+mouseY);
  var x = 50, y = 50;
  background(220);
  translate(x, y);
  rotate(angle);
  image(img, 0, 0, 92, 100);
  rotate(-angle);
  translate(-x, -y);
}
```

# ImageSave

このプログラムでは、キャンバスを消すことなく、一部だけを保存して、後もとに戻すことで 綺麗なアニメーションが成り立っています。

```prerender
// ImageSaveExample
var img = getImage("cc0/cat2-185x200.png");
imageMode(CENTER);

var imgSave = null;

function draw() {
  if (imgSave !== null) {
    image(imgSave, pmouseX, pmouseY, 100, 100);
  }
  imgSave = get(mouseX-50, mouseY-50, 100, 100);
  image(img, mouseX, mouseY, 92, 100);
}
```

# Drawing

このスケッチでマウスで描くことができます。

```example
// Drawing
stroke(200, 0, 0);
strokeCap(ROUND);
strokeWeight(10);

var penDown = false;

function mousePressed() {
  if (mouseButton === RIGHT) {
    background(200);
    return;
  }
  penDown = true;
}

function mouseReleased() {
  penDown = false;
}

var prevX = 0;
var prevY = 0;

function draw() {
  if (penDown) {
    if (prevX !== 0) {
      line(prevX, prevY, mouseX, mouseY);
    }
  }
  prevX = mouseX;
  prevY = mouseY;
}
```

# ChaseTheCircle

```example
// ChaseTheCircle

// Coordinates of the first circle.
var x1 = 250;
var y1 = 250;
// Coordinates of the second circle.
var x2 = 250;
var y2 = 250;
// Larger -> faster.
var easing = 0.1;

frameRate(60);
stroke(0);

function draw() {
  // Paint the background.
  background(40, 40, 100);

  // The first circle chases the mouse cursor.
  var dx1 = mouseX - x1;
  x1 += dx1 * easing;
  var dy1 = mouseY - y1;
  y1 += dy1 * easing;

  // Draw the first circle.
  fill(0, 220, 0);
  ellipse(x1, y1, 66, 66);

  // The second circle chases the first circle.
  var dx2 = x1 - x2;
  x2 += dx2 * easing;
  var dy2 = y1 - y2;
  y2 += dy2 * easing;

  // Draw the second circle.
  fill(255, 40, 40);
  ellipse(x2, y2, 66, 66);
}
```

# ゲーム {#ref-Games}

*   [JumpingBall]
*   [JumpingBall2]
*   [TouchTheNumber]
*   [IslandHopper]
*   [PingPong]
*   [RocketLanding]

# RocketLanding

```example
// RocketLanding

var fire = getImage("cc0/fire2-134x200");
var rocket = getImage("cc0/rocket-168x300");
var rocket_fire = getImage("cc0/rocket1-168x300");
var explosion = getSound("cc0/explosion.ogg");
var roar = getSound("cc0/roar.ogg");
var win = getSound("cc0/win.ogg");

var x;
var y;
var vy;

var burning = false;
var gameOver = false;

function initVars() {
  x = 100;
  y = 10;
  vy = 0;
  gameOver = false;
  burning = false;
}

frameRate(20);
imageMode(CENTER);
initVars();

function draw() {
  y = y + vy;
  if (burning) {
    vy = vy - 0.01;
  } else {
    vy = vy + 0.2;
  }
  
  if (y > height - 30) {
    if (abs(vy) > 3) {
      background(200);
      image(fire, x, y-25, 65, 100);
      playSound(explosion);
    } else {
      playSound(win);
      image(rocket, x, y, 34, 60);
    }
    noLoop();
    gameOver = true;
    return;
  }
  
  background(100);
  if (burning) {
    image(rocket_fire, x, y, 34, 60);
  } else {
    image(rocket, x, y, 34, 60);
  }
}

function burn() {
  burning = true;
  vy -= 2;
  playSound(roar);
}

function keyPressed() {
  if (gameOver) {
    initVars();
    loop();
    return;
  }
  burn();
}

function mousePressed() {
  if (gameOver) {
    initVars();
    loop();
    return;
  }
  burn();
}

function mouseReleased() {
  burning = false;
}
```

# PingPong

```example
// PingPong
background(250);
frameRate(30);

var ballDiameter = 30;
var paddleWidth = 10;
var paddleHeight = 90;

var sleepUntil = 0;

var y1 = 180;
var y2 = 180;

function drawBall(x, y) {
  fill(200);
  stroke(0);
  var deform = 0;
  if (x <= paddleWidth*2 + ballDiameter/2 &&
      y1 - paddleHeight/2 - ballDiameter/2 < y &&
      y < y1 + paddleHeight/2 + ballDiameter/2) {
    deform = (paddleWidth*2 + ballDiameter/2 - x);
  } else if (x >= 360-paddleWidth*2 - ballDiameter/2 &&
             y2 - paddleHeight/2 -ballDiameter/2< y &&
             y < y2 + paddleHeight/2 + ballDiameter/2) {
    deform = (paddleWidth*2 + ballDiameter/2 - (360-x));
  }
  ellipse(x, y, ballDiameter-deform, ballDiameter+deform);
}

function drawPaddle(x, y) {
  fill(100);
  stroke(0);
  rect(x - paddleWidth/2, y - paddleHeight/2, paddleWidth, paddleHeight);
}

// Ball coordinates.
var x = 180, y = 180;
// Ball velocity.
var vx = 5, vy = 5;
var lastPlayer1inputMs = 0;
var lastPlayer2inputMs = 0;

function updateBall() {
  if (y < 10 && vy < 0) {
    vy = -vy - 1 + random(2);
  }
  if (y > 350 && vy > 0) {
    vy = -vy - 1 + random(2);
  }
  if (x <= paddleWidth + ballDiameter/2 &&
      y1 - paddleHeight/2 - ballDiameter/2 < y &&
      y < y1 + paddleHeight/2 + ballDiameter/2) {
    vx = 5 + random(2);
  }
  if (x >= 360-paddleWidth - ballDiameter/2 &&
      y2 - paddleHeight/2 -ballDiameter/2< y &&
      y < y2 + paddleHeight/2 + ballDiameter/2) {
    vx = -7 + random(2);
  }
  x += vx;
  y += vy;
  if (x < 10 || x > 350) {
    sleepUntil = millis() + 2000;
    background(250);
    textSize(30);
    fill(0);
    if (x < 10) {
      text("Player B won!", 100, 180);
    } else {
      text("Player A won!", 100, 180);
    }
    x = 180;
    y = 0;
    vx = -5;
    return false;
  }
  return true;
}

function draw() {
  if (millis() < sleepUntil) {
    return;
  }
  if (!updateBall()) {
    return;
  }
  background(255);
  drawPaddle(10, y1);
  drawPaddle(345, y2);
  drawBall(x, y);
  textSize(10);
  text(str(x) + "," + str(y)+"  "+y1+" " + y2, 10, 10);
  if (random(70) < 10 && millis() - lastPlayer1inputMs > 5000) {
    y1 = y;
  } else if (random(90) < 10 && millis() - lastPlayer2inputMs > 5000) {
    y2 = y;
  }
}


function mouseMoved() {
  y1 = mouseY;
  lastPlayer1inputMs = millis();
}

function keyPressed() {
  var ms = millis() - lastPlayer2inputMs;
  if (keyCode === UP) {
    if (ms < 100) {
      y2 -= 100;
    } else if (ms < 200) {
      y2 -= 50;
    } else {
      y2 -= 10;
    }
  } else if (keyCode === DOWN) {
    if (ms < 100) {
      y2 += 100;
    } else if (ms < 200) {
      y2 += 50;
    } else {
      y2 += 10;
    }
  }
  lastPlayer2inputMs = millis();
}
```

# IslandHopper

```example
// IslandHopper
var loc = 0;
var sizes = [30, 30, 20, 30, 20, 10, 30];
var N = sizes.length;

frameRate(5);
stroke(0);
fill(255);

var margin = 30;
var islandR = 30;
var islandAspect = 4;
var islandH = height-20;
var step = (width - 2*margin) / (N-1);

var negSizeThreshold = -3;

var humanHeight = 50;
var humanWidth = 20;
var humanHeadR = 10;
var humanY = islandH;

var gameOver = false;
var message = "GAME OVER";

function initialize() {
  loc = 0;
  gameOver = false;
  humanY = islandH;
  message = "GAME OVER";
}


function drawHuman(x, y) {
  line(x, y-humanHeight/3, x, y-humanHeight);
  line(x-humanWidth/2, y, x, y-humanHeight/3);
  line(x+humanWidth/2, y, x, y-humanHeight/3);
  line(x-humanWidth/2, y-humanHeight*4/5, x+humanWidth/2, y-humanHeight*4/5);
  fill(255);
  ellipse(x, y-humanHeight-humanHeadR, humanHeadR*2, humanHeadR*2);
}

function drawIsland(x, s) {
  fill(255, 255, 255);
  ellipse(x, islandH, s, islandR);
}

function redraw1() {
  background(200); fill(0);
  drawHuman(margin + loc*step, humanY);
  for (var i = 0; i < N; i++) {
    var s = sizes[i];
    if (s > 0) {
      if (s > islandR) { s = islandR; }
      ellipse(margin + i*step, islandH, s, s/islandAspect);
    }
  }
  drawHuman(margin + loc*step, humanY);
  if (gameOver) {
    textSize(40);
    fill(0);
    text(message, 30, height/2+10);
    fill(255);
  }
}

function shrinkIslands() {
  for (var i = 0; i < N; i++) {
    if (sizes[i] > -random(0, negSizeThreshold)) {
      sizes[i] -= 1;
    } else {
      sizes[i] = random(islandR) + islandR;
    }
  }
}

function pullHuman() {
  if (humanY < islandH) {
    humanY += humanHeight/10;
  }
  if (humanY > islandH) {
    humanY = islandH;
  }
}

function advanceTime() {
  shrinkIslands();
  pullHuman();
}

function checkGround() {
  var s = sizes[loc];
  if (humanY === islandH && s < humanWidth-2) {
    humanY = height;
    gameOver = true;
    redraw1();
    noLoop();
    return;
  }
  if (loc === sizes.length-1 && humanY === islandH) {
    message = "YOU WON";
    gameOver = true;
  }
}

function draw() {
  if (gameOver) { return; }
  advanceTime();
  checkGround();
  redraw1();

}

function keyPressed() {
  if (gameOver) {
    initialize();
    loop();
    return;
  }
  if (keyCode === LEFT && loc > 0) {
    loc--;
  } else if (keyCode === RIGHT && loc < sizes.length-1) {
    loc++;
  } else if (keyCode === 32 && humanY === islandH) {
    humanY -= humanHeight;
  }
  checkGround();
  redraw1();
}

function mouseClicked() {
  if (gameOver) {
    initialize();
    loop();
  }
}
```

# JumpingBall

```example
// JumpingBall

var groundHeight = 10;
var skyHeight = height - groundHeight - 10;

var walls = [];
var ball;

var Wall = function(init_x, init_y) {
  this.x = init_x;
  this.y = init_y;
};

function drawGround() {
  for (var start = -(4 * frameCount % 11); start < width; start += 11) {
    fill(100, 100, 100);
    rect(start, skyHeight, 11, groundHeight);
  }
}

function draw() {
  background(255, 255, 255);
  if (frameCount % 50 === 0) {
    walls.push(new Wall(width, random(skyHeight / 2)));
  }

  for (var i = 0; i < walls.length; ++i) {
   walls[i].update();
    if (ball.hit(walls[i])) {
      noLoop();
    }
    if (walls[i].x < 0) {
      walls.shift();
      i--;
      continue;
    }
    walls[i].draw();
  }

  drawGround();
  ball.update();
  ball.draw();
}

function mouseClicked() {
  if (ball.y <= ball.r) {
   ball.v = 20;
  }
}


var Ball = function(init_x, init_y, init_r) {
  this.x = init_x;
  this.y = init_y;
  this.r = init_r;
  this.v = 0;
};

Ball.prototype.update = function() {
  if (this.v < 0 && this.y - this.r <= 0) {
    this.v = 0;
    this.y = this.r;
  } else {
    this.y += this.v;
    this.v--;
  }
};

Ball.prototype.hit = function(w) {
  if (w.x > this.x + this.r || w.x < this.x - this.r) {
      return false;
  }
  return this.y - this.r < w.y;
};

Ball.prototype.draw = function() {
  fill(0, 0, 0);
  ellipse(this.x, skyHeight - 1 - this.y, this.r*2, this.r*2);
};


Wall.prototype.update = function() {
  this.x -= 4;
};

Wall.prototype.draw = function() {
  fill(0, 255, 0);
  rect(this.x, skyHeight - 1 - this.y, 5, this.y);
};


var ball = new Ball(40, 20, 20);
var walls = [];

```

# JumpingBall2

```example
// JumpingBall2
var img = getImage("cc0/football1-200x200.png");
var fire = getImage("cc0/fire1-200x123.png");
imageMode(CENTER);

// 座標
var x = 100;
var y = 100;
// 速度
var vx = 0;
var vy = 0;
// 加速度
var ax = 0.99;
var ay = 0.1;

var fireX = 200;
var fireY = 300;
var fireV = 1;
var fireVX = 0.5;
var fireVY = -0.1;
var fireAngle = 0;

var goalX = width-50;
var goalY = height-45;


var gameOver = false;
var gameMessage = "";

function initializeVars() {
  x = 100;
  y = 100;
  vx = 0;
  vy = 0;
}

initializeVars();

function updatePosition() {
  // 座標や速度の計算。
  x = x + vx;
  y = y + vy;
  if (vx !== 0) {
    vx = vx*abs(vx*ax)/abs(vx);
  }
  vy = vy + ay;
  /*
  if (y > height-5) {
    gameOver = true;
    gameMessage = "GAME OVER";
    return;
  }
  */
  // バウンス
  if (x < 5) {
    x = 5;
    vx = abs(vx);
  }
  if (x > width-5) {
    x = width - 5;
    vx = -abs(vx);
  }
  if (y < 5) {
    y = 5;
    vy = abs(vy);
  }
  if (y > height-5) {
    y = height-5;
    vy = -abs(vy);
  }
  fireX += fireVX;
  fireY += fireVY;
  fireAngle += 1;
  fireVX = fireV*cos(fireAngle) + fireV*sin(fireAngle);
  fireVY = fireV*sin(fireAngle) - fireV*cos(fireAngle);

  if (dist(x, y, fireX, fireY) < 100 && abs(y - fireY) < 60) {
    gameOver = true;
    gameMessage = "GAME OVER";
  }
  if (dist(x, y, goalX, goalY) < 25 && y <= goalY) {
    gameOver = true;
    gameMessage = "YOU WON";
  }
}


function drawFrame() {
  if (gameOver) {
    background(220);
    fill(0);
    textSize(20);
    text(gameMessage, 30, 100);
    noLoop();
    return;
  }
  background(220);
  strokeWeight(3);
  fill(255);
  ellipse(goalX, goalY, 45, 25);
  fill(255);
  //ellipse(x, y, 10, 10);
  image(img, x, y,  40, 40);
  translate(fireX, fireY);
  image(fire, 0, 0, 200, 130);
  translate(-fireX, -fireY);

}

function keyPressed() {
  if (gameOver) {
    gameOver = false;
    initializeVars();
    loop();
    return;
  }
  switch (key) {
    case ' ':
      break;
    case '\n':
      break;
    case 'q':
      gameOver = true;
      gameMessage = "STOP";
      break;
  }
  switch (keyCode) {
    case UP:
      vy -= 5;
      break;
    case DOWN:
      vy += 5;
      break;
    case LEFT:
      vx = -2;
      break;
    case RIGHT:
      vx = 2;
      break;
  }
}

function draw() {
  updatePosition();
  drawFrame();
}
```

# TouchTheNumber

```example
// TouchTheNumber

var N = 3;
var numbers = [[],[],[]];

// Draw the rectangles.
function rectangles() {
  fill(200);
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      rect(50+120*i, 50+120*j, 100, 100);
    }
  }
}

function printNumbers() {
  fill(0);
  textSize(50);
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      text(str(numbers[i][j]), 85+120*i, 118+120*j);
    }
  }
}

function shuffle() {
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      var x = floor(random(0, N));
      var y = floor(random(0, N));
      if (x !== i || y !== j) {
        var tmp = numbers[i][j];
        numbers[i][j] = numbers[x][y];
        numbers[x][y] = tmp;
      }
    }
  }
}

background(240);
textSize(50);
numbers = [];
for (var i = 0; i < N; i++) {
  numbers[i] = [];
  for (var j = 0; j < N; j++) {
    numbers[i][j] = i*3 + j + 1;
  }
}
shuffle();
rectangles();
printNumbers();

var current = 1;
var started = false;
var started_ms = 0;

function draw() {
  noLoop();
}

function mouseOver() {
  if (!started) {
    started = true;
    background(240);
    rectangles();
    started_ms = millis();
  }
}

var lastClickMs;

function mouseClicked() {
  // Ignore click repeats (touch screen generates too many click events).
  if (millis() - lastClickMs < 50) {
    return;
  }
  lastClickMs = millis();
  if (!started) {
    started = true;
    background(240);
    rectangles();
    started_ms = millis();
  }
  if (current === 10) {
    background(240);
    rectangles();
    shuffle();
    printNumbers();
    current = 1;
    started = false;
    return;
  }
  var x = floor((mouseX-60)/120);
  var y = floor((mouseY-60)/120);
  if (x < 0) { x = 0; }
  if (x >= N) { x = N-1; }
  if (y < 0) { y = 0; }
  if (y >= N) { y = N-1; }
  //fill(240); stroke(240);
  //rect(20, 20, 50, 20);
  //textSize(20); fill(0); stroke(0);
  //text(str(mouseX) + " " + str(mouseY)+" : " + str(x) + " " + str(y), 20, 20);
  if (numbers[x][y] === current) {
    textSize(50);
    fill(0);
    text(str(numbers[x][y]), 85+120*x, 118+120*y);
    current++;
    if (current === 10) {
      background(240);
      var t = millis() - started_ms;
      fill(0); textSize(50);
      text(str(floor(t/1000)) + "." + str((floor(t/100))%10) + str((floor(t/10))%10) + "s", 100, 100);
    }
  }
}
```

# ellipse

円または楕円を描きます。

```prerender
// EllipseExample
ellipse(50, 25, 90, 20);
```

```prerender
// EllipsesExample
fill(255, 0, 0); // 赤
// 横に細長い赤い楕円を描きます。
ellipse(50, 10, 100, 20);
fill(0, 0, 255); // 青
// 縦の細長い楕円を描きます。
ellipse(10, 50, 20, 100);
fill(255);  // 白
ellipse(50, 50, 40, 40);
```

呼び方: `ellipse(x, y, width, height)`

* `x` — 中心のX座標
* `y` — 中心のY座標
* `width` — 楕円の幅
* `height` — 楕円の高さ

`weight`と`height`を等しくすれば円を描くことができます。

関連項目: [arc()], [triangle()], [rect()], [ellipse()]

# Ball

Ball: 玉。ボール。

# Wall

Wall: 壁

# add

足す。付き加える。

# alert

警報。アラート。`alert(text)`はブラウザに`text`のテキストを警報します。

# drawGround

地面を描く。

# fill

`fill()`は図形の中を塗りつぶす色を設定します。`fill()` を呼んだ後に `ellipse()` や `rect()` などで楕円や四角形を描くと、その中が`fill()`で指定した色で塗りつぶされます。

```prerender
// FillExample
fill(0, 255, 0);  // 緑
ellipse(50, 50, 50, 25);
```

色の指定の仕方については color() の説明を見てください。

塗りつぶす色ではなく図形の外側の線の色を指定するには、stroke() の説明を見てください。

関連項目: [noFill()], [stroke()], [noStroke()]

# hit

当たる、打つかる。

# false

真理値の一つ。「偽」という意味。[boolean]を見てください。

# true

真理値の一つ。「真」という意味。[boolean]を見てください。

# boolean

`boolean`は真理値の型です。真理値には2つの値があります。

*   `true` 「真」
*   `false` 「偽」

[if()]と[while()]のカッコの中の値は真理値でなければなりません。

# void

`void`は何も返さない関数の型です。関数が値を返す必要がないときに使います。

# char

`char`は一つの文字のコードポイント(符号点)を保存する整数の型です。

```
char c = 'd'; // 100.
```

# int

整数の型です。整数は..., -3, -2, -1, 0, 1, 2, 3, 4, ...などの数です。

# float

単精度浮動小数点数の型です。

**注意:** Processing.jsでは、変数に付く型が倍精度(double)である。

# double

倍精度浮動小数点数変の型です。

# byte

-128以上127以下の整数の型です。

**注意:** Processing.jsでは変数につけている型は倍精度(double)であるため、使う時点で`byte()`で変換が必要である。

```prerender
fill(0); textSize(20);
byte x = byte(257);
text(str(x), 10, 30);
```

# short

-32768以上32767以下の整数の型です。

**注意:** Processing.jsでは変数につけている型は倍精度(double)であるため、使う時点で`short()`で変換が必要である。

# line

`line()`はキャンバスに直線を描きます。

```prerender
// LineExample
var x1 = 10, y1 = 10, y2 = 100, x2 = 50;
// (x1, y1)から(x2, y2)までの直線を描きます。
line(x1, y1, x2, y2);
```

関連項目: [triangle()], [rect()], [ellipse()], [arc()].

# millis

プログラム開始から現在までの経過時間をミリ秒単位で返します。
注意：プログラムの編集のときは、プログラムをそのまま実行し続ける場合がありますので、
`millis()`は0にならないで、そのまま増え続きます。

例えば、このプログラムは実行を始めてから2秒後に赤い円を描きます。

```prerender
// MillisExample
size(150, 100, "2D");
background(255);  // キャンバスを白で塗ります
fill(0);
textSize(20);
text("2秒待って", 10, 50);
var start = millis();

function draw() {
  if (millis() - start > 2000) {  // 2000ミリ秒=2秒
    background(255);
    fill(255, 0, 0); // 赤
    ellipse(75, 50, 55, 55);
    noLoop(); // アニメーションを止めます。
  }
}
```

# mouseClicked

`mouseClicked()` を定義すると、ユーザがマウスをクリックしたときに呼ばれます。 マウスのクリックに反応するプログラムを作るにはこの関数を定義しなければなりません。カーソルの位置は`mouseX`と`mouseY`変数を使って調べることができます。 クリックされたボタンは`mouseButton`変数を使って調べることができます。クリックされたボタンによって`mouseButton`の値は`LEFT`か`RIGHT`かになります。

右側のキャンバスにマウスクリックしてください。

```prerender
// MouseClickedExample
background(255);

function mouseClicked() {
  fill(0);
  ellipse(mouseX, mouseY, 20, 20);
}
```

関連項目: [mousePressed()], [mouseReleased()], [mouseX], [mouseY].

# mouseMoved

[マウスイベント][Mouse]: `mouseMoved()`を定義すると、マウスカーソルを動かしたときに呼ばれます。


右側のキャンバスにマウスを動かしてみてください。

```prerender
// MouseMovedExample

function mouseMoved() {
  line(pmouseX, pmouseY, mouseX, mouseY);
}
```

関連項目: [mouseClicked()], [mouseDragged()], [mouseOver()], [mouseOut()].

# mouseDragged

[マウスイベント][Mouse]: mouseDragged()を定義すると、マウスを押したまま動かしたときに呼ばれます。

右側のキャンバスにマウスをクリックして、押したまま動かしてみてください。

```prerender
// MouseDraggedExample

function mouseDragged() {
  line(pmouseX, pmouseY, mouseX, mouseY);
}
```

関連項目: [mouseClicked()], [mouseMoved()], [mouseOver()], [mouseOut()].

# mouseOver

`mouseOver()` を定義すると、ユーザがマウスをキャンバスの外から中に動かしたときに呼ばれます。

```prerender
// MouseOverExample
background(220);
fill(0); textSize(15);
text("待っています", 5, 20);

function mouseOver() {
  background(80); fill(255);
  text("スタート", 20, 20);
}

function mouseOut() {
  background(0); fill(255);
  text("終わり", 20, 20);
}
```

関連項目: [mouseOut()], [mouseMoved()].

# mouseOut

`mouseOut()` を定義すると、ユーザがマウスをキャンバスの中から外に動かした時に呼ばれます。

```prerender
// MouseOutExample
background(220);
fill(0); textSize(15);
text("待っています", 5, 20);

function mouseOver() {
  background(80); fill(255);
  text("スタート", 20, 20);
}

function mouseOut() {
  background(0); fill(255);
  text("終わり", 20, 20);
}
```

関連項目: [mouseOver()], [mouseMoved()].

# mousePressed

`mousePressed()` を定義すると、ユーザがマウスのボタンを押したときに呼ばれます。この関数を定義すると、「マウスで絵を描く」のような操作が実装できます。


```prerender
// MousePressedExample
background(128);
fill(240);

var pressed = false;

// キャンバスの中でマウスの左ボタンか右ボタンが押されたら、
// それに対応して塗りつぶしとペンの色を設定する。
function mousePressed() {
  pressed = true;
  if (mouseButton === LEFT) {
    fill(0); stroke(0);
  } else if (mouseButton === RIGHT) {
    fill(255); stroke(255);
  }
}

function mouseReleased() {
  pressed = false;
}

function draw() {
  if (pressed) {
    ellipse(mouseX, mouseY, 5, 5);
  }
}
```

関連項目: [mouseReleased()], [mouseMoved()].

# mouseReleased

`mouseReleased()` を定義すると、ユーザがマウスのボタンを離したときに呼ばれます。この関数を定義すれば、「マウスで絵を描く」のような操作が実装できます。

```prerender
// MouseReleasedExample
background(128);
fill(240); noStroke();

var pressed = false;

function mousePressed() {
  pressed = true;
}

function mouseReleased() {
  pressed = false;
}

function draw() {
  if (pressed) {
    ellipse(mouseX, mouseY, 10, 10);
  }
}
```

関連項目: [mousePressed()], [mouseMoved()].

# mouseButton

[マウスイベント][Mouse]の中で使い、押されたボタンを表します。 押されたボタンが左ボタンのときは`LEFT`に、右ボタンがときは`RIGHT`になります。

```prerender
// MouseButtonExample
// キャンバスの中でマウスボタンが押してみましょう。
background(220);
function mousePressed() {
  if (mouseButton === LEFT) {
    fill(0);
    rect(5,5,40,90);
  } else if (mouseButton === RIGHT) {
    fill(0);
    rect(55,5,40,90);
  } else {
    fill(0);
    rect(45,5,10,90);
  }
}

function mouseReleased() {
  background(200);
}
```

# mouseX

マウスのX座標。[draw()]からも[マウスイベント][Mouse]からも参照できます。

```prerender
// MouseExample
function draw() {
  ellipse(mouseX, mouseY, 5, 5);
}
```

関連項目: [mouseY], [pmouseX], [pmouseY], [mousePressed()], [mouseReleased()],
[mouseClicked()].

# pmouseX

前のフレームでの[mouseX]の値です。

```prerender
// MouseExample
function draw() {
  line(pmouseX, pmouseY, mouseX, mouseY);
}
```

関連項目: [mouseX], [mouseY], [pmouseY].

# pmouseY

前のフレームでの[mouseY]の値です。

```prerender
// MouseExample
function draw() {
  line(pmouseX, pmouseY, mouseX, mouseY);
}
```

関連項目: [mouseX], [mouseY], [pmouseX].

# mouseY

マウスのY座標。[draw()]からも[マウスイベント][Mouse]からも参照できます。

```prerender
// MouseExample
function draw() {
  ellipse(mouseX, mouseY, 5, 5);
}
```

関連項目: [mouseY], [pmouseX], [pmouseY], [mousePressed()], [mouseReleased()],
[mouseClicked()].

# LEFT

**マウス**: `LEFT`は[mouseButton]を参照するときにマウスの左ボタンを表す。

関連項目: [mouseButton], [mousePressed()], [mouseReleased()], [mouseClicked()].

**キーボード**: 左の矢印キーのコード。一覧は[keyCodes]に参照。 `keyCode === LEFT`を調べる先に`key ==
CODED`を確かめなければなりません。

関連項目: [keyCode], [keyCodes].

# CENTER

**マウス**: `CENTER`は[mouseButton]を参照するときにマウスの真ん中ボタンを表す。

関連項目: [mouseButton], [mousePressed()], [mouseReleased()], [mouseClicked()].

# RIGHT

**マウス**: `RIGHT`は[mouseButton]を参照するときにマウスの右ボタンを表す。

関連項目: [mouseButton], [mousePressed()], [mouseReleased()], [mouseClicked()].

**キーボード**: 右の矢印キーのコード。一覧は[keyCodes]に参照。 `keyCode === RIGHT`を調べる先に`key ==
CODED`を確かめなければなりません。

関連項目: [keyCode], [keyCodes].

# printNumbers

数値を表示する。

# random

`random(min, max)` は `min`, `max` で与えられた範囲のなかからランダムな値(乱数)を返します。 返された値 `r` は `min <= r < max` を満たします。

**注意**：返された値は整数ではありません。

```prerender
// RandomExample
size(200, 100, "2D"); fill(0); textSize(20);
var x = 60;
text('random(0,5) = ' + random(0,5), 10, 30);
text('random(0,5) = ' + random(0,5), 10, 60);
```

`random(max)`は0から`max`の乱数を返します。

```prerender
// RandomExample
size(200, 100, "2D"); fill(0); textSize(20);
var x = 60;
text('random(5) = ' + random(5), 10, 30);
text('random(5) = ' + random(5), 10, 60);
```

# rect

`rect()`は長方形を描きます。長方形の位置は2つの対角の頂点の座標で指定します。

```prerender
// RectExample
fill(100);
rect(20, 30, 60, 40);
```

関連項目: [fill()], [stroke()], [line()], [triangle()], [point()]

# remove

なくす、処分する。

# shuffle

順番をみだす、順不同にする。

# sqrt

`sqrt()`は与えられた数の平方根を計算します。例えば、`sqrt(4.0)`は2.0を返します。

```prerender
// SqrtExample
size(200, 100, "2D"); fill(0); textSize(30);
var x = 36;
text('x = ' + x, 10, 30);
text('sqrt(x) = ' + sqrt(x), 10, 60);
```

# str

`str()`は任意の値を文字列(テキスト)に変換します。

# stroke

`stroke()`はペンの色を設定します。以降の線や図形を描く命令に反映されます。

```prerender
// StrokeExample
strokeWeight(5);
stroke(255, 180, 0);  // オレンジ
line(20, 20, 80, 20);
stroke(180, 255, 0);  // 黄緑
line(20, 40, 80, 40);
stroke(0, 255, 180);  // 青
line(20, 60, 80, 60);
```

関連項目: [noStroke()], [strokeCap()], [fill()].

# strokeCap

`strokeCap()`はペンの端の形を設定します。次の[line()]命令に反映されます。

```prerender
size(200, 100, "2D");
fill(0); textSize(15);
strokeWeight(16);
strokeCap(ROUND);
line(20, 20, 80, 20);
text("ROUND", 100, 20);
strokeCap(SQUARE);
line(20, 50, 80, 50);
text("SQUARE", 100, 50);
strokeCap(PROJECT);
line(20, 80, 80, 80);
text("PROJECT", 100, 80);
```

関連項目: [stroke], [fill], [ROUND], [SQUARE], [PROJECT].

選択できる形は

*   `ROUND` - 丸い
*   `SQUARE` - 四角い。線は座標で表している点までぴったり及びます。
*   `PROJECT` - 四角い。線は座標で表している点から筆の大きさの部分まで出ています。

# ROUND

線を描く筆を丸い形に設定します。 [strokeCap()]を見てください。

```prerender
strokeCap(ROUND);
strokeWeight(20);
line(20, 20, 80, 80);
```

関連項目: [strokeCap], [strokeWeight], [stroke], [SQUARE], [PROJECT].

# SQUARE

線を描く筆を四角い形に設定します。 [strokeCap()]を見てください。

```prerender
strokeCap(SQUARE);
strokeWeight(20);
line(20, 20, 80, 80);
```

関連項目: [strokeCap], [strokeWeight], [stroke], [ROUND], [PROJECT].

# PROJECT

線を描く筆を四角い形に設定します。[SQUARE]と比べて、筆の大きさは線の先端に出ています。 [strokeCap()]を見てください。

```prerender
strokeCap(PROJECT);
strokeWeight(20);
line(20, 20, 80, 80);
```

関連項目: [strokeCap], [strokeWeight], [stroke], [ROUND], [SQUARE].

# strokeWeight

`strokeWeight()`はペンの太さを設定します。以降の線や図形を描く命令に反映されます。

```prerender
// StrokeWeightExample
size(200, 100, "2D");
strokeWeight(5); fill(0); textSize(15);
line(15, 20, 65, 20);
text("strokeWeight(5)", 80, 20);
strokeWeight(10);
line(15, 40, 65, 40);
text("strokeWeight(10)", 80, 40);
strokeWeight(20);
line(15, 70, 65, 70);
text("strokeWeight(20)", 80, 70);
```

関連項目: [stroke()], [strokeWeight()], [SQUARE].

# noFill

`noFill()`は図形の内蔵を塗りつぶさないように設定します。

```prerender
// NoFillExample
noFill(); stroke(150);
rect(20, 20, 60, 60);
```

関連項目: [stroke()], [noStroke()], [fill()]

# noStroke

`noStroke()`は図形の縁を書かないように設定します。

```prerender
// NoStrokeExample
noStroke(); fill(100);
rect(20, 20, 60, 60);
```

関連項目: [stroke()], [fill()], [noFill()]

# text

`text()`はキャンバスに文字列を表示します。表示する位置を座標で指定します。

```prerender
// TextExample
size(150, 100, "2D"); fill(0); textSize(20);
text("こんにちは", 20, 50);
```

関連項目: [textSize], [fill], [textFont].

# textAlign

`textAlign()`は文字を移り方を設定する。

```render
size(300, 130, "2D");
stroke(0);
fill(0);
textSize(15);
strokeWeight(5);
point(width/2, height/2);
frameRate(1);

function draw() {
  background(220);
  point(width/2, height/2);
  switch (frameCount % 12) {
    case 0:
      textAlign(LEFT, BASELINE);
      text("textAlign(LEFT, TOP)", 10, 20);
      textAlign(LEFT, TOP);
      break;
    case 1:
      textAlign(LEFT, BASELINE);
      text("textAlign(RIGHT, TOP)", 10, 20);
      textAlign(RIGHT, TOP);
      break;
    case 2:
      textAlign(LEFT, BASELINE);
      text("textAlign(CENTER, TOP)", 10, 20);
      textAlign(CENTER, TOP);
      break;
    case 3:
      textAlign(LEFT, BASELINE);
      text("textAlign(LEFT, BOTTOM)", 10, 20);
      textAlign(LEFT, BOTTOM);
      break;
    case 4:
      textAlign(LEFT, BASELINE);
      text("textAlign(RIGHT, BOTTOM)", 10, 20);
      textAlign(RIGHT, BOTTOM);
      break;
    case 5:
      textAlign(LEFT, BASELINE);
      text("textAlign(CENTER, BOTTOM)", 10, 20);
      textAlign(CENTER, BOTTOM);
      break;
    case 6:
      textAlign(LEFT, BASELINE);
      text("textAlign(LEFT, CENTER)", 10, 20);
      textAlign(LEFT, CENTER);
      break;
    case 7:
      textAlign(LEFT, BASELINE);
      text("textAlign(RIGHT, CENTER)", 10, 20);
      textAlign(RIGHT, CENTER);
      break;
    case 8:
      textAlign(LEFT, BASELINE);
      text("textAlign(CENTER, CENTER)", 10, 20);
      textAlign(CENTER, CENTER);
      break;
    case 9:
      textAlign(LEFT, BASELINE);
      text("textAlign(LEFT, BASELINE)", 10, 20);
      textAlign(LEFT, BASELINE);
      break;
    case 10:
      textAlign(LEFT, BASELINE);
      text("textAlign(RIGHT, BASELINE)", 10, 20);
      textAlign(RIGHT, BASELINE);
      break;
    case 11:
      textAlign(LEFT, BASELINE);
      text("textAlign(CENTER, BASELINE)", 10, 20);
      textAlign(CENTER, BASELINE);
      break;
  }
  text("text", width/2, height/2);
}
```

# textSize

`textSize()`は以降の `text()` での文字の大きさを設定します。

```prerender
// TextSizeExample
fill(0);
textSize(50);
text("あ", 20, 80);
textSize(20);
text("か", 70, 30);
```

関連項目: [text()], [textFont()].

# triangle

`triangle()`は三角形を描きます。3つの頂点を座標で指定します。

```prerender
// TriangleExample
triangle(50, 10, 10, 80, 90, 80);
```

三角形の辺は現在のペンの色と太さで描きます。`stroke()`と`strokeWeigth()`を見てください。 三角形の内部は現在の塗りつぶしの色で塗りつぶします。`fill()`を見てください。

# update

更新する。

# while

指定された条件が真である間、 { … } の間に書いた文を繰り返します。

```prerender
// WhileExample
fill(0);
var x = 0;
while (x < 10) {
  text(str(x), 10+x*7, 15+x*8);
  x = x+1;
}
```

関連項目: [for], [do], [break], [continue].

# for

ループ文といい、ある条件を満たすまで {} の中を繰り返します。丸括弧の中はセミコロン “;” で 3 つの部分に区切られ、以下の通りに実行されます。

* 最初の部分は、繰り返しの始まる前に1度だけ実行されます
* 真ん中の部分は、繰り返しの条件です。この条件が満たされている間、{} の中を繰り返し実行します。
* 最後の部分は、{} の中を実行し終わった後、毎回呼ばれます。

```prerender
fill(0);
for (var i = 0; i < 10; i++) {
  text(str(i), 10, i*10);
}
```

関連項目: [while], [do], [break], [continue].

# do

ループの一つの種類。[while]と違って、初めて条件を調べる前に一回ループの本体 を実行する。

```prerender
do {
  fill(0);
  text("一回だけ実行する!", 5, 50);
} while (false);
```

関連項目: [while], [for], [break], [continue].

# if

続く丸括弧内の条件が満たされた場合、直後のブロック({} の中)を実行します。 条件を満たさなかった場合は、`else`のブロックを実行します。もし`else`のブロックがない場合は、 何も実行しません。

```prerender
// IfExample
fill(0);
if (10 > 5) {
  text("10 > 5", 10, 50);
} else {
  text("10 <= 5 ?!", 10, 50);
}
```

関連項目: [else]

# else

条件付きの実行の`if`のブロックに条件が満たされないときに実行するブロック 指定する。

```prerender
fill(0);
if (10 < 5) {
  text("10 < 5 ?!", 10, 50);
} else {
  text("10 >= 5", 10, 50);
}
```

関連項目: [if]

# case

`case`は、`switch`文の中で一つの値の分岐を表す。

関連項目: [switch], [default].

# switch

`switch`文は一つの変数の値を検出して、複数の値に対して比べて多重分岐から 一つの分岐を実行する。

```prerender
fill(0); textSize(30);
var x = 2;
switch (x) {
  case 0: text("〇", 10, 50); break;
  case 1: text("一", 10, 50); break;
  case 2: text("二", 10, 50); break;
  default: text("他", 10, 50); break;
}
```

関連項目: [case], [default].

# default

`default`は、[switch]文の中でどの値でも当たらなかった場合の分岐を表す。

関連項目: [switch], [case].

# ループ {#ref-Loop}

ループは繰り返す実行の命令である。いくつの種類がある

*   [for]
*   [while]
*   [do]

# LabyrinthWalker

```example
var imgLabyrinth = getImage("cc0/Labyrinth2a.png");
var imgWalker = getImage("cc0/Walker44.png");

var s = 44;

var x = 190;
var y = 310;

var dx = 0;
var dy = -1;

// canvas size (Variable aren't evaluated. Integers only, please.)
size(360, 360, "2D");

// Display the background (labyrinth).
image(imgLabyrinth, 1, 1, 360, 360);



// Use white fill color for drawing rectangles.
fill(255,255,255);
// Use white stroke color for drawing rectangles.
noStroke();
// Show image centered at (x,y).
imageMode(CENTER);
// Display the starting position of the walker.
image(imgWalker, x, y, s, s);

function turnLeft() {
  var tmp = dx;
  dx = dy;
  dy = -tmp;
}

var wallAhead() {
    var wallFound = false;
    var rx = -dy;
    var ry = dx;
    for (var i = -s/2-1; i <= s/2+1; i++) {
        var c = get(x+dx*(s/2+3)+rx*i, y+dy*(s/2+3)+ry*i);
        wallFound = wallFound || brightness(c) < 50;
    }
    return wallFound;
}

function moveForward() {
  rect(x-s/2, y-s/2, s, s);
  x += dx;
  y += dy;
  image(imgWalker, x, y, s, s);
}

function turnRight() {
  var tmp = dx;
  dx = -dy;
  dy = tmp;
}

var wallRight() {
  var rx = -dy;
  var ry = dx;
  var wallFound = false;
  for (var i = -s/2-1; i <= s/2+1; i++) {
      var c = get(x + rx*(s/2+3)+dx*i, y + ry*(s/2+3)+dy*i);
      wallFound = wallFound || brightness(c) < 50;
  }
  return wallFound;
}

var reachedGoal() {
  var c = get(x+dx*(s/2+3), y+dy*(s/2+3));
  return red(c) < 50 && green(c) > 50;
}

function draw() {
  if (reachedGoal()) {
      fill(0,0,0);  // black.
      text("Finish!", x+s/2, y);
      noLoop();
  }
  if (!wallRight()) {
    turnRight();
    moveForward();
    moveForward();
  } else if (wallAhead()) {
    turnLeft();
  }
  moveForward();
}
```

# 1. 空迷路 {#ref-LabyrinthBlank}

今回は、キャラクターの周りだけではなくて、動かす前に迷路全体を調べてみましょう。地図を作って、スタートやゴールの位置が判明してから、最短ルートを探します。プログラムは複雑になってくるので、アルゴリズムの面白い部分を見ることができます。以下のプログラムを読み込みしてから、「実行」のボタンを押してみましょう。

```example
var imgLabyrinth = getImage("cc0/Labyrinth3a.png");
var imgWalker = getImage("cc0/Walker44.png");

// Set up canvas size.
size(360, 360, "2D");
// Display the background (labyrinth).
image(imgLabyrinth, 1, 1, 360, 360);

var imgSave = null;
function draw() {
  if (imgSave != null) {
    image(imgSave, pmouseX, pmouseY, 44, 44);
  }
  imgSave = get(mouseX, mouseY, 44, 44);
  image(imgWalker, mouseX, mouseY, 44, 44);
}
```

[2. 地図作り][LabyrinthMapper]

# 2. 地図作り {#ref-LabyrinthMapper}

[前に戻る][LabyrinthBlank]

このプログラムは迷路の画像を解析して地図を作っていきます。
迷路の上に点をおいて、縦横にピクセルを調べながらグリッド形式で地図を作成します。迷路によってはもっと細かく地形を調べなければいけない場合があります。

```example
var imgLabyrinth = getImage("cc0/Labyrinth3a.png");
var imgWalker = getImage("cc0/Walker44.png");

// Step in pixels.
var s = 17;
// Size of the grid.
var n = 360/s;
// The grid. 0 means the cell is blocked. >0 means the cell is open.
var grid[][];

var showMap = true;

// The starting point;
var sx = 0, sy = 0;
// The goal.
var gx = 0, gy = 0;

// canvas size (Variable aren't evaluated. Integers only, please.)
size(360, 360, "2D");

// Display the background (labyrinth).
image(imgLabyrinth, 1, 1, 360, 360);

// Allocate 2-dimensional array in 2 steps.
grid = new boolean[n][];
for (var i = 0; i < n; i++) {
    grid[i] = new boolean[n];
}

// The loop counters that live across multiple mapStep invocations.
var i = 0, j = 0;

function mapStep() {
            var c = get(i*s+s/2, j*s+s/2);
            if (brightness(c) > 200) {
                grid[i][j] = 999;
                if (showMap) {
                    fill(255, 255, 255);
                    rect(s*i, s*j, s/2, s/2);
                }
            }
            if (red(c) > 100 && green(c) < 100) {
                sx = i;
                sy = j;
                if (showMap) {
                    fill(200, 0, 0);
                    rect(s*i, s*j, s/2, s/2);
                }
            } else if (green(c) > 100 & red(c) < 100) {
                gx = i;
                gy = j;
                if (showMap) {
                    fill(0, 200, 0);
                    rect(s*i, s*j, s/2, s/2);
                }
            }
     j++;
     if (j >= n) {
         j = 0;
         i++;
         if (i >= n) {
             noLoop();
         }
     }
}


var next = 0;
var step = 50;

function draw() {
    if (showMap) {
        while (millis() <= next) return;
        next = millis() + step;
    }
    mapStep();
}
```

[3. 最短の道][LabyrinthSearch]

# 3. 最短の道 {#ref-LabyrinthSearch}

[前に戻る][LabyrinthMapper]

このプログラムは幅優先探索を使って最短の道を探しています。

```example
var imgLabyrinth = getImage("cc0/Labyrinth3a.png");
var imgWalker = getImage("cc0/Walker44.png");

// Step in pixels.
var s = 17;
// Size of the grid.
var n = 360/s;
// The grid. 0 means the cell is blocked. >0 means the cell is open.
var grid[][];

var showMap = true;

// The starting point;
var sx = 0, sy = 0;
// The goal.
var gx = 0, gy = 0;

function CreateMap() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var c = get(i*s+s/2, j*s+s/2);
            if (brightness(c) > 200) {
                grid[i][j] = 999;
            }
            if (red(c) > 100 && green(c) < 100) {
                sx = i;
                sy = j;

            } else if (green(c) > 100 & red(c) < 100) {
                gx = i;
                gy = j;

            }
        }
    }
    // Show the starting point.
    fill(200, 0, 0);
    rect(s*sx, s*sy, s/2, s/2);
    // Show the goal.
    fill(0, 200, 0);
    rect(s*i, s*j, s/2, s/2);
}

// Fixed queue length for simplicity. The expected maximum queue size is
// the the size of the grid, so should be well below 500.
var queueLength = 500;
var qx[] = new int[queueLength];
var qy[] = new int[queueLength];
var qhead = 0;
var qtail = 0;

function queuePush(x, y) {
    qx[qtail] = x;
    qy[qtail] = y;
    qtail = (qtail+1) % queueLength;
    // Note: in case of queue overflow, the queue contents will be lost
    // (misinterpreted as empty queue).
}

function queuePop() {
    if (qtail != qhead) {
        qhead = (qhead+1) % queueLength;
    }
}

var queueEmpty() {
    return qtail == qhead;
}

function visitCell(x, y, distance) {
    // Out of bounds checks.
    if (x < 0 || x >= n) return;
    if (y < 0 || y >= n) return;
    // Wall check.
    if (grid[x][y] == 0) return;
    // Distance check. If we find a shorter distance,
    // record it and return true. Note that all empty cells
    // originally have 999 recorded.
    if (grid[x][y] > distance) {
        // Record the distance as shortest.
        grid[x][y] = distance;
        // Push the cell into the queue for further examination.
        queuePush(x, y);
        if (showMap) {
            fill(0, 0, 0);
        }
    }
}

function StartSearch() {
    // Using Breadth-first search in rectangular grid.
    // Put the goal position into the queue and search back towards
    // the start position.
    queuePush(gx, gy);
    grid[gx][gy] = 1;
}

// canvas size (Variable aren't evaluated. Integers only, please.)
size(360, 360, "2D");

// Display the background (labyrinth).
image(imgLabyrinth, 1, 1, 360, 360);

// Allocate 2-dimensional array in 2 steps.
grid = new boolean[n][];
for (var i = 0; i < n; i++) {
    grid[i] = new boolean[n];
}

CreateMap();
StartSearch();

var next = 0;
var step = 250;
var found = false;

// The position during backtracing.
var bx, by;

function searchStep() {
    // While queue is not empty. Loop is implicit around draw().
    if (!queueEmpty()) {
        var x = qx[qhead];
        var y = qy[qhead];
        queuePop();

        fill(200, 200, 180);
        rect(s*x, s*y, s/2, s/2);
        var distance = grid[x][y];
        fill(0,0,0);
        text("" + distance, x*s, y*s);

        if (x == sx && y == sy) {
            exit();
            return;
        }
        // Go and try 4 neighbors.
        visitCell(x+1, y, distance+1);
        visitCell(x-1, y, distance+1);
        visitCell(x, y-1, distance+1);
        visitCell(x, y+1, distance+1);

    } else {
        // path not found.
        noLoop();
    }
}

function draw() {
    if (showMap) {
        while (millis() <= next) return;
        next = millis() + step;
    }

    searchStep();
}
```

[4. 道の作り直し][LabyrinthBacktrace]

# 4. 道の作り直し {#ref-LabyrinthBacktrace}

[前に戻る][LabyrinthSearch]

このプログラムは最短のルートを見つけてから後ろから道を作り直します。

```example
var imgLabyrinth = getImage("cc0/Labyrinth3a.png");
var imgWalker = getImage("cc0/Walker44.png");

// Step in pixels.
var s = 17;
// Size of the grid.
var n = 360/s;
// The grid. 0 means the cell is blocked. >0 means the cell is open.
var grid[][];

var showMap = true;

// The starting point;
var sx = 0, sy = 0;
// The goal.
var gx = 0, gy = 0;

function CreateMap() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var c = get(i*s+s/2, j*s+s/2);
            if (brightness(c) > 200) {
                grid[i][j] = 999;
            }
            if (red(c) > 100 && green(c) < 100) {
                sx = i;
                sy = j;
            } else if (green(c) > 100 & red(c) < 100) {
                gx = i;
                gy = j;
            }
        }
    }
}

// Fixed queue length for simplicity. The expected maximum queue size is
// the the size of the grid, so should be well below 500.
var queueLength = 500;
var qx[] = new int[queueLength];
var qy[] = new int[queueLength];
var qhead = 0;
var qtail = 0;

function queuePush(x, y) {
    qx[qtail] = x;
    qy[qtail] = y;
    qtail = (qtail+1) % queueLength;
    // Note: in case of queue overflow, the queue contents will be lost
    // (misinterpreted as empty queue).
}

function queuePop() {
    if (qtail != qhead) {
        qhead = (qhead+1) % queueLength;
    }
}

var queueEmpty() {
    return qtail == qhead;
}

function visitCell(x, y, distance) {
    // Out of bounds checks.
    if (x < 0 || x >= n) return;
    if (y < 0 || y >= n) return;
    // Wall check.
    if (grid[x][y] == 0) return;
    // Distance check. If we find a shorter distance,
    // record it and return true. Note that all empty cells
    // originally have 999 recorded.
    if (grid[x][y] > distance) {
        // Record the distance as shortest.
        grid[x][y] = distance;
        // Push the cell into the queue for further examination.
        queuePush(x, y);
        if (showMap) {
            fill(0, 0, 0);
            text("" + distance, x*s, y*s);
        }
    }
}

function StartSearch() {
    // Using Breadth-first search in rectangular grid.
    // Put the goal position into the queue and search back towards
    // the start position.
    queuePush(gx, gy);
    grid[gx][gy] = 1;
}

// canvas size (Variable aren't evaluated. Integers only, please.)
size(360, 360, "2D");

// Display the background (labyrinth).
image(imgLabyrinth, 1, 1, 360, 360);

// Allocate 2-dimensional array in 2 steps.
grid = new boolean[n][];
for (var i = 0; i < n; i++) {
    grid[i] = new boolean[n];
}

CreateMap();
StartSearch();

var next = 0;
var step = 250;
var found = false;

// The position during backtracing.
var bx, by;

function searchStep() {
    // While queue is not empty. Loop is implicit around draw().
    if (!queueEmpty()) {
        var x = qx[qhead];
        var y = qy[qhead];
        queuePop();

        fill(200, 200, 180);
        rect(s*x, s*y, s/2, s/2);
        var distance = grid[x][y];

        if (x == sx && y == sy) {
            found = true;
            fill(0,0,0);
            bx = sx;
            by = sy;
            return;
        }
        // Go and try 4 neighbors.
        visitCell(x+1, y, distance+1);
        visitCell(x-1, y, distance+1);
        visitCell(x, y-1, distance+1);
        visitCell(x, y+1, distance+1);

    } else {
        // path not found.
        noLoop();
    }
}

var backTrace(nx, ny, distance) {
    if (nx < 0 || nx >= n) return false;
    if (ny < 0 || ny >= n) return false;
    if (grid[nx][ny] != distance) return false;
    // Found the backtrace step.
    if (showMap) {
        stroke(255,0,0);
        line(bx+s/4, by+s/4, nx+s/4, ny+s/4);
    }
    bx = nx;
    by = ny;
    return true;
}

function backTraceStep() {
    fill(255, 255, 100);
    rect(bx*s+s/4, by*s+s/4, s/2, s/2);
    if (bx == gx && by == gy) {
        noLoop();
    }
    var distance = grid[bx][by];
    stroke(255, 255, 0);
    if (backTrace(bx-1, by, distance-1));
    else if (backTrace(bx+1, by, distance-1));
    else if (backTrace(bx, by-1, distance-1));
    else if (backTrace(bx, by+1, distance-1));
}

function draw() {
    if (found) {
        while (millis() <= next) return;
        next = millis() + step;
    }

    if (found) {
        backTraceStep();
    } else {
        searchStep();
    }
}
```

[5. 完成版][LabyrinthSolver]

# 5. 完成版 {#ref-LabyrinthSolver}

[前に戻る][LabyrinthBacktrace]

```example
var imgLabyrinth = getImage("cc0/Labyrinth2a.png");
var imgWalker = getImage("cc0/Walker44.png");

// Step in pixels.
var s = 17;
// Size of the grid.
var n = 360/s;
// The grid. 0 means the cell is blocked. >0 means the cell is open.
var grid[][];

var showMap = true;

// The starting point;
var sx = 0, sy = 0;
// The goal.
var gx = 0, gy = 0;

function CreateMap() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var c = get(i*s+s/2, j*s+s/2);
            if (brightness(c) > 200) {
                grid[i][j] = 999;
                if (showMap) {
                    fill(255, 255, 255);
                    rect(s*i, s*j, s/2, s/2);
                }
            }
            if (red(c) > 100 && green(c) < 100) {
                sx = i;
                sy = j;
                if (showMap) {
                    fill(200, 0, 0);
                    rect(s*i, s*j, s/2, s/2);
                }
            } else if (green(c) > 100 & red(c) < 100) {
                gx = i;
                gy = j;
                if (showMap) {
                    fill(0, 200, 0);
                    rect(s*i, s*j, s/2, s/2);
                }
            }
        }
    }
}

// Fixed queue length for simplicity. The expected maximum queue size is
// the the size of the grid, so should be well below 500.
var queueLength = 500;
var qx[] = new int[queueLength];
var qy[] = new int[queueLength];
var qhead = 0;
var qtail = 0;

function queuePush(var x, var y) {
    qx[qtail] = x;
    qy[qtail] = y;
    qtail = (qtail+1) % queueLength;
    // Note: in case of queue overflow, the queue contents will be lost
    // (misinterpreted as empty queue).
}

function queuePop() {
    if (qtail != qhead) {
        qhead = (qhead+1) % queueLength;
    }
}

var queueEmpty() {
    return qtail == qhead;
}

function visitCell(var x, var y, var distance) {
    // Out of bounds checks.
    if (x < 0 || x >= n) return;
    if (y < 0 || y >= n) return;
    // Wall check.
    if (grid[x][y] == 0) return;
    // Distance check. If we find a shorter distance,
    // record it and return true. Note that all empty cells
    // originally have 999 recorded.
    if (grid[x][y] > distance) {
        // Record the distance as shortest.
        grid[x][y] = distance;
        // Push the cell into the queue for further examination.
        queuePush(x, y);
        if (showMap) {
            fill(0, 0, 0);
            text("" + distance, x*s, y*s);
        }
    }
}

function StartSearch() {
    // Using Breadth-first search in rectangular grid.
    // Put the goal position into the queue and search back towards
    // the start position.
    queuePush(gx, gy);
    grid[gx][gy] = 1;
}

// canvas size (Variable aren't evaluated. Integers only, please.)
size(360, 360, "2D");

// Display the background (labyrinth).
image(imgLabyrinth, 1, 1, 360, 360);

// Allocate 2-dimensional array in 2 steps.
grid = new boolean[n][];
for (var i = 0; i < n; i++) {
    grid[i] = new boolean[n];
}

CreateMap();
StartSearch();

var next = 0;
var step = 10;
var found = false;

// The position during backtracing.
var bx, by;

function searchStep() {
    // While queue is not empty. Loop is implicit around draw().
    if (!queueEmpty()) {
        var x = qx[qhead];
        var y = qy[qhead];
        queuePop();

        fill(200, 200, 180);
        rect(s*x, s*y, s/2, s/2);
        var distance = grid[x][y];

        if (x == sx && y == sy) {
            found = true;
            fill(0,0,0);
            bx = sx;
            by = sy;
            return;
        }
        // Go and try 4 neighbors.
        visitCell(x+1, y, distance+1);
        visitCell(x-1, y, distance+1);
        visitCell(x, y-1, distance+1);
        visitCell(x, y+1, distance+1);

    } else {
        // path not found.
        noLoop();
    }
}

var backTrace(var nx, var ny, var distance) {
    if (nx < 0 || nx >= n) return false;
    if (ny < 0 || ny >= n) return false;
    if (grid[nx][ny] != distance) return false;
    // Found the backtrace step.
    if (showMap) {
        stroke(255,0,0);
        line(bx+s/4, by+s/4, nx+s/4, ny+s/4);
    }
    bx = nx;
    by = ny;
    return true;
}

function backTraceStep() {
    fill(255, 255, 100);
    rect(bx*s+s/4, by*s+s/4, s/2, s/2);
    if (bx == gx && by == gy) {
        noLoop();
    }
    var distance = grid[bx][by];
    stroke(255, 255, 0);
    if (backTrace(bx-1, by, distance-1));
    else if (backTrace(bx+1, by, distance-1));
    else if (backTrace(bx, by-1, distance-1));
    else if (backTrace(bx, by+1, distance-1));
}

function draw() {
    if (showMap) {
        while (millis() <= next) return;
        next = millis() + step;
    }

    if (found) {
        backTraceStep();
    } else {
        searchStep();
    }
}
```

# 配列 {#ref-Array}

`Array`は配列といい、データのリストを持っている。複数のデータを保存するとき、 番号を使って取り出せるのだ。

```prerender
var x = [1, 2, 3];  // 配列をつくる
fill(0); text(x[0], 10, 20);
text(x[2], 10, 40);
var y[] = Array(10); // 別の配列を作る
text(y[0], 10, 80);  // 最初は０が入っています。
```

# HALF_PI

`HALF_PI`は円周率の半分である。 `1.5707963267948966`.

```prerender
arc(50, 50, 45, 45, 0, HALF_PI);
```

関連項目: [PI], [QUARTER_PI], [TWO_PI].

# QUARTER_PI

`QUARTER_PI`は円周率の4分の1である。 `0.7853981633974483`.

```prerender
arc(50, 50, 45, 45, 0, QUARTER_PI, HALF_PI);
```

関連項目: [PI], [HALF_PI], [TWO_PI].

# PI

`PI`は円周率である。`3.141592653589793`.

```prerender
size(150, 150, "2D");
var ps = 0;
for (var x = 1; x < 150; x += 1) {
  var s = sin(x/150*2*PI);
  line(x-1, 50+40*ps, x, 50+40*s);
  ps = s;
}
```

関連項目: [HALF_PI], [QUARTER_PI], [TWO_PI].

# TWO_PI

`TWO_PI`は円周率の二倍である。`6.283185307179586`.

```prerender
arc(50, 50, 45, 45, HALF_PI, TWO_PI);
```

関連項目: [PI], [HALF_PI], [QUARTER_PI].

# get

`get()`は複数の意味持っている。

*   画像の場合は、ピクセルデータを読み込みます。

```prerender
// GetExample
var img = getImage("cc0/Walker44.png");
image(img, 28, 28);

// 画像データを抽出する。
var frag = get(50, 50, 22, 22);
// 画像データ写す
image(frag, 72, 72, 28, 28);

function mouseMoved() {
    // ピクセルの色を抽出する。
    var c = get(mouseX, mouseY);
    // 抽出された色で長方形を描く。
    fill(c);
    rect(72, 0, 28, 28);
}
```

# put

`put`は複数の意味を持っている。

*   [HashMap]の場合、キーに対して与えられた値を保存する。

# entrySet

[HashMap]の場合、キーと値の組のセットを返す。そのセットはイテレータによって全ての組を取り出せる。

```prerender
size(90, 200, "2D"); fill(0);
HashMap hm = new HashMap();
hm.put(1, "one");
hm.put(12, "one two");
hm.put(123, "one two three");
for (it = hm.entrySet().iterator(); it.hasNext(); ) {
  Map.Entry en = it.next();
  var y = en.getKey();
  text("" + en.getKey() + ": " + en.getValue(), 1, y+10);
}
```

関連項目: [iterator].

# iterator

`iterator`は[entrySet]などのデート構造から全ての値の組を取り出せる。

関連項目: [entrySet], [getKey], [getValue].

# getKey

[iterator]の場合、キーを返す。

# getValue

[iterator]の場合、値を返す。

# next

[iterator]の場合、次の組に進む命令する。

# hasNext

[iterator]の場合、次の組が存在するかどうか判別する。

# 変数 {#ref-Variable}

変数はプログラムの中に様々なデートを覚える仕組みである。

```prerender
var nenrei = 12;
var namae = "たろう";
fill(0); textSize(12);
text(namae + nenrei + "才", 20, 20);
```

# オブジェクト {#ref-Object}

`Object`は関連するデータを束ね、複雑のデータ構造を表現できる。[変数][Variable]に`Object`の型を付けられたら、

```prerender
var arr = [1, "abc"];
for (var i = 0; i < arr.length; i++) {
  fill(0); text(str(arr[i]), 10, 20+i*20);
}
```

# String

`String`は文字列の型を表し、言葉を覚える変数を作る。

```prerender
var namae = "たろう";
fill(0); text(namae, 20, 20);
```

# PFont

`PFont`はフォントのデートを保存できる。

関連項目: [loadFont()].

# loadFont

`loadFont`は書体データ(フォント)を読み込みする。

```prerender
// TextFontExample
fill(0);
textFont(loadFont("Courier New", null), 12);
text("Courier New", 10, 20);
textFont(loadFont("Verdana", null), 15);
text("Verdana", 10, 40);
textFont(loadFont("Arial", null), 15);
text("Arial", 10, 60);
```

関連項目: [textFont()], [textSize()], [text()].

# textFont

`textFont()`は以降の `text()` で使われるフォントを設定します。

```prerender
// TextFontExample
fill(0);
textFont(loadFont("Courier New", null), 12);
text("Courier New", 10, 20);
textFont(loadFont("Verdana", null), 15);
text("Verdana", 10, 40);
textFont(loadFont("Arial", null), 15);
text("Arial", 10, 60);
```

関連項目: [text()], [loadFont()], [textSize()].

# color

`color`は色を表す値を作ります。R (赤)・G (緑)・B (青)それぞれを0から255までの３個の数値で指定して色を作り、その色をいろいろな API で使うことができます。

```prerender
// ColorExample
var redColor = color(255, 0, 0);
var blueColor = color(0, 0, 255);
fill(redColor);
stroke(blueColor); strokeWeight(10);
rect(10, 10, 80, 80);
```

１つだけ数値を指定して、グレースケールで色を作ることもできます。0は黒、255は白、その中間は数値に応じた灰色を意味します。

関連項目: [fill()], [background()], [red()], [green()], [blue()], [hue()], [saturation()], [brightness()]

# abs

`abs`は与えられた数の絶対値を返します。

```prerender
// AbsExample
size(200, 100, "2D"); fill(0); textSize(30);
var x = -10;
text('x = ' + x, 10, 30);
text('abs(x) = ' + abs(x), 10, 60);
```

# alpha

`alpha`は色から透明度を抽出する。

```prerender
var opaque = color(255, 0, 0);
var transparent = color(255, 0, 0, 10);
fill(0); text(alpha(opaque), 10, 20); // 255
text(alpha(transparent), 20, 40); // 10
fill(opaque);
ellipse(50, 50, 20, 20);
fill(transparent);
rect(10, 10, 40, 40);
```

# append

`append()`は配列にもう一つの要素分を追加する。

```prerender
String[] namae = {"たろう", "花子"};
append(namae, "次郎");
fill(0); textSize(20);
for (var i = 0; i < namae.length; i++) {
  text(namae[i], 10, 30+i*20);
}
```

# concat

`concat()`は２つの配列を結合する。

# arc

`arc`は円弧を描きます。

```prerender
// ArcExample
arc(50, 50, 40, 20, 90, 360);
```

呼び方: 
```
arc(x, y, width, height, start, stop);
```

* `x`, `y` --— 楕円の中心の座標
* `width`, `height` --- 楕円の横幅と縦幅
* `start`, `stop` --- 弧を描き始める角度と終わりの角度

関連項目: [ellipse()].

# point

`point`は点を描きます。

```prerender
// PointExample
strokeWeight(10);
point(50, 50);
```

呼び方:
```
point(x,y);
```

*   x, y --- 点の座標。

関連項目: [strokeWeight()], [stroke()], [line()].

# break

ループ([while], [for], [do])や[switch]から脱出する命令。

# continue

ループ([while], [for], [do])の実行を一旦止めて、ループの頭から実行再開する。

```prerender
var i = 0;
while (i < 10) {
  fill(0); text(str(i), 10, i*10);
  i++;
  if (i <= 10) {
    continue;
  }
  text("絶対実行しない", 50, 50);
}
```

# binary

`binary`は数を２進法(バイナリー)で表現する。返す値は文字列([String]).

```prerender
x = 1023; // Binary 1111111111.
fill(0); text(binary(x), 10, 20);
text(binary(x, 5), 10, 40);
```

呼び方: `binary(input, num_digits)`

*   `input` --- 二進法で表現する数
*   `num_digits` --- 最大返す数字の上限

# blue

`blue()`は色に対して青色の値を返す。

関連項目: [color], [red()], [green()], [alpha()].

# green

`green()`は色に対して緑色の値を返す。

関連項目: [color], [red()], [blue()], [alpha()].

# red

`red()`は色に対して赤色の値を返す。

関連項目: [color], [green()], [blue()], [alpha()].

# hue

`hue()`は色に対して色相を返す。

関連項目: [color], [saturation()], [brightness()].

# saturation

`saturation()`は色に対して彩度を返す。

関連項目: [color], [hue()], [brightness()].

# brightness

`brightness()`は色に対して明度を返す。

関連項目: [color], [saturation()], [hue()].

# ceil

`ceil()` は与えられた数に対してそれより大きい最も近い整数を返します。

```prerender
// CeilExample
size(200, 100, "2D"); fill(0); textSize(30);
var x = 9.3;
text('x = ' + x, 10, 30);
text('ceil(x) = ' + ceil(x), 10, 60);
```

関連項目: [floor()], [round()]

# floor

`floor()`は与えられた数に対してそれより小さいある最も近い整数を返します。

```prerender
// FloorExample
size(200, 100, "2D"); fill(0); textSize(30);
var x = 9.3;
text('x = ' + x, 10, 30);
text('floor(x) = ' + floor(x), 10, 60);
```

関連項目: [ceil()], [round()]

# round

`round()`は与えられた数に対して最も近い整数を返します。

```prerender
// RoundExample
size(200, 100, "2D"); fill(0); textSize(30);
var x = 9.3;
text('x = ' + x, 10, 30);
text('round(x) = ' + round(x), 10, 60);
```

関連項目: [ceil()], [floor()]

# sin

`sin()`は与えられた角度のサインを計算します。

```prerender
// SinExample
size(200, 100, "2D"); fill(0); textSize(30);
var x = 30;
text('x = ' + x, 10, 30);
text('sin(x) = ' + sin(x), 10, 60);
```

関連項目: [cos()], [tan()]

# cos

`cos()`は与えられた角度のコサインを計算します。

```prerender
// CosExample
size(200, 100, "2D"); fill(0); textSize(30);
var x = 60;
text('x = ' + x, 10, 30);
text('cos(x) = ' + cos(x), 10, 60);
```

関連項目: [sin()], [tan()]

# tan

`tan()`は与えられた角度のタンジェントを計算します。

```prerender
// Tanxample
size(200, 100, "2D"); fill(0); textSize(30);
var x = 45;
text('x = ' + x, 10, 30);
text('tan(x) = ' + tan(x), 10, 60);
```

関連項目: [sin()], [cos()]

# dist


`dist()`は２つの点の間の距離を計算します。点はそれぞれ x, y 座標で指定します。

```
dist(x1, y1, x2, y2);
```

マウスが (50, 50) の点からどれくらい離れているかを表示する例は以下のようになります。

```prerender
// DistExample
var x1 = 50, y1 = 50;
function draw() {
  background(255); fill(0);
  var x2 = mouseX, y2 = mouseY;
  line(x1, y1, x2, y2);
  text(dist(x1, y1, x2, y2), 50, 50);
}
```

# cursor

`cursor()`はマウスのカーソルの形を指定する。

```prerender
// CursorExample
frameRate(2);
// マウスのカーソルをキャンバス内に置きましょう。
var i = 0;
function draw() {
  i++;
  switch(i%6) {
    case 0: cursor(HAND); break;
    case 1: cursor(CROSS); break;
    case 2: cursor(ARROW); break;
    case 3: cursor(MOVE); break;
    case 4: cursor(TEXT); break;
    case 5: cursor(WAIT); break;
  }
}
```

関連項目: [ARROW], [CROSS], [HAND], [MOVE], [TEXT], [WAIT].

# ARROW

マウスカーソルの矢印の形を表す。

関連項目: [cursor()].

# CROSS

マウスカーソルの十字の形を表す。

関連項目: [cursor()].

# HAND

マウスカーソルの手の形を表す。

関連項目: [cursor()].

# MOVE

マウスカーソルの移動矢印の形を表す。

関連項目: [cursor()].

# TEXT

マウスカーソルの縦線の形を表す。

関連項目: [cursor()].

# WAIT

マウスカーソルの砂時計の形を表す。

関連項目: [cursor()].

# exit

`exit()`はスケッチの実行を終了する。

# key

最後に押されたキーの文字または記号を文字列として保存している変数。 矢印などの文字ではないキーの判断には `keyCode` を使います。

```prerender
// KeyCodeExample
size(200, 100, "2D");
fill(0);
textSize(15);

function draw() {
  background(220);
  text("key " + key, 10, 60);
  text("keyCode " + keyCode, 10, 90);
}
```

関連項目: [keyReleased()], [keyTyped()], [key], [keyCode], [keyCodes].

# keyCode

最後に押されたキーのコード。通常イベント関数で使います。 コードの一覧は[keyCodes]を参照してください。

```example
// KeyCodeExample
size(200, 100, "2D");
fill(0);
textSize(15);

function draw() {
  background(220);
  text("key " + key, 10, 60);
  text("keyCode " + keyCode, 10, 90);
}
```

関連項目: [key], [keyPressed()], [keyReleased()], [keyTyped()], [keyCodes].

# keyIsPressed

Key が押されている場合は `true`, 離されている場合は `false` になります。

```prerender
// KeyIsPressedExample
size(200, 100, "2D");

function draw() {
  if (keyIsPressed) {
    background(60);
    fill(255);
  } else {
    background(220);
    fill(0);
  }
  text("keyIsPressed " + keyIsPressed, 10, 60);
}
```

関連項目: [key], [keyCode], [keyPressed()], [keyReleased()], [keyTyped()], [keyCodes].

# keyPressed

`keyPressed()`を定義すると、キーが押されたたびに呼ばれます。

```prerender
// KeyPressedExample
size(200, 100, "2D");
fill(0);
textSize(10);
background(220);

var y = 10;
function keyPressed() {
  text("keyPressed() key " + str(key) + " keyCode " + keyCode, 10, y);
  y += 10;
  if (y > height) {
    background(220);
    y = 10;
  }
}
```

関連項目: [keyReleased()], [keyTyped()], [key], [keyCode], [keyCodes], [keyIsPressed].

# keyTyped

`keyTyped()`を定義すると、キーボードの文字または数字や記号のキーが押されたときに呼ばれます。

```prerender
// KeyTypedExample
size(200, 100, "2D");
fill(0);
textSize(10);
background(220);

var y = 10;
function keyTyped() {
  text("keyTyped() key " + str(key) + " keyCode " + keyCode, 10, y);
  y += 10;
  if (y > height) {
    background(220);
    y = 10;
  }
}
```

関連項目: [keyPressed()], [keyReleased()], [key], [keyCode], [keyCodes].

# keyReleased

`keyReleased()`を定義すると、キーが離されるたびに呼ばれます。

```prerender
// KeyReleasedExample
size(200, 100, "2D");
fill(0);
textSize(10);
background(220);

var y = 10;
function keyReleased() {
  text("keyReleased() key " + str(key) + " keyCode " + keyCode, 10, y);
  y += 10;
  if (y > height) {
    background(220);
    y = 10;
  }
}
```

関連項目: [keyPressed()], [keyTyped()], [key], [keyCode], [keyCodes].

# keyCodes

以下のキーの条件を調べるときに先に`key == CODED`を確かめなければなりません。 [CODED]に参照。

*   矢印キー: [UP], [DOWN], [RIGHT], [LEFT].
*   [ALT], [CONTROL], [SHIFT].

**注意**: Processing.jsではブラウザの環境によって使えないキーコードがあります。 以下のスケッチで確認ください。

```example
// Keycodes
textSize(30);
textFont(loadFont("fixed", 15), 15);
fill(0);

function draw() {
  background(220);
  if (keyIsPressed) {
    text("keyPressed", 10, 30);
    var label;
    if (Math.floor(key) === CODED) {
      label = "keyCode " + str(keyCode) + " ";
      switch (keyCode) {
        case UP: label = label + "UP"; break;
        case DOWN: label = label + "DOWN"; break;
        case LEFT: label = label + "LEFT"; break;
        case RIGHT: label = label + "RIGHT"; break;
        case ESC: label = label + "ESC"; break;
        case ENTER: label = label + "ENTER"; break;
        case SHIFT: label = label + "SHIFT"; break;
        case ALT: label = label + "ALT"; break;
        case CONTROL: label = label + "CONTROL"; break;
        case RETURN: label = label + "RETURN"; break;
        case ENTER: label = label + "ENTER"; break;
        case DELETE: label = label + "DELETE"; break;
        case BACKSPACE: label = label + "BACKSPACE"; break;
      }
      text(label, 10, 100);
    } else {
      label = "key '" + str(key) + "'";
      text(label, 10, 100);
    }
    return;
  }
}
```

# UP

上の矢印キーのコード。一覧は[keyCodes]に参照。 `keyCode == UP`を調べる先に`key == CODED`を確かめなければなりません。

関連項目: [keyCode], [keyCodes].

# DOWN

下の矢印キーのコード。一覧は[keyCodes]に参照。 `keyCode == DOWN`を調べる先に`key == CODED`を確かめなければなりません。

関連項目: [keyCode], [keyCodes].

# ALT

「Alt」キーのコード。 `keyCode == ALT`を調べる先に`key == CODED`を確かめなければなりません。

関連項目: [keyCode], [keyCodes].

# CONTROL

「Ctrl」キーのコード。 `keyCode == CONTROL`を調べる先に`key == CODED`を確かめなければなりません。

関連項目: [keyCode], [keyCodes].

# SHIFT

「Shift」キーのコード。 `keyCode == SHIFT`を調べる先に`key == CODED`を確かめなければなりません。

関連項目: [keyCode], [keyCodes].

# BACKSPACE

「Backspace」キーのコード。

関連項目: [keyCode], [keyCodes].

# TAB

「Tab」キーのコード。

関連項目: [keyCode], [keyCodes].

# ENTER

「Enter」キーのコード。

関連項目: [keyCode], [keyCodes].

# RETURN

「Return」キーのコード。

関連項目: [keyCode], [keyCodes].

# ESC

「Esc」キーのコード。

関連項目: [keyCode], [keyCodes].

# DELETE

「Delete」キーのコード。

関連項目: [keyCode], [keyCodes].

# CODED

[keyCode]の値を調べるときに先`key == CODED`を確かめる必要なときがあります。 詳しく[keyCodes]に参照。

関連項目: [key], [keyCodes].

# getImage

`getImage()`は画像のデートを読み込んでいます。ないProcessing.jsでは
ファイルシステムにアクセスできないので、画像データはサーバからダウンロード されます。ダウンロードは時間かかる場合があるので、`@pjs
preload`の命令が 必要です。

```prerender
var walker = getImage("cc0/Walker44.png");
image(walker, 10, 10, 80, 80);
```

関連項目: [image()].

# PImage

画像の形。

関連項目: [getImage()], [image()].

# PAudio

音のデータ。

```prerender
var sound = getSound("cc0/explosion.ogg");

function mouseClicked() {
  sound.play();
}

function draw() {
  if (!sound.audio.paused) {
    background(50);
  } else {
    background(220);
  }
}
```

**注意**：標準のProcessing.jsに存在しない。

関連項目: [音のギャラリー][SoundGallery]

# getSound

音のデータをロードする。 [PAudio]に参照

**注意**：標準のProcessing.jsに存在しない。

# imageMode

`imageMode()`は画像の移す位置を設定します。

*   `imageMode(CENTER)`は画像を写すときに中心点を使う設定します。
*   `imageMode(CORNER)`は画像を写すときに左上の角を使う設定します。
*   `imageMode(CORNERS)`は画像の左上と右下の角を使う設定します。

```prerender
// SpriteExample
var img = getImage("cc0/baloon1-170x200.png");
imageMode(CORNERS);
image(img, 50, 50, 85, 100);
```

```prerender
// SpriteExample
var img = getImage("cc0/baloon1-170x200.png");
imageMode(CORNER);
image(img, 50, 50, 85, 100);
```

```prerender
// SpriteExample
var img = getImage("cc0/baloon1-170x200.png");
imageMode(CENTER);
image(img, 50, 50, 85, 100);
```

# image

`image()`は画像データをキャンバスにスタンプのように表示します。

呼び方:
```
image(img, x, y, width, height);
```

* x, y — 画像を表示する座標。
  * imageModeでCENTERを指定した場合、画像の中心の座標。
  * imageModeでCORNERまたはCORNERSを指定した場合、画像の左上の角の座標。
* width, height — 画像の横幅と高さ。
  * imageModeでCORNERSを指定の場合は横幅と高さではなく、右下の角の座標として扱われます。

```prerender
// ImageExample
imageMode(CENTER);
image(getImage("cc0/banana-200x113"), 50, 50, 100, 67);
```

関連項目: [getImage()], [imageMode()].

