(function(){"use strict";angular.module("incrementalApp",["ngAnimate","ngRoute","angulartics","angulartics.google.analytics"]).config(["$routeProvider",function(a){return a.when("/",{redirectTo:"/tab/fish/fish"}).when("/tab/fish/:unit",{templateUrl:"views/unit.html",controller:"UnitCtrl",controllerAs:"unit"}).when("/tab/dollars",{redirectTo:"/tab/dollars/dollars"}).when("/tab/dollars/dollars",{templateUrl:"views/dollars.html",controller:"MainCtrl",controllerAs:"main"}).when("/tab/dollars/officeworker",{templateUrl:"views/officeworker.html",controller:"MainCtrl",controllerAs:"main"}).when("/tab/research",{templateUrl:"views/research.html",controller:"MainCtrl",controllerAs:"main"}).when("/tab/options",{templateUrl:"views/options.html",controller:"OptionsCtrl",controllerAs:"options"}).when("/tab/changelog",{templateUrl:"views/changelog.html"}).otherwise({redirectTo:"/"})}]),angular.module("incrementalApp").config(function(){return window.ga("create",window.ga.trackingId,"auto")})}).call(this),function(){"use strict";angular.module("incrementalApp").controller("MainCtrl",["game","user","analytics",function(a,b,c){this.user=b,this.game=a}])}.call(this),function(){"use strict";angular.module("incrementalApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]})}.call(this),function(){"use strict";var a=function(a,b){return function(){return a.apply(b,arguments)}};angular.module("incrementalApp").factory("user",["$log","$timeout","units",function(b,c,d){var e;return new(e=function(){function e(){this.sellOne=a(this.sellOne,this),this.catchOne=a(this.catchOne,this),this.init=a(this.init,this),this.init()}return e.prototype.init=function(){return this.units=d,this.isFishing=!1,this.isSelling=!1,b.debug("User creation finished.")},e.prototype.buyOne=function(a){return d.dollar.owned-a.price>=0?(d.dollar.owned-=a.price,a.owned+=1,a.price*=a.pricefactor,a.unlocked=!0):void 0},e.prototype.goFish=function(){return this.isFishing=!0,c(this.catchOne,500)},e.prototype.catchOne=function(){return this.isFishing=!1,d.fish.owned+=1},e.prototype.sellFish=function(){return this.isSelling=!0,c(this.sellOne,50)},e.prototype.sellOne=function(){return this.isSelling=!1,d.fish.owned-1>=0?(d.fish.owned-=1,d.dollar.owned+=1):void 0},e.prototype.reset=function(){return this.init()},e}())}])}.call(this),function(){"use strict";var a=function(a,b){return function(){return a.apply(b,arguments)}};angular.module("incrementalApp").factory("game",["units","$interval","$filter","$log",function(b,c,d,e){var f;return new(f=function(){function e(){this.fisherTick=a(this.fisherTick,this),c(this.fisherTick,50),c(this.officeworkerTick,1e3),this.fishPerSec="(+0/sec)",this.fishSec=0,this.tickrate=20,this.start=new Date,this.tendency=0}return e.prototype.fisherTick=function(){var a,c,e,f;c=new Date-this.start,this.start=new Date,this.fishSec=0;for(a in b)null!=b[a].efficiency&&"officeworker"!==a&&(b.fish.owned+=b[a].owned*b[a].efficiency/this.tickrate*c/50,this.fishSec+=b[a].owned*b[a].efficiency);f=this.fishSec,this.fishSec=d("floor")(this.fishSec),this.fishPerSec="(+"+this.fishSec+"/sec)",e=b.officeworker.owned*b.officeworker.efficiency,e===f?this.tendency=0:e>f?this.tendency=1:this.tendency=2},e.prototype.officeworkerTick=function(){var a,c,d,e,f;return d=b.fish.owned,a=b.dollar.owned,e=b.officeworker.owned,c=b.officeworker.efficiency,f=e*c,d-f>0?(d-=f,a+=f):(a+=d,d=0),b.fish.owned=d,b.dollar.owned=a},e}())}])}.call(this),function(){"use strict";angular.module("incrementalApp").directive("fishtab",function(){return{templateUrl:"views/fishtab.html",restrict:"E"}})}.call(this),function(){"use strict";angular.module("incrementalApp").directive("dollartab",function(){return{restrict:"E",templateUrl:"views/dollartab.html"}})}.call(this),function(){"use strict";angular.module("incrementalApp").filter("floor",function(){return function(a){var b,c,d,e;if(c=["K","M","B","t","q","Q","s","S"],e=Math.floor(a),b=-1,d=1e3,1>e/d)return e;for(;;)if(e/=d,b+=1,!(e>=1e3))break;return e.toPrecision(3)+c[b]}})}.call(this),function(){"use strict";angular.module("incrementalApp").controller("OptionsCtrl",["units","reset","$log",function(a,b,c){var d;this.importString="Enter save data",this.saveSuccess="",d=JSON.stringify(a),this.saveState=LZString.compressToEncodedURIComponent(d),this.saveData=function(){return localStorage.setItem("fishgame",this.saveState),this.saveSuccess="That worked...maybe"},this.loadData=function(){return this.importString=localStorage.getItem("fishgame"),this["import"]()},this["import"]=function(){var a;return a=LZString.decompressFromEncodedURIComponent(this.importString),a=JSON.parse(a),this.importSave(a)},this.importSave=function(b){var c,d,e,f,g;d=[];for(f in a)e=a[f],d.push(function(){var d;d=[];for(c in e)g=e[c],d.push(a[f][c]=b[f][c]);return d}());return d},this.reset=function(){return b.doReset()}}])}.call(this),function(){"use strict";var a;angular.module("incrementalApp").value("units",a={fish:{name:"Fish",plural:"Fish",price:0,subtext:"The fish that swims in the ocean.",owned:0,quote:"<°))))><"},dollar:{name:"Dollars",owned:0},officeworker:{name:"Office Worker",plural:"Office Workers",price:30,pricefactor:1.1,subtext:"Working 9 to 5 this guy automatically sells your fish.",owned:0,efficiency:1,efficiencyfactor:2,upgradeprice:500,upgradefactor:10,quote:"God I hate this job!",tier:0,unlocked:!0},fisher:{name:"Fisher",plural:"Fishers",price:10,pricefactor:1.07,subtext:"The fellow that catches the fish from the depths of the oceans. He uses the classic fishing rod.",owned:0,efficiency:.2,efficiencyfactor:10,upgradeprice:1e4,upgradefactor:11,quote:"Meh, let's go fishing!",tier:0,unlocked:!0},dynamite:{name:"Dynamite-Fisher",plural:"Dynamite-Fishers",price:100,pricefactor:1.07,subtext:"This guy showed up with dynamite. 'Tis the ancient art of fishing' so he says.",owned:0,efficiency:2,efficiencyfactor:2,upgradeprice:1e5,upgradefactor:3,quote:"'Cause I'm T.N.T",tier:0,unlocked:!1},boat:{name:"Boat",plural:"Boats",price:1e3,pricefactor:1.07,subtext:"A powerful boat that roams the ocean for you.",owned:0,efficiency:5,efficiencyfactor:2,upgradeprice:1e6,upgradefactor:3,quote:"Well I'm on the Downeaster Alexa.",tier:0,unlocked:!1},robot:{name:"Robot",plural:"Robots",price:1e4,pricefactor:1.07,subtext:"Fish-hunting machines from the future.",owned:0,efficiency:10,efficiencyfactor:2,upgradeprice:1e7,upgradefactor:3,quote:"I'll be back.",tier:0,unlocked:!1},plane:{name:"Plane",plural:"Planes",price:1e5,pricefactor:1.07,subtext:"The latest in fishing technology. Hunt from above.",owned:0,efficiency:20,efficiencyfactor:2,upgradeprice:1e8,upgradefactor:3,quote:"How does this even work?!",tier:0,unlocked:!1},submarine:{name:"Submarine",plural:"Submarines",price:1e6,pricefactor:1.07,subtext:"The greatest submarine captains",owned:0,efficiency:40,efficiencyfactor:2,upgradeprice:1e9,upgradefactor:3,quote:"Re-verify our range to target...one ping only.",tier:0,unlocked:!1},nuke:{name:"Nuke",plural:"Nukes",price:1e7,pricefactor:1.07,subtext:"Attack the ocean.",owned:0,efficiency:80,efficiencyfactor:2,upgradeprice:1e10,upgradefactor:3,quote:"Sir, I'm not sure this is a good idea.",tier:0,unlocked:!1}})}.call(this),function(){"use strict";angular.module("incrementalApp").controller("UnitCtrl",["units","$log","$routeParams","user","game",function(a,b,c,d,e){this.allUnits=a,this.cur=a[c.unit],this.game=e,this.buyOne=function(a){return d.buyOne(a)},this.owned=function(b){return a[b].owned}}])}.call(this),function(){"use strict";angular.module("incrementalApp").service("reset",["units","research","$log",function(a,b,c){return this.unitBackup=angular.copy(a),this.researchBackup=angular.copy(b),{doReset:function(c){return function(){var d,e,f,g;for(f in a){e=a[f];for(d in e)g=e[d],a[f][d]=c.unitBackup[f][d]}return b.tier=0}}(this)}}])}.call(this),function(){"use strict";angular.module("incrementalApp").directive("flashbutton",function(){return{restrict:"EA",scope:{flashDelay:"=",flashOnSuccess:"="},template:"<button></button>",replace:!0,link:function(a,b,c){return b.find(button.text(c))}}})}.call(this),function(){"use strict";var a;angular.module("incrementalApp").value("research",a={shit:0})}.call(this),function(){"use strict";angular.module("incrementalApp").controller("ResearchCtrl",["$log","units","$timeout",function(a,b,c){this.units=b,this.upgradeUnit=function(a){return b.dollar.owned-a.upgradeprice<0?void 0:(b.dollar.owned-=a.upgradeprice,a.upgradeprice=a.upgradeprice*a.upgradefactor,a.efficiency=a.efficiency*a.efficiencyfactor)}}])}.call(this),function(){"use strict";angular.module("incrementalApp").factory("analytics",["$log",function(a){return{something:function(){return 42}}}])}.call(this),angular.module("incrementalApp").run(["$templateCache",function(a){"use strict";a.put("views/about.html",""),a.put("views/changelog.html",'<div class="content"> <h2>Changelog</h2> <h4>v.006 - <span>12/11/2015</span></h4> <ul> <li>Quick and dirty balancing</li> </ul> <h4>v.005 - <span>12/11/2015</span></h4> <ul> <li>Research scratched, again...</li> <li>Research prototype 2.0 "mpf"</li> </ul> <ul> <h4>v.004i - <span>12/10/2015</span></h4> <li>Animations</li> <li>Flicker on page load fixed</li> <li>Tickrate upped for fishers (cosmetic)</li> <li>Research-Prototype...not too happy</li> </ul> <h4>v.003i - <span>12/09/2015</span></h4> <ul> <li>Source clean up. Easier to read and edit.</li> <li>Well...that ended in 90% rewrite and took all day. Sigh.</li> <li>Research deactivated...for now</li> </ul> <h4>v.002 - <span>12/08/2015</span></h4> <ul> <li><s>Whole table is now clickable</s> - not 100% yet</li> <li>Fixed fish per sec "exploding"</li> <li>Dropdown Menu </li><li>Go Fish button now deactivates</li> </ul> <h4>v.001 - <span>12/08/2015</span></h4> <ul> <li>Prototype</li> </ul> </div>'),a.put("views/dollars.html",'<div style="width: 20%; float: left; margin-right: 15px"> <table class="table unit-table table-hover"> <tr> <td><a ng-href="#/tab/dollars/officeworker">Office Worker</a></td> <td style="text-align: right">{{main.user.units[\'officeworker\'].owned}}</td> </tr> <tr> <td><a ng-href="#/tab/dollars">Dollars</a></td> <td style="text-align: right">{{main.user.units[\'dollar\'].owned | floor}}</td> </tr> </table> </div> <div class="content"> <h2>Dollars</h2> <p>Money makes the world go round.<br> <br>You have {{main.user.units[\'dollar\'].owned | floor}} Dollars </p><p><i>"My precious!"</i></p> <span ng-if="main.user.isSelling"><button disabled ng-click="main.user.sellFish()">Sell Fish</button></span> <span ng-if="!main.user.isSelling"><button ng-click="main.user.sellFish()">Sell Fish</button></span> <!-- make this work, somehow...\n    <flashbutton flashDelay="500" flashOnSuccess="main.user.sellFish()">Sell Fish</flashbutton>\n    --> </div>'),a.put("views/dollartab.html",'<div style="width: 20%; float: left; margin-right: 15px"> <table class="table unit-table table-hover"> <tr> <td><a ng-href="#/tab/dollars/officeworker">Office Worker</a></td> <td style="text-align: right">{{main.user.units[\'officeworker\'].owned}}</td> </tr> <tr> <td><a ng-href="#/tab/dollars">Dollars</a></td> <td style="text-align: right">{{main.user.units[\'dollar\'].owned | floor}}</td> </tr> </table> </div>'),a.put("views/fishtab.html",'<!-- TODO: flickers when used\r\n<div style="width: 20%; float: left; margin-right: 15px;" ng-controller="UnitCtrl as unit">\r\n    <table class="table unit-table table-hover">\r\n        <tr class="animate-show" ng-hide="unit.allUnits[\'plane\'].owned < 10">\r\n            <td><a ng-href="#/tab/fish/submarine">Submarines</a></td>\r\n            <td style="text-align: right;">{{unit.owned("submarine") | floor}}</td>\r\n        </tr>\r\n        <tr class="animate-show" ng-hide="unit.allUnits[\'boat\'].owned < 10">\r\n            <td><a ng-href="#/tab/fish/plane">Planes</a></td>\r\n            <td style="text-align: right;">{{unit.owned("plane") | floor}}</td>\r\n        </tr>\r\n        <tr class="animate-show" ng-hide="unit.allUnits[\'fisher\'].owned < 10">\r\n            <td><a ng-href="#/tab/fish/boat">Boats</a></td>\r\n            <td style="text-align: right;">{{unit.owned("boat") | floor}}</td>\r\n        </tr>\r\n        <tr>\r\n            <td><a ng-href="#/tab/fish/fisher">Fisher</a></td>\r\n            <td style="text-align: right;">{{unit.owned("fisher") | floor}}</td>\r\n        </tr>\r\n        <tr>\r\n            <td><a ng-href="#/tab/fish/fish">Fish</a></td>\r\n            <td style="text-align: right;">{{unit.owned("fish") | floor }}</td>\r\n        </tr>\r\n    </table>\r\n</div>\r\n-->'),a.put("views/officeworker.html",'<div style="width: 20%; float: left; margin-right: 15px"> <table class="table unit-table table-hover"> <tr> <td><a ng-href="#/tab/dollars/officeworker">Office Worker</a></td> <td style="text-align: right">{{main.user.units[\'officeworker\'].owned}}</td> </tr> <tr> <td><a ng-href="#/tab/dollars">Dollars</a></td> <td style="text-align: right">{{main.user.units[\'dollar\'].owned | floor}}</td> </tr> </table> </div> <div class="content"> <h2>Office Worker</h2> <p>Working 9 to 5 this guy automatically sells your fish.<br> <br>You own {{main.user.units[\'officeworker\'].owned}} Office Workers <br>1 Office Worker costs {{main.user.units[\'officeworker\'].price | number:2}} Dollars <br>1 Office Worker sells {{main.user.units[\'officeworker\'].efficiency }} Fish per Second <br>In total your Office Worker sell {{main.user.units[\'officeworker\'].owned * main.user.units[\'officeworker\'].efficiency | floor}} fish per second</p> <p><i>"God I hate this job!"</i></p> <button ng-click="main.user.buyOne(main.user.units[\'officeworker\'])">Buy 1 Worker!</button> </div>'),a.put("views/options.html",'<div class="content"> <h2>Options</h2> <h5>Your save data:</h5> {{options.saveState}} <button ng-click="options.saveData()">Save to localStorage</button> {{options.saveSuccess}}<br> <button ng-click="options.loadData()">Load from localStorage</button> <p> <h5>Import savegame</h5> <input ng-model="options.importString"><button ng-click="options.import()">Import</button> </p> <p> <h5>Reset</h5> <button ng-click="options.reset()">Reset</button> </p> </div>'),a.put("views/research.html",'<div class="content-research" ng-controller="ResearchCtrl as research"> <h2>Research</h2> <table> <thead> <th>Unit</th> <th>Cost</th> <th>Effect</th> <th style="text-align: center">Research</th> </thead> <tr ng-repeat="unit in research.units" ng-show="unit.upgradeprice > 0 && unit.unlocked==true"> <td>{{unit.name}}</td> <td>{{unit.upgradeprice | floor}}</td> <td>x{{unit.efficiencyfactor}}</td> <td><button ng-click="research.upgradeUnit(unit)">Research</button></td> </tr> </table> <!--\n  <div ng-show="research.tierchange" class="animate-show">\n    <p><h5>Tier {{research.data.tier}}</h5>\n    Unlock everything to advance to the next tier</p>\n\n\n    <table>\n      <thead>\n      <th>Unit</th>\n      <th>Effect</th>\n      <th>Cost</th>\n      <th>Just do it!<img src="images/minishia.445a73ad.png"></th>\n      </thead>\n      <tr ng-repeat="item in research.data[\'tier\'+research.data.tier]">\n        <td>{{research.units[item.unit].name}}</td>\n        <td>{{research.units[item.unit].efficiency}}</td>\n        <td>{{research.units[item.unit].upgradeprice | floor}}</td>\n        <td>\n          <div ng-show="research.units[item.unit].tier == research.data.tier">\n            <button ng-click="research.doUpgrade(research.units[item.unit], research.data.tier)">Research!</button>\n          </div>\n          <div ng-show="research.units[item.unit].tier != research.data.tier">\n            <button disabled>Research!</button>\n            <span class="glyphicon glyphicon-ok" style="color:green"></span>\n          </div>\n        </td>\n      </tr>\n    </table>\n  </div>\n  <!--\n      <table>\n          <thead>\n          <th>Unit</th>\n          <th>Effect</th>\n          <th>Cost</th>\n          <th>Just do it!</th>\n          </thead>\n          <tr></tr>\n          <td>Office Worker</td>\n          <td>Increase Office Worker efficiency by 100%</td>\n          <td>Cost: 200 Dollars</td>\n          <td><button disabled>Research</button><span style="color: green" class="glyphicon glyphicon-ok"></span></td>\n          <td><button>Research</button></td>\n          <tr></tr>\n          <td>Fisher</td>\n          <td>Increase Fishing efficiency by 200%</td>\n          <td>Cost: 50 Dollars</td>\n          <td><button>Research</button></td>\n          <tr></tr>\n          <td>Boat</td>\n          <td>Increase Fishing efficiency by 100%</td>\n          <td>Cost: 25 Dollars</td>\n          <td><button>Research</button></td>\n      </table>\n     --> </div>'),a.put("views/unit.html",'<div style="width: 20%; float: left; margin-right: 15px" ng-controller="UnitCtrl as unit"> <table class="table unit-table table-hover"> <tr class="animate-show" ng-hide="unit.allUnits[\'submarine\'].owned < 10"> <td><a ng-href="#/tab/fish/nuke">Nukes</a></td> <td style="text-align: right">{{unit.owned("nuke") | floor}}</td> </tr> <tr class="animate-show" ng-hide="unit.allUnits[\'plane\'].owned < 10"> <td><a ng-href="#/tab/fish/submarine">Submarines</a></td> <td style="text-align: right">{{unit.owned("submarine") | floor}}</td> </tr> <tr class="animate-show" ng-hide="unit.allUnits[\'robot\'].owned < 10"> <td><a ng-href="#/tab/fish/plane">Planes</a></td> <td style="text-align: right">{{unit.owned("plane") | floor}}</td> </tr> <tr class="animate-show" ng-hide="unit.allUnits[\'boat\'].owned < 10"> <td><a ng-href="#/tab/fish/robot">Robots</a></td> <td style="text-align: right">{{unit.owned("robot") | floor}}</td> </tr> <tr class="animate-show" ng-hide="unit.allUnits[\'dynamite\'].owned < 10"> <td><a ng-href="#/tab/fish/boat">Boats</a></td> <td style="text-align: right">{{unit.owned("boat") | floor}}</td> </tr> <tr class="animate-show" ng-hide="unit.allUnits[\'fisher\'].owned < 10"> <td><a ng-href="#/tab/fish/dynamite">Dynamite</a></td> <td style="text-align: right">{{unit.owned("dynamite") | floor}}</td> </tr> <tr> <td><a ng-href="#/tab/fish/fisher">Fisher</a></td> <td style="text-align: right">{{unit.owned("fisher") | floor}}</td> </tr> <tr> <td><a ng-href="#/tab/fish/fish">Fish</a></td> <td style="text-align: right">{{unit.owned("fish") | floor }}</td> </tr> </table> </div> <div class="content" ng-controller="UnitCtrl as unit"> <h2>{{unit.cur.name}}</h2> <!-- Spawn the <br> and subtext only if the subtext exists --> <span ng-if="unit.cur.subtext != \'\'"><p>{{unit.cur.subtext}}<br></p></span> <br>You own {{unit.cur.owned | floor}} {{unit.cur.plural}} <span ng-if="unit.cur.price > 0"> <br>1 {{unit.cur.name}} costs {{unit.cur.price | floor}} Dollars </span> <span ng-if="unit.cur.efficiency > 0"> <br>1 {{unit.cur.name}} catches {{unit.cur.efficiency}} Fish every 1 seconds </span> <span ng-if="unit.cur.efficiency > 0"> <br>In total your {{unit.cur.plural}} catch {{unit.cur.owned * unit.cur.efficiency | floor}} fish per second </span> <p><i>"{{unit.cur.quote}}"</i></p> <span ng-if="unit.cur.price > 0"> <button ng-click="unit.buyOne(unit.cur)">Buy 1 {{unit.cur.name}}!</button></span> <!-- Straight up hack to get the fishing button to show up on the fishing page --> <span ng-if="unit.cur.price == 0" ng-controller="MainCtrl as main"> <span ng-if="main.user.isFishing"><button disabled>Go Fish!</button></span> <span ng-if="!main.user.isFishing"><button ng-click="main.user.goFish()">Go Fish!</button></span> </span> </div>')}]);