$(document).ready(function () {
 
    const burger = document.querySelector('.burger')
    const navLinks = document.querySelector('ul.nav-links')
    const nav = document.querySelector('.nav')
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    })
  
    window.addEventListener('scroll', function () {
      if (document.documentElement.scrollTop > 200) {
        nav.classList.add('active')
      } else {
        nav.classList.remove('active')
      }
    })
  
    $('a').on('click', function (e) {
      if (this.hash != '') {
        e.preventDefault()
        const hash = this.hash
        $('html, body').animate({ scrollTop: $(hash).offset().top }, 800)
        $('ul.nav-links').removeClass('active')
      }
    })
  
    $('.goTop').on('click', function (e) {
      e.preventDefault()
      $('html, body').animate({ scrollTop: 0 }, 800)
    })
  
    const moreBtns = document.querySelectorAll('.more')
  
    moreBtns.forEach((more) => {
      more.addEventListener('click', function () {
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
  })