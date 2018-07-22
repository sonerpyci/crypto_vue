<template>
  <div class="hero-foot">
    <footer class="footer">
      <div class="mobile-footer">
        <div class="made-by" :class="{'hide': isOpenedInIFrame}">Made by <a href="#" target="_blank"> </a> | <icon name="calendar" height="12"></icon> 2018</div>
        <p class="wallet-tag">BTC <span>Not Yet</span></p>
        <p class="wallet-tag">ETH <span>Not Yet</span></p>
      </div>
      <div class="desktop-footer" :class="{'hide': isOpenedInIFrame}">
        <a href="#" target="_blank" class="button is-medium"><img :src="``" style=""/></a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'footerHero',
  props: {},
  data () {
    return {
      isOpenedInIFrame: false
    }
  },
  created () {
    if (window.self !== window.top) {
      this.isOpenedInIFrame = true
    }
  }
}
</script>

<style scoped lang="scss">
$small: 590px;
$medium: 768px;
$large: 1024px;

.footer {
  background-color: transparent;
  padding: 3rem 1.5rem 0rem;
  position: relative;

  @media screen and (max-width: $small) {
    padding-top: 60px;
  }

  .mobile-footer {
    display: none;
    font-size: 15px;
    font-weight: 400;
    position:absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    margin: 0 auto;

    a {
      color: #fd6721;
    }

    @media screen and (max-width: $small) {
      display: none;
    }

    .wallet-tag {
      font-size: 9px;
      font-weight: 600;

      span {
        color: #00d1b2;
      }
    }
  }

  .desktop-footer {
    display: none;
    .button {
      float: right;
      padding: 10px;
      margin-bottom: 10px;
    }

    @media screen and (max-width: $medium) {
      display: none;
    }
  }
}

.hide {
  display: none !important;
}
</style>
