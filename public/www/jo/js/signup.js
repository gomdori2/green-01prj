//  아이디 중복 확인
function checkUserID() {
    const useridInput = document.getElementById('userid');
    const username = useridInput.value;

    // AJAX를 사용하여 서버에 아이디 중복 확인 요청을 보냅니다.

    // 서버 응답에 따라 메시지를 표시합니다.
    const isDuplicate = false; // 서버 응답을 받아와서 중복 여부를 결정해야 합니다.
    const usingMessage = document.querySelector('.using-message');
    const availableMessage = document.querySelector('.available-message');

    if (isDuplicate) {
        usingMessage.style.display = 'block';
        availableMessage.style.display = 'none';
    } else {
        usingMessage.style.display = 'none';
        availableMessage.style.display = 'block';
    }
}

//  비밀번호 일치 확인
function checkUserPw() {
    const userPw = document.getElementById('password');
    const userPwConfirm = document.getElementById('confirm-password');
    const pwErrorMessage = document.querySelector('.pw-error-message');

    if (userPw.value !== userPwConfirm.value) {
        pwErrorMessage.style.display = 'block';
    } else {
        pwErrorMessage.style.display = 'none';
    }
}