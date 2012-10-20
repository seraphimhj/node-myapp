/**
 * config
 */

var path = require('path');

exports.config = {
    debug: true,
    name: 'Driver TEST',
    description: '专业驾校测试题库',
    version: '0.0.1',

    // site settings
    site_headers: [
        '<meta name="author" content="HJian" />',
    ],
    host: 'localhost',
    site_logo: '', // default is `name`
    site_navs: [
        // [ path, title, [target=''] ]
        [ '/about', '关于' ],
    ],
    site_static_host: './public', // 静态文件存储域名
    site_enable_search_preview: false, // 开启google search preview
    site_google_search_domain:  '',  // google search preview中要搜索的域名

    db: 'mongodb://127.0.0.1/driver_test',
    session_secret: 'driver-test',
    auth_cookie_name: 'driver-test',
    port: 3000,

    // 话题列表显示的话题数量
    list_topic_count: 20,

    // site links
    //site_links: [
    //{
    //    'text': 'Node 官方网站',
    //    'url': 'http://nodejs.org/'
    //},
    //{
    //    'text': 'Node Party',
    //    'url': 'http://party.cnodejs.net/'
    //},
    //{
    //    'text': 'Node 入门',
    //    'url': 'http://nodebeginner.org/index-zh-cn.html'
    //},
    //{
    //    'text': 'Node 中文文档',
    //    'url': 'http://docs.cnodejs.net/cman/'
    //}
    //],

    // mail SMTP
    mail_port: 25,
    mail_user: 'club',
    mail_pass: 'club',
    mail_host: 'smtp.126.com',
    mail_sender: 'club@126.com',
    mail_use_authentication: true,

    //weibo app key
    weibo_key: 10000000,

    // admin 可删除话题，编辑标签，设某人为达人
    admins: { admin: true },

    // [ { name: 'plugin_name', options: { ... }, ... ]
    plugins: [
        // { name: 'wordpress_redirect', options: {} }
    ]
};
