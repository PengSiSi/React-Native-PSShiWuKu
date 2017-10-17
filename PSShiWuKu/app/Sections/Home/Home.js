/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    NetInfo
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import SearchBar from './../../Common/SearchBar';
import HomeTipView from './HomeTipView';
import { Grid } from 'antd-mobile';
import HomeTypeView from './HomeTypeView';

// const data1 = Array.from(new Array(20)).map((_val, i) => ({
//   icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
//   text: `名字${i}`,
// }));

var typeArr = ['食物分类', '热门品牌', '连锁餐饮'];
const data1 = Array.from(new Array(10)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `名字${i}`,
    name: "主食类",
    image_url: "http://up.boohee.cn/house/u/food_library/category/1_v1.png",
    sub_category_count: 3,
  }));

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '食物百科', 
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
        header: null
    }); 

    constructor(props) {
        super(props);
        this.state = {
            headerViewIsHidden: false,
            dataList: []
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    scrollEventThrottle={200}
                    // 获取scrollView的滑动,注意要设置scrollEventThrottle才可以
                    onScroll={(e)=>{this.onScroll(e)}}>
                    <ImageBackground source={require('./../../Images/img_home_bg.png')}
                        style={{height: 230}}
                        resizeMode='cover'>
                        <View style={{marginTop: 120}}>
                            <Text style={{textAlign: 'center', backgroundColor:'transparent', width: 200, marginLeft: 70, fontSize: 15, color: 'white'}}>查 询 食 物 信 息</Text>
                            <SearchBar text={'请输入食品名称'} style={{marginTop: 20, width: Space.kScreenWidth - 30, marginLeft: 15}}></SearchBar>
                        </View>
                    </ImageBackground>
                    <HomeTipView style={styles.homeTipStyle} handleAction={(text) => this.handleAction(text)}>
                    </HomeTipView>
                    {this.state.dataList.map((item, index) => (
                        <HomeTypeView key= {'item'+index} style={{marginTop: 10}}
                        titleName={typeArr[index]} categories={item.categories} 
                        onClickGrid={(index)=> {this.onClickGrid(index)}}>
                        </HomeTypeView>
                    ))}
                    </ScrollView>
            </View>
        );
    }

    onClickGrid(index) {
        // alert(index);
        switch (index) {
            case 0:
                // alert('主食类');
                this.props.navigation.navigate('HomeTypeListScreen');
                break;
        
            default:
                break;
        }
    }

    componentDidMount() {
        // 视图一进来就进行刷新
        this.setState({
            refreshing: false
        })
        this.requestData()
    }

    // 数据请求
    requestData() {
        fetch('http://food.boohee.com/fb/v1/categories/list')
            .then((response) => response.json())
            .then((json) => {
                // let data = this.handleGridDataSource(json.group);
                // console.log('----data---', data);
                this.setState({ dataList: json.group })
            })
            .catch((error) => {
                console.log(error);
                alert(error)
            })
    }

    // 处理数据
    handleGridDataSource(group) {
        let data = [];
        for (var index in group) {
            let itemData = [];
            for (var key in group[index].categories) {
                var categorieItem = {};
                var item = group[index].categories[key];
                categorieItem.id = item.id;
                categorieItem.text = item.name;
                categorieItem.icon = item.image_url;
                categorieItem.sub_category_count = item.sub_category_count;
                categorieItem.sub_categories = item.sub_categories;
                itemData.push(categorieItem);
            }
            data.push(itemData);
        }
        let arr = data[0].categories;
        return data;
    }

    handleAction(text) {
        // alert(text);
    }

    // 滑动scrollView
    onScroll(e) {
        // alert(e.nativeEvent.contentOffset.y);
        if (e.nativeEvent.contentOffset.y > 140) {
            this.setState({
                headerViewIsHidden: true
            });
        }
    }
}

const NavBarView = ({}) => {
    return (
        <View style={{backgroundColor: Color.kMainColor, flex: 1, height: 44}}>
            <SearchBar text={'请输入食品名称'} style={{}}></SearchBar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'white',
    },
    homeTipStyle: {
        height: 80,
        backgroundColor: Color.kBgColor,
    }
});