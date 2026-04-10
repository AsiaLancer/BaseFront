<template>
    <div class="test">
        <div class="container">
            <div class="html">
                <h1>hello Html</h1>
            </div>
            <br>
            <hr>
            <b>加粗</b>
            <i>斜体</i>
            <p>11</p>
            <strong>sss</strong>
            <strong>s11</strong>
            <img title="美女" src="../assets/imgs/im_00002_.png" alt="美女" width="100px" height="auto">
            <img src="../assets/imgs/im_mo.gif" alt="">
            <div>
                <video src="../assets/1.mp4" controls width="300px" height="auto" loop></video>
            </div>

            <audio src="/src/assets/2.mp3" controls></audio>
            <a href="https://www.baidu.com" target="_blank">百度一下 </a>
            <a href="https://www.taobao.com" target="_blank">淘宝一下 </a>
            <a href="dowload.exe"> 下载</a>
            <a href="mailto:1786850620@qq.com"> mail</a>

            <div>
                <h1 id="1">标题1</h1>
            </div>
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li>列表1</li>
                <li>列表2</li>
                <li>列表3</li>
                <li>列表4</li>
                <li>列表5</li>
            </ul>
            <ol type="a" style="list-style-type: decimal;">
                <li>有序列表1</li>
                <li>有序列表2</li>
                <li>有序列表3</li>
                <li>有序列表4</li>
                <li>有序列表5</li>
            </ol>
            <dl>
                <dt>定义列表标题1</dt>
                <dd>定义列表内容1</dd>
                <dt>定义列表标题2</dt>
                <dd>定义列表内容2</dd>
                <dt>定义列表标题3</dt>
                <dd>定义列表内容3</dd>
            </dl>
            <div>
                <table class="t-1"
                    style=" border: 1px solid gray; border-collapse: separate; width: 400px; margin: 0 auto; text-align: center; font-size: 14px;">
                    <caption>这是一个表格</caption>
                    <thead>
                        <tr>
                            <th>表头1</th>
                            <th>表头2</th>
                            <th>表头3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>表头1</th>
                            <th>表头2</th>
                            <th>表头3</th>
                        </tr>
                        <tr>
                            <td>数据1</td>
                            <td>数据2</td>
                            <td>数据3</td>
                        </tr>
                        <tr>
                            <td>数据1</td>
                            <td>数据2</td>
                            <td>数据3</td>
                        </tr>
                        <tr>
                            <td>数据1</td>
                            <td>数据2</td>
                            <td>数据3</td>
                        </tr>
                    </tbody>
                </table>

                <br />

                <table border="1">
                    <thead>
                        <tr>
                            <th>表头1</th>
                            <th>表头2</th>
                            <th>表头3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2">数据1</td>
                            <td>数据3</td>
                        </tr>
                        <tr>
                            <td>数据1</td>
                            <td>数据2</td>
                            <td rowspan="2">数据3</td>
                        </tr>
                        <tr>
                            <td>数据1</td>
                            <td>数据2</td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <a href="#1">跳转到标题1</a>
            <div>
                <form action="" method="get">
                    <ul>
                        <li>
                            <label for="username">账号</label>
                            <input id="username" type="text" placeholder="请输入账号" value="" name="username" accesskey="u"
                                autocomplete="off">
                        </li>
                        <li>
                            <label for="password">密码</label>
                            <input id="password" type="password" value="" placeholder="请输入密码" name="password"
                                autocomplete="off">
                        </li>
                        <li>
                            <label for="first">one</label>
                            <input type="checkbox" name="one" id="first" value="1">
                            <label for="second">two</label>
                            <input type="checkbox" name="two" id="second" value="2">
                            <label for="third">three</label>
                            <input type="checkbox" name="three" id="third" value="3">
                        </li>
                        <li>
                            <label for="boy">boy</label>
                            <input type="radio" name="gender" id="boy" value="男" checked>
                            <label for="girl">girl</label>
                            <input type="radio" name="gender" id="girl" value="女">
                        </li>
                        <li>
                            <select name="country" id="">
                                <option value="" disabled>请选择国家</option>
                                <option value="china">中国</option>
                                <option value="usa">美国</option>
                                <option value="japan">日本</option>
                                <option value="korea">韩国</option>
                                <option value="england">英国</option>
                            </select>
                        </li>
                        <li>
                            <input type="file" name="file" id="" multiple accept="image/*">
                        </li>

                        <li>
                            <textarea name="msg" id="msg" cols="20" rows="10"></textarea>
                        </li>

                        <li>
                            <input type="submit" value="提交">
                            <input type="reset" value="重置">
                            <button>按钮</button>
                        </li>
                    </ul>
                </form>
                <div style="background-color: lightgray; width: 100px; height: 100px; border: 1px solid red; ">
                    特殊字符实体：
                    &lt; &gt; &amp; &quot; &copy; &reg; &yen; &euro; &sect; &deg; &hellip;
                </div>
                <p style="text-indent: 2em;letter-spacing: 5px;">
                    大瑟吉欧天生骄傲
                </p>
                <div class="pseudo-element">
                    伪元素
                </div>
            </div>

            <a href="#">修改字体颜色</a>
            <a href="#" class="font">修改字体颜色</a>
            <a href="#" class="font14">修改字体颜色</a>
            <a href="#" class="font16">修改字体颜色</a>
            <a href="#" class="red">修改字体颜色</a>

            <p class="testp" id="p-text">test</p>
        </div>

        <div class="box1" style="border-radius: 10px 30px;">
            盒子1
        </div>
        <div class="box2" style="border-radius: 10px 80px 50px;">
            盒子2
        </div>
        <div class="box3" style="border-radius: 20px 0;">
            盒子3
        </div>
        <div class="box4">
            盒子4
        </div>
        <div class="roll-box">
            background-color
        </div>
        <div class="roll-box1">
            background-color1
        </div>
        <div class="roll-box2">
            background-color
        </div>
        <div class="roll-box3">
            box-shaow
        </div>
        <div class="roll-box4">
            box-textasdasdasdasdasasdasdgaweeeeeeee
        </div>
        <div class="roll-box5" id="roll-box5">
            ‘小妖怪的夏天”团队！动画
            电影《浪浪山小妖怪》新预
            告，取经赛道的离谱组合值
            得期待
        </div>
        <div id="roll-box6">
            <div class="title">
                <span>最新动态</span>
                <span>更多</span>
                <img src="../assets/imgs/im_mo.gif" alt="" style="width: 60px; height: 30px;">
            </div>
            <ul class="scontent" id="scontent">
                <li>
                    <a href="电影">电影</a>
                    <a href="购物">购物</a>
                    <a href="游戏">游戏</a>
                    <a href="购物">购物</a>
                </li>
            </ul>
        </div>

        <div class="item-box7">
            <div class="item">
                1
            </div>
            <div class="item">
                2
            </div>
            <div class="item">
                3
            </div>
            <div class="item">
                4
            </div>
            <div class="item">
                5
            </div>
            <div class="item">
                6
            </div>
            <div class="item">
                7
            </div>
            <div class="item">
                8
            </div>
        </div>
        <div class="item-box8">
            <div class="item1">
                9
            </div>
            <div class="item1">
                10
            </div>
            <div class="item1">
                11
            </div>
            <div class="item1">
                12
            </div>
            <div class="item1">
                11
            </div>
            <div class="item1">
                12
            </div>
            <div class="item1">
                11
            </div>
            <div class="item1">
                12
            </div>
        </div>
        <div class="search-box">
            <input type="text" placeholder="请输入搜索信息?" value="" name="searchname" accesskey="s" autocomplete="off">
        </div>
        <div class="w">
            <div class="item-box9">
                <div class="item2">
                    <div class="item2-content">
                        13
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        14
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        15
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        16
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        17
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        18
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        19
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        20
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        21
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        22
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        23
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        24
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        25
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        26
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        27
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-content">
                        28
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer-content">
                <div class="footer-content1">
                    <div class="footer-content1-title">
                        关于我们
                    </div>
                </div>
            </div>
        </div>

        <div class="item-box10">
            <div class="item3">
                13
            </div>
            <div class="item3">
                14
            </div>
            <div class="item3">
                15
            </div>
            <div class="item3">
                16
            </div>
            <div class="item3">
                17
            </div>
            <div class="item3">
                18
            </div>
            <div class="item3">
                19
            </div>
            <div class="item3">
                20
            </div>
            <div class="item3">
                21
            </div>
            <div class="item3">
                22
            </div>
            <div class="item3">
                23
            </div>
            <div class="item3">
                24
            </div>
            <div class="item3">
                25
            </div>
            <div class="item3">
                26
            </div>
            <div class="item3">
                27
            </div>
            <div class="item3">
                28
            </div>
        </div>
        <div class="footer">
            <div class="footer-content">
                <div class="footer-content1">
                    <div class="footer-content1-title">
                        关于我们
                    </div>
                </div>
            </div>
        </div>
        <div class="middle-img">
            <img src="../assets/imgs/im_00002_.png" alt="">你好
        </div>
        <div class="position-r">
            <div class="position-r-content">
                123
            </div>
            <div class="position-r-content">
                123
            </div>
        </div>
        <div class="position-p">
            <div class="position-p-content">
                123
            </div>
            <div class="position-p-content">
                123
            </div>
        </div>
        <div class="position-f">
            fixed
        </div>
        <div class="position-s">
            nav
        </div>
        <div class="position-s-content">
            main
        </div>

        <div class="gird-container1">
            <div class="gird-container1-item">
                1
            </div>
            <div class="gird-container1-item">
                2
            </div>
            <div class="gird-container1-item">3</div>
            <div class="gird-container1-item">4</div>
            <div class="gird-container1-item">5</div>
            <div class="gird-container1-item">6</div>
            <div class="gird-container1-item">7</div>
            <div class="gird-container1-item">8</div>
            <div class="gird-container1-item">9</div>
        </div>
        <div class="gird-container2">
            <div class="gird-container2-item">
                1
            </div>
            <div class="gird-container2-item">
                2
            </div>
            <div class="gird-container2-item">3</div>
            <div class="gird-container2-item">4</div>
            <div class="gird-container2-item">5</div>
            <div class="gird-container2-item">6</div>
            <div class="gird-container2-item">7</div>
            <div class="gird-container2-item">8</div>
            <div class="gird-container2-item">9</div>
            <div class="gird-container2-item">10</div>
            <div class="gird-container2-item">11</div>
            <div class="gird-container2-item">12</div>
            <div class="gird-container2-item">13</div>
        </div>

        <div class="gird-container3">
            <div class="gird-container3-item">
                1
            </div>
            <div class="gird-container3-item">
                2
            </div>
            <div class="gird-container3-item">3</div>
            <div class="gird-container3-item">4</div>
            <div class="gird-container3-item">5</div>
            <div class="gird-container3-item">6</div>
            <div class="gird-container3-item">7</div>
            <div class="gird-container3-item">8</div>
            <div class="gird-container3-item">9</div>
        </div>

        <div class="gird-container4">
            <div class="gird-container4-item">
                1
            </div>
            <div class="gird-container4-item">
                2
            </div>
            <div class="gird-container4-item">3</div>
            <div class="gird-container4-item">4</div>
            <div class="gird-container4-item">5</div>
            <div class="gird-container4-item">6</div>
            <div class="gird-container4-item">7</div>
            <div class="gird-container4-item">8</div>
            <div class="gird-container4-item">9</div>
        </div>

        <div class="gird-container5">
            <div class="gird-container5-item">1</div>
            <div class="gird-container5-item">2</div>
            <div class="gird-container5-item">3</div>
            <div class="gird-container5-item">4</div>
            <div class="gird-container5-item">5</div>
            <div class="gird-container5-item">6</div>
            <div class="gird-container5-item">7</div>
            <div class="gird-container5-item">8</div>
            <div class="gird-container5-item">9</div>
            <div class="gird-container5-item">10</div>
            <div class="gird-container5-item">11</div>
            <div class="gird-container5-item">12</div>
        </div>

        <div class="translate-box1">
            123
        </div>
        <div class="translate-box2">
            456
        </div>

        <div class="gamebox">
            英雄联盟
        </div>

        <div class="book">
            <div class="bookbox1 front">
                1
            </div>
            <div class="bookbox2 back">
                2
            </div>
        </div>
        <div class="circle-box">
            <div class="circle">
                123
            </div>
        </div>

        <div class="rorate-box-x">213</div>
        <div class="rorate-box-y">213</div>
        <div class="rorate-box-z">213</div>

        <div class="card-box">
            <div class="card">
                <h3>哗啦啦啦的下雨</h3>
            </div>
            <div class="card">
                <h3>秋风扫落叶</h3>
            </div>
        </div>

        <div class="animation-box1">
            213
        </div>

        <div class="skew-box">
            213
        </div>

        <div class="scroll-box">
            <div class="scroll">
                <div class="scroll-box-item">
                    <p>1</p>
                </div>
                <div class="scroll-box-item">
                    <p>2</p>
                </div>
            </div>
        </div>

        <div class="flexmove">
            <div class="flexmove-item">
                1
            </div>
            <div class="flexmove-item">
                2
            </div>
            <div class="flexmove-item">
                3
            </div>
            <div class="flexmove-item">
                4
            </div>
        </div>

        <div class="text-r">
            123
        </div>

        <div class="reflect-box">
            <div class="reflect-box-item">
                1
            </div>
        </div>

        <div class="reflect-box2">
            <div class="reflect-box2-item">
                1
            </div>
            <div class="reflect-box2-item">
                2
            </div>
            <div class="reflect-box2-item">
                3
            </div>
            <div class="reflect-box2-item">
                4
            </div>
            <div class="reflect-box2-item">
                5
            </div>
        </div>
        <div class="r-box-box">
            <div class="r-boxbox">
                2
            </div>
            <div class="r-boxbox-item">
                1
            </div>
        </div>
        <div class="svg-box">
            <svg class="pc-only absolute left-0 top-0 pc:w-3520px pc:h-301px" viewBox="0 0 3520 301" fill="none"
                opacity="0.2" xmlns="http://www.w3.org/2000/svg">
                <path class="svg-path"
                    d="M2 98.3546C177.569 -2.32258 469.504 -49.999 637.698 90.2674C742.655 177.796 841.5 348.045 1112.5 285.447C1296.5 242.945 1377 82.9804 1653.5 18.4478C1967.5 -54.8368 2072 134.055 2258 244.947C2494.5 385.947 2692.5 221.947 2883.5 96.9453C3059.07 -3.73182 3349.5 -49.999 3517.7 90.2674"
                    stroke="#00D700" stroke-width="3" stroke-linecap="round"></path>
            </svg>
        </div>
        <svg width=100 height=100 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
        <div class="clip-box">
            123
        </div>

        <div class="swap-img">
            <img src="../assets/imgs/im_00003_.png" alt=""></img>
            <img src="../assets/imgs/im_00002_.png" alt=""></img>
        </div>

        <div class="scroll-clip">
            <h1>HelloNiuQian</h1>
            <h1>HelloNiuQian</h1>
        </div>
        <div class="view-scroll">
            <img src="../assets/imgs/im_00004_.png" alt="">
        </div>

        <div class="toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <div class="toggle-box">
                <ul>
                    <li style="--i: 1;">
                        1
                    </li>
                    <li style="--i: 2;">
                        2
                    </li>
                    <li style="--i: 3;">
                        3
                    </li>
                    <li style="--i: 4;">
                        4
                    </li>
                    <li style="--i: 5;">
                        5
                    </li>
                </ul>
            </div>
        </div>

        <div class="nav-herf">
            <a style="--i:0" href="#">home</a>
            <a style="--i:1" href="#">about</a>
            <a style="--i:2" href="#">3</a>
            <a style="--i:3" href="#">4</a>
            <a style="--i:4" href="#">5</a>
            <div class="animation">
            </div>
        </div>

        <div class="menu">
            <div style="--i:0;--color: #886941;"><span>1</span></div>
            <div style="--i:1;--color: #34ff11;"><span>2</span></div>
            <div style="--i:2;--color: #761254;"><span>3</span></div>
            <div style="--i:3;--color: #876867;"><span>4</span></div>
            <div style="--i:4;--color: #f51123;"><span>5</span></div>
            <div style="--i:5;--color: #a2131a;"><span>6</span></div>
            <div style="--i:6;--color: #512515;"><span>7</span></div>
            <div style="--i:7;--color: #732147;"><span>8</span></div>
        </div>
        <div class="relearn">
            <div class="relearn-box">
            </div>
        </div>
        <div class="dropdown-css">
            <div class="menu1">
                <div class="menu1-item">
                    <a href="#" class="menu1-link">产品中心 ▾</a>
                    <div class="dropdown-menu1">
                        <a href="#">手机</a>
                        <a href="#">电脑</a>
                        <a href="#">平板</a>
                        <a href="#">智能手表</a>
                    </div>
                </div>
                <div class="menu1-item">
                    <a href="#" class="menu1-link">产品中心 ▾</a>
                    <div class="dropdown-menu1">
                        <a href="#">手机</a>
                        <a href="#">电脑</a>
                        <a href="#">平板</a>
                        <a href="#">智能手表</a>
                    </div>
                </div>
                <div class="menu1-item">
                    <a href="#" class="menu1-link">产品中心 ▾</a>
                    <div class="dropdown-menu1">
                        <a href="#">手机</a>
                        <a href="#">电脑</a>
                        <a href="#">平板</a>
                        <a href="#">智能手表</a>
                    </div>
                </div>
            </div>
            <!-- 下拉菜单项 -->

        </div>
        <div class="nav-section">
            <div class="drop-group">
                <a href="#" class="drop-btn">产品中心 ▾</a>
                <div class="drop-content">
                    <a href="#" class="drop-link">智能手机</a>
                    <a href="#" class="drop-link">笔记本电脑</a>
                    <a href="#" class="drop-link">平板电脑</a>
                    <a href="#" class="drop-link">智能手表</a>
                </div>
            </div>
        </div>

        <div class="sr-box">
            <div class="sr-item">1</div>
            <div class="sr-item">2</div>
            <div class="sr-item">3</div>
            <div class="sr-item">4</div>
            <div class="sr-item">5</div>
            <div class="sr-item">6</div>
        </div>
        <div class="media-learn">
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
axios.get('/api/userPets/loadDataList')
    .then(response => {
        console.log(response);
        console.log('用户列表:', response.data);
    })
    .catch(error => {
        console.error('请求失败:', error);
    });
