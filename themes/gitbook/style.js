/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    
    // 底色
    .dark body{
        background-color: black;
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
