function openNav(){document.getElementById("mySidebar").style.width="250px"}function closeNav(){document.getElementById("mySidebar").style.width="0",document.getElementById("main").style.marginLeft="0"}{let e=function(){let e=$("#message-form");e.submit((function(t){console.log("Message received"),console.log(),t.preventDefault(e.serialize()),$.ajax({type:"post",url:"/chat/newMessage",data:e.serialize(),success:function(e){let t=n(e.data.message);$("#chat-body>ul").append(t)},error:function(e){console.log(e.responseText)}})}))},n=function(e){return $(`<li id="message-${e._id}"\n  <p>\n                       \n                        ${e.content}\n                        <br>\n                        <small>\n                        ${e.user}\n                        </small>\n                    </p>\n          </li>`)};e()}console.log("EDITOr - CHAT");