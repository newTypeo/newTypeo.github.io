   // 비밀번호/비밀번호 체크 일치여부 검사
   document.querySelector("#pwdCheck").onblur = isEqualPwd; 

   /**
    * 제출방지
    * 1. event.preventDefault() - addEventListener, onsubmit
    * 2. return false - onsubmit
    */ 
   document.memberFrm.onsubmit = function () {
     const userId = document.getElementById("userId");
     const pwd = document.getElementById("pwd");
     const pwdCheck = document.getElementById("pwdCheck");
     const userName = document.getElementById("userName");
     const email = document.getElementById("email");
     const ssn1 = document.getElementById("ssn1");
     const ssn2 = document.getElementById("ssn2");
     const tel1 = document.getElementById("tel1");
     const tel2 = document.getElementById("tel2");
     const tel3 = document.getElementById("tel3");

     //1.아이디검사
     //첫글자는 반드시 영소문자로 이루어지고,
     //아이디의 길이는 4~12글자사이
     //숫자가 하나이상 포함되어야함.
     const regExp1 = /^[a-z][a-z\d]{3,11}$/;
     const regExp2 = /[0-9]/;
     if(!regExpTest(regExp1
                   ,userId
                   ,"아이디는 영소문자로 시작하는 4~12글자입니다."))
         return false; // submit핸들러 기본 작동(submit)을 방지
     if(!regExpTest(regExp2
                   ,userId
                   ,"아이디는 숫자를 하나이상 포함하세요."))
         return false;

     //2.비밀번호 확인 검사
     //숫자/문자/특수문자/ 포함 형태의 8~15자리 이내의 암호 정규식
     //전체길이검사 /^.{8,15}$/
     //숫자하나 반드시 포함 /\d/
     //영문자 반드시 포함 /[a-zA-Z]/
     //특수문자 반드시 포함  /[\\*!&]/

     const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\\*!&]/];

     for (let i = 0; i < regExpArr.length; i++) {
       if (
         !regExpTest(
           regExpArr[i],
           pwd,
           "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다."
         )
       ) {
         return false;
       }
     }

     //비밀번호일치여부
     if (!isEqualPwd()) {
       return false;
     }

     //3.이름검사
     //한글2글자 이상만 허용.
     const regExp3 = /^[가-힣]{2,}$/;
     if (!regExpTest(regExp3, userName, "한글2글자이상 입력하세요."))
       return false;

     //4.주민번호체크
     const regExp4 = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[01])$/;
     const regExp5 = /^[1234]\d{6}$/;
     if (!regExpTest(regExp4, ssn1, "숫자만 입력하세요.")) return false;
     if (!regExpTest(regExp5, ssn2, "숫자만 입력하세요.")) return false;

     if (!ssnCheck(ssn1.value, ssn2.value)) {
       alert("올바른 주민번호가 아닙니다.");
       return false;
     }

     //5.이메일 검사
     // 4글자 이상(\w = [a-zA-Z0-9_], [\w-\.]) @가 나오고
     // 1글자 이상(주소). 글자 가 1~3번 반복됨
     if (
       !regExpTest(
         /^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/,
         email,
         "이메일 형식에 어긋납니다."
       )
     )
       return false;

     //6. 전화번호 검사
     // 전화번호 앞자리는 두자리이상, 두번째 자리는 3~4자리 숫자, 세번째 자리는 4자리 숫자
       if (!regExpTest(/^0\d{1,2}$/, tel1, "번호 2자리 이상 입력")) 
       return false;
     if (!regExpTest(/^[0-9]{3,4}$/, tel2, "번호 3자리 이상 입력"))
       return false;
     if (!regExpTest(/^[0-9]{4}$/, tel3, "4자리 번호 입력"))
       return false;

     // web storage에 정보 저장
     const newMember = new Member(userId.value, pwd.value, userName.value, ssn1.value, ssn2.value, email.value, tel1.value, tel2.value, tel3.value, job.value)

     const members = JSON.parse(localStorage.getItem('members')) || [];
     members.push(newMember);
     const jsonStr = JSON.stringify(members);
     localStorage.setItem('members', jsonStr);
     
     // 초기화
     userId.value = "";
     pwd.value = "";
     userName.value = "";
     ssn1.value = "";
     ssn2.value = "";
     email.value = "";
     tel1.value = "";
     tel2.value = "";
     tel3.value = "";
     job.value = "";
    
     alert('회원가입 성공~!✨.');
     window.open('login.html', "_self");
     return true; // 생략가능
   };

   class Member {
    constructor(userId, pwd, userName, ssn1, ssn2, email, tel1, tel2, tel3, job, createdAt = Date.now()) {
      this.userId = userId;
      this.pwd = pwd;
      this.userName = userName;
      this.ssn = ssn1 + ssn2;
      this.email = email;
      this.tel = tel1 + tel2 + tel3;
      this.job = job;
      this.createdAt = createdAt;
    }
   }

   function ssnCheck(ssn1, ssn2) {
     const ssn = ssn1 + ssn2;

     let total = 0;
     for (let i = 0; i < 12; i++) {
       if (i < 8) {
         total += parseInt(ssn.substr(i, 1)) * (i + 2);
       } else {
         total += parseInt(ssn.substr(i, 1)) * (i - 6);
       }
     }
     //마지막수와 비교할 수 구하기
     const result = (11 - (total % 11)) % 10;
     //마지막수(13번째 자리)
     const num13 = parseInt(ssn.substr(12, 1));
     //결과
     if (result === num13) return true;
     else return false;
   }

   function isEqualPwd() {
     if (pwd.value === pwdCheck.value) {
       return true;
     } else {
       alert("비밀번호가 일치하지 않습니다.");
       pwd.select();
       return false;
     }
   }

   /**
    * regExp 정규식객체
    * el 검사할 태그객체 
    * msg 유효하지 않은 경우 노출할 사용자 피드백
    */
   function regExpTest(regExp, el, msg) {
     if (regExp.test(el.value)) return true;
     //적합한 문자열이 아닌 경우
     alert(msg);
     el.value = "";
     el.focus();
     return false;
   }

   document.querySelector('#backtologin').onclick = () => {
    window.open('login.html', '_self');
   }