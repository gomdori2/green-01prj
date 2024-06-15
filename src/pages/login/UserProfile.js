import { useEffect, useState } from "react";
import "../login/userprofile.scss";
import { getUserNickName, patchUserProfile } from "../../apis/user/userapi";
const UserProfile = () => {
  const [newpassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newNickName, setNewNickName] = useState("");
  const [userSeq, setUserSeq] = useState("");

  useEffect(() => {
    // 세션에서 사용자 정보 불러오기
    const userSeq = sessionStorage.getItem("userSeq");
    console.log(userSeq);
    if (userSeq !== null) {
      setUserSeq(userSeq);
    }
  }, []);

  //  유저 정보 수정 시 처리할 함수
  const handleSubmit = e => {
    console.log(e.target.value);
    // 이벤트 기본 동작 방지
    e.preventDefault();

    // 비밀번호 형식 유효성 검사
    const passwordPattern =
      // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/;

    if (!passwordPattern.test(newpassword)) {
      alert(
        "비밀번호는 영어 및 숫자, 특수문자를 포함하며 8~20자 사이이어야 하며 영어와 숫자가 최소 1개씩 들어가야합니다.",
      );
      return;
    }
    if (newpassword !== newPasswordCheck) {
      alert("비밀번호가 서로 다릅니다. 다시 확인해주세요.");
      return;
    }
    newNickNameAvailable();
  };

  // 닉네임 중복 검사 함수
  const newNickNameAvailable = async () => {
    // 닉네임 형식 유효성 검사
    const NickNamePattern = /^[a-zA-Z가-힣]{2,10}$/;
    if (!NickNamePattern.test(newNickName)) {
      alert("닉네임은 2~10자 이내, 영어 및 한글, 숫자만 가능합니다.");
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

  //  프로필 정보 수정 함수
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

    // 정보 수정 처리 실행 후
  };

  return (
    <div className="userinfo-update">
      <h2>사용자 정보 수정</h2>
      <form
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        {/* <div className="form-group">
          <label htmlFor="seq">사용자 번호</label>
          <input type="text" name="seq"  />
        </div> */}
        <div className="form-group">
          <label htmlFor="password">새 비밀번호</label>
          <input
            type="password"
            name="password"
            value={newpassword}
            onChange={e => {
              console.log(e.target.value);
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            name="confirm-password"
            value={newPasswordCheck}
            onChange={e => {
              setNewPasswordCheck(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>닉네임</label>
          <input
            type="text"
            name="name"
            value={newNickName}
            onChange={e => {
              setNewNickName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="수정하기"
            className="modify-bt"
            onClick={() => {}}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
