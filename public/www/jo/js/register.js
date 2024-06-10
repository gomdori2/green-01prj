document.addEventListener('DOMContentLoaded', function(){
    const backButton = document.querySelector('.back-btn')
    // 뒤로가기 버튼 클릭시 로그인 페이지로 이동
    backButton.addEventListener('click', function(){
        window.location='http://127.0.0.1:5501/public/www/jo/login.html'
    })
    // 전송버튼 클릭시 메일에서 링크를 확인해달라는 메세지 뜸
    const sendButton = document.querySelector('.send-btn')
    const promptMessage = document.querySelector('.prompt')
    
    sendButton.addEventListener('click', function(){
        promptMessage.style.display='block'
    })
})