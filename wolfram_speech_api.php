<?=file_get_contents('https://api.wolframalpha.com/v1/spoken?i=' . urlencode($_GET['q']) . '&appid=X2KGLK-644VH68H8R');
// Please don't use this appid – you can get one yourself at http://products.wolframalpha.com/api/documentation.html
