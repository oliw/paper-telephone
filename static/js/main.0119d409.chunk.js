(this["webpackJsonppaper-telephone"]=this["webpackJsonppaper-telephone"]||[]).push([[0],{45:function(e,t,n){e.exports=n(88)},50:function(e,t,n){},84:function(e,t){},88:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(41),l=n.n(i),c=(n(50),n(1)),o=n(5),s=function e(t){Object(o.a)(this,e),this.number=t,this.writing=null,this.drawing=null,this.author=null};function u(e){return null!=e.drawing||null!=e.writing}function m(e,t){return!(t<0||t>=e.entries.length)&&u(e.entries[t])}var p=function e(t,n){Object(o.a)(this,e),this.player=t,this.entries=Array(n).fill(null);for(var r=0;r<n;r++)this.entries[r]=new s(r)};var d={name:"paper-telephone",setup:function(e){for(var t=e.numPlayers,n=2*t,r=Array(t),a={},i=0;i<t;i++)r[i]=new p(i,n),a["".concat(i)]=i;return{papers:r,numberOfRounds:n,currentSubmissionMethod:null,playerIdsToPaperIdx:a}},turn:{onBegin:function(e,t){e.currentSubmissionMethod=t.turn%2===0?"draw":"write"},onEnd:function(e,t){var n=t.numPlayers,r=e.playerIdsToPaperIdx,a={};return Object.keys(r).forEach((function(e){var t=r[e],i=(n+t-1)%n;a[e]=i})),Object(c.a)({},e,{playerIdsToPaperIdx:a})},endIf:function(e,t){var n=t.turn;return e.papers.every((function(e){return m(e,n-1)}))},activePlayers:{all:"submit",moveLimit:1},stages:{submit:{moves:{SubmitWriting:function(e,t,n){var r=t.playerID,a=t.turn,i=e.playerIdsToPaperIdx[r];e.papers[i].entries[a-1]=Object(c.a)({},e.papers[i].entries[a-1],{writing:n,author:r})},SubmitDrawing:function(e,t,n){var r=t.playerID,a=t.turn,i=e.playerIdsToPaperIdx[r];e.papers[i].entries[a-1]=Object(c.a)({},e.papers[i].entries[a-1],{drawing:n,author:r})}}}}},moves:{},endIf:function(e){var t=e.numberOfRounds;return e.papers.every((function(e){return m(e,t-1)}))?{}:null},minPlayers:2,maxPlayers:10},h=n(10),v=n(4),b=v.a.create({container:{display:"flex",flexDirection:"column",alignItems:"center"},canvas:{display:"none"},buttonsContainer:{display:"flex"}});var f=function(e){var t=e.onImageSelected,n=e.previousPhrase,i=Object(r.useRef)(null),l=Object(r.useRef)(null),c=Object(r.useState)(null),o=Object(h.a)(c,2),s=o[0],u=o[1];return Object(r.useEffect)((function(){i&&!s&&navigator.mediaDevices.getUserMedia({video:!0}).then((function(e){var t=i.current;t.srcObject=e,t.play()}))}),[i,s]),a.a.createElement("div",{className:Object(v.b)(b.container)},a.a.createElement("div",{className:Object(v.b)(b.header)},a.a.createElement("p",null,"Time to draw!")),a.a.createElement("div",{className:Object(v.b)(b.promptContainer)},a.a.createElement("p",null,"Can you draw this phrase and take a picture of it?"),a.a.createElement("p",null,n)),a.a.createElement("div",{className:Object(v.b)(b.drawingContainer)},!s&&a.a.createElement(a.a.Fragment,null,a.a.createElement("video",{ref:i,autoPlay:!0}),a.a.createElement("canvas",{className:Object(v.b)(b.canvas),ref:l,width:640,height:480})),s&&a.a.createElement("img",{src:s,alt:"Foo"})),a.a.createElement("div",{className:Object(v.b)(b.buttonsContainer)},!s&&a.a.createElement("button",{onClick:function(){l.current.getContext("2d").drawImage(i.current,0,0,l.current.width,l.current.height),u(l.current.toDataURL("image/jpeg"))}},"Take Pic of your drawing"),s&&a.a.createElement("button",{onClick:function(){return u(null)}},"Take another Pic"),s&&a.a.createElement("button",{onClick:function(){t&&t(s)}},"Submit")))},g=v.a.create({container:{display:"flex",flexDirection:"column",alignItems:"center"}});var E=function(e){var t=e.onPhraseChosen,n=e.previousDrawingUri,r=a.a.useState(""),i=Object(h.a)(r,2),l=i[0],c=i[1];return a.a.createElement("div",{className:Object(v.b)(g.container)},a.a.createElement("p",null,"Time to write!"),n&&a.a.createElement("img",{src:n,alt:"Foo"}),a.a.createElement("input",{type:"text",placeholder:"Enter a phrase here",value:l,onChange:function(e){c(e.target.value)}}),a.a.createElement("button",{onClick:function(){t(l)}},"Submit"))},w=v.a.create({container:{display:"flex",flexDirection:"column",alignItems:"center"},main:{flexGrow:1}});var y=function(e){var t=e.moves,n=(e._,e.G),r=e.ctx,i=e.playerID;if(r.gameover)return a.a.createElement("div",null,a.a.createElement("h1",null,"Game over!"));if(!i)return a.a.createElement("div",null,a.a.createElement("h1",null,"Unknown Player"));var l=n.playerIdsToPaperIdx[i],c=n.papers[l].entries.slice().reverse().find((function(e){return u(e)})),o=null,s=null;return c&&"write"===n.currentSubmissionMethod&&(o=c.drawing),c&&"draw"===n.currentSubmissionMethod&&(s=c.writing),a.a.createElement("div",{className:Object(v.b)(w.container)},a.a.createElement("div",{className:Object(v.b)(w.header)},a.a.createElement("h1",null,"Welcome to Telephone!")),a.a.createElement("div",{className:Object(v.b)(w.details)},a.a.createElement("p",null,"The current turn is: ",r.turn,", which means its time to:"," ",n.currentSubmissionMethod),a.a.createElement("p",null,"There are ",r.numPlayers," players. You are player ",i)),a.a.createElement("div",{className:Object(v.b)(w.main)},"write"===n.currentSubmissionMethod&&r.activePlayers[i]&&a.a.createElement(E,{onPhraseChosen:function(e){t.SubmitWriting(e)},previousDrawingUri:o}),"draw"===n.currentSubmissionMethod&&r.activePlayers[i]&&a.a.createElement(f,{onImageSelected:function(e){t.SubmitDrawing(e)},previousPhrase:s}),!r.activePlayers[i]&&a.a.createElement("p",null,"Waiting for others to finish their move")))},O=n(43),j=[{game:d,board:y}],I=function(){return a.a.createElement("div",null,a.a.createElement(O.a,{gameServer:"https://games-server.oliverwilkie.com",lobbyServer:"https://games-server.oliverwilkie.com",gameComponents:j}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[45,1,2]]]);
//# sourceMappingURL=main.0119d409.chunk.js.map