</script>

<style scoped>
.media-learn {
    height: 20vmin;
    width: 100%;
    background-color: #ff9e20;
}

@media screen and (min-width: 1200px) {
    .media-learn {
        background-color: #1be47f;
    }
}

@media screen and (max-width: 768px) {
    .media-learn {
        background-color: #ff2020;
    }
}


.sr-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;

}

.sr-item {
    background: #409eff;
    color: white;
    text-align: center;
    border-radius: 4px;
    width: calc(33.33% - 10px);
    height: 100px;
    line-height: 100px;
}



.nav-section {
    padding: 50px;
    background: #f0f0f0;
}

.drop-group {
    position: relative;
    display: inline-block;
    border: 2px dashed #ff6b6b;
    /* 红色虚线框显示范围 */
    padding: 5px;
}

.drop-btn {
    display: inline-block;
    padding: 12px 24px;
    background: #409eff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 16px;
}

.drop-content {
    position: absolute;
    bottom: 100%;
    left: 0;
    min-width: 160px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 100;
}

.drop-link {
    display: block;
    padding: 10px 16px;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

.drop-link:last-child {
    border-bottom: none;
}

.drop-link:hover {
    background: #f5f5f5;
    color: #409eff;
}

/* hover 整个 drop-group 时显示下拉内容 */
.drop-group:hover .drop-content {
    display: block;
}

.dropdown-css {
    font-family: Arial, sans-serif;
    width: 100%;
    padding: 20px;
}

.menu1 {
    display: flex;
    gap: 5px;
}



.menu1-item {
    position: relative;
}

.menu1-link {
    display: block;
    padding: 10px 20px;
    background: #409eff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
}

/* 下拉菜单 - 默认隐藏 */
.dropdown-menu1 {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 150px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 100;
}

/* hover 时显示 */
.menu1-item:hover .dropdown-menu1 {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-menu1 a {
    display: block;
    padding: 10px 15px;
    color: #333;
    border-bottom: 1px solid #eee;
}

.dropdown-menu1 a:last-child {
    border-bottom: none;
}

.dropdown-menu1 a:hover {
    background: #f0f0f0;
    color: #409eff;
}

.middle-img {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.middle-img img {
    height: 100%;
}

.search-box {
    position: relative;
    width: 300px;
    height: 50px;
    margin: 20px 10px;
    background-color: #34495e;
    border-radius: 8px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    font-size: 0;

}

.search-box input {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 50px;
    top: 0;
    line-height: 50px;
    text-decoration: none;
    border: none;
    outline: none;
    font-size: 18px;
    z-index: 1;
    border-radius: 8px;
    padding-left: 10px;
}

.search-box input:focus {
    outline: 2px solid #00D700;
}

.search-box input:focus::placeholder {
    color: hsl(0, 18%, 79%);
    /* 颜色 */
    font-size: 20px;
    /* 字体大小 */
    opacity: 0.5;
    /* 不透明度 */
    text-transform: none;
    /* 文本转换 */
}

.relearn {
    position: relative;
    width: 300px;
    height: 300px;
    background-color: #34495e;
}

.relearn-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background-color: #1d0404;
}


.menu {
    position: relative;
    display: flex;
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;
    margin: 150px auto;
    background: rgba(0, 0, 0, 0.1);
}

.menu div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background-color: var(--color);
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    border: 2px solid var(--color);
    border-radius: 50%;
    transition: all .8s calc(0.1s * var(--i));
    opacity: 1;
}

.menu:hover div {
    transform: rotate(calc(var(--i) * 45deg)) translateX(100px);
    opacity: 0.8;
}

.menu:hover div span {
    transform: rotate(calc(var(--i) * -45deg));
}

.menu div:hover {
    box-shadow: 0 0 10px var(--color), 0 0 20px var(--color);
    transition: all .5s;
}

.nav-herf {
    position: relative;
    width: 500px;
    height: 50px;
    margin: 20px auto;
    background-color: #34495e;
    border-radius: 8px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    font-size: 0;
}

.nav-herf a {
    position: relative;
    display: inline-block;
    width: var(--aleftW);
    height: 50px;
    top: 0;
    line-height: 50px;
    text-align: center;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 16px;
    z-index: 1;
    border-radius: 8px;
}

.nav-herf .animation {
    position: absolute;
    width: var(--aleftW);
    height: 50px;
    top: 0;
    z-index: 0;
    background-color: #bb4a4a;
    border-radius: 8px;
    /* 可选：设置默认选中第一个导航项 */
    left: 0;
    transition: all .3s linear;
}

/* 为每个导航项创建单独的 CSS 规则 */
.nav-herf a:nth-child(1):hover~.animation {
    left: calc(var(--aleftW) * 0);
}

.nav-herf a:nth-child(2):hover~.animation {
    left: calc(var(--aleftW) * 1);
}

.nav-herf a:nth-child(3):hover~.animation {
    left: calc(var(--aleftW) * 2);
}

.nav-herf a:nth-child(4):hover~.animation {
    left: calc(var(--aleftW) * 3);
}

.nav-herf a:nth-child(5):hover~.animation {
    left: calc(var(--aleftW) * 4);
}


.toggle-box {
    width: 400px;
    height: 500px;
    overflow: hidden;
}

.toggle-box ul {
    width: 100%;
    height: 100%;
    position: relative;
}

.toggle-box ul li {
    position: absolute;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    top: calc((var(--i) - 1)* 100px);
    left: calc(-1 * (var(--i)) * 400px);
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    background-color: #000;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.toggle:hover .toggle-box ul li {
    animation: toggle .5s linear forwards;
}

.toggle {
    width: 400px;
    height: 600px;
    overflow: hidden;
}

@keyframes toggle {
    0% {
        left: calc(-1 * (var(--i)) * 400px);
    }

    100% {
        left: 0;
    }
}


.toggle-box ul li:nth-child(odd):hover {
    color: #fff;
    background-color: #960f0f;
}

.toggle-box ul li:nth-child(even):hover {
    color: #000;
    background-color: #74c21b;
}


.view-scroll {
    width: 400px;
    height: 600px;
    margin: 0 auto;
}

.view-scroll img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: view-scroll 1s linear;
    animation-timeline: view();
}

