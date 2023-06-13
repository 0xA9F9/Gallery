<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>#</title>
  <script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>

</head>
<body>
        <script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>

<script>
// CSS
const css = `
*,
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  max-width: 1200px;
  margin-inline: auto;
  padding: 1em;
  text-align: center;
  font-family: system-ui, sans-serif;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
}

.image {
    width: 200px;
    height: 200px;
    margin: 10px;
    background-size: cover;
    cursor: zoom-in;
}

.hashtag {
  margin: 5px;
  cursor: pointer;
  opacity: 0.7;
}

.hashtag:hover {
  opacity: 1;
}

#fullscreenImage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
}

#fullscreenImage img {
  max-width: 90%;
  max-height: 90%;
  cursor: zoom-out;
}

.fullscreen-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 2em;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  cursor: pointer;
}

.fullscreen-nav:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.nav-left {
  left: 2%;
}

.nav-right {
  right: 2%;
}
`;

// Usage
const styleElement = document.createElement('style');
styleElement.innerHTML = css;
document.head.appendChild(styleElement);

    </script>
  <div id="app" class="app">
    <div>
      <span class="hashtag" v-for="tag in hashtags" :key="tag" @click="filterImages(tag)">{{ tag }}</span>
    </div>
    <div class="gallery">
      <div class="image" v-for="(image, index) in filteredImages" :key="index" :style="{ backgroundImage: 'url(' + image.url + ')', opacity: 1 }" @click="openImage(index)"></div>
    </div>
    <div id="fullscreenImage" v-if="fullscreenImageUrl" @click="fullscreenImageUrl = null">
      <img :src="fullscreenImageUrl" />
      <span class="fullscreen-nav nav-left" @click.stop="previousImage">&#10094;</span>
      <span class="fullscreen-nav nav-right" @click.stop="nextImage">&#10095;</span>
    </div>
  </div>
    <script>
        new Vue({
      el: '#app',
      data: {
        images: [
          { url: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['природа'] },
          { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['природа'] },
          { url: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['природа'] },
          { url: 'https://plus.unsplash.com/premium_photo-1675448891127-cc038439b4d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['природа'] },
          { url: 'https://images.unsplash.com/photo-1614254631324-38204235dfa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['природа'] },
          { url: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['природа'] },
          { url: 'https://plus.unsplash.com/premium_photo-1675448891144-5ff404db0f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', tags: ['природа'] },
          // архитектура 
          { url: 'https://plus.unsplash.com/premium_photo-1669412515480-ab95d79d47b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['архитектура'] },
          { url: 'https://images.unsplash.com/photo-1617005533413-10a206121e1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80', tags: ['архитектура'] },
          { url: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['архитектура'] },
          { url: 'https://images.unsplash.com/photo-1495985812444-236d6a87bdd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['архитектура'] },
          { url: 'https://images.unsplash.com/photo-1448318440207-ef1893eb8ac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1185&q=80', tags: ['архитектура'] },
          { url: 'https://images.unsplash.com/photo-1544069350-2c7f634f29a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80', tags: ['архитектура'] },
          // животные
          { url: 'https://images.unsplash.com/photo-1648402279767-cf3e3721508e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80', tags: ['животные'] },
          { url: 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['животные'] },
          { url: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['животные'] },
          { url: 'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80', tags: ['животные'] },
          { url: 'https://images.unsplash.com/photo-1526308422422-6a57b9567eff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['животные'] },
          { url: 'https://images.unsplash.com/photo-1485735662814-c4f66e49dbae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['животные'] },
          { url: 'https://images.unsplash.com/photo-1539734710025-9ebbe24f22f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['животные'] },
          { url: 'https://images.unsplash.com/photo-1496368047060-2225dc0a96b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['животные'] },
          // еда
          { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['еда'] },
          { url: 'https://plus.unsplash.com/premium_photo-1663852297801-d277b7af6594?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['еда'] },
          { url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['еда'] },
          { url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80', tags: ['еда'] },
          { url: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['еда'] },
          { url: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['еда'] },
          { url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['еда'] },
          //путешествия
          { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80', tags: ['путешествия'] },
          { url: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['путешествия'] },
          { url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['путешествия'] },
          { url: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', tags: ['путешествия'] } 
        ],
        currentTag: 'all',
        fullscreenImageUrl: null,
        fullscreenImageIndex: null
      },
      computed: {
        hashtags() {
          const tags = new Set();
          this.images.forEach(image => image.tags.forEach(tag => tags.add(tag)));
          return Array.from(tags);
        },
        filteredImages() {
          return this.currentTag === 'all' 
            ? this.images 
            : this.images.filter(image => image.tags.includes(this.currentTag));
        }
      },
      methods: {
        filterImages(tag) {
          this.currentTag = tag;
        },
        openImage(index) {
          this.fullscreenImageUrl = this.filteredImages[index].url;
          this.fullscreenImageIndex = index;
        },
        previousImage() {
          if (this.fullscreenImageIndex > 0) {
            this.fullscreenImageIndex--;
            this.fullscreenImageUrl = this.filteredImages[this.fullscreenImageIndex].url;
          }
        },
        nextImage() {
          if (this.fullscreenImageIndex < this.filteredImages.length - 1) {
            this.fullscreenImageIndex++;
            this.fullscreenImageUrl = this.filteredImages[this.fullscreenImageIndex].url;
          }
        }
      }
        });</script>

</body>
</html>
