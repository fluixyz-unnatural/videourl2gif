<template>
  <div>
    <h4>Scroller</h4>
    <Scroller />
    <h4>YoutubePlayer</h4>
    <YoutubePlayer />
    <h4>ToggleButton</h4>
    <ToggleButton />
    <h4>Ffmpeg</h4>
    <Ffmpeg
      src="https://r6---sn-oguesnz7.googlevideo.com/videoplayback?expire=1615013719&ei=99JCYK2MD4j04gKKx6LICA&ip=217.178.28.118&id=o-AMlLRW5m3nUl1MJLBe9Zuno39ijmWy4Cbi0CTCBPpPbs&itag=299&aitags=133%2C134%2C135%2C136%2C160%2C242%2C243%2C244%2C247%2C278%2C298%2C299%2C302%2C303&source=youtube&requiressl=yes&mh=g2&mm=31%2C26&mn=sn-oguesnz7%2Csn-npoe7n7z&ms=au%2Conr&mv=m&mvi=6&pl=18&initcwndbps=2115000&vprv=1&mime=video%2Fmp4&ns=1gocJM3JuuuqbaVQ8raEiRgF&gir=yes&clen=6338078659&dur=12438.000&lmt=1614966367055391&mt=1614991957&fvip=6&keepalive=yes&fexp=24007246&c=WEB&txp=7316222&n=XIUOa2exKoyHPYUmx0&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgT4iQm6Pbo6Y8ZBvj0l571V4C7WSJWcjh9LbuGN-AjFoCIQCNhlkJ5hRjHIDvWJSkuK3GOHZXijSAC9Zt-jXvFjsu_w%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIga6KxI4w2d_4sJOe2S8YUiBs7r160QVO1OtUs1tQRPh0CIDX2ygPg3jWRafc40Nw5yuNNpPe4SKBIe-NFbfXRhjp1&ratebypass=yes"
    />
    <h4>LocalFilePlayer</h4>
    <LocalFilePlayer />
    <h4>Uploader</h4>
    <Uploader />
    <h4>Rectangle</h4>
    <Rectangle
      canvasWidth="640"
      canvasHeight="480"
      x1="320"
      x2="120"
      y1="0"
      y2="50"
    />
    <h4>Button</h4>
    <Button label="Sample" />
    <h4>TextBox</h4>
    <TextBox />
    <h4>VideoPlayer</h4>
    <VideoPlayer videoSrc="/7seg.mp4" />
    <h4>DrawRect</h4>
    <DrawRect />
  </div>
  <br /><br /><br /><br /><br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Uploader from "@/components/Uploader.vue";
import Rectangle from "@/components/Rectangle.vue";
import Button from "@/components/Button.vue";
import TextBox from "@/components/TextBox.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import LocalFilePlayer from "@/components/LocalFilePlayer.vue";
import DrawRect from "@/components/DrawRect.vue";
import Ffmpeg from "@/components/Ffmpeg.vue";
import ToggleButton from "@/components/ToggleButton.vue";
import YoutubePlayer from "@/components/YoutubePlayer.vue";
import Scroller from "@/components/Scroller.vue";

export default defineComponent({
  name: "Home",
  components: {
    Uploader,
    Rectangle,
    Button,
    TextBox,
    VideoPlayer,
    LocalFilePlayer,
    DrawRect,
    Ffmpeg,
    ToggleButton,
    YoutubePlayer,
    Scroller,
  },
});
</script>

<style scoped>
br {
  padding: 100px;
}
h4 {
  padding: 50px 0px 0px 0px;
  font-size: 24px;
  font-weight: bold;
}
</style>
