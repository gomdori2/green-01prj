import React, { useEffect, useState } from "react";
import "../login/userprofile.scss";
import { getUserNickName, patchUserProfile } from "../../apis/user/userapi";

const UserProfile = () => {
  // 유저 고유번호
  const [userSeq, setUserSeq] = useState("");

  // 비밀번호 설정
  const [newpassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [passwordPattern, setPasswordPattern] = useState(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/)
  const [passwordValid, setPasswordValid] = useState(true)
  const [passwordMatch, setPasswordMatch] = useState(true)

  // 닉네임 설정
  const [newNickName, setNewNickName] = useState("");
  const [nickNamePattern, setNickNamePattern] = useState(/^[a-zA-Z가-힣0-9]{2,10}$/)
  const [nickNameValid, setNickNameValid] = useState(true)

  useEffect(() => {
    // 세션에서 사용자 정보 불러오기
    const userSeq = sessionStorage.getItem("userSeq");
    if (userSeq !== null) {
      setUserSeq(userSeq);
    }
  }, []);

  // 유저 정보 수정 시 처리할 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 형식 유효성 검사
    if (!passwordPattern.test(newpassword)) {
      setPasswordValid(false)
      return;
    }
    // 비밀번호가 일치하지 않을 경우
    if(newpassword !== newPasswordCheck){
      setPasswordMatch(false)
      return;
    }
    // 비밀번호가 일치할 경우
    setPasswordMatch(true)
    setPasswordValid(true)
    newNickNameAvailable();
  };

  // 닉네임 중복 검사 함수
  const newNickNameAvailable = async () => {
    // 닉네임 형식 유효성 검사
    if (!nickNamePattern.test(newNickName)) {
      setNickNameValid(false)
      return;
    }

    // 백엔드에 전달할 닉네임
    const reqData = `/api/user/duplicated?str=${newNickName}&type=2`;
    const result = await getUserNickName(reqData);
    if (result.data.code === 1) {
      profileUpdateResultFunc();
    } else {
      alert("이미 사용중인 닉네임입니다.");
    }
  };

  // 프로필 정보 수정 함수
  const profileUpdateResultFunc = async () => {
    // 백엔드로 전달하는 수정된 유저 정보
    const profileUpdateReqData = {
      seq: userSeq,
      pw: newpassword,
      pwCheck: newPasswordCheck,
      name: newNickName,
    };

    // 수정된 유저 정보
    const profileUpdateResult = await patchUserProfile(profileUpdateReqData);
    console.log(profileUpdateResult);
    alert("수정이 완료되었습니다!")
  };

  return (
    <div className="userinfo-update">
      <h2>사용자 정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">새비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="8~20자 이내 영문, 숫자, 특수문자만 입력 가능, 영문과 숫자는 최소 1개씩 포함"
            value={newpassword}
            onChange={(e) => {
              setNewPassword(e.target.value);    
              // 비밀번호 정규식 패턴 검사
              setPasswordValid(passwordPattern.test(e.target.value))
              // 비밀번호 확인과 비교하여 일치 여부 업데이트
              setPasswordMatch(e.target.value === newPasswordCheck)         
            }}
          />
          {!passwordValid && (
            <p>비밀번호가 형식에 맞지 않습니다.</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            name="confirm-password"
            placeholder="비밀번호를 한번 더 입력해주세요."
            value={newPasswordCheck}
            onChange={(e) => {
              setNewPasswordCheck(e.target.value);
              // 입력이 변경될 때 마다 상태 업데이트
              setPasswordMatch(e.target.value === newpassword)
            }}
          />
          {newPasswordCheck && !passwordMatch && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
        <div className="form-group">
          <label>닉네임</label>
          <input
            type="text"
            name="name"
            placeholder="2~10자 이내 한글 및 영문, 숫자만 가능합니다."
            value={newNickName}
            onChange={(e) => {
              setNewNickName(e.target.value);
              setNickNameValid(nickNamePattern.test(e.target.value))
            }}
          />
          {!nickNameValid && (
            <p>닉네임이 형식에 맞지 않습니다.</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="수정하기"
            className="modify-bt"
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