@keyframes view-scroll {
    0% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.scroll-clip {
    position: relative;
    width: 1280px;
    height: 200px;
    overflow: hidden;
}

.scroll-clip h1 {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 130px;
    letter-spacing: 20px;
}

.scroll-clip h1:nth-child(2) {
    background-image: linear-gradient(to right, #ff69b3, #fe8888, #ffa481, #ffff81, #888182, #48e1d2, #418898, #9408d4);
    /*-webkit-前缀谷歌浏览器老版本的兼容性写法*/
    -webkit-background-clip: text;
    /*背景裁剪以文字的形式裁剪*/
    background-clip: text;
    /*文本填充颜色为透明*/
    -webkit-text-fill-color: transparent;
    animation: clip 6s linear infinite;
}

@keyframes clip {
    0% {
        -webkit-clip-path: circle(10% at 0% 50%);
        clip-path: circle(10% at 0% 50%);
    }

    50% {
        -webkit-clip-path: circle(10% at 100% 50%);
        clip-path: circle(10% at 100% 50%);
    }

    100% {
        -webkit-clip-path: circle(10% at 0% 50%);
        clip-path: circle(10% at 0% 50%);
    }
}

.clip-box {
    width: 200px;
    height: 200px;
    background-color: #7ad0df;
    margin: 0 auto;
    clip-path: circle(50% at 50% 50%);
    transition: all 1s;
}

.clip-box:hover {
    clip-path: circle(75% at 50% 50%)
}

.swap-img {
    position: relative;
    height: 600px;
    width: 400px;
    margin: 0 auto;
}

.swap-img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 2s ease-in-out;
}

.swap-img img:nth-child(2) {
    -webkit-clip-path: polygon(0% 0%, 0 0, 0 46%, 0 100%, 0% 100%);
    clip-path: polygon(0% 0%, 0 0, 0 46%, 0 100%, 0% 100%);
}

.swap-img:hover img:nth-child(2) {
    -webkit-clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
    clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
}

.svg-box+svg {
    stroke-dasharray: 70px;
    stroke-dashoffset: 70px;
    animation: draw 3s linear alternate infinite;
}

.svg-box {
    overflow: auto;
}

.svg-box svg {
    width: 3587px;
    height: 301px;
    stroke-dasharray: 3858px;
    stroke-dashoffset: 3858px;
    animation: draw 3s linear alternate infinite;
}

@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}

