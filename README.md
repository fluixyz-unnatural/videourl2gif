# video2gif

## デモ：https://ffmpeg-on-web.web.app/

ffmpeg.wasmを利用して動画からアニメーションGIFを作るアプリです。



## 使い方

1. OpenFileから変換したい動画を選ぶ
2. 各種設定をしてExportを押す



### 設定

#### 範囲選択

Set Start, Set Endのボタンを押すと、現在再生されている地点が始点、終点になります。

現在の選択範囲は動画下のタイムラインから確認できるようになっています。

タイムラインは、マウスホイールで左右にスライド、alt+ホイールで拡大縮小ができます。



#### crop

トリミングができます。cropを押すと、動画プレイヤー上で範囲選択ができるようになります。



#### FrameRate

fpsを設定できます。10くらいにしたほうがGIFっぽいカクカク感が出て好きです。



#### Width

出力するGIF画像の横幅を指定できます。小さくしたほうがGIFっぽい(ry 



## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
