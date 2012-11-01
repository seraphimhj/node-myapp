/**
 * config
 */

var path = require('path');
       
// Mongodb with Cloudfoundry
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-2.0'][0]['credentials'];
} else {
  var mongo = {
      "hostname":"localhost",
      "port":27017,
      "username":"",
      "password":"",
      "name":"",
      "db":"db"
  }
}

var generate_mongo_url = function(obj) {
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'test');

  if(obj.username && obj.password) {
      return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  } else {
      return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}

exports.config = {
    debug: true,
    name: '排号系统',
    description: '排号平台，效率生活，优雅生活',
    version: '0.0.1',

    // site settings
    site_headers: [
        '<meta name="author" content="HuangJian" />',
    ],
    site_logo: '', // default is `name`
    site_navs: [
        [ '/about', '关于' ],
    ],
    site_static_host: './public', // 静态文件存储域名
    site_enable_search_preview: false, // 开启google search preview
    site_google_search_domain:  '',  // google search preview中要搜索的域名

    db: generate_mongo_url(mongo),
    hostname: 'driver.cloudfoundry.com',
    port: '26611',

    session_secret: 'whoisyourdaddy',
    auth_cookie_name: 'godisgreedy',

    // 话题列表显示的话题数量
    list_topic_count: 20,

    // mail SMTP
    mail_port: 25,
    mail_user: 'hongrui',
    mail_pass: '',
    mail_host: 'smtp.126.com',
    mail_sender: 'hongrui@126.com',
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

