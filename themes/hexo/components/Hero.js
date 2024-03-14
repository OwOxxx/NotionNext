// import Image from 'next/image'
import { useEffect, useState } from 'react'
import Typed from 'typed.js'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'
import { useGlobal } from '@/lib/global'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'

let wrapperTop = 0

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }
  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      const typedInstance = new Typed('#typed', {
        strings: GREETING_WORDS,
        typeSpeed: 200,
        backSpeed: 100,
        backDelay: 400,
        showCursor: true,
        smartBackspace: true,
        onComplete: () => { // 打字机效果完成后的回调函数
          const typedElement = document.getElementById('typed');
          if (typedElement){
            if (!window.hitokotoFetched) { // 添加标记确保只触发一次一言的获取和替换
              window.hitokotoFetched = true; // 设置标记为true
              setTimeout(() => { // 等待2秒
                fetch('https://v1.hitokoto.cn/?c=d&c=h&c=i&c=j&c=k')
                  .then(response => response.json())
                  .then(data => {
                    
                    typedElement.classList.add('opacity-0', 'transition-opacity', 'duration-500'); // 开始淡出
                    setTimeout(() => {
                      // 更新文本并淡入显示
                      typedElement.innerHTML = `『 ${data.hitokoto}』—— ${data.from}`;
                      typedElement.classList.remove('opacity-0'); // 移除淡出效果
                      typedElement.classList.add('opacity-100'); // 确保文本完全不透明
                      window.hitokotoFetched = false; // 重置标记为false，以便下次可以触发一言的获取和替换
                    }, 500); // 根据淡出动画的持续时间来调整
                  })
                  .catch(error => {
                    console.error('Fetching Hitokoto failed:', error);
                    window.hitokotoFetched = false; // 如果获取一言失败，也要重置标记为false，以便下次可以触发一言的获取和替换
                  });
              }, 2000); // 设置2秒延迟
            }
          }
        }
      });
      changeType(typedInstance);
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
        <header
            id="header" style={{ zIndex: 1 }}
            className="w-full h-screen relative bg-black"
        >

            <div className="text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full ">
                {/* 站点标题 */}
                <div className='font-black text-4xl md:text-5xl shadow-text'>{siteConfig('TITLE')}</div>
                {/* 站点欢迎语 */}
                <div className='mt-2 h-12 items-center text-center font-medium shadow-text text-lg'>
                    <span id='typed' />
                </div>

                {/* 首页导航大按钮 */}
                {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && <NavButtonGroup {...props} />}

                {/* 滚动按钮 */}
                <div onClick={scrollToWrapper} className="z-10 cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 text-white">
                    <div className="opacity-70 animate-bounce text-xs">{siteConfig('HEXO_SHOW_START_READING', null, CONFIG) && locale.COMMON.START_READING}</div>
                    <i className='opacity-70 animate-bounce fas fa-angle-down' />
                </div>
            </div>

            <LazyImage id='header-cover' src={siteInfo?.pageCover}
                className={`header-cover w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`} />

        </header>
  )
}

export default Hero
