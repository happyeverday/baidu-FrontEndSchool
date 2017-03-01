require(['Observer'], function(Observer){
    let app1 = new Observer({
      name: 'youngwind',
      age: 25
    });

    let app2 = new Observer({
      university: 'bupt',
      major: 'computer'
    });

    // 要实现的结果如下：
    app1.data.name // 你访问了 name
    app1.data.age = 100;  // 你设置了 age，新的值为100
    app2.data.university // 你访问了 university
    app2.data.major = 'science'  // 你设置了 major，新的值为 science

    //多个对象
    let app3 = new Observer({
        like: 'running',
        friends: {
            girl: 'yue',
            boy: '知浅'
        }
    })
    app3.data.friends.data.girl
    // 数组
    let app4 = new Observer(['bulala','lalala'])
    app4.data[0]
    app4.data[0] = 'haha'
    app4.push('test')
    app4.data[2] = 2
})