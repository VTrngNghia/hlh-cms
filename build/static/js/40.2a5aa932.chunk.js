(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[40],{1172:function(e,a,t){"use strict";t.r(a);var r=t(237),n=t(238),s=t(240),c=t(239),l=t(241),o=t(2),u=t.n(o),m=t(907),i=t(908),f=t(910),d=t(912),b=t(911),g=t(1159),p=t(1158),E=function(e){function a(){return Object(r.a)(this,a),Object(s.a)(this,Object(c.a)(a).apply(this,arguments))}return Object(l.a)(a,e),Object(n.a)(a,[{key:"render",value:function(){return u.a.createElement("div",{className:"animated fadeIn"},u.a.createElement(m.a,null,u.a.createElement(i.a,{xs:"12"},u.a.createElement(f.a,null,u.a.createElement(d.a,null,u.a.createElement("i",{className:"fa fa-align-justify"}),u.a.createElement("strong",null,"Breadcrumbs"),u.a.createElement("div",{className:"card-header-actions"},u.a.createElement("a",{href:"https://reactstrap.github.io/components/breadcrumbs/",rel:"noreferrer noopener",target:"_blank",className:"card-header-action"},u.a.createElement("small",{className:"text-muted"},"docs")))),u.a.createElement(b.a,null,u.a.createElement(g.a,null,u.a.createElement(p.a,{active:!0},"Home")),u.a.createElement(g.a,null,u.a.createElement(p.a,null,u.a.createElement("a",{href:"#"},"Home")),u.a.createElement(p.a,{active:!0},"Library")),u.a.createElement(g.a,null,u.a.createElement(p.a,null,u.a.createElement("a",{href:"#"},"Home")),u.a.createElement(p.a,null,u.a.createElement("a",{href:"#"},"Library")),u.a.createElement(p.a,{active:!0},"Data")),u.a.createElement(g.a,{tag:"nav"},u.a.createElement(p.a,{tag:"a",href:"#"},"Home"),u.a.createElement(p.a,{tag:"a",href:"#"},"Library"),u.a.createElement(p.a,{tag:"a",href:"#"},"Data"),u.a.createElement(p.a,{active:!0,tag:"span"},"Bootstrap")))))))}}]),a}(o.Component);a.default=E},907:function(e,a,t){"use strict";var r=t(36),n=t(92),s=t(2),c=t.n(s),l=t(62),o=t.n(l),u=t(902),m=t.n(u),i=t(903),f={tag:i.q,noGutters:o.a.bool,className:o.a.string,cssModule:o.a.object,form:o.a.bool},d=function(e){var a=e.className,t=e.cssModule,s=e.noGutters,l=e.tag,o=e.form,u=Object(n.a)(e,["className","cssModule","noGutters","tag","form"]),f=Object(i.m)(m()(a,s?"no-gutters":null,o?"form-row":"row"),t);return c.a.createElement(l,Object(r.a)({},u,{className:f}))};d.propTypes=f,d.defaultProps={tag:"div"},a.a=d},908:function(e,a,t){"use strict";var r=t(36),n=t(92),s=t(2),c=t.n(s),l=t(62),o=t.n(l),u=t(902),m=t.n(u),i=t(903),f=o.a.oneOfType([o.a.number,o.a.string]),d=o.a.oneOfType([o.a.bool,o.a.number,o.a.string,o.a.shape({size:o.a.oneOfType([o.a.bool,o.a.number,o.a.string]),order:f,offset:f})]),b={tag:i.q,xs:d,sm:d,md:d,lg:d,xl:d,className:o.a.string,cssModule:o.a.object,widths:o.a.array},g={tag:"div",widths:["xs","sm","md","lg","xl"]},p=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},E=function(e){var a=e.className,t=e.cssModule,s=e.widths,l=e.tag,o=Object(n.a)(e,["className","cssModule","widths","tag"]),u=[];s.forEach((function(a,r){var n=e[a];if(delete o[a],n||""===n){var s=!r;if(Object(i.k)(n)){var c,l=s?"-":"-"+a+"-",f=p(s,a,n.size);u.push(Object(i.m)(m()(((c={})[f]=n.size||""===n.size,c["order"+l+n.order]=n.order||0===n.order,c["offset"+l+n.offset]=n.offset||0===n.offset,c)),t))}else{var d=p(s,a,n);u.push(d)}}})),u.length||u.push("col");var f=Object(i.m)(m()(a,u),t);return c.a.createElement(l,Object(r.a)({},o,{className:f}))};E.propTypes=b,E.defaultProps=g,a.a=E},910:function(e,a,t){"use strict";var r=t(36),n=t(92),s=t(2),c=t.n(s),l=t(62),o=t.n(l),u=t(902),m=t.n(u),i=t(903),f={tag:i.q,inverse:o.a.bool,color:o.a.string,body:o.a.bool,outline:o.a.bool,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},d=function(e){var a=e.className,t=e.cssModule,s=e.color,l=e.body,o=e.inverse,u=e.outline,f=e.tag,d=e.innerRef,b=Object(n.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),g=Object(i.m)(m()(a,"card",!!o&&"text-white",!!l&&"card-body",!!s&&(u?"border":"bg")+"-"+s),t);return c.a.createElement(f,Object(r.a)({},b,{className:g,ref:d}))};d.propTypes=f,d.defaultProps={tag:"div"},a.a=d},911:function(e,a,t){"use strict";var r=t(36),n=t(92),s=t(2),c=t.n(s),l=t(62),o=t.n(l),u=t(902),m=t.n(u),i=t(903),f={tag:i.q,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},d=function(e){var a=e.className,t=e.cssModule,s=e.innerRef,l=e.tag,o=Object(n.a)(e,["className","cssModule","innerRef","tag"]),u=Object(i.m)(m()(a,"card-body"),t);return c.a.createElement(l,Object(r.a)({},o,{className:u,ref:s}))};d.propTypes=f,d.defaultProps={tag:"div"},a.a=d},912:function(e,a,t){"use strict";var r=t(36),n=t(92),s=t(2),c=t.n(s),l=t(62),o=t.n(l),u=t(902),m=t.n(u),i=t(903),f={tag:i.q,className:o.a.string,cssModule:o.a.object},d=function(e){var a=e.className,t=e.cssModule,s=e.tag,l=Object(n.a)(e,["className","cssModule","tag"]),o=Object(i.m)(m()(a,"card-header"),t);return c.a.createElement(s,Object(r.a)({},l,{className:o}))};d.propTypes=f,d.defaultProps={tag:"div"},a.a=d}}]);
//# sourceMappingURL=40.2a5aa932.chunk.js.map