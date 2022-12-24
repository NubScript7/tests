import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase,get,child,ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const txt = document.querySelector('.comm');
let firebaseConfig;
await fetch("https://nubscript7.github.io/json-placeholder/firebase/config.json")
.then(res=>res.json())
.then(json=>firebaseConfig=json)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
setInterval(()=>{
get(child(ref(db),"dbCon/htmlContent/value"))
.then(msg=>{
  let conf = /\$!/
  if(conf.test(msg.val())){
  let mssg = `${msg.val()}`.slice(2,`${msg.val()}`.length)
  alert(mssg)
  msg.val() = "..."
  }else{
  txt.innerHTML = msg.val()
  }
})
.catch(error=>txt.textContent=error)
},500)
