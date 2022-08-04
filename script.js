$(document).ready(function() {

    const burger = document.querySelector('.burger')
    const navLinks = document.querySelector('ul.nav-links')
    const nav = document.querySelector('.nav')
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        $('body').toggleClass('overflow-hidden');
    })

    window.addEventListener('scroll', function() {
        if (document.documentElement.scrollTop > 200) {
            nav.classList.add('active')
        } else {
            nav.classList.remove('active')
        }
    })

    $('a').on('click', function(e) {
        if (this.hash != '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({ scrollTop: $(hash).offset().top }, 800);
            $('ul.nav-links').removeClass('active');
            $('body').removeClass('overflow-hidden');
        }
    })

    const moreBtns = document.querySelectorAll('.more')

    moreBtns.forEach((more) => {
        more.addEventListener('click', function() {
            let id = this.getAttribute('data-id')
            let carousel = document.getElementById(id)
            let backdrop = document.querySelector('.backdrop')
            let imgs = carousel.querySelector('#imgs')
            let close = carousel.querySelector('#close')
            let leftBtn = carousel.querySelector('#left')
            let rightBtn = carousel.querySelector('#right')

            let img = carousel.querySelectorAll('#imgs img')

            let idx = 0
            let interval = setInterval(run, 5000)

            carousel.classList.add('show')
            backdrop.classList.add('show')

            close.addEventListener('click', () => {
                carousel.classList.remove('show')
                backdrop.classList.remove('show')
                clearInterval(interval)
            })

            rightBtn.addEventListener('click', () => {
                idx++
                changeImage()
                resetInterval()
            })

            leftBtn.addEventListener('click', () => {
                idx--
                changeImage()
                resetInterval()
            })

            function run() {
                idx++
                changeImage()
            }

            function changeImage() {
                if (idx > img.length - 1) {
                    idx = 0
                } else if (idx < 0) {
                    idx = img.length - 1
                }

                imgs.style.transform = `translateX(${-idx * carousel.offsetWidth}px)`
            }

            function resetInterval() {
                clearInterval(interval)
                interval = setInterval(run, 5000)
            }
        })
    })

    // lazy load image

    lazyload();
    window.addEventListener('scroll', throttle(lazyload, 200));

    function lazyload() {
        let viewHeight = document.body.clientHeight //獲取可視區高度
        let imgs = document.querySelectorAll('img[data-src]')
        imgs.forEach((item, index) => {
            if (item.dataset.src === '') return

            // 用於獲得頁面中某個元素的左，上，右和下分別相對瀏覽器視窗的位置
            let rect = item.getBoundingClientRect()
            if (rect.bottom >= 0 && rect.top < viewHeight) {
                item.src = item.dataset.src
                item.removeAttribute('data-src')
            }
        })
    }

    function throttle(fn, delay) {
        let timer
        let prevTime
        return function(...args) {
            const currTime = Date.now()
            const context = this
            if (!prevTime) prevTime = currTime
            clearTimeout(timer)

            if (currTime - prevTime > delay) {
                prevTime = currTime
                fn.apply(context, args)
                clearTimeout(timer)
                return
            }

            timer = setTimeout(function() {
                prevTime = Date.now()
                timer = null
                fn.apply(context, args)
            }, delay)
        }
    }
})