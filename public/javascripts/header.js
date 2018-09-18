//button
$(function(){
    $("#lib").on("mouseenter", function(){
      $(this).find("ul").show()
    })
    $("#lib ul").on("mouseleave", function(){
      $(this).hide()
    })
})
var HeaderComp = {
  props: [],
  data: function () {
    return {
      librarys: [
        {
          name: "智慧城市移动系统API",
          url: "/article/list_article.html"
        },
        {
          name: "招商数字金融系统API",
          url: "/article/list_article.html"
        }
      ]
    }
  },
  template: `<div class="header">
  <link rel="stylesheet" href="http://at.alicdn.com/t/font_753288_t6hpd2x006.css">
  <div class="logo"><img src="/images/logo.png"></div>
  <div class="menu">
  <a href="/admin">首页</a>
  <a href="javascript:;" class="dropdown-lib" id="lib">
    <span>文档<i class="iconfont icon-jiantou32"></i></span>
    <ul>
      <li v-on:click.prevent="linkto"  v-for="lib in librarys" :data-url="lib.url">
        <i class="iconfont icon-document"></i>{{lib.name}}
      </li>
    </ul>
  </a>
  <a href="#">目录</a>
  <a href="#">退出</a>
  </div>
  </div>
  `,
  created: function(){
    // 获取请求知识库列表
	},
  methods: {
    // 调整链接
    linkto: function(event){
      var ele = $(event.target)
      var url = ele.data("url")
      window.location.href = url
    },
  }

}
