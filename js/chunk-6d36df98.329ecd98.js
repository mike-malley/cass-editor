(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d36df98"],{"401c":function(t,e,o){"use strict";var i=o("8e4c"),n=o.n(i);n.a},6675:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ul",{staticClass:"comment-list-item"},[o("li",{staticClass:"comment-list__user",attrs:{title:t.comment.creatorEmail}},[t._v("\n        "+t._s(t.comment.creatorName)+"\n    ")]),o("li",{staticClass:"comment-list__email"},[t._v("\n        "+t._s(t.comment.creatorEmail)+"\n    ")]),o("li",{staticClass:"comment-list__timestamp"},[t._v("\n        "+t._s(t.toPrettyDateString(t.comment.dateCreated))+"\n    ")]),o("li",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeCommentListDropDown,expression:"closeCommentListDropDown"}],staticClass:"comment-list__message-container"},[t.comment.canModify?o("div",{staticClass:"dropdown",class:{"is-active":t.commentListDropDownActive}},[o("div",{staticClass:"dropdown-trigger"},[o("button",{staticClass:"button is-text has-text-dark",attrs:{"aria-haspopup":"true","aria-controls":"dropdown-menu"},on:{click:function(e){t.commentListDropDownActive=!t.commentListDropDownActive}}},[t._m(0)])]),o("div",{staticClass:"dropdown-menu",attrs:{id:"dropdown-menu",role:"menu"}},[o("div",{staticClass:"dropdown-content"},[o("a",{staticClass:"dropdown-item",attrs:{href:"#"},on:{click:t.handleClickEdit}},[t._v("\n                        edit\n                    ")]),o("a",{staticClass:"dropdown-item",on:{click:t.handleClickDelete}},[t._v("\n                        delete\n                    ")])])])]):t._e(),o("div",{staticClass:"comment-list__message-container__message",class:{"show-more":t.showMore}},[t._v("\n            "+t._s(t.comment.commentText)+"\n        ")]),t.comment.commentText.length>90?o("div",{staticClass:"buttons is-right"},[t.showMore?o("div",{staticClass:"button is-text has-text-primary",on:{click:function(e){t.showMore=!1}}},[t._v("\n                show less\n            ")]):o("div",{staticClass:"button is-text has-text-primary",on:{click:function(e){t.showMore=!0}}},[t._v("\n                show more\n            ")])]):t._e()]),t.comment.lastEditDate?o("li",{staticClass:"comment-list__message_edit"},[t._v("\n        *Edited: "+t._s(t.toPrettyDateString(t.comment.lastEditDate))+"\n    ")]):t._e(),t._m(1),t.comment.replies.length>0?o("li",t._l(t.comment.replies,(function(t){return o("comment",{key:t.commentId,attrs:{comment:t,canReply:!1}})})),1):t._e()])},n=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("span",{staticClass:"icon has-text-primary"},[o("i",{staticClass:"fas fa-ellipsis-v"})])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("li",{staticClass:"comment-list__reply_hr"},[o("hr")])}],s=(o("ac4d"),o("8a81"),o("ac6a"),o("872c")),r={name:"Comment",mixins:[s["a"]],components:{comment:function(){return Promise.resolve().then(o.bind(null,"6675"))}},props:{comment:{type:Object},canReply:{type:Boolean,default:!1}},data:function(){return{showMore:!1,commentListDropDownActive:!1}},methods:{closeCommentListDropDown:function(){this.commentListDropDownActive=!1},handleClickReply:function(){this.$store.commit("editor/setAddCommentAboutId",this.comment.aboutId),this.$store.commit("editor/setAddCommentType","reply"),this.$store.commit("editor/setCommentToReply",this.comment.comment),this.$store.commit("app/showModal",{component:"AddComment"})},handleClickEdit:function(){this.commentListDropDownActive=!1,this.$store.commit("editor/setAddCommentAboutId",this.comment.aboutId),this.$store.commit("editor/setAddCommentType","edit"),this.$store.commit("editor/setCommentToEdit",this.comment.comment),this.$store.commit("app/showModal",{component:"AddComment"})},handleClickEditReply:function(t){this.$store.commit("editor/setAddCommentAboutId",this.comment.aboutId),this.$store.commit("editor/setAddCommentType","edit"),this.$store.commit("editor/setCommentToEdit",this.comment.replies[t].comment),this.$store.commit("app/showModal",{component:"AddComment"})},handleClickDelete:function(){var t=[];if(t.push(this.comment.comment),this.comment.replies&&this.comment.replies.length>0){var e=!0,o=!1,i=void 0;try{for(var n,s=this.comment.replies[Symbol.iterator]();!(e=(n=s.next()).done);e=!0){var r=n.value;t.push(r.comment)}}catch(a){o=!0,i=a}finally{try{e||null==s.return||s.return()}finally{if(o)throw i}}}this.$store.commit("editor/setCommentsToDelete",t),this.$store.commit("app/showModal",{component:"DeleteCommentConfirm"})},handleClickDeleteReply:function(t){var e=[];e.push(this.comment.replies[t].comment),this.$store.commit("editor/setCommentsToDelete",e),this.$store.commit("app/showModal",{component:"DeleteCommentConfirm"})}},computed:{commentId:function(){return this.comment.commentId}}},a=r,m=o("2877"),c=Object(m["a"])(a,i,n,!1,null,null,null);e["default"]=c.exports},"8e4c":function(t,e,o){},"94fc":function(t,e,o){"use strict";var i=o("fe68"),n=o.n(i);n.a},d538:function(t,e,o){},dd98:function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("aside",{staticClass:"menu has-background-light",attrs:{id:"right-side-bar"}},[o("button",{staticClass:"delete is-dark has-text-dark is-pulled-right",attrs:{"aria-label":"close"},on:{click:function(e){return t.$store.commit("app/closeRightAside")}}}),o(t.rightAsideContent,{tag:"Component"})],1)},n=[],s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("aside",{staticClass:"menu has-background-lightest",attrs:{id:"right-side-bar__comments"}},[t._m(0),t.isCommentsBusy?o("div",{staticClass:"has-text-centered"},[t._m(1)]):t._e(),t.isCommentsBusy?t._e():o("div",[t.commentWrapperList.length<=0?o("div",{staticClass:"has-text-centered"},[t._m(2)]):t._e(),t.commentWrapperList.length>0?t._l(t.commentWrapperList,(function(e,i){return o("div",{key:i,staticClass:"comment-list"},[o("h4",{staticClass:"comment-list__about",on:{click:function(o){return t.setUpScroll(e)}}},[t._v("\n                    "+t._s(e.aboutName)+"\n                ")]),o("Comment",{key:e.commentId,attrs:{comment:e,canReply:t.canReplyToComments}}),o("div",{staticClass:"buttons is-right"},[o("div",{staticClass:"button is-small is-outlined is-primary",attrs:{title:"reply"},on:{click:function(o){return t.handleClickReply(e)}}},[t._m(3,!0),o("span",[t._v("reply")])])])],1)})):t._e()],2)])},r=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"right-aside-bar__title"},[o("h3",{staticClass:"title is-size-3"},[t._v("\n            Comments\n        ")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("span",{staticClass:"icon is-large has-text-center has-text-link"},[o("i",{staticClass:"fas fa-2x fa-spinner is-info fa-pulse"})])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("span",{staticClass:"has-text-center"},[o("p",[o("i",{staticClass:"fa fa-exclamation-circle"}),t._v(" No comments available")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("span",{staticClass:"icon"},[o("i",{staticClass:"fa fa-reply"})])}],a=(o("386d"),o("55dd"),o("6762"),o("ac4d"),o("8a81"),o("ac6a"),o("7f7f"),o("28a5"),o("6675")),m=o("872c"),c={name:"Comments",mixins:[m["a"]],data:function(){return{COMMENT_SEARCH_SIZE:1e4,isCommentsBusy:!1,localFrameworkCommentList:[],commentAboutMap:{},commentWrapperList:[],commentWrapperMap:{},canReplyToComments:!1}},components:{Comment:a["default"]},methods:{setUpScroll:function(t){var e={ts:Date.now(),scrollId:"#scroll-"+t.aboutId.split("/").pop()};this.$store.commit("editor/setCommentScrollTo",e)},handleClickReply:function(t){this.$store.commit("editor/setAddCommentAboutId",t.aboutId),this.$store.commit("editor/setAddCommentType","reply"),this.$store.commit("editor/setCommentToReply",t.comment),this.$store.commit("app/showModal",{component:"AddComment"})},determineCanModifyComment:function(t){return!!this.loggedOnPerson.shortId().equals(t.creator)},buildCommentWrapper:function(t,e,o){var i={},n=this.frameworkCommentPersonMap[t.creator];return i.comment=t,i.creator=n,i.aboutId=t.about,i.aboutName=e,i.commentId=t.shortId(),i.creatorName=n.name,i.creatorEmail=n.email,i.dateCreated=t.dateCreated-0,t.lastEditDate&&(i.lastEditDate=t.lastEditDate-0),i.commentText=t.text,i.isTopLevel=o,i.canModify=this.determineCanModifyComment(t),i.replies=[],i},buildFrameworkCommentWrappers:function(){var t=this.commentAboutMap[this.currentFramework.shortId()];if(t&&t.length>0){var e=!0,o=!1,i=void 0;try{for(var n,s=t[Symbol.iterator]();!(e=(n=s.next()).done);e=!0){var r=n.value,a=this.buildCommentWrapper(r,this.currentFramework.getName(),!0);this.commentWrapperList.push(a),this.commentWrapperMap[r.shortId()]=a}}catch(m){o=!0,i=m}finally{try{e||null==s.return||s.return()}finally{if(o)throw i}}}},getCompetencyName:function(t){var e=EcRepository.getBlocking(t);return e?e.getName():"Unknown Competency"},buildCompetencyCommentWrappers:function(){if(this.currentFramework.competency){var t=!0,e=!1,o=void 0;try{for(var i,n=this.currentFramework.competency[Symbol.iterator]();!(t=(i=n.next()).done);t=!0){var s=i.value,r=this.commentAboutMap[s];if(r&&r.length>0){var a=this.getCompetencyName(s),m=!0,c=!1,l=void 0;try{for(var d,u=r[Symbol.iterator]();!(m=(d=u.next()).done);m=!0){var h=d.value,p=this.buildCommentWrapper(h,a,!0);this.commentWrapperList.push(p),this.commentWrapperMap[h.shortId()]=p}}catch(f){c=!0,l=f}finally{try{m||null==u.return||u.return()}finally{if(c)throw l}}}}}catch(f){e=!0,o=f}finally{try{t||null==n.return||n.return()}finally{if(e)throw o}}}},addRepliesToParentWrapper:function(t){var e=!0,o=!1,i=void 0;try{for(var n,s=t[Symbol.iterator]();!(e=(n=s.next()).done);e=!0){var r=n.value,a=this.commentWrapperMap[r],m=a.aboutId,c=this.commentWrapperMap[m];c&&c.replies.push(a)}}catch(l){o=!0,i=l}finally{try{e||null==s.return||s.return()}finally{if(o)throw i}}},buildReplyCommentWrappers:function(){var t=[],e=!0,o=!1,i=void 0;try{for(var n,s=this.frameworkCommentList[Symbol.iterator]();!(e=(n=s.next()).done);e=!0){var r=n.value,a=r.shortId(),m=this.commentAboutMap[a];if(m&&m.length>0){var c=!0,l=!1,d=void 0;try{for(var u,h=m[Symbol.iterator]();!(c=(u=h.next()).done);c=!0){var p=u.value,f=this.buildCommentWrapper(p,"reply",!1);this.commentWrapperMap[p.shortId()]=f,t.push(p.shortId())}}catch(C){l=!0,d=C}finally{try{c||null==h.return||h.return()}finally{if(l)throw d}}}}}catch(C){o=!0,i=C}finally{try{e||null==s.return||s.return()}finally{if(o)throw i}}this.addRepliesToParentWrapper(t)},buildCommentDisplayStructures:function(){this.buildFrameworkCommentWrappers(),this.buildCompetencyCommentWrappers(),this.buildReplyCommentWrappers()},buildCommentAboutMap:function(){var t=!0,e=!1,o=void 0;try{for(var i,n=this.frameworkCommentList[Symbol.iterator]();!(t=(i=n.next()).done);t=!0){var s=i.value,r=s.about;this.commentAboutMap[r]||(this.commentAboutMap[r]=[]),this.commentAboutMap[r].push(s)}}catch(a){e=!0,o=a}finally{try{t||null==n.return||n.return()}finally{if(e)throw o}}},parseComments:function(){this.currentFramework?(this.isCommentsBusy=!0,this.commentAboutMap={},this.commentWrapperList=[],this.commentWrapperMap={},this.buildCommentAboutMap(),this.buildCommentDisplayStructures(),this.isCommentsBusy=!1):this.clearAllFrameworkCommentData()},buildFrameworkCommentPersonMapSuccess:function(t){var e={},o=!0,i=!1,n=void 0;try{for(var s,r=t[Symbol.iterator]();!(o=(s=r.next()).done);o=!0){var a=s.value;e[a.shortId()]=a}}catch(m){i=!0,n=m}finally{try{o||null==r.return||r.return()}finally{if(i)throw n}}this.$store.commit("editor/setFrameworkCommentDataLoaded",!0),this.$store.commit("editor/setFrameworkCommentPersonMap",e),this.$store.commit("editor/setFrameworkCommentList",this.localFrameworkCommentList)},buildFrameworkCommentPersonMapFailure:function(t){console.log("buildFrameworkCommentPersonMapFailure: "+t),this.isCommentsBusy=!1},buildCommentCreatorList:function(){var t=[],e=!0,o=!1,i=void 0;try{for(var n,s=this.localFrameworkCommentList[Symbol.iterator]();!(e=(n=s.next()).done);e=!0){var r=n.value;t.includes(r.creator)||t.push(r.creator)}}catch(a){o=!0,i=a}finally{try{e||null==s.return||s.return()}finally{if(o)throw i}}return t},buildFrameworkCommentPersonMap:function(){var t=this.buildCommentCreatorList();t.length>0?window.repo.multiget(t,this.buildFrameworkCommentPersonMapSuccess,this.buildFrameworkCommentPersonMapFailure):this.buildFrameworkCommentPersonMapSuccess([])},sortLocalFrameworkCommentList:function(){this.localFrameworkCommentList.sort((function(t,e){return t.dateCreated-0>e.dateCreated-0?1:e.dateCreated-0>t.dateCreated-0?-1:0}))},buildFrameworkCommentListSuccess:function(t){this.localFrameworkCommentList=t,this.sortLocalFrameworkCommentList(),this.buildFrameworkCommentPersonMap()},buildFrameworkCommentListFailure:function(t){console.log("buildFrameworkCommentListFailure: "+t),this.isCommentsBusy=!1},clearAllFrameworkCommentData:function(){this.isCommentsBusy=!1,this.localFrameworkCommentList=[],this.commentAboutMap={},this.commentWrapperList=[],this.commentWrapperMap={},this.canReplyToComments=!1},buildFrameworkCommentList:function(){if(this.currentFramework){var t={};t.size=this.COMMENT_SEARCH_SIZE,EcComment.search(window.repo,'isBasedOn:"'+this.currentFramework.shortId()+'"',this.buildFrameworkCommentListSuccess,this.buildFrameworkCommentListFailure,null)}else this.clearAllFrameworkCommentData()},buildCommentDataSet:function(){!this.frameworkCommentList||this.frameworkCommentList.length<=0?(this.isCommentsBusy=!0,this.buildFrameworkCommentList()):this.parseComments()}},computed:{loggedOnPerson:function(){return this.$store.getters["user/loggedOnPerson"]},currentFramework:function(){return this.$store.getters["editor/framework"]},currentFrameworkCompetencies:function(){return this.$store.getters["editor/framework"].competency},frameworkCommentList:function(){return this.$store.getters["editor/frameworkCommentList"]},frameworkCommentPersonMap:function(){return this.$store.getters["editor/frameworkCommentPersonMap"]}},watch:{currentFrameworkCompetencies:function(){this.parseComments()},frameworkCommentList:function(){this.parseComments()}},mounted:function(){this.buildCommentDataSet(),this.canReplyToComments=this.canAddCommentsCurrentFramework()}},l=c,d=(o("94fc"),o("2877")),u=Object(d["a"])(l,s,r,!1,null,null,null),h=u.exports,p=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("aside",{staticClass:"menu has-background-light",attrs:{id:"comments-side-bar"}},[o("p",{staticClass:"subtitle is-size-4"},[o("span",{staticClass:"icon",on:{click:function(e){return t.$store.commit("app/closeRightAside")}}},[o("i",{staticClass:"fa fa-caret-right"})]),t._v("\n        Version History\n    ")])])},f=[],C={name:"Versions",data:function(){return{isCommenter:!0,isAdmin:!1,isViewer:!0}},components:{}},y=C,k=(o("eeb6"),Object(d["a"])(y,p,f,!1,null,null,null)),v=k.exports,b=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"right-aside__filter-and-sort"},[o("h3",{staticClass:"title is-size-3"},[t._v("\n        Filter and Sort\n    ")]),o("div",{staticClass:"section"},[o("h3",{staticClass:"title is-size-4"},[t._v("\n            Sort by\n        ")]),t._l(t.sortResults,(function(e){return o("div",{key:e,staticClass:"field"},[e.enabled?[o("input",{directives:[{name:"model",rawName:"v-model",value:t.sortBy,expression:"sortBy"}],staticClass:"is-checkradio",attrs:{id:e.id,type:"radio",name:"sortResults"},domProps:{value:{id:e.id,label:e.label},checked:t._q(t.sortBy,{id:e.id,label:e.label})},on:{change:function(o){t.sortBy={id:e.id,label:e.label}}}}),o("label",{attrs:{for:e.id}},[t._v(t._s(e.label))])]:t._e()],2)}))],2),!t.$store.getters["editor/conceptMode"]||t.loggedIn?o("div",{staticClass:"section"},[o("h3",{staticClass:"title is-size-4"},[t._v("\n            Quick Filters\n        ")]),t._l(t.quickFilters,(function(e){return o("div",{key:e,staticClass:"field"},[e.enabled?[o("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"option.checked"}],staticClass:"is-checkradio",attrs:{id:e.id,type:"checkbox",name:e.id},domProps:{checked:Array.isArray(e.checked)?t._i(e.checked,null)>-1:e.checked},on:{change:function(o){var i=e.checked,n=o.target,s=!!n.checked;if(Array.isArray(i)){var r=null,a=t._i(i,r);n.checked?a<0&&t.$set(e,"checked",i.concat([r])):a>-1&&t.$set(e,"checked",i.slice(0,a).concat(i.slice(a+1)))}else t.$set(e,"checked",s)}}}),o("label",{attrs:{for:e.id}},[t._v(t._s(e.label))])]:t._e()],2)}))],2):t._e(),t.$store.getters["editor/conceptMode"]?t._e():o("div",{staticClass:"section"},[o("h3",{staticClass:"title is-size-4"},[t._v("\n            Apply search term to\n        ")]),t._l(t.applySearchTo,(function(e){return o("div",{key:e,staticClass:"field"},[e.enabled?[o("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"option.checked"}],staticClass:"is-checkradio",attrs:{id:e.id,type:"checkbox",name:e.id},domProps:{checked:Array.isArray(e.checked)?t._i(e.checked,null)>-1:e.checked},on:{change:function(o){var i=e.checked,n=o.target,s=!!n.checked;if(Array.isArray(i)){var r=null,a=t._i(i,r);n.checked?a<0&&t.$set(e,"checked",i.concat([r])):a>-1&&t.$set(e,"checked",i.slice(0,a).concat(i.slice(a+1)))}else t.$set(e,"checked",s)}}}),o("label",{attrs:{for:e.id}},[t._v(t._s(e.label))])]:t._e()],2)}))],2)])},w=[],_={name:"FilterAndSort",data:function(){return{sortResults:[{id:"dateCreated",label:"created date",enabled:!0},{id:"lastEdited",label:"last edited",enabled:!0}],quickFilters:[{id:"ownedByMe",checked:!1,label:"Owned by me",enabled:!0},{id:"notOwnedByMe",checked:!1,label:"Not owned by me",enabled:!0},{id:"configMatchDefault",checked:!1,label:"Configuration matches default",enabled:!0}],applySearchTo:[{id:"frameworkName",checked:!1,label:"Framework name",enabled:!0},{id:"frameworkDescription",checked:!1,label:"Framework description",enabled:!0},{id:"competencyName",checked:!1,label:"Competency name",enabled:!0},{id:"competencyDescription",checked:!1,label:"Competency description",enabled:!0},{id:"ownerName",checked:!1,label:"Owner name",enabled:!0}]}},computed:{sortBy:{get:function(){return this.$store.getters["app/sortResults"]},set:function(t){this.$store.commit("app/sortResults",t)}},loggedIn:function(){return EcIdentityManager.ids&&EcIdentityManager.ids.length}},mounted:function(){if(!this.loggedIn)for(var t=0;t<this.quickFilters.length;t++)"configMatchDefault"!==this.quickFilters[t].id&&(this.quickFilters[t].enabled=!1);if(this.$store.getters["editor/conceptMode"])for(t=0;t<this.quickFilters.length;t++)"configMatchDefault"===this.quickFilters[t].id&&(this.quickFilters[t].enabled=!1)},watch:{applySearchTo:{handler:function(){this.$store.commit("app/applySearchTo",this.applySearchTo)},deep:!0},quickFilters:{handler:function(){console.log("watched"),this.$store.commit("app/quickFilters",this.quickFilters)},deep:!0}}},g=_,F=Object(d["a"])(g,b,w,!1,null,null,null),A=F.exports,M={name:"RightAside",data:function(){return{isCommenter:!0,isAdmin:!1,isViewer:!0}},components:{Comments:h,Versions:v,FilterAndSort:A},computed:{showRightAside:function(){return this.$store.getters["app/showRightAside"]},rightAsideContent:function(){return this.$store.getters["app/rightAsideContent"]}}},$=M,D=(o("401c"),Object(d["a"])($,i,n,!1,null,null,null));e["default"]=D.exports},eeb6:function(t,e,o){"use strict";var i=o("d538"),n=o.n(i);n.a},fe68:function(t,e,o){}}]);
//# sourceMappingURL=chunk-6d36df98.329ecd98.js.map