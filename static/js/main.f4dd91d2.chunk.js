(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{15:function(e,t,a){},26:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},29:function(e,t,a){e.exports=a(57)},34:function(e,t,a){},57:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(25),c=a.n(l),o=(a(34),a(10)),i=a(1),s=a(9),m=a(26),u=a.n(m);a(15);var v=function(e){var t=e.film;return r.a.createElement("div",null,r.a.createElement("div",{className:"moviePoster"},Object.entries(t).map((function(e){var t=Object(o.a)(e,2),a=(t[0],t[1]),n=a.id,l=a.title,c=a.poster_path;return r.a.createElement("div",{key:n,id:"container"},r.a.createElement(s.b,{to:"/".concat(n)},r.a.createElement("img",{src:"https://image.tmdb.org/t/p/w342/".concat(c),alt:"#"})),r.a.createElement("div",{className:"title"},l))}))))},p=a(28),d=a.n(p);var f=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],l=t[1];Object(n.useEffect)((function(){d.a.get("https://api.themoviedb.org/3/movie/popular?api_key=e366d974f73ae203397850eadc7bce1f").then((function(e){l(e.data.results)}))}),[]);var c=function(){var e=Object(i.f)().slug,t={title:"",overview:"",release_date:"",poster:"",vote_count:"",vote_average:""},n=a,l=parseInt(e);if(n.length>0){console.log("here");for(var c=0;c<n.length;c++)n[c].id===l&&(t.title=n[c].title,t.overview=n[c].overview,t.release_date=n[c].release_date,t.poster=n[c].poster_path,t.vote_average=n[c].vote_average,t.vote_count=n[c].vote_count)}return r.a.createElement("div",{className:"movieInfo"},r.a.createElement("h1",null,t.title),r.a.createElement("img",{src:"https://image.tmdb.org/t/p/w342/".concat(t.poster),alt:"#"}),r.a.createElement("p",null,t.overview),r.a.createElement("h4",null,"Release Date: ",t.release_date),r.a.createElement("p",null,"Rated a ",t.vote_average," average score from ",t.vote_count," votes."))};function m(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:u.a,className:"App-logo",alt:"logo"}),r.a.createElement(s.a,null,r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/",exact:!0,render:function(){return r.a.createElement(v,{film:a})}}),r.a.createElement(i.a,{path:"/:slug",exact:!0},r.a.createElement(c,null))))))}return r.a.createElement(m,null)};c.a.render(r.a.createElement(f,null),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.f4dd91d2.chunk.js.map