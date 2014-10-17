rules = [
{
name: "about:haoutil", // 规则名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
state: true, //可选，true 表示启用此规则
wildcard: false, // 可选，true 表示 from 是通配符
regex: false, // 可选，true 表示 from 是正则表达式
resp: false // 可选，true 表示替换 response body
},
{
name: "NoRedirect",
from: /^https?:\/\/\\w[\\x21-\\x2e\\x30-\\x7e]+\\.(com|cn|org|net|info|tv)\/url?=(.+)/i,
to: "$1",
regex: true
},
{
name: "userscripts to mirror",
from: /^https?:\/\/userscripts\.org\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
name: "userscripts:8080 to mirror",
from: /^https?:\/\/userscripts\.org:8080\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
// 包含手机版界面
name: "百度随心听音质320",
from: /^https?:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
regex: true
},
{
name: "Google公共库重定向到国内镜像",
state: true,
from: /^https?:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
regex: true
},
{
name: "重定向贴吧mo到贴吧",
from: /^https?:\/\/tieba\.baidu\.com\/mo\/m(.*)/i,
to: "http:\/\/tieba.baidu.com/f$1",
regex: true
},
{
name: "重定向tb到taobao",
from: /^https?:\/\/(.*?)tb\.com\/(.*)$/,
to: "http://$1taobao.com/$2",
regex: true
},
{
name: "重定向tm到tmall",
from: /^https?:\/\/(.*?)tm\.com\/(.*)$/,
to: "http://$1tmall.com/$2",
regex: true
},
{
name: "The Economist Print Edition",
from: /^https?:\/\/www\.economist\.com\/(.*)\/(.*)/i,
to: "http://www.economist.com/$1/$2/print",
exclude: /^http:\/\/www\.economist\.com\/.*\/print/i,
regex: true
},
{
name: "百度盘下载地址替换",
from: /^https?:\/\/\d+\.\d+\.\d+\.\d+\/cdn\.baidupcs\.com\/file\/(.*)/i,
to: 'http://www.baidupcs.com/$1',
regex: true
},
{
name: "game2233去掉Flashget",
from: /^https?:\/\/www\.game2233\.com\/(.*?)&union=flashget(.*)/i,
to: 'http://www.game2233.com/$1',
regex: true
},
{
name: "tradingfloor origianl image",
from: /^https?:\/\/www\.tradingfloor\.com\/images\/article\/max608w\/(.*)/i,
to: 'https://www.tradingfloor.com/images/article/original/$1',
regex: true
},
];