// alert('123')
const clicks = document.querySelectorAll(".click")
console.log(clicks)
const sections = document.querySelectorAll("section")
console.log(sections)
const firstTop = sections[0].offsetTop
const secondTop = sections[1].offsetTop
const thirdTop = sections[2].offsetTop
const fourthTop = sections[3].offsetTop

clicks[0].onclick = function () {
  window.scroll({ top: firstTop, behavior: 'smooth' })
}
clicks[1].onclick = function () {
  window.scroll({ top: secondTop, behavior: 'smooth' })
}
clicks[2].onclick = function () {
  window.scroll({ top: thirdTop, behavior: 'smooth' })
}
clicks[3].onclick = function () {
  window.scroll({ top: fourthTop, behavior: 'smooth' })
}
clicks[4].onclick = function () {
  window.open('login.html', '_self');
}

// 로드맵 js
const rm_li1 = document.querySelector('.rm-li1');
const rm_li2 = document.querySelector('.rm-li2');
const rm_li3 = document.querySelector('.rm-li3');

const rm_pdfs = document.querySelectorAll('.rm-pdf');
console.log(rm_pdfs);

console.log(rm_li1);
rm_li1.onclick = () => {
  rm_pdfs.forEach((pdf) => {
    pdf.style.display = 'none';
  })
  rm_pdfs[0].style.display = 'block';
}
rm_li2.onclick = () => {
  rm_pdfs.forEach((pdf) => {
    pdf.style.display = 'none';
  })
  rm_pdfs[1].style.display = 'block';
}
rm_li3.onclick = () => {
  rm_pdfs.forEach((pdf) => {
    pdf.style.display = 'none';
  })
  rm_pdfs[2].style.display = 'block';
}