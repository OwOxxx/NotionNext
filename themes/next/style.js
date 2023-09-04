/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`

    // 底色
    body{
        background-color: #eeedee
    }
    .dark body{
        background-color: black;
    }

    .article-padding {
      padding: 40px;
    }

    // 菜单下划线动画
    #theme-next .menu-link {
      text-decoration: none;
      background-image: linear-gradient(#4e80ee, #4e80ee);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 0 2px;
      transition: background-size 100ms ease-in-out;
    }
    #theme-next .menu-link:hover {
      background-size: 100% 2px;
      color: #4e80ee;
    }

    /* 整个滚动条 */
    ::-webkit-scrollbar {
        /* 对应纵向滚动条的宽度 */
        width: 6px;
        /* 对应横向滚动条的宽度 */
        height: 6px;
    }

    /* 滚动条上的滚动滑块 */
    ::-webkit-scrollbar-thumb {
        background-color: #acadb3;
        border-radius: 32px;
    }

    /* 滚动条轨道 */
    ::-webkit-scrollbar-track {
        background-color: #f7f9fe;
        border-radius: 32px;
    }

  `}</style>
}

export { Style }
