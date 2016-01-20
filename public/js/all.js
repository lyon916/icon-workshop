!function(){"use strict";angular.module("rhIcon",["ui.router","ui.bootstrap","angular-loading-bar","ngAnimate"]).config(["$stateProvider","$urlRouterProvider","cfpLoadingBarProvider",function(t,e,o){t.state("home",{url:"/home",templateUrl:"views/home/index.html",controller:"HomeCtrl"}).state("home.ad",{templateUrl:"views/home/ad.html"}).state("icon",{url:"/icon/:id",views:{"":{templateUrl:"views/icon/index.html",controller:"IconCtrl"},"ad@icon":{templateUrl:function(){return window.showAd?"views/icon/ad.html":null}}}}).state("icon.detail",{url:"/:type",views:{"detail@icon":{templateUrl:function(t){return t.type?"views/icon/detail."+_.toLower(t.type)+".html":void 0}}}}).state("about",{url:"/about",templateUrl:"views/about/index.html",controller:"AboutCtrl"}),e.otherwise("/home"),o.lightTheme=!0}]).run(["$rootScope","cfpLoadingBar",function(t,e){t.$on("$stateChangeStart",function(){e.start()}),t.$on("$stateChangeSuccess",function(){e.complete()})}]).run(["$rootScope","$state","$stateParams",function(t,e,o){t.$state=e,t.$stateParams=o}]),$.material.init()}();
!function(){"use strict";angular.module("rhIcon").constant("$platforms",{ios:{name:"iOS",folder:"ios/AppIcon.appiconset"},android:{name:"Android",folder:"android"},windowsphone:{name:"Windows Phone",folder:"windowsphone"},iwatch:{name:"iWatch",folder:"iwatch/AppIcon.appiconset"},webapp:{name:"Web App",folder:"webapp"},phonegap:{name:"PhoneGap",folder:"phonegap"}})}();
!function(){"use strict";angular.module("rhIcon").service("CoreService",function(){this.resCallback=function(o,e,t){try{var r=JSON.parse(o);r.e?swal({title:r.d,type:"error",confirmButtonText:"确定"},t):"function"==typeof e&&e(r.d)}catch(c){throw console.log(o),console.log(c),c}}})}();
!function(){"use strict";angular.module("rhIcon").controller("RootCtrl",["$scope","$state",function(t,n){t.stateCls=function(t){return n.is(t)?"active":""}}])}();
!function(){"use strict";angular.module("rhIcon").controller("HomeCtrl",["$scope","CoreService","$state","$timeout",function(e,t,n,a){e.generating=!1,window.showAd&&n.go("home.ad"),$("#platform").select2({minimumResultsForSearch:1/0});var o=$("#if_form"),r=o.get(0),i=!0;r.addEventListener("dragover",function(e){e.stopPropagation(),e.preventDefault(),i&&o.addClass("dropping")},!1),r.addEventListener("dragleave",function(e){e.stopPropagation(),e.preventDefault(),i&&o.removeClass("dropping")},!1),r.addEventListener("drop",function(t){t.stopPropagation(),t.preventDefault(),i&&(o.removeClass("dropping"),t.dataTransfer&&t.dataTransfer.files&&t.dataTransfer.files.length&&e.$apply(function(){e.startUploading(t.dataTransfer.files[0])}))},!1),e.uploadFromBtn=function(){$("#if").click()},e.selectedFile=function(t){t.files&&t.files.length&&e.$apply(function(){e.startUploading(t.files[0])})},e.startUploading=function(a){i=!1,e.generating=!0;var o=new FileReader;o.readAsDataURL(a),o.onload=function(e){""!=a.type&&"image/vnd.adobe.photoshop"!=a.type&&($("#jumbotron_img").get(0).src=e.target.result)};var r=new FormData;r.append("file",a),r.append("platform",$("#platform").val());var s=new XMLHttpRequest;s.open("POST","/icon/upload",!0),s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.onreadystatechange=function(){4==s.readyState&&200==s.status&&t.resCallback(s.responseText,function(e){n.go("icon",{id:e})},function(){i=!0,e.generating=!1,$("#jumbotron_img").get(0).src="img/launcher.png"})},s.send(r)}}])}();
!function(){"use strict";angular.module("rhIcon").controller("IconCtrl",["$scope","$stateParams","CoreService","$state","$http","$platforms","$timeout",function(t,i,a,e,n,o,s){t.init=function(){t.$platforms=o,t.url=window.location.origin,n.get("/icon/detail/"+i.id+"/api").success(function(i){t.design=i.design,t.platforms=i.platforms,s(function(){$.material.ripples()});var a=e.params.type;a&&_.indexOf(i.platforms,a)>=0||t.platforms.length&&(a=t.platforms[0],t.switchDetail(a)),a&&t.updateBasePath(a)})},t.init(),t.switchDetail=function(t){i.type=t,e.go("icon.detail",i)},t.$on("$stateChangeSuccess",function(i,a,e){"icon.detail"==a.name&&t.design&&t.updateBasePath(e.type)}),t.updateBasePath=function(i){var a=o[i];t.basePath=["","files",t.design.folder,t.design.id,a.folder,""].join("/")},t.tabCls=function(t){return t==e.params.type?"active":""},t.downloadLink=function(){return"/icon/download/"+e.params.id},t.subscribe=function(){var a=$.trim(t.email),e=/^[a-z0-9-_]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;return a&&e.test(a)?(t.subscribed=!0,void $.post("/icon/subscribe",{design_id:i.id,mail:a})):void $("input[ng-model=email]").focus()}}])}();
!function(){"use strict";angular.module("rhIcon").controller("AboutCtrl",["$scope",function(o){}])}();