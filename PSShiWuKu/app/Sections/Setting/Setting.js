/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import SettingCell from './SettingCell';
// import * as httpCache from 'react-native-http-cache'
import * as CacheManager from 'react-native-http-cache'

// 参考博客： https://github.com/reactnativecn/react-native-http-cache
// http://bbs.reactnative.cn/topic/150/%E7%BC%93%E5%AD%98%E7%AE%A1%E7%90%86

var dataArr = ['', '', '', '给我们评个分吧', '将食物库分享给朋友们', 'HealthKit设置'];
var contentArr = [];

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '设置', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.renderRow = this.renderRow.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

    componentWillMount(){
        this.getCacheSize();
    }

   compennetDidUnmount(){  
    }  

   compennetWillUnmount() {
       console.log('compennetWillUnmount');
    }
   
   componentDidMount(){
       let dataArr = this.getDataList();
       this.setState({
           data: dataArr
       });
    }

   getDataList() {
    //    alert('哈哈');
        return ([
            { title: '账号安全', subtitle: '未验证', color: 'red'},
            { title: '清除缓存', subtitle: this.cacheSize ? this.cacheSize : '10.9M' },
            { title: '给我们提个建议'},
            { title: '给我们评个分吧'},
            { title: '将食物库分享给朋友们'},
            { title: 'HealthKit设置'}
        ]
    )
 }

    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.data)}
                    renderRow={this.renderRow}
                    style={{flex: 1}}
                    renderFooter={this.renderFooter}
                    renderHeader={this.renderHeader}
                    enableEmptySections
                    initialListSize={3}
                    onScroll={this._onScroll}
                    // onEndReached={this.loadMore}
                    onEndReachedThreshold={30}
                />
            </View>
        );
    }

// 具体的每行
    renderRow(rowData, sectionID, rowID, highlightRow) {
        console.log('rowID = '+ rowID);
        return (
            <TouchableOpacity onPress={this.clickCell.bind(this, rowID)}>
                <View style={{backgroundColor: 'white'}}>
                    <SettingCell 
                    title={rowData.title}
                    // content={rowData.subtitle}
                    content={rowID == 1 ? this.state.cacheSize : rowData.subtitle}
                    style={styles.cellStyle}
                    contentColor={rowData.color}
                    >
                    </SettingCell>
            </View>
            </TouchableOpacity>
        );
    }

    renderHeader() {

    }

    renderFooter() {
        return (
            <Text style={{textAlign: 'center', marginTop: 10}}>食物库V1.0.0</Text>
        );
    }

    clickCell(rowID) {
        // alert(rowID);
        switch (rowID) {
            // 注意这里要使用''比较,直接数字是不行的
            case '0':
                // alert('登录');
                this.props.navigation.navigate('RegisterScreen');
                break;
            case '1':
            // alert('清除缓存');
            this.clearCacheSize();
            // alert(httpCache.getHttpCacheSize());
            break;
            default:
                break;
        }
    }

    // 注意： 这里依照官方Demo报错，修改如下方法即可。
    // async getData(){
    //     try {
    //       this.setState({
    //         'http': await httpCache.getHttpCacheSize(),
    //         'image': await httpCache.getImageCacheSize(),
    //         'all': await httpCache.getSize(),
    //       });
    //     } catch(err){
    //       alert('错误', err.message);
    //     }
    //   }
    // async clearCache(){
    //     try {
    //       await httpCache.clear();
    //       alert('清除缓存成功');
    //       await this.getData();
    //     } catch(err){
    //       alert('错误', err.message);
    //       console.log('----'+ err.message + '-----'); // httpCache.clear is not a function
    //     }
    //   }

    async getCacheSize() {
        const data = await CacheManager.getCacheSize();
        const size = data / (1024 * 1024);
        this.setState({ cacheSize: size.toFixed(2) + 'M'});
    }

    async clearCacheSize() {
        await CacheManager.clearCache();
        // this.getCacheSize();
        // 这里貌似清除不能全部清除为0，这里直接写死0即可。
        this.setState({cacheSize: '0M'});
        alert('清除缓存成功');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        // padding: 10,
        backgroundColor: Color.kBgColor
    },
    cellStyle: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.kSeparatorColor,
        // padding: 10
    }
});