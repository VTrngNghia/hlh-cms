(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[20],{1175:function(e,t,a){"use strict";a.r(t);var n=a(237),r=a(238),o=a(240),l=a(239),c=a(242),s=a(241),i=a(2),d=a.n(i),u=a(907),p=a(908),m=a(910),f=a(912),g=a(911),b=a(931),h=a(936),E=a(933),O=a(934),v=a(997),j=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(o.a)(this,Object(l.a)(t).call(this,e))).toggle=a.toggle.bind(Object(c.a)(a)),a.state={dropdownOpen:new Array(6).fill(!1)},a}return Object(s.a)(t,e),Object(r.a)(t,[{key:"toggle",value:function(e){var t=this.state.dropdownOpen.map((function(t,a){return a===e&&!t}));this.setState({dropdownOpen:t})}},{key:"render",value:function(){var e=this;return d.a.createElement("div",{className:"animated fadeIn"},d.a.createElement(u.a,null,d.a.createElement(p.a,{xs:"12"},d.a.createElement(m.a,null,d.a.createElement(f.a,null,d.a.createElement("i",{className:"fa fa-align-justify"}),d.a.createElement("strong",null,"Dropdowns"),d.a.createElement("div",{className:"card-header-actions"},d.a.createElement("a",{href:"https://reactstrap.github.io/components/dropdowns/",rel:"noreferrer noopener",target:"_blank",className:"card-header-action"},d.a.createElement("small",{className:"text-muted"},"docs")))),d.a.createElement(g.a,null,d.a.createElement(b.a,{isOpen:this.state.dropdownOpen[0],toggle:function(){e.toggle(0)}},d.a.createElement(h.a,{caret:!0},"Dropdown"),d.a.createElement(E.a,null,d.a.createElement(O.a,{header:!0},"Header"),d.a.createElement(O.a,{disabled:!0},"Action"),d.a.createElement(O.a,null,"Another Action"),d.a.createElement(O.a,{divider:!0}),d.a.createElement(O.a,null,"Another Action"))))),d.a.createElement(m.a,null,d.a.createElement(f.a,null,d.a.createElement("i",{className:"fa fa-align-justify"}),d.a.createElement("strong",null,"Dropdowns"),d.a.createElement("small",null," alignment")),d.a.createElement(g.a,null,d.a.createElement(b.a,{isOpen:this.state.dropdownOpen[1],toggle:function(){e.toggle(1)}},d.a.createElement(h.a,{caret:!0},"This dropdown's menu is right-aligned"),d.a.createElement(E.a,{right:!0,style:{right:"auto"}},d.a.createElement(O.a,{header:!0},"Header"),d.a.createElement(O.a,{disabled:!0},"Action"),d.a.createElement(O.a,null,"Another Action"),d.a.createElement(O.a,{divider:!0}),d.a.createElement(O.a,null,"Another Action"))))),d.a.createElement(m.a,null,d.a.createElement(f.a,null,d.a.createElement("i",{className:"fa fa-align-justify"}),d.a.createElement("strong",null,"Dropdowns"),d.a.createElement("small",null," sizing")),d.a.createElement(g.a,null,d.a.createElement(b.a,{isOpen:this.state.dropdownOpen[2],toggle:function(){e.toggle(2)},size:"lg",className:"mb-3"},d.a.createElement(h.a,{caret:!0},"Large Dropdown"),d.a.createElement(E.a,null,d.a.createElement(O.a,{header:!0},"Header"),d.a.createElement(O.a,{disabled:!0},"Action"),d.a.createElement(O.a,null,"Another Action"),d.a.createElement(O.a,{divider:!0}),d.a.createElement(O.a,null,"Another Action"))),d.a.createElement(b.a,{isOpen:this.state.dropdownOpen[3],toggle:function(){e.toggle(3)},className:"mb-3"},d.a.createElement(h.a,{caret:!0},"Normal Dropdown"),d.a.createElement(E.a,null,d.a.createElement(O.a,{header:!0},"Header"),d.a.createElement(O.a,{disabled:!0},"Action"),d.a.createElement(O.a,null,"Another Action"),d.a.createElement(O.a,{divider:!0}),d.a.createElement(O.a,null,"Another Action"))),d.a.createElement(b.a,{isOpen:this.state.dropdownOpen[4],toggle:function(){e.toggle(4)},size:"sm"},d.a.createElement(h.a,{caret:!0},"Small Dropdown"),d.a.createElement(E.a,null,d.a.createElement(O.a,{header:!0},"Header"),d.a.createElement(O.a,{disabled:!0},"Action"),d.a.createElement(O.a,null,"Another Action"),d.a.createElement(O.a,{divider:!0}),d.a.createElement(O.a,null,"Another Action"))))),d.a.createElement(m.a,null,d.a.createElement(f.a,null,d.a.createElement("i",{className:"fa fa-align-justify"}),d.a.createElement("strong",null,"Custom Dropdowns")),d.a.createElement(g.a,null,d.a.createElement(b.a,{isOpen:this.state.dropdownOpen[5],toggle:function(){e.toggle(5)}},d.a.createElement(h.a,{tag:"span",onClick:function(){e.toggle(5)},"data-toggle":"dropdown","aria-expanded":this.state.dropdownOpen[5]},"Custom Dropdown Content ",d.a.createElement("strong",null," * ")),d.a.createElement(E.a,null,d.a.createElement("div",{className:"dropdown-item",onClick:function(){e.toggle(5)}},"Custom dropdown item 1"),d.a.createElement("div",{className:"dropdown-item",onClick:function(){e.toggle(5)}},"Custom dropdown item 2"),d.a.createElement("div",{className:"dropdown-item-text",onClick:function(){e.toggle(5)}},"Custom dropdown text 3"),d.a.createElement("hr",{className:"my-0 dropdown-item-text"}),d.a.createElement("div",{onClick:function(){e.toggle(5)}},"Custom dropdown item 4"))))),d.a.createElement(m.a,null,d.a.createElement(f.a,null,d.a.createElement("i",{className:"fa fa-align-justify"}),d.a.createElement("strong",null,"Uncontrolled Dropdown")),d.a.createElement(g.a,null,d.a.createElement(v.a,null,d.a.createElement(h.a,{caret:!0},"Uncontrolled Dropdown"),d.a.createElement(E.a,null,d.a.createElement(O.a,{header:!0},"Header"),d.a.createElement(O.a,{disabled:!0},"Action"),d.a.createElement(O.a,null,"Another Action"),d.a.createElement(O.a,{divider:!0}),d.a.createElement(O.a,null,"Another Action"))))))))}}]),t}(i.Component);t.default=j},907:function(e,t,a){"use strict";var n=a(36),r=a(92),o=a(2),l=a.n(o),c=a(62),s=a.n(c),i=a(902),d=a.n(i),u=a(903),p={tag:u.q,noGutters:s.a.bool,className:s.a.string,cssModule:s.a.object,form:s.a.bool},m=function(e){var t=e.className,a=e.cssModule,o=e.noGutters,c=e.tag,s=e.form,i=Object(r.a)(e,["className","cssModule","noGutters","tag","form"]),p=Object(u.m)(d()(t,o?"no-gutters":null,s?"form-row":"row"),a);return l.a.createElement(c,Object(n.a)({},i,{className:p}))};m.propTypes=p,m.defaultProps={tag:"div"},t.a=m},908:function(e,t,a){"use strict";var n=a(36),r=a(92),o=a(2),l=a.n(o),c=a(62),s=a.n(c),i=a(902),d=a.n(i),u=a(903),p=s.a.oneOfType([s.a.number,s.a.string]),m=s.a.oneOfType([s.a.bool,s.a.number,s.a.string,s.a.shape({size:s.a.oneOfType([s.a.bool,s.a.number,s.a.string]),order:p,offset:p})]),f={tag:u.q,xs:m,sm:m,md:m,lg:m,xl:m,className:s.a.string,cssModule:s.a.object,widths:s.a.array},g={tag:"div",widths:["xs","sm","md","lg","xl"]},b=function(e,t,a){return!0===a||""===a?e?"col":"col-"+t:"auto"===a?e?"col-auto":"col-"+t+"-auto":e?"col-"+a:"col-"+t+"-"+a},h=function(e){var t=e.className,a=e.cssModule,o=e.widths,c=e.tag,s=Object(r.a)(e,["className","cssModule","widths","tag"]),i=[];o.forEach((function(t,n){var r=e[t];if(delete s[t],r||""===r){var o=!n;if(Object(u.k)(r)){var l,c=o?"-":"-"+t+"-",p=b(o,t,r.size);i.push(Object(u.m)(d()(((l={})[p]=r.size||""===r.size,l["order"+c+r.order]=r.order||0===r.order,l["offset"+c+r.offset]=r.offset||0===r.offset,l)),a))}else{var m=b(o,t,r);i.push(m)}}})),i.length||i.push("col");var p=Object(u.m)(d()(t,i),a);return l.a.createElement(c,Object(n.a)({},s,{className:p}))};h.propTypes=f,h.defaultProps=g,t.a=h},910:function(e,t,a){"use strict";var n=a(36),r=a(92),o=a(2),l=a.n(o),c=a(62),s=a.n(c),i=a(902),d=a.n(i),u=a(903),p={tag:u.q,inverse:s.a.bool,color:s.a.string,body:s.a.bool,outline:s.a.bool,className:s.a.string,cssModule:s.a.object,innerRef:s.a.oneOfType([s.a.object,s.a.string,s.a.func])},m=function(e){var t=e.className,a=e.cssModule,o=e.color,c=e.body,s=e.inverse,i=e.outline,p=e.tag,m=e.innerRef,f=Object(r.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),g=Object(u.m)(d()(t,"card",!!s&&"text-white",!!c&&"card-body",!!o&&(i?"border":"bg")+"-"+o),a);return l.a.createElement(p,Object(n.a)({},f,{className:g,ref:m}))};m.propTypes=p,m.defaultProps={tag:"div"},t.a=m},911:function(e,t,a){"use strict";var n=a(36),r=a(92),o=a(2),l=a.n(o),c=a(62),s=a.n(c),i=a(902),d=a.n(i),u=a(903),p={tag:u.q,className:s.a.string,cssModule:s.a.object,innerRef:s.a.oneOfType([s.a.object,s.a.string,s.a.func])},m=function(e){var t=e.className,a=e.cssModule,o=e.innerRef,c=e.tag,s=Object(r.a)(e,["className","cssModule","innerRef","tag"]),i=Object(u.m)(d()(t,"card-body"),a);return l.a.createElement(c,Object(n.a)({},s,{className:i,ref:o}))};m.propTypes=p,m.defaultProps={tag:"div"},t.a=m},912:function(e,t,a){"use strict";var n=a(36),r=a(92),o=a(2),l=a.n(o),c=a(62),s=a.n(c),i=a(902),d=a.n(i),u=a(903),p={tag:u.q,className:s.a.string,cssModule:s.a.object},m=function(e){var t=e.className,a=e.cssModule,o=e.tag,c=Object(r.a)(e,["className","cssModule","tag"]),s=Object(u.m)(d()(t,"card-header"),a);return l.a.createElement(o,Object(n.a)({},c,{className:s}))};m.propTypes=p,m.defaultProps={tag:"div"},t.a=m},933:function(e,t,a){"use strict";var n=a(36),r=a(906),o=a(92),l=a(71),c=a(2),s=a.n(c),i=a(62),d=a.n(i),u=a(902),p=a.n(u),m=a(1171),f=a(909),g=a(903),b={tag:g.q,children:d.a.node.isRequired,right:d.a.bool,flip:d.a.bool,modifiers:d.a.object,className:d.a.string,cssModule:d.a.object,persist:d.a.bool,positionFixed:d.a.bool},h={flip:{enabled:!1}},E={up:"top",left:"left",right:"right",down:"bottom"},O=function(e){function t(){return e.apply(this,arguments)||this}return Object(l.a)(t,e),t.prototype.render=function(){var e=this,t=this.props,a=t.className,l=t.cssModule,c=t.right,i=t.tag,d=t.flip,u=t.modifiers,f=t.persist,b=t.positionFixed,O=Object(o.a)(t,["className","cssModule","right","tag","flip","modifiers","persist","positionFixed"]),v=Object(g.m)(p()(a,"dropdown-menu",{"dropdown-menu-right":c,show:this.context.isOpen}),l),j=i;if(f||this.context.isOpen&&!this.context.inNavbar){var N=(E[this.context.direction]||"bottom")+"-"+(c?"end":"start"),w=d?u:Object(r.a)({},u,{},h),y=!!b;return s.a.createElement(m.a,{placement:N,modifiers:w,positionFixed:y},(function(t){var a=t.ref,r=t.style,o=t.placement;return s.a.createElement(j,Object(n.a)({tabIndex:"-1",role:"menu",ref:a,style:r},O,{"aria-hidden":!e.context.isOpen,className:v,"x-placement":o}))}))}return s.a.createElement(j,Object(n.a)({tabIndex:"-1",role:"menu"},O,{"aria-hidden":!this.context.isOpen,className:v,"x-placement":O.placement}))},t}(s.a.Component);O.propTypes=b,O.defaultProps={tag:"div",flip:!0},O.contextType=f.a,t.a=O},934:function(e,t,a){"use strict";var n=a(36),r=a(92),o=a(904),l=a(71),c=a(2),s=a.n(c),i=a(62),d=a.n(i),u=a(902),p=a.n(u),m=a(909),f=a(903),g={children:d.a.node,active:d.a.bool,disabled:d.a.bool,divider:d.a.bool,tag:f.q,header:d.a.bool,onClick:d.a.func,className:d.a.string,cssModule:d.a.object,toggle:d.a.bool},b=function(e){function t(t){var a;return(a=e.call(this,t)||this).onClick=a.onClick.bind(Object(o.a)(a)),a.getTabIndex=a.getTabIndex.bind(Object(o.a)(a)),a}Object(l.a)(t,e);var a=t.prototype;return a.onClick=function(e){this.props.disabled||this.props.header||this.props.divider?e.preventDefault():(this.props.onClick&&this.props.onClick(e),this.props.toggle&&this.context.toggle(e))},a.getTabIndex=function(){return this.props.disabled||this.props.header||this.props.divider?"-1":"0"},a.render=function(){var e=this.getTabIndex(),t=e>-1?"menuitem":void 0,a=Object(f.n)(this.props,["toggle"]),o=a.className,l=a.cssModule,c=a.divider,i=a.tag,d=a.header,u=a.active,m=Object(r.a)(a,["className","cssModule","divider","tag","header","active"]),g=Object(f.m)(p()(o,{disabled:m.disabled,"dropdown-item":!c&&!d,active:u,"dropdown-header":d,"dropdown-divider":c}),l);return"button"===i&&(d?i="h6":c?i="div":m.href&&(i="a")),s.a.createElement(i,Object(n.a)({type:"button"===i&&(m.onClick||this.props.toggle)?"button":void 0},m,{tabIndex:e,role:t,className:g,onClick:this.onClick}))},t}(s.a.Component);b.propTypes=g,b.defaultProps={tag:"button",toggle:!0},b.contextType=m.a,t.a=b},936:function(e,t,a){"use strict";var n=a(36),r=a(92),o=a(904),l=a(71),c=a(2),s=a.n(c),i=a(62),d=a.n(i),u=a(902),p=a.n(u),m=a(924),f=a.n(m),g=a(920),b=a.n(g),h=a(185),E=a.n(h),O=a(921),v=a.n(O),j=a(923),N=a.n(j),w=a(922),y=a(925),x=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return t=e.call.apply(e,[this].concat(n))||this,v()(b()(t),"refHandler",(function(e){Object(y.b)(t.props.innerRef,e),Object(y.a)(t.props.setReferenceNode,e)})),t}E()(t,e);var a=t.prototype;return a.componentWillUnmount=function(){Object(y.b)(this.props.innerRef,null)},a.render=function(){return N()(Boolean(this.props.setReferenceNode),"`Reference` should not be used outside of a `Manager` component."),Object(y.c)(this.props.children)({ref:this.refHandler})},t}(c.Component);function C(e){return c.createElement(w.b.Consumer,null,(function(t){return c.createElement(x,f()({setReferenceNode:t},e))}))}var A=a(909),k=a(903),M=a(913),T={caret:d.a.bool,color:d.a.string,children:d.a.node,className:d.a.string,cssModule:d.a.object,disabled:d.a.bool,onClick:d.a.func,"aria-haspopup":d.a.bool,split:d.a.bool,tag:k.q,nav:d.a.bool},D=function(e){function t(t){var a;return(a=e.call(this,t)||this).onClick=a.onClick.bind(Object(o.a)(a)),a}Object(l.a)(t,e);var a=t.prototype;return a.onClick=function(e){this.props.disabled||this.context.disabled?e.preventDefault():(this.props.nav&&!this.props.tag&&e.preventDefault(),this.props.onClick&&this.props.onClick(e),this.context.toggle(e))},a.render=function(){var e,t=this,a=this.props,o=a.className,l=a.color,c=a.cssModule,i=a.caret,d=a.split,u=a.nav,m=a.tag,f=Object(r.a)(a,["className","color","cssModule","caret","split","nav","tag"]),g=f["aria-label"]||"Toggle Dropdown",b=Object(k.m)(p()(o,{"dropdown-toggle":i||d,"dropdown-toggle-split":d,"nav-link":u}),c),h=f.children||s.a.createElement("span",{className:"sr-only"},g);return u&&!m?(e="a",f.href="#"):m?e=m:(e=M.a,f.color=l,f.cssModule=c),this.context.inNavbar?s.a.createElement(e,Object(n.a)({},f,{className:b,onClick:this.onClick,"aria-expanded":this.context.isOpen,children:h})):s.a.createElement(C,null,(function(a){var r,o=a.ref;return s.a.createElement(e,Object(n.a)({},f,((r={})["string"===typeof e?"ref":"innerRef"]=o,r),{className:b,onClick:t.onClick,"aria-expanded":t.context.isOpen,children:h}))}))},t}(s.a.Component);D.propTypes=T,D.defaultProps={"aria-haspopup":!0,color:"secondary"},D.contextType=A.a;t.a=D},997:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var n=a(906),r=a(36),o=a(904),l=a(71),c=a(2),s=a.n(c),i=a(62),d=a.n(i),u=a(931),p=a(903),m=["defaultOpen"],f=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={isOpen:t.defaultOpen||!1},a.toggle=a.toggle.bind(Object(o.a)(a)),a}Object(l.a)(t,e);var a=t.prototype;return a.toggle=function(){this.setState({isOpen:!this.state.isOpen})},a.render=function(){return s.a.createElement(u.a,Object(r.a)({isOpen:this.state.isOpen,toggle:this.toggle},Object(p.n)(this.props,m)))},t}(c.Component);f.propTypes=Object(n.a)({defaultOpen:d.a.bool},u.a.propTypes)}}]);
//# sourceMappingURL=20.66d4237a.chunk.js.map