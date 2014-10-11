//////////////////// WSChat.js ///////////////////
// https://github.com/remixer-dec/WebSocketChat //
/////////////////////////////////////////////////
var Chat = {
    title:document.title,
    qw:false,
    ws:undefined,
    ms:0,
    me:'',
    ping:false,
    start:function(){
    window.addEventListener("unload", function(e) {
    	Chat.ws.send(Chat.nick+" was disconnected from the server");
    	 });
    document.body.addEventListener('mousemove',Chat.changetitle)
    document.body.addEventListener('keyup',Chat.changetitle)
    window.onload=function(){
    	if(localStorage['nickname']==undefined){
    		Chat.getNN()
    		}
    		else if(localStorage['nickname'].match(/ |"|'|<|>|\#/)) {
    		Chat.getNN()
    		}
    		else	Object.defineProperty(Chat, 'nick', { value: localStorage['nickname'],writable:false, configurable:false });
                if ("WebSocket" in window) {
        Chat.ws=new WebSocket("ws://sockets.mbed.org/ws/remixer/rw")
        Chat.ws.onopen = function(){
            document.getElementById('status').style.background='#0f0';
              Chat.ws.send(Chat.nick+" connected to the server");
        }
        Chat.ws.onclose = function(){
            document.getElementById('status').style.background='#f00';
        }
        var found=false;
        Chat.ws.onmessage = function(e){
        	found=e.data;
       Chat.qw!=false? setTimeout("Chat.checkup(Chat.qw)",600):false;
        found.match(/'/gi) ? found=found.replace(/'/gi,"&quot;") : false;
        found.match(/"/gi) ? found=found.replace(/"/gi,"&quot;") : false;
        found.match(/onerror/gi) ? found=found.replace(/onerror/gi," ") : false;
        found.match(/script/gi) ? found=found.replace(/script/gi," ") : false;
        found.match(/</gi) ? found=found.replace(/</gi,"&lt;") : false;
        found.match(/>/gi) ? found=found.replace(/>/gi,"&gt;") : false;
        found=(found.match(/###(.*?)###/))? found.match(/###(.*?)###(.*)/) : false;
        if (found!=false) {
        Chat.ms++;
        Chat.ms<2?document.title=Chat.ms + " new message!" : document.title=Chat.ms + " new messages! - WSChat";
        if(found[1].match(/ |"|'|<|>/)){
        	found[1]="hockir"+rndm(0,1000);
        }
        found[2].match(linkregexp) ? found[2]=found[2].replace(linkregexp,'<a href="http://$3$4$5$6$7?$8$9">[$3]</a>') : true;
        found[2].match(/:dog:/gi) ? found[2]=found[2].replace(/:dog:/gi,"<img style='vertical-align:middle' alt='🐶' width='20px' height='20px' src='https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDDuQNYWnqctfwI&w=155&h=114&url=http%3A%2F%2Fwww.nattstad.se%2Fjavascript%2Fimg%2Fd83ddc36.png'>") : false;
        found[2].match(/:bigdog:/gi) ? found[2]=found[2].replace(/:bigdog:/gi,"<img style='vertical-align:middle' src='https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDDuQNYWnqctfwI&w=155&h=114&url=http%3A%2F%2Fwww.nattstad.se%2Fjavascript%2Fimg%2Fd83ddc36.png'>") : false;
        found[2].match(/:doge:/gi) ? found[2]=found[2].replace(/:doge:/gi,"<img style='vertical-align:middle' src='http://www.mnx.ro/forum/public/style_emoticons/default/doge.png'>") : false;
        found[2].match(/:yoba:/gi) ? found[2]=found[2].replace(/:yoba:/gi,"<img style='vertical-align:middle' width='20px' height='20px' src='http://rusut.ru/memesmiles/yoba.gif'>") : false;
        found[2].match(/\/ping/gi) ? (Chat.ping!=false?Chat.sendM(new Date().getTime()-Chat.ping+"ms"):false):false;
        
        }
        found!=false? document.getElementById('mbx').innerHTML+=(found[1]==Chat.nick?"<div  style='background:#666' class='msgf'><p class=righty>"+found[1]+"</p>"+found[2]+"<span class=me></span>":"<div class='msgf'><p>"+found[1]+"</p>"+found[2]+"<span class=notme></span>")+"</div>" :  document.getElementById('mbx').innerHTML+="<div class='msgf' style='background:#777;height:20px;line-height:20px;color:#bbb;'>"+e.data+"</div>";
            if (document.getElementsByClassName('msge').length>9) {
           Chat.deleteFirst()
                }
           
            }
        }
        else {
            document.getElementById('mbx').innerHTML+="<div class='msgf' style='background:#777;height:20px;line-height:20px;color:#bbb;'>Sorry, your browser not support webSockets.</div>"
        }
    }
    var linkregexp=/\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
    setInterval(function(){
        document.getElementsByClassName('msgf')[0] != undefined ?  setTimeout(function(){
        	document.getElementsByClassName('msgf')[0].className='msge'
        	},54) : true;
       document.getElementsByClassName('msge')[ document.getElementsByClassName('msge').length-1] != undefined? Chat.qw=document.getElementsByClassName('msge')[ document.getElementsByClassName('msge').length-1] : false;
        },100);
        },
           changetitle:function(){
        document.title!=Chat.title? (function(){document.title="WSChat";ms=0;})() : false ;
    },
           getNN:function(){
    	if(Chat.nick=prompt('Enter your nickname')){
            if(Chat.nick.match(/ |"|'|<|>|\#/)){
                    Chat.getNN()
            }
            else if(Chat.nick.length>15){
            	Chat.getNN()
            }
            else{
            	 Object.defineProperty(Chat, 'nick', { value: Chat.nick,writable:false,configurable:false});
                    localStorage["nickname"]=Chat.nick;
            }
    	}
    	else Chat.getNN()
    },
    sendM:function(message) {
    	message!="/ping"?true:Chat.ping=new Date().getTime();
    	message!=""&&message!=" " ? (function(){
    	    	   Chat.ws.send("###"+Chat.nick+"###"+message);
        document.getElementById('msg').value="";
                                 })() : false;
    },
        rndm:function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
        deleteFirst:function(){
        	        setTimeout(function(){document.getElementsByClassName('msge')[0].style.height='30px'},44);
        	        setTimeout(function(){document.getElementsByClassName('msge')[0].style.color='#777'},30);
        	        setTimeout(function(){document.getElementsByClassName('msge')[0].style.opacity='0'},280);             
        	        setTimeout(function(){document.getElementsByClassName('msge')[0].innerHTML="";},354);
                 setTimeout(function(){document.getElementsByClassName('msge')[0].style.height='0px'},170);
                 setTimeout(function(){document.getElementsByClassName('msge')[0].remove()},500);
        },
        checkup:function(elem){
        	if(elem.offsetTop+elem.offsetHeight>359){
        		
        		Chat.deleteFirst()
        		setTimeout("Chat.checkup(Chat.qw)",500)
        	}
        }
       }
       Chat.nick="user"+Chat.rndm(0,1000);
       Chat.start()
        