.r-box-box {
    width: 200px;
    height: 80px;
    margin: 10px auto;
    transform-style: preserve-3d;
    transition: all .5s;
}

.r-boxbox {
    width: 100%;
    height: 100%;
    background-color: #df7ac9;
    transform: translateZ(40px);
}

.r-boxbox-item {
    width: 100%;
    height: 100%;
    background-color: #7ad0df;
    transform: translateY(-50%) rotateX(-90deg);
}

.r-box-box:hover {
    transform: rotateX(90deg);
}


.reflect-box2 {
    width: 1000px;
    display: flex;
    margin: 0 auto 100px;
    transform-style: preserve-3d;
    gap: 2px;
}

.reflect-box2-item {
    width: 200px;
    height: 200px;
    background-color: #7ad0df;
    flex: 1;
    border-radius: 5px;
    transition: all 0.5s;
}

.reflect-box2-item:nth-child(2n) {
    background-color: #77a8b1;
}

.reflect-box2-item:hover {
    transform: scale(1.2);
}

.reflect-box2:hover .reflect-box2-item:not(:hover) {
    transform: perspective(1000px) scale(0.8) rotateY(45deg);
    margin: 0 -40px;
}

.reflect-box2 .reflect-box2-item:hover~.reflect-box2-item {
    transform: perspective(1000px) scale(0.8) rotateY(-45deg);
    margin: 0 -40px;
}

