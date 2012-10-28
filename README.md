# My First Node APP

## Prepare

1. NodeJS 官方网站: http://www.nodejs.org

1. NodeJS入门: http://nodebeginner.org/index-zh-cn.html

1. NodeJS中文社区: http://club.cnodejs.org

1. NodeJS toolbox: http://toolbox.no.de

## CodeStyle

Teamwork必须要有好的代码规范，统一去遵守并严格执行，一个团队项目才有可能成功。

NodeJS作为新的框架，代码规范并不完善，可以参考下面提供的。

参考：
* https://github.com/windyrobin/iFrame/blob/master/style.md
* http://nodeguide.com/style.html
* http://cnodejs.org/topic/4f16442ccae1f4aa27001051


## Install & Deploy

```bash
// install node npm mongodb
// run mongod
$ npm install
$ cp config.default.js config.js
// modify the config file as yours
$ node app.js
```
### Deploy to Cloudfoundry
```bash
// you need memory larger than 64M
// and monogodb service bind
$ vmc push app-name --runtime node08
// if app running
$ vmc apps
// deploy info
$ vmc logs app-name
```


## TEST

```bash
$ make test
```

jscoverage

```bash
$ make test-cov
```

## Resource
 
Modules: https://github.com/joyent/node/wiki/modules

[express](https://github.com/visionmedia/express)
[中文文档](http://www.csser.com/board/4f77e6f996ca600f78000936)

[ejs](https://github.com/visionmedia/ejs)
[中文文档](http://www.csser.com/board/4fddc4f0b28ed7d857001674)

[mongoose](https://github.com/LearnBoost/mongoose)
[中文文档(http://www.csser.com/board/4f4e92dbeb0defac5700011e)

[eventproxy](https://github.com/JacksonTian/eventproxy）
[API](http://eventproxy.html5ify.com/jsdoc/symbols/EventProxy.html)

## License

( The MIT License )

Copyright (c) 2012 muyuan, fengmk2 and other nodeclub contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
