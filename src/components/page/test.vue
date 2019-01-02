<template>
    <div>
        <p class="table-header">非一套表单位基本情况</p>
        <div class="table-header">2018
            <ul>
                <li><span>表<i class="hidden">表</i><i class="hidden">表</i>号：</span>6<i class="hidden">表</i><i class="hidden">表</i>1<i class="hidden">表</i><i class="hidden">表</i>1<i class="hidden">表</i><i class="hidden">表</i>表</li>
                <li><span>制定机关：</span>国<i class="hidden">表</i>家<i class="hidden">表</i>统<i class="hidden">表</i>计<i class="hidden">表</i>局</li>
                <li><span></span>国务院经济普查办公室</li>
                <li><span>文<i class="hidden">表</i><i class="hidden">表</i>号：</span>国统字（2018）100号</li>
                <li><span>有效期至：</span>2<i class="hidden">1</i>0<i class="hidden">1</i>1<i class="hidden">1</i>9<i class="hidden">1</i>年<i class="hidden">1</i>6<i class="hidden">1</i>月</li>
            </ul>
        </div>
        <table width="100%">
            <tr>
                <td>
                    <p>联系方式</p>
                    <p>长途区号: <el-input v-model="form.tel" placeholder="请输入长途区号"></el-input></p>
                </td>
                <td>
                    <p>电子邮箱: <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input></p>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <p>运营状态: <el-checkbox-group v-model="form.status">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </p>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            form: {
                tel: '',
                status: '',
                email: ''
            }
        }
    }
}
</script>
<style>
table tr td{
    border: 1px solid #ccc;
    padding: 8px 12px;
    background-color: #fff;
}
table {
    border-collapse: collapse;
}
.el-input{
    display: inline-block;
    width: unset;
}
.el-checkbox-group{
    display: inline-table;
}
.table-header{
    text-align: center;
    position: relative;
    width: 100%;
}
p.table-header{
    line-height: 70px;
}
p.table-header::before{
    content: '填报指引';
    position: absolute;
    left: 5px;
    top: 0;
    padding: 8px;
    font-size: 36px;
    line-height: 50px;
    border: 1px solid #333;
}
div.table-header{
    height: 100px;
    line-height: 170px;
}
div.table-header > ul{
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: left;
    line-height: 20px;
}
div.table-header > ul > li > span{
    width: 80px;
    display: inline-block;
}
ul > li{
    list-style-type: none;
}
.hidden{
    visibility: hidden;
}
</style>

