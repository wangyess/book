;(function () {
    'use strict';

    var last_id, article_data;

    //................................进行初始化................................

    init_data();

    function init_data() {
        last_id = s.get('last_id');
        article_data = s.get('article_data');
        //判断
        if (!last_id) {
            last_id = 0;
            s.set('last_id', last_id)
        }
        if (!article_data) {
            article_data = [];
            s.set('article_data', article_data);
        }
    }

    //..............................获取 HTML 页面内容 ............................
    var btn = document.getElementById('btn');
    var article_list = document.getElementById('article-list');


    //..............................点击添加出发添加事件............................
    btn.addEventListener('click', oneFan);


    //.................................渲染到页面上...............................
    function render() {
        article_list.innerHTML = '';

        article_data.forEach(function (item) {
            var mydiv = document.createElement('div');
            mydiv.style.marginTop = '10px';
            mydiv.style.border = '1px solid #D3D3D3';
            mydiv.innerHTML = ` 
              <input type="button" id="btn_${item.id}" onclick="familk(this)" value="x">
               <p style="text-align: center; font-weight: 700; font-size: 18px;">${item.title}</p>
               <p style="text-align: center">${item.content}</p>
               <p style="text-align: center">${"作者: " + item.author}</p>
              `;
            article_list.appendChild(mydiv);
        });
    }

    //..................................增加....................................

    function oneFan() {
        var input_title = document.getElementById('input-title').value;
        var input_content = document.getElementById('input-content').value;
        var input_aythor = document.getElementById('input-author').value;
        add(input_title, input_content, input_aythor);
    }

    function add(title, content, author) {
        var new_article = {
            title: title,
            content: content,
            author: author,
            id: s.get('last_id') + 1,
            discuss: [],
        };
        article_data.push(new_article);
        render();
        //.........................更新下硬盘中的数据
        updata_article();
        updata_id();

    }

    //..................................删除....................................
    window.familk = familk;

    function familk(obj) {
        var n = obj.id;
        var m = n.slice(4);
        var b = Number(m);
        del(b);
    }

    function del(id) {
        var article_index = search_article_id(id);
        if (article_index !== -1) {
            article_data.splice(article_index, 1);
        }
        updata_article();
        render();
    }

    //...............................通过ID查找索引..............................
    function search_article_id(id) {
        return article_data.findIndex(function (item) {
            if (item.id === id) {
                return true;
            }
        })
    }

    //..................................修改....................................
    //amend(1,'小温');
    function amend(id, title, content, author) {
        var amend_index = search_article_id(id);
        if (title) {
            article_data[amend_index].title = title;
        }
        if (content) {
            article_data[amend_index].content = content;
        }
        if (author) {
            article_data[amend_index].author = author;
        }

        updata_article();
    }

    //..................................查看....................................
    //reade('温');
    function reade(keyword) {
        article_data.find(function (item) {
            if (item.title.indexOf(keyword) !== -1) {
                console.log(item);
            }
        })
    }

    //...................................评论..................................
    //discuss_content(1,'我很好');
    function discuss_content(id, content) {
        var discuss_index = search_article_id(id);
        var arr = article_data[discuss_index].discuss;
        arr.push({type: content});
        updata_article();
    }

    //..............................更新硬盘中数据函数............................
    function updata_article() {
        s.set('article_data', article_data);
    }

    function updata_id() {
        var last_id = s.get('last_id');
        s.set('last_id', last_id + 1);
    }


})();
