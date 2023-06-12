const loginFrm = document.querySelector('.login-wrapper');

signinbtn.onclick = function () {
  window.open('signin.html', '_self');
}

findId.onclick = function () {
  alert("준비중~🎈")
}

loginFrm.onsubmit = (e) => {
  const jsonStr = localStorage.getItem('members');
  // console.log(jsonStr);
  const members = JSON.parse(jsonStr);

  const inputId = document.querySelector('#userId').value;
  const inputPw = document.querySelector('#pwd').value;

  // 아무것도 입력하지 않을 시 return
  if(inputId == "" && inputPw == ""){
    alert('정보를 입력해주세요.');
    return false;
  }
  
  // members 배열에 있는 member의 id와 pw를 비교하며 로그인 확인
  const resultBool = [...members].every(({userId, pwd}) => {
    // console.log(userId, pwd);
    
    if(inputId == userId && inputPw == pwd) {
      alert('로그인 성공🎇🎆🎇');
      return false;
    }
    return true;
  })

  // 로그인 실패 시
  if(resultBool) {
    alert('아이디 또는 비밀번호가 틀렸습니다.')
    document.querySelector('#userId').value = "";
    document.querySelector('#pwd').value = "";
    return false;
  }

};