.text-r {
    text-align: center;
    margin: 0 auto;
    height: 400px;
    width: 200px;
    transition: all 2s;
    background-color: #7ad0df;
}

.text-r:hover {
    transform: rotateY(75deg);
}

.reflect-box {
    width: 200px;
    height: 400px;
    margin: 100px auto;
    border: 1px solid red;
    -webkit-box-reflect: right 2px linear-gradient(transparent, #000);
}

.reflect-box-item {
    width: 100%;
    height: 100%;
    background-color: #7ad0df;
    border-radius: 5px;
}

.flexmove {
    display: grid;
    width: 1000px;
    height: 400px;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    transition: all 0.5s;
    gap: 2px;
}

.flexmove-item {
    background-color: #77a8b1;
    height: 100%;
    border-radius: 5px;
}

.flexmove:has(.flexmove-item:nth-child(1):hover) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
}

.flexmove:has(.flexmove-item:nth-child(2):hover) {
    grid-template-columns: 1fr 2fr 1fr 1fr;
}

.flexmove:has(.flexmove-item:nth-child(3):hover) {
    grid-template-columns: 1fr 1fr 2fr 1fr;
}

.flexmove:has(.flexmove-item:nth-child(4):hover) {
    grid-template-columns: 1fr 1fr 1fr 2fr;
}

