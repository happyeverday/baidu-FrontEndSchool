let app2 = new Observer({
    info: {
        firstName: 'xiaofen',
        lastName: 'guo',
        school: {
            city: 'Beijing',
            school: 'bupt'
        }
    },
    age: 25
});

app2.$watch('info', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.info.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.info.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.info.school.city = 'haerbin';