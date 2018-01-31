var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

var server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	progress: true,
	stats: {
		colors: true,
	},
	// proxy
});


//mock数据，都放在data.json中
var appData = require('./data.json');
var indexData = appData.indexData;
var AboutData = appData.AboutData;
var EmploymentData = appData.EmploymentData;
var EmploymentDetailData = appData.EmploymentDetailData;
var applicationData = appData.applicationData;
var NewsData = appData.NewsData;
var ServiceData = appData.ServiceData;
var CorporationData = appData.CorporationData;

//获取首页的数据
server.app.get('/getIndexData', function(req, res) {
	res.json({
		http_code: 200,
		data: indexData
	});
});
//获取关于页的数据
server.app.get('/getAboutData', function(req, res) {
	res.json({
		http_code: 200,
		data: AboutData
	});
});
//获取招聘页的数据
server.app.get('/getEmploymentData', function(req, res) {
	res.json({
		http_code: 200,
		data: EmploymentData
	});
});
//获取招聘详情页的数据
server.app.get('/getEmploymentDetailData', function(req, res) {
	res.json({
		http_code: 200,
		data: EmploymentDetailData
	});
});
//获取招聘申请页的数据
server.app.get('/getApplicationData', function(req, res) {
	res.json({
		http_code: 200,
		data: applicationData
	});
});
//获取新闻活动页的数据
server.app.get('/getNewsData', function(req, res) {
	res.json({
		http_code: 200,
		data: NewsData
	});
});
//获取服务导航页的数据
server.app.get('/getServiceData', function(req, res) {
	res.json({
		http_code: 200,
		data: ServiceData
	});
});
//获取社区服务页的数据
server.app.get('/getCorporationData', function(req, res) {
	res.json({
		http_code: 200,
		data: CorporationData
	});
});


// 将其他路由，全部返回index.html
server.app.get('*', function(req, res) {
	res.sendFile(__dirname + '/index.html')
});

server.listen(8088, function() {
	console.log('正常打开8088端口')
});