.scroll-box {
    width: 1200px;
    height: 500px;
    overflow: hidden;
    margin: 0 auto;
    /* border: 1px solid red; */
}

.scroll-box:hover .scroll {
    animation-play-state: paused;
}

.scroll {
    display: flex;
    animation: scroll-box 10s linear infinite;
}

.scroll-box-item {
    width: 1200px;
    height: 500px;
    background-color: #7ad0df;
}

.scroll-box-item:nth-child(2) {
    background-color: #f04e49;
}

.scroll-box-item p {
    width: 1200px;
    height: 500px;
    text-align: center;
    line-height: 500px;
    font-size: large;
    color: #fff;
}

@keyframes scroll-box {
    to {
        transform: translateX(-1200px);
    }
}


.skew-box {
    margin: 0 auto;
    width: 700px;
    height: 500px;
    background-color: #7ad0df;
    transition: transform 1s;
    border-radius: 10px;
    transform: rotateY(-20deg) rotateX(20deg);
    backdrop-filter: blur(10px);

}

.skew-box:hover {
    transform: translate3d(-50px, -50px, 0);
}

.animation-box1 {
    width: 200px;
    height: 200px;
    background-color: #7ad0df;
}

.animation-box1:hover {
    animation: animation-box1 1s linear infinite reverse;
}

@keyframes animation-box1 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.card-box {
    position: relative;
    height: 400px;
    width: 200px;
    margin: 0 auto;
    border: 1px solid red;
    transform: perspective(1000px);
}

.card {
    position: absolute;
    height: 400px;
    width: 200px;
    text-align: center;
    transition: all 2s;
    line-height: 400px;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}


.card h3 {
    transform: translate3d(0, 0, 60px);
    color: #fff;
    backface-visibility: hidden;

}

.card-box:hover .card:first-child {
    transform: rotateY(-180deg);
    /* z-index: 0; */
}

