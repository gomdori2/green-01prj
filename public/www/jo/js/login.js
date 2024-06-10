document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-wrap form');
    const loginIdInput = document.getElementById('login-id');
    const loginPwInput = document.getElementById('login-pw');
    const errorMessage = document.querySelector('.error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 기본 동작 중단

        const idValue = loginIdInput.value.trim();
        const pwValue = loginPwInput.value.trim();

        if (idValue === '' || pwValue === '') {
            // ID와 비밀번호 필드가 모두 입력되었는지 확인
            errorMessage.textContent = '아이디와 비밀번호를 모두 입력해주세요.';
            errorMessage.style.display = 'block';
            return; // 함수 종료
        }

        // 로그인 요청을 여기에 추가할 수 있습니다.
        // 여기서는 단순히 메시지를 표시하고 게시판 페이지로 이동하는 예시를 제공합니다.
        if (idValue === '올바른아이디' && pwValue === '올바른비밀번호') {
            // 로그인 성공
            window.location.href = '게시판페이지URL';
        } else {
            // 로그인 실패
            errorMessage.textContent = '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.';
            errorMessage.style.display = 'block';
        }
    });
    // 회원가입 버튼 클릭시 메일인증 페이지로 이동
    document.querySelector('.signup-btn').addEventListener('click', function(){
        window.location = 'http://127.0.0.1:5501/public/www/jo/register.html'
    })
});