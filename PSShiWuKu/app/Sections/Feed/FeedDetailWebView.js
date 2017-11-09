/**
 * Created by 思思 on 17/10/18.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    WebView
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import NavigationItem from './../../Common/NavigationItem';

export default class FeedDetail extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '资讯详情', 
        headerTitleStyle: {
            color: 'gray',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: 'white'  // 设置导航栏的背景颜色,headerTintColor设置无效
        }, 
        headerRight:(
            <View style={styles.triangleStyle}></View>
        )
    }); 

    constructor(props) {
        super(props)
        this.state = {
            height: 100
        }
    }

    render() {
        return (
            <View style={styles.container}>
            
            {/*在html中监听高度的变化，把title设置为高度，
               当title变化时，会触发WebView的onNavigationStateChange方法，获取到高度
               参考链接： http://www.jianshu.com/p/d0964cb87d8d

                <WebView
                {...this.props}
                source={{html: `<!DOCTYPE html><html><body>${this.props.htmlBody}<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`}}
                javaScriptEnabled={true}
                style={[{height: this.state.height, backgroundColor: 'red'}, this.props.style]}
                scrollEnabled={false}
                automaticallyAdjustContentInsets={true}
                contentInset={{top:0,left:0}}
                onNavigationStateChange={(info)=>{
                if (info.title) {
                    this.setState({
                    height: parseInt(info.title) + 20
                    })
                }
                }}
            />     
            */}
                <WebView
                ref={this.webView}
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                source={{uri: "http://jingxuan.guokr.com/pick/75627/?app_version=2.7.3&os_version=11.0.1&token=UoxF6TfBFTKKyGvxKU6a&app_device=iOS"}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                // onNavigationStateChange={this.onNavigationStateChange}
                // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                // startInLoadingState={true}
                // scalesPageToFit={this.state.scalesPageToFit}
            />
              {this.renderBottomView()}
            </View>
        );
    }

    // 底部点赞View
    renderBottomView() {
        return (
            <View style={{height: 54, flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', width: Space.kScreenWidth / 2, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('./../../Images/ic_news_share.png')} style={{width: 20, height: 20}}></Image>
                    <Text>分享</Text>
                </View>
                <View style={{flexDirection: 'row', width: Space.kScreenWidth / 2, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('./../../Images/ic_collect.png')} style={{width: 20, height: 20}}></Image>
                    <Text>收藏</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    avaterImgStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.kSeparatorColor
    },
    webView: {
        width: Space.kScreenWidth,
        height: Space.kScreenHeight - 54
    }, 
    triangleStyle: {  // 画三角
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: 8,
        marginTop: -8,
        borderTopColor: 'transparent',//下箭头颜色
        borderLeftColor: 'transparent',//右箭头颜色
        borderBottomColor: 'gray',//上箭头颜色
        borderRightColor: 'transparent'//左箭头颜色
    }
});