.card-box:hover .card:last-child {
    transform: rotateY(0deg);
    /* z-index: 1; */
}

.card:first-child {
    background-color: #77a8b1;
    z-index: 1;
}

.card:last-child {
    transform: rotateY(180deg);
    background-color: #7adf8b;
    /* z-index: 0; */
}


[class^='rorate-box'] {
    margin: 0 auto;
}

.rorate-box-x {
    width: 200px;
    height: 400px;
    background-color: #7ad0df;
    border: 1px solid red;
    border-radius: 5px;
    transition: all 0.5s;
}

.rorate-box-x:hover {
    transform: perspective(1000px) rotateX(60deg);
}

.rorate-box-y {
    width: 200px;
    height: 400px;
    background-color: #7ad0df;
    border: 1px solid red;
    border-radius: 5px;
    transition: all 0.5s;
}

.rorate-box-y:hover {
    transform: perspective(1000px) rotateY(60deg);
}

.rorate-box-z {
    width: 200px;
    height: 400px;
    background-color: #7ad0df;
    border: 1px solid red;
    border-radius: 5px;
    transition: all 0.5s;
}

.rorate-box-z:hover {
    transform: perspective(1000px) rotateZ(60deg);
}


.circle-box {
    width: 1000px;
    height: 100px;
    background-color: #7ad0df;
}

.circle {
    width: 100px;
    height: 100px;
    background-color: #df7a9c;
    border-radius: 50%;
    text-align: center;
    line-height: 100px;
    transition: all 3s cubic-bezier(0.65, 0.05, 0.36, 1);
}

.circle-box:hover .circle {
    transform: translateX(1000px) rotate(360deg);
}

.book {
    position: relative;
    width: 240px;
    height: 280px;
    margin: 50px;
}

.book [class^="bookbox"] {
    position: absolute;
    width: 240px;
    height: 280px;
    border-radius: 0 30px 30px 40px;
    transform-origin: top left;
    transition: all 0.5s;
}

.book .front {
    /* background-color: rgba(0, 0, 0, 0.4); */
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 1;
    backdrop-filter: blur(30px);
}

.book .back {
    background-color: purple;
    transform: skewY(8deg);
}

.book:hover .back {
    transform: skewY(15deg);
    width: 200px;
}

.book:hover .front {
    /* transform: skewY(-12deg); */
    /* width: 200px; */
    transform: translateY(-3px);
}

.gamebox {
    width: 150px;
    height: 50px;
    background-color: #77a8b1;
    margin: 10px auto;
    text-align: center;
    line-height: 50px;
    transform: skewX(-20deg);
    border-radius: 5px;
}

.translate-box1 {
    width: 100px;
    height: 100px;
    background-color: #7ad0df;
    border: 1px solid red;
    border-radius: 5px;
    transition: all 0.5s;
}

.translate-box1:hover {
    transform: translate(50px, 50px) scale(1.5);
    background-color: pink;
}

.translate-box2 {
    width: 100px;
    height: 100px;
    background-color: #df7ac9;
    border: 1px solid rgb(0, 153, 255);
    border-radius: 5px;
    transition: all 0.5s;
}

.translate-box2:hover {
    transform: rotate(50deg);
    background-color: pink;
}


.gird-container5 {
    display: grid;
    width: 90%;
    height: 500px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
}

.gird-container5-item:first-child {
    grid-row: 1 / span 2;
    grid-column: 1 / span 2;
}

.gird-container5-item {
    text-align: center;
    background-color: #7ad0df;
    border: 1px solid red;
    border-radius: 5px;
}


.gird-container4 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    /* grid-template-rows: repeat(auto-fill, minmax(120px, 1fr)); */
    width: 80%;
    height: 300px;
    margin: 50px auto;

}

.gird-container4-item {
    height: 120px;
    text-align: center;
    background-color: #7ad0df;
    border: 1px solid red;
}


.gird-container3 {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 3fr 1fr;
    height: 320px;
    width: 320px;
    border: 1px solid red;
    gap: 10px;
}

.gird-container3-item {
    background-color: #7ad0df;

}


.gird-container2 {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    justify-content: space-between;
    align-content: space-between;
    width: 320px;
    border: 1px solid red;
}

.gird-container2-item {
    background-color: #7ad0df;
    height: 100px;
    margin-bottom: 8px;
}

.gird-container1 {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    justify-content: space-between;
    align-content: space-between;
    width: 320px;
    height: 320px;
    border: 1px solid red;
}

.gird-container1-item {
    background-color: #7ad0df;
}



/* .position-s {
    position: sticky;
    top: 0px;
    width: 1000px;
    height: 100px;
    background-color: #77a8b1;
}

.position-s-content {
    height: 1000px;
    background-color: #84d2e0;
}
 */

.position-f {
    width: 100px;
    height: 100px;
    background-color: #77a8b1;
    position: fixed;
    bottom: 20px;
    right: 20px;
    text-align: center;
    line-height: 100px;
}


.position-f-content {
    position: absolute;
    left: 100px;
    top: 100px;
    width: 200px;
    height: 200px;
    background-color: #d84f4f;
}

.position-p-content:last-child {
    width: 200px;
    height: 200px;
    background-color: #7ad0df;
}


.position-r {
    width: 600px;
    height: 600px;
    background-color: #a3c0c5;
}

