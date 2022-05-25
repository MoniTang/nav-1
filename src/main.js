const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: "B", url: 'https://baidu.com/' },
    { logo: "I", url: 'https://www.iconfont.cn/' },
    { logo: "X", url: 'https://xiedaimala.com/' }
];
//简化URL
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace("http://", '')
        .replace("www", '')
}

// 添加一个网址
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site"> 
            <div class="logo">${node.logo[0]}</div>         
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
            <use xlink:href="#icon-delete"></use>
        </svg></div>
        </div> 
       </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    });
}

render()
$('.addButton').on('click', () => {
    //给addButton添加一个监听事件，当点击addButton时弹出一个窗口
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('https') !== 0) {
        url = 'https://' + url
    }
    //创建一个siteList，并插入最后一个lastLi前面
    hashMap.push({
        logo: simplifyUrl(url)[0],
        url: url
    });
    render()

});
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)

}

