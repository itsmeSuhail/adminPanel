import{r as t,ap as y,j as e,ar as C,U as I,ak as m,aA as b,aB as S,a9 as F,aa as v,ag as A,aw as k,at as L,au as T,av as h}from"./index-VMf9MKGU.js";const P=()=>{const[a,d]=t.useState({name:"",email:"",password:"",profileImg:"",isAdmin:!1}),[r,x]=t.useState({name:void 0,email:void 0,password:void 0,profileImg:void 0}),f=y(),[c,o]=t.useState(!1);t.useEffect(()=>{localStorage.getItem("userID")&&f("/home")},[]);const i=s=>{s.target.name==="profileImg"?d(n=>({...n,[s.target.name]:s.target.files[0]})):d(n=>({...n,[s.target.name]:s.target.value}))},[p,N]=t.useState(!1),g=()=>{N(!p)},w=async()=>{o(!0);try{const s=new FormData;s.append("name",a.name),s.append("email",a.email),s.append("password",a.password),s.append("profileImg",a.profileImg),s.append("isAdmin",a.isAdmin);const{data:n}=await T.post(`${L}/auth/register`,s,{headers:{"Content-Type":"multipart/form-data"}}),{status:j,res:u}=n;if(j===400){const{error:{errorList:l}}=u;x(W=>({...l})),o(!1)}else{if(o(!1),j===200){const{success:{msg:l}}=u;h.success(l),setTimeout(()=>{f("/")},3e3)}else{const{error:{msg:l}}=u;h.error(l)}x({name:void 0,email:void 0,password:void 0,profileImg:void 0}),d({name:"",email:"",password:"",profileImg:"",isAdmin:!1})}}catch(s){o(!1),h.error(s.message)}};return e.jsxs(e.Fragment,{children:[e.jsx(C,{}),e.jsx("div",{className:"formContainer",children:e.jsxs("div",{className:"leftForm",children:[e.jsx(I,{className:"title",variant:"h4",children:"Sign Up"}),e.jsxs("div",{className:"normalForm",children:[e.jsx("div",{className:"inputContainer",children:e.jsx(m,{fullWidth:!0,type:"text",label:"name",name:"name",id:"name",value:a.name,onChange:i})}),r.name&&e.jsx("span",{className:"err",children:r.name})]}),e.jsxs("div",{className:"normalForm",children:[e.jsx("div",{className:"inputContainer",children:e.jsx(m,{fullWidth:!0,type:"text",label:"Email",name:"email",id:"email",value:a.email,onChange:i})}),r.email&&e.jsx("span",{className:"err",children:r.email})]}),e.jsxs("div",{className:"normalForm",children:[e.jsxs("div",{className:"inputContainer",children:[e.jsx(m,{fullWidth:!0,type:p?"text":"password",label:"should contain upper,lower,numeric and min 8 char",name:"password",id:"password",value:a.password,onChange:i}),p==!0?e.jsx(b,{onClick:g,className:"floaticon"}):e.jsx(S,{onClick:g,className:"floaticon"})]}),r.password&&e.jsx("span",{className:"err",children:r.password})]}),e.jsxs("div",{className:"normalForm",children:[e.jsx("div",{className:"inputContainer",children:e.jsx(m,{fullWidth:!0,type:"file",name:"profileImg",id:"file",onChange:i})}),r.profileImg&&e.jsx("span",{className:"err",children:r.profileImg})]}),e.jsx("div",{className:"normalForm",children:e.jsx("div",{className:"inputContainer",children:e.jsxs(F,{fullWidth:!0,value:a.isAdmin,onChange:i,name:"isAdmin",id:"country",children:[e.jsx(v,{value:!1,children:"User"}),e.jsx(v,{value:!0,children:"Admin"})]})})}),e.jsx("div",{className:"normalForm",children:e.jsxs("div",{className:"submit_now",children:[e.jsx("button",{onClick:w,disabled:c,style:{display:"flex",alignItems:"center",justifyContent:"center",background:c?"gray":"#1dbf73"},children:c?e.jsx(A,{size:"2rem",color:"primary"}):"Submit"}),e.jsx("div",{className:"alread",style:{marginTop:"4px"},children:e.jsx(k,{to:"/",children:"Already have account? Login"})})]})})]})})]})};export{P as default};