.position-r-content:first-child {
    position: relative;
    top: 100px;
    left: 100px;
    width: 200px;
    height: 200px;
    background-color: #d3c2c2;

}


.position-r-content:last-child {
    width: 200px;
    height: 200px;
    background-color: #7ad0df;
}

.footer {
    margin: 0 auto;
    width: 80%;
    height: 100px;
    background-color: #d3c2c2;
}

.item-box10 {
    width: 80%;
    display: flex;
    border: 1px solid red;
    margin: 10px auto;
    flex-wrap: wrap;
}

.item-box10 .item3 {
    min-width: calc(16.6666666667% - 10px);
    max-width: calc(16.6666666667% - 10px);
    flex: 1;
    height: 150px;
    background-color: pink;
    margin: 0 5px 8px;
    border-radius: 5px;
}

.w {
    width: 80%;
    margin: 10px auto;
}

.item-box9 {
    border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    margin-left: -5px;
    margin-right: -5px;
}

.item-box9 .item2 {
    flex: 0 0 16.6666666667%;
    width: 200px;
    height: 150px;
    border-radius: 5px;
    padding: 5px;
}

.item-box9 .item2-content {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: pink;
    border-radius: 5px;
}

.item-box8 {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid red;
}

.item-box8 .item1 {
    flex: 1;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    background-color: pink;
    border-radius: 10px;
}

.item-box8 .item1:nth-child(2n) {
    background-color: aquamarine;
}


.item-box7 {
    width: 402px;
    display: flex;
    flex-wrap: wrap;
    height: 300px;
    border: 1px solid red;
    justify-content: space-between;
    align-content: start;
}

.item-box7 .item {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: pink;
    border-radius: 10px;
}

#scontent li {
    background-color: pink;
    margin: 0 10px;
    line-height: 30px;
}

#scontent li a {
    text-decoration: none;
    color: #b81a1a;
    margin-left: .625rem;
}

#scontent li a:hover {
    color: red;
}

div[class^='roll-box'] {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    margin: 10px;
    text-align: center;
    border-radius: 10px;
}

.title {
    padding: 8px 0 0 16px;
    font-size: 16px;
    font-weight: 600;
}

.title span {
    margin-left: 5px;
}

.roll-box1,
.roll-box {
    background-image: linear-gradient(to top left, rgba(255, 0, 0, 0.5) 0%, transparent 50%),
        linear-gradient(to top right, rgba(0, 255, 0, 0.5) 0%, transparent 50%),
        linear-gradient(to bottom left, rgba(0, 0, 255, 0.5) 0%, transparent 50%),
        linear-gradient(to bottom right, rgba(255, 255, 0, 0.5) 0%, transparent 50%);
}

#roll-box5 {
    background-color: aliceblue;
    display: -webkit-box;
    overflow: hidden;
    /* 超出部分隐藏省略号 */
    text-overflow: ellipsis;
    /**垂直显示 */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 45px;
}

#roll-box6 {
    background-color: rgb(240, 242, 243);
    height: 400px;
    width: 250px;
}

.roll-box4 {
    background-color: rgba(255, 0, 0, 0.5);
    /* 超出部分隐藏 */
    overflow: hidden;
    /* 超出部分隐藏省略号 */
    text-overflow: ellipsis;
    /* 强制不换行 */
    white-space: nowrap;
    padding: 10px;
}

.roll-box3 {

    box-shadow: 0 25px 5px 5px rgba(0, 0, 0, 0.5);
}

.roll-box1 {
    /*-webkit-前缀谷歌浏览器老版本的兼容性写法*/
    -webkit-background-clip: text;
    /*背景裁剪以文字的形式裁剪*/
    background-clip: text;
    /*文本填充颜色为透明*/
    -webkit-text-fill-color: transparent;
}

.roll-box2 {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    margin: 10px;
    text-align: center;
    background-image: radial-gradient(circle at top left, rgba(255, 0, 0, 0.5), transparent 50%),
        radial-gradient(circle at top right, rgba(0, 255, 0, 0.5), transparent 50%),
        radial-gradient(circle at bottom left, rgba(0, 0, 255, 0.5), transparent 50%),
        radial-gradient(circle at bottom right, rgba(255, 255, 0, 0.5), transparent 50%);
}

.box4 {
    background-image: url('../assets/imgs/im_00002_.png');
    background-size: cover;
    background-repeat: no-repeat;
}

div[class^='box'] {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    margin: 10px;
    text-align: center;
    justify-content: center;
}

#p-text {
    color: blue;
}

.testp {
    color: red;
}


ul li:nth-child(odd) {
    background-color: lightblue;
}

.t-1 tr:nth-child(even) {
    background-color: rgb(92, 112, 228);
}

.pseudo-element::after {
    content: " - 这是伪元素";
    color: red;
}

.pseudo-element::before {
    content: "这是伪元素 - ";
    color: green;
}

a[class] {
    color: rgb(255, 153, 0);
}


a[class^="font"] {
    font-size: 16px;
    color: blue;
}

a[class="font"] {
    font-size: 20px;
    color: purple;
}

a[class="font14"] {
    font-size: 14px;
    color: green;
}

[type='text'] {
    border-radius: 5px;
}

.container {
    width: 100%;
}

.test {
    scroll-behavior: smooth;
    min-height: 100vh;
    /* background-color: rgba(0, 0, 0, 0.4); */
}
</style>