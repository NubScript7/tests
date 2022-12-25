import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase,set,get,child,ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const txt = document.querySelector('.comm');
let firebaseConfig;
let mssg = ""
let prom = ''
let usr = localStorage.getItem("user");
if (isNaN(usr)||usr==null) {
	let a = `${Math.random()}`
	usr = a.slice(2, a.length)
	localStorage.setItem("user", usr)
}
await fetch("https://nubscript7.github.io/json-placeholder/firebase/config.json")
.then(res=>res.json())
.then(json=>firebaseConfig=json)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
setInterval(()=>{
get(child(ref(db),"dbCon/htmlContent/value"))
.then(msg=>{
  const alertz = /\$!/
  const promptz = /\$\?/
  if(alertz.test(msg.val())&&mssg!='stop*'){
  mssg = `${msg.val()}`.slice(2,`${msg.val()}`.length)
  alert(mssg)
  mssg = "stop*"
  }else if(promptz.test(msg.val())&&mssg!='stop*'){
  mssg = `${msg.val()}`.slice(2,`${msg.val()}`.length)
  prom=prompt(mssg)
  while(prom==undefined||prom==null||prom==''){
  	prom=prompt(mssg)
  }
  set(ref(db,`dbCon/htmlContent/usrs/${usr}`),{prmpt: prom})
  mssg = "stop*"
  }else if(mssg=='stop*'){
  	let a = `${msg.val()}`.slice(2,`${msg.val()}`.length)
  	txt.innerHTML = a
  }
  else{
  txt.innerHTML = msg.val()
  }
})
.catch(error=>txt.textContent=error)
},500)
