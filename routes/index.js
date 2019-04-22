exports.index = function(req, res){
    res.render('index', {title: 'Title'});
};
exports.dashboard = function (req, res) {
    res.render('dashboard');
};
