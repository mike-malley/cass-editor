(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-717b80a6"],{"4a5b":function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{attrs:{id:"user-groups"}},[t("div",{staticClass:"modal",class:[{"is-active":e.userGroupBusy}]},[t("div",{staticClass:"modal-background"}),e._m(0)]),e.userGroupBusy?e._e():t("div",{staticClass:"container"},[e._m(1),e.userGroupViewMode.equals("list")?t("div",{staticClass:"section"},[t("h4",{staticClass:"header is-size-3"},[e._v("\n                Groups\n            ")]),0===e.userGroupList.length?t("div",[t("p",[e._v("No user groups are available.")])]):e._e(),e.userGroupList.length>0?t("div",{staticClass:"table-container"},[t("table",{staticClass:"table is-hoverable is-fullwidth"},[e._m(2),t("tbody",e._l(e.userGroupList,(function(s,r){return t("user-group-list-item",{key:r,attrs:{id:s.shortId(),name:s.getName(),description:s.getDescription(),numMembers:e.getUserGroupNumMembers(s),isOwned:e.doesAnyIdentityOwnObject(s)},on:{showDetails:e.showUserGroupDetails}})})),1)])]):e._e(),t("div",{staticClass:"buttons is-right"},[t("div",{staticClass:"button is-small is-outlined is-primary",attrs:{disabled:!e.amLoggedIn,title:e.getCreateUserGroupButtonTitle},on:{click:e.createNewUserGroup}},[e._m(3),t("span",[e._v("\n                        create new group\n                    ")])])])]):e._e(),e.userGroupViewMode.equals("detail")?t("div",[e._m(4),t("user-group-details",{attrs:{group:e.currentUserGroup,personList:e.personList,groupManagers:e.currentUserGroupManagers,groupUsers:e.currentUserGroupUsers,readOnly:e.currentUserGroupIsReadOnly},on:{save:e.saveCurrentUserGroup,cancel:e.cancelEditCurrentUserGroup,back:e.backFromEditCurrentUserGroup}})],1):e._e()])])},a=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"modal-content has-text-centered"},[t("span",{staticClass:"icon is-large has-text-center has-text-link"},[t("i",{staticClass:"fas fa-2x fa-spinner is-info fa-pulse"})])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"section"},[t("h3",{staticClass:"title is-size-1"},[e._v("\n                User Groups\n            ")]),t("p",{staticClass:"description"},[e._v("\n                User groups are combinations of users and access rules grouped under a name.\n                These grouped rules can be applied at the configuration level in the\n                configuration management screen or at the framework level in the framework editor.\n            ")])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("thead",[t("tr",[t("th",[e._v("\n                                name\n                            ")]),t("th",[e._v("\n                                description\n                            ")]),t("th",[e._v("\n                                number of members\n                            ")]),t("th")])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-plus"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"section"},[t("h4",{staticClass:"header is-size-3"},[e._v("\n                    User Group Details\n                ")])])}],i=(t("386d"),t("7f7f"),t("55dd"),t("ac4d"),t("8a81"),t("ac6a"),function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("tr",{attrs:{id:"user-group-item"}},[t("th",[t("b",[e._v(e._s(e.name))])]),t("td",[e._v("\n        "+e._s(e.description)+"\n    ")]),t("td",[e._v("\n        "+e._s(e.numMembers)+"\n    ")]),t("td",[t("div",{staticClass:"button is-outlined is-small is-primary",on:{click:function(s){return e.$emit("showDetails",e.id)}}},[t("span",{staticClass:"icon"},[e.isOwned?t("i",{staticClass:"fa fa-cog"}):t("i",{staticClass:"fa fa-eye"})]),e.isOwned?t("span",[e._v("manage")]):e._e(),e.isOwned?e._e():t("span",[e._v("view")])])])])}),n=[],o=(t("c5f6"),{name:"UserGroupListItem",props:{id:{type:String,default:""},name:{type:String,default:""},description:{type:String,default:""},numMembers:{type:Number,default:0},isOwned:{type:Boolean,default:!1}}}),u=o,l=t("2877"),c=Object(l["a"])(u,i,n,!1,null,"22ce0676",null),d=c.exports,p=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("div",{staticClass:"modal",class:[{"is-active":e.showAddMemberModal}]},[t("div",{staticClass:"modal-background"}),t("div",{staticClass:"modal-card"},[t("header",{staticClass:"modal-card-head has-background-primary"},[t("p",{staticClass:"is-size-3 modal-card-title has-text-white"},[e._v("\n                    "+e._s(e.addMemberModalTitle)+"\n                    "),t("button",{staticClass:"delete is-pulled-right",attrs:{"aria-label":"close"},on:{click:e.closeAddMemberModal}})])]),t("div",{staticClass:"modal-card-body has-text-dark"},[t("div",{staticClass:"field"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedPersonsFilter,expression:"selectedPersonsFilter"}],staticClass:"input",attrs:{type:"text",placeholder:"search for person..."},domProps:{value:e.selectedPersonsFilter},on:{input:function(s){s.target.composing||(e.selectedPersonsFilter=s.target.value)}}})]),t("h4",{staticClass:"header is-size-3"},[e._v("\n                    Available Member List\n                ")]),t("div",{staticClass:"table-container"},[t("table",{staticClass:"table is-hoverable is-fullwidth"},[e._m(0),t("tbody",e._l(e.filteredPersons,(function(s,r){return t("tr",{key:r},[t("th",[t("div",{staticClass:"checkbox"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedPersons,expression:"selectedPersons"}],attrs:{id:s.shortId(),name:"prs.shortId()",type:"checkbox"},domProps:{value:s.shortId(),checked:Array.isArray(e.selectedPersons)?e._i(e.selectedPersons,s.shortId())>-1:e.selectedPersons},on:{change:function(t){var r=e.selectedPersons,a=t.target,i=!!a.checked;if(Array.isArray(r)){var n=s.shortId(),o=e._i(r,n);a.checked?o<0&&(e.selectedPersons=r.concat([n])):o>-1&&(e.selectedPersons=r.slice(0,o).concat(r.slice(o+1)))}else e.selectedPersons=i}}})])]),t("td",[e._v(e._s(s.getName()))]),t("td",[e._v("  "+e._s(s.email))])])})),0)])])]),t("footer",{staticClass:"modal-card-foot has-background-light"},[e.readOnly?e._e():t("div",{staticClass:"buttons is-spaced"},[t("button",{staticClass:"button is-outlined is-dark",on:{click:e.closeAddMemberModal}},[e._m(1),t("span",[e._v("\n                            cancel\n                        ")])]),t("button",{staticClass:"button is-outlined is-primary",on:{click:e.applyAddMembers}},[e._m(2),t("span",[e._v("\n                            apply\n                        ")])])])])])]),t("div",{staticClass:"section"},[t("div",{staticClass:"field"},[t("label",{staticClass:"label"},[e._v("Name: ")]),e.readOnly?t("div",[e._v("\n                "+e._s(e.group.name)+"\n            ")]):e._e(),e.readOnly?e._e():t("div",{staticClass:"control",attrs:{div:""}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.group.name,expression:"group.name"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.group.name},on:{input:function(s){s.target.composing||e.$set(e.group,"name",s.target.value)}}})])]),t("div",{staticClass:"field"},[t("label",{staticClass:"label"},[e._v("Description: ")]),e.readOnly?t("div",[e._v("\n                "+e._s(e.group.description)+"\n            ")]):e._e(),e.readOnly?e._e():t("div",{staticClass:"control"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.group.description,expression:"group.description"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.group.description},on:{input:function(s){s.target.composing||e.$set(e.group,"description",s.target.value)}}})])])]),t("div",{staticClass:"section"},[t("h5",{staticClass:"header is-size-3"},[e._v("\n            Managers\n        ")]),t("p",{staticClass:"description"},[e._v("\n            Managers can read, edit, comment, delete, and manage user access to frameworks.\n        ")]),t("div",{staticClass:"table-container"},[t("table",{staticClass:"table is-hoverable is-fullwidth"},[e._m(3),t("tbody",e._l(e.localGroupManagers,(function(s,r){return t("tr",{key:r},[t("th",[e._v("\n                            "+e._s(s.getName())+"\n                        ")]),t("td",[e._v("\n                            "+e._s(s.email)+"\n                        ")]),t("td",[e.readOnly||e.areAnyIdentitiesThisPerson(s)?e._e():t("button",{staticClass:"button is-outlined is-small is-primary",on:{click:function(s){return e.moveManagerToUser(r)}}},[e._v("\n                                reassign as user\n                            ")])]),t("td",[t("div",{staticClass:"buttons is-centered"},[e.readOnly||e.areAnyIdentitiesThisPerson(s)?e._e():t("button",{staticClass:"button is-outlined is-small is-danger",on:{click:function(s){return e.removeManager(r)}}},[e._m(4,!0)])])])])})),0)])]),t("div",{staticClass:"buttons is-right"},[e.readOnly?e._e():t("button",{staticClass:"button is-small is-outlined is-primary",on:{click:e.addManagers}},[e._m(5),t("span",[e._v("\n                    add managers\n                ")])])])]),t("div",{staticClass:"section"},[t("h5",{staticClass:"header is-size-3"},[e._v("\n            Users\n        ")]),t("p",{staticClass:"description"},[e._v("\n            Readers can read, and comment on frameworks.\n        ")]),0===e.groupUsers.length?t("div",[t("p",{staticClass:"is-size-7"},[e._v("\n                No users assigned to this group yet.\n            ")])]):e._e(),e.groupUsers.length>0?t("div",{staticClass:"table-container"},[t("table",{staticClass:"table is-hoverable is-fullwidth"},[e._m(6),t("tbody",e._l(e.localGroupUsers,(function(s,r){return t("tr",{key:r},[t("th",[e._v("\n                            "+e._s(s.getName())+"\n                        ")]),t("td",[e._v("\n                            "+e._s(s.email)+"\n                        ")]),t("td",[e.readOnly||e.areAnyIdentitiesThisPerson(s)?e._e():t("button",{staticClass:"button is-outlined is-small is-primary",on:{click:function(s){return e.moveUserToManager(r)}}},[e._v("\n                                reassign as manager\n                            ")])]),t("td",[t("div",{staticClass:"buttons is-centered"},[e.readOnly||e.areAnyIdentitiesThisPerson(s)?e._e():t("div",{staticClass:"button is-outlined is-small is-danger",on:{click:function(s){return e.removeUser(r)}}},[e._m(7,!0)])])])])})),0)])]):e._e(),t("div",{staticClass:"buttons is-right"},[e.readOnly?e._e():t("button",{staticClass:"button is-small is-outlined is-primary",on:{click:e.addUsers}},[e._m(8),t("span",[e._v("\n                    add users\n                ")])])]),e.groupInvalid?t("div",[t("p",[e._v("User Group is invalid:")]),e.groupNameInvalid?t("p",[e._v("\n                *User group name is required\n            ")]):e._e(),e.groupDescriptionInvalid?t("p",[e._v("\n                *User group description is required\n            ")]):e._e()]):e._e()]),t("div",{staticClass:"section"},[e.readOnly?t("div",[t("button",{staticClass:"button is-outlined is-primary",on:{click:function(s){return e.$emit("back")}}},[e._m(11),t("span",[e._v("\n                    back\n                ")])])]):t("div",{staticClass:"buttons is-spaced"},[t("button",{staticClass:"button is-outlined is-dark",on:{click:function(s){return e.$emit("cancel")}}},[e._m(9),t("span",[e._v("cancel")])]),t("button",{staticClass:"button is-outlined is-primary",on:{click:e.validateCurrentGroupAndEmitSave}},[e._m(10),t("span",[e._v("\n                    save group\n                ")])])])])])},h=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("thead",[t("tr",[t("th"),t("th",[e._v("name")]),t("th",[e._v("email")])])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-times"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-save"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("thead",[t("tr",[t("th",[e._v("\n                            name\n                        ")]),t("th",[e._v("\n                            email\n                        ")]),t("th",[e._v(" reassign")]),t("th",[e._v("remove")])])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-trash"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-user-plus"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("thead",[t("tr",[t("th",[e._v("\n                            name\n                        ")]),t("th",[e._v("\n                            email\n                        ")]),t("th",[e._v("reassign")]),t("th",[e._v("remove")])])])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-trash"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-user-plus"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-times"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-save"})])},function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fa fa-arrow-left-alt"})])}],v=t("6d79"),m={mixins:[v["a"]],name:"UserGroupDetails",props:{group:{type:Object},personList:{type:Array},groupManagers:{type:Array},groupUsers:{type:Array},readOnly:{type:Boolean,default:!0}},data:function(){return{addMemberMode:"",showAddMemberModal:!1,addMemberModalTitle:"",selectedPersons:[],selectedPersonsFilter:"",localGroupManagers:this.groupManagers,localGroupUsers:this.groupUsers,groupInvalid:!1,groupNameInvalid:!1,groupDescriptionInvalid:!1}},methods:{setAllConfigValidationsChecksToValid:function(){this.groupInvalid=!1,this.groupNameInvalid=!1,this.groupDescriptionInvalid=!1},validateGroupFields:function(){this.group.name&&!this.group.name.trim().equals("")||(this.groupInvalid=!0,this.groupNameInvalid=!0),this.group.description&&!this.group.description.trim().equals("")||(this.groupInvalid=!0,this.groupDescriptionInvalid=!0)},validateCurrentGroupAndEmitSave:function(){this.setAllConfigValidationsChecksToValid(),this.validateGroupFields(),this.groupInvalid||this.$emit("save",this.localGroupManagers,this.localGroupUsers)},closeAddMemberModal:function(){this.selectedPersonsFilter="",this.selectedPersons=[],this.addMemberMode="",this.addMemberModalTitle="",this.showAddMemberModal=!1},getPersonById:function(e){var s=!0,t=!1,r=void 0;try{for(var a,i=this.personList[Symbol.iterator]();!(s=(a=i.next()).done);s=!0){var n=a.value;if(n.shortId().equals(e))return n}}catch(o){t=!0,r=o}finally{try{s||null==i.return||i.return()}finally{if(t)throw r}}return null},applyAddMembers:function(){var e=!0,s=!1,t=void 0;try{for(var r,a=this.selectedPersons[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){var i=r.value,n=this.getPersonById(i);this.addMemberMode.equals("manager")?this.localGroupManagers.push(n):this.addMemberMode.equals("user")&&this.localGroupUsers.push(n)}}catch(o){s=!0,t=o}finally{try{e||null==a.return||a.return()}finally{if(s)throw t}}this.closeAddMemberModal()},addManagers:function(){this.selectedPersonsFilter="",this.selectedPersons=[],this.addMemberMode="manager",this.addMemberModalTitle="Add Managers",this.showAddMemberModal=!0},addUsers:function(){this.selectedPersonsFilter="",this.selectedPersons=[],this.addMemberMode="user",this.addMemberModalTitle="Add Users",this.showAddMemberModal=!0},removeManager:function(e){this.localGroupManagers=this.localGroupManagers.slice(0,e).concat(this.localGroupManagers.slice(e+1,this.localGroupManagers.length))},moveManagerToUser:function(e){var s=this.localGroupManagers[e];this.localGroupUsers.push(s),this.removeManager(e)},removeUser:function(e){this.localGroupUsers=this.localGroupUsers.slice(0,e).concat(this.localGroupUsers.slice(e+1,this.localGroupUsers.length))},moveUserToManager:function(e){var s=this.localGroupUsers[e];this.localGroupManagers.push(s),this.removeUser(e)},groupHasManager:function(e){var s=!0,t=!1,r=void 0;try{for(var a,i=this.localGroupManagers[Symbol.iterator]();!(s=(a=i.next()).done);s=!0){var n=a.value;if(n.shortId().equals(e))return!0}}catch(o){t=!0,r=o}finally{try{s||null==i.return||i.return()}finally{if(t)throw r}}return!1},groupHasUser:function(e){var s=!0,t=!1,r=void 0;try{for(var a,i=this.localGroupUsers[Symbol.iterator]();!(s=(a=i.next()).done);s=!0){var n=a.value;if(n.shortId().equals(e))return!0}}catch(o){t=!0,r=o}finally{try{s||null==i.return||i.return()}finally{if(t)throw r}}return!1}},computed:{filteredPersons:function(){var e=this;return this.personList.filter((function(s){return!e.groupHasManager(s.shortId())&&!e.groupHasUser(s.shortId())&&(s.getName()&&s.getName().toLowerCase().indexOf(e.selectedPersonsFilter.toLowerCase())>-1||s.email&&s.email.toLowerCase().indexOf(e.selectedPersonsFilter.toLowerCase())>-1)}))}}},f=m,g=(t("fbd6"),Object(l["a"])(f,p,h,!1,null,"0cbc71dc",null)),y=g.exports,G={mixins:[v["a"]],name:"UserGroupEditor",components:{UserGroupDetails:y,UserGroupListItem:d},data:function(){return{GROUP_SEARCH_SIZE:1e4,PERSON_SEARCH_SIZE:1e4,userGroupViewMode:"list",userGroupBusy:!1,currentUserGroup:{},currentUserGroupManagers:[],currentUserGroupUsers:[],userGroupList:[],personList:[]}},computed:{getCreateUserGroupButtonTitle:function(){return this.amLoggedIn?"":"Must be logged in"},currentUserGroupIsReadOnly:function(){return!this.doesAnyIdentityOwnObject(this.currentUserGroup)}},methods:{getUserGroupNumMembers:function(e){return e.employee?e.employee.length:0},showListView:function(){this.userGroupViewMode="list"},showDetailView:function(){this.userGroupViewMode="detail"},updateCurrentUserGroupPpk:function(){var e=new EcEncryptedValue;e.copyFrom(this.currentUserGroup[this.GROUP_PPK_KEY]);var s=e.decryptIntoString();this.currentUserGroup[this.GROUP_PPK_KEY]=EcEncryptedValue.encryptValue(s,this.GROUP_PPK_KEY,this.currentUserGroup.owner,this.currentUserGroup.reader)},updateCurrentUserGroupMemberList:function(e,s){this.currentUserGroup.employee=[],this.currentUserGroup.owner=[],this.currentUserGroup.reader=[];var t=!0,r=!1,a=void 0;try{for(var i,n=e[Symbol.iterator]();!(t=(i=n.next()).done);t=!0){var o=i.value,u=this.getPersonEcPk(o);u&&(this.currentUserGroup.addEmployee(o),this.currentUserGroup.addOwner(u))}}catch(f){r=!0,a=f}finally{try{t||null==n.return||n.return()}finally{if(r)throw a}}var l=!0,c=!1,d=void 0;try{for(var p,h=s[Symbol.iterator]();!(l=(p=h.next()).done);l=!0){var v=p.value,m=this.getPersonEcPk(v);m&&(this.currentUserGroup.addEmployee(v),this.currentUserGroup.addReader(m))}}catch(f){c=!0,d=f}finally{try{l||null==h.return||h.return()}finally{if(c)throw d}}},saveCurrentUserGroupSuccess:function(){console.log("Save user group success..."),this.showListView(),this.buildUserGroupData()},saveCurrentUserGroupFailure:function(e){console.log("Save user group failure: "+e),this.userGroupBusy=!1},saveCurrentUserGroup:function(e,s){this.userGroupBusy=!0,this.updateCurrentUserGroupMemberList(e,s),this.updateCurrentUserGroupPpk(),EcRepository.save(this.currentUserGroup,this.saveCurrentUserGroupSuccess,this.saveCurrentUserGroupFailure)},cancelEditCurrentUserGroup:function(){this.buildUserGroupData(),this.showListView(),this.currentUserGroup={},this.currentUserGroupManagers=[],this.currentUserGroupUsers=[]},backFromEditCurrentUserGroup:function(){this.showListView(),this.currentUserGroup={},this.currentUserGroupManagers=[],this.currentUserGroupUsers=[]},getPersonById:function(e){var s=!0,t=!1,r=void 0;try{for(var a,i=this.personList[Symbol.iterator]();!(s=(a=i.next()).done);s=!0){var n=a.value;if(n.shortId().equals(e))return n}}catch(o){t=!0,r=o}finally{try{s||null==i.return||i.return()}finally{if(t)throw r}}return null},setCurrentUserGroupManagerAndUserListsForDetailView:function(){if(this.currentUserGroupManagers=[],this.currentUserGroupUsers=[],this.currentUserGroup.employee){var e=!0,s=!1,t=void 0;try{for(var r,a=this.currentUserGroup.employee[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){var i=r.value,n=this.getPersonById(i);this.isPersonIdAnObjectOwner(i,this.currentUserGroup)&&this.currentUserGroupManagers.push(n),this.isPersonIdAnObjectReader(i,this.currentUserGroup)&&this.currentUserGroupUsers.push(n)}}catch(o){s=!0,t=o}finally{try{e||null==a.return||a.return()}finally{if(s)throw t}}this.showDetailView()}},sortPersonList:function(){this.personList.sort((function(e,s){return e.name>s.name?1:s.name>e.name?-1:0}))},fetchPersonListForDetailViewSuccess:function(e){this.personList=e,this.sortPersonList(),this.userGroupBusy=!1,this.setCurrentUserGroupManagerAndUserListsForDetailView()},fetchPersonListForDetailViewFailure:function(e){console.log("Person search failure: "+e),this.userGroupBusy=!1},fetchPersonListForDetailViewAndPopulateUserLists:function(){if(this.personList.length>0)this.setCurrentUserGroupManagerAndUserListsForDetailView();else{this.userGroupBusy=!0;var e={};e.size=this.PERSON_SEARCH_SIZE,EcPerson.search(window.repo,"",this.fetchPersonListForDetailViewSuccess,this.fetchPersonListForDetailViewFailure,e)}},getUserGroupById:function(e){var s=!0,t=!1,r=void 0;try{for(var a,i=this.userGroupList[Symbol.iterator]();!(s=(a=i.next()).done);s=!0){var n=a.value;if(n.shortId().equals(e))return n}}catch(o){t=!0,r=o}finally{try{s||null==i.return||i.return()}finally{if(t)throw r}}return null},setCurrentUserGroup:function(e){this.currentUserGroup=this.getUserGroupById(e)},showUserGroupDetails:function(e){this.setCurrentUserGroup(e),this.fetchPersonListForDetailViewAndPopulateUserLists()},createNewUserGroup:function(){var e=this;this.userGroupBusy=!0;var s=new EcOrganization;s.generateId(window.repo.selectedServer),s.setName("New User Group"),s.setDescription("New group of users"),s.employee=[],s.addEmployee(this.$store.state.user.loggedOnPerson),this.addAllIdentityPksAsOwners(s),setTimeout((function(){var t=EcPpk.generateKey();s[e.GROUP_PPK_KEY]=EcEncryptedValue.encryptValue(t.toPem(),e.GROUP_PPK_KEY,s.owner,s.reader),console.log("New user group created: "),console.log(s),e.currentUserGroup=s,e.userGroupBusy=!1,e.fetchPersonListForDetailViewAndPopulateUserLists()}),300)},sortUserGroupList:function(){var e=this;this.userGroupList.sort((function(s,t){var r=e.doesAnyIdentityOwnObject(s),a=e.doesAnyIdentityOwnObject(t);return r!==a?a?1:-1:s.name>t.name?1:t.name>s.name?-1:0}))},searchRepositoryForGroupsSuccess:function(e){console.log("Group search success: "),console.log(e),e&&e.length>0?(this.userGroupList=e,this.sortUserGroupList()):this.userGroupList=[],this.userGroupBusy=!1},searchRepositoryForGroupsFailure:function(e){console.log("Group search failure: "+e),this.userGroupBusy=!1},buildUserGroupData:function(){this.userGroupBusy=!0;var e={};e.size=this.GROUP_SEARCH_SIZE,EcOrganization.search(window.repo,"",this.searchRepositoryForGroupsSuccess,this.searchRepositoryForGroupsFailure,e)}},mounted:function(){if(this.buildUserGroupData(),EcIdentityManager.ids.length<=0){var e=new EcIdentity;e.ppk=EcPpk.fromPem("-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEA6at3xRErrHESxqie/SbKm84QQXIe6HVfoT7nZTQZzbRQdyiHzJufcJ6WhchofF1PE2aAniWqR1HM7af8LxdtVzir4JKzypHmuoQGyzDjTPH10lD6NSHTokLSHGpftm3aRvWjU/Vrw9JC40eXR1naxV4vJMOI8LY/CEg6kTSvLseHbUpGb9XT/NWD7cIAczMp45DCUf3qoZtaWltB0RV15tPKWImLX5tME8Plygq4P/9mMDU4H5Oili38s0383tO/nYFOtehQ5wfEoMgfGEHsQy/xw4DGyCPyGWiTNQwhPD1ybtQc2J+HueC+nwqgZOH/PA2KieCglk0OB28VoZ0oPwIDAQABAoIBADTDAOJAhEoFpiWxQWUL80fG+aitagk3J4azO3CAmSr3ggvF3RP4N8IoLPi8Tct3DjnlNTmAa7h64fjvq2O+uHOvWi/1MB+XXi/TS+1pdomTQNxiaHzCzJSg3eyIoGAC4fyPzndQvSqUOYI0UhZMVbenEqIMfMlNfWITXRYYfU3kVVJCM84ax6GlhLlpDIdo49c9jmacsBKjH1qWYPi+Aynt4MyY3MxU3GqQpamXKBJegjXXQpFzvVlAm2WSf7gSAiDgr1fHqrtjRbHa0HMdMMta85DvC2o8s9zMmdiBCmpJwoM4MAukzRyGq8FqC5Aa20fZryCJ4lIhW2KPiivykWECgYEA+8v/QkuIZTW+k7VapKZm+kF1HU6pn9wOZdUzivBoVTYmBfavChrJuk1sWo7c8mCjG4LP+BKV6cZGAK+1nRheqU1k1M+G0OxAe1qkxh7dMvOaQwg23NhWVhEzA5OrgCFHJr3uNIV+gXH+4HfRPxzx6fVUmbTnahPskFSDAi8BPDcCgYEA7ZICJiXHtgt486EsnC5phZwzsoD5mHVuwAm+gW/dmleaK9xFh+0C9tljROMBdQWvvDEFMg9xPCscUmfDDBq2GIMP1/eg4H5KS4Dg+xuMlXTjGYqhr6Y+OniCq/K0e2dasFuiI+hXTDexj/UX3vpBVTQXYT24+1gjBDjoveR/QDkCgYBiiIvVN5WidYukZb2Y3P1DRUY9N8EtK4H+25WV80oAvnXWs5f/zkfOvel+7pULzEFHzMLxguRjXRGbxya82QKCIiUpGiTZsPnyy5/bX8yT2bwuKxK9DXOLrqNV7P2Z4Gvlf0GuD+dXZHKnCHw7xGnucfCvTZmZaz6RpGC4BAjptQKBgHAyX49ykkH4YxP0T2QnSzCNl6C65qXI+Bf7whvRIAAvVSFXswLBvX+lJQu4hcylddxT7lc5EcpPtd15IZWK2+rxor7lNPYwzpef8yDEXv2KqWI7paaVxZfJqDTat7/8DMlzTTzWErxtJQ+OucpVuBssMcp74uvZMRhiZBCiZDKJAoGBAN1XsaLCJYi5Cogc4HV9bAt2Q5L1nn62OU32NbMwmpr4ibmQe0xESDEDVEaeB1RfycTyVe3P9ydKbycMJ+cswBFme1ZW/RzO47lsr70scUiu80UxH5g2IkjEeF0FtM1CBgKr2M2re/wwXRS1+tXm35/oEIW+9SCNFrUu4ivceVWF-----END RSA PRIVATE KEY-----"),EcIdentityManager.addIdentity(e);var s=EcPerson.getBlocking("https://dev.api.cassproject.org/api/data/schema.org.Person/2e522c778a1f0a2b31db7b2848ba4212");this.$store.commit("user/loggedOnPerson",s)}}},_=G,C=(t("7685"),Object(l["a"])(_,r,a,!1,null,null,null));s["default"]=C.exports},7685:function(e,s,t){"use strict";var r=t("aed5"),a=t.n(r);a.a},aed5:function(e,s,t){},f8b6:function(e,s,t){},fbd6:function(e,s,t){"use strict";var r=t("f8b6"),a=t.n(r);a.a}}]);
//# sourceMappingURL=chunk-717b80a6.8d0e04e5.js.map