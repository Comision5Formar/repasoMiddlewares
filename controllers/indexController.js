module.exports = {
    index : (req,res) => {
        res.render('index', { title: 'Express' });
    },
    admin : (req,res) => {
        res.render('admin');
    }
}