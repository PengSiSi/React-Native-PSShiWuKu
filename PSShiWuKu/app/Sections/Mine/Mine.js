/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    Linking,
    AsyncStorage
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import MineHeaderView from './MineHeaderView';
import DeviceInfo from 'react-native-device-info'

export default class extends Component {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '我的', 
        header: null,
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center'  // 设置安卓端导航栏标题不居中显示
        },
        headerStyle: {
            backgroundColor: Color.kMainColor  // 设置导航栏的背景颜色,headerTintColor设置无效
        },
    }); 

    render() {
        return (
                <View style={styles.cellContainerStyle}> 
                <MineHeaderView
                    settingAction={this.settingAction.bind(this)}
                    loginAction={this.loginAction.bind(this)}></MineHeaderView>              
                <MineCell
                        title='我的照片'
                        style={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        imageName={require('./../../Images/ic_my_photos.png')}
                        onPress={this.onPressCell.bind(this)}>
                    </MineCell>
                    <MineCell
                        title='我的收藏'
                        style={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        imageName={require('./../../Images/ic_my_collect.png')}
                        onPress={this.onPressCell.bind(this)}>
                    </MineCell>
                    <MineCell
                        title='上传食物数据'
                        style={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        imageName={require('./../../Images/ic_my_upload.png')}
                        onPress={this.onPressCell.bind(this)}>
                    </MineCell>
                    <MineCell
                    title='检测版本更新'
                    style={{borderBottomWidth: StyleSheet.hairlineWidth}}
                    imageName={require('./../../Images/ic_my_upload.png')}
                    onPress={this.onPressCell.bind(this)}>
                   </MineCell>
                </View>
        );
    }

    settingAction() {
        // alert('设置');
        this.props.navigation.navigate('SettingScreen');
    }

    loginAction() {
        // alert('登录');
        this.props.navigation.navigate('LoginScreen');
    }

    onPressCell(title) {
        // alert(title);
        switch (title) {
            case '我的照片':
                this.props.navigation.navigate('MyPhotoPageScreen');
                break;
            case '我的收藏':
                this.props.navigation.navigate('MyCollectPageScreen');
                break;
            case '上传食物数据':
                this.props.navigation.navigate('MyCollectPageScreen');
                break;
            case '检测版本更新':
                alert(DeviceInfo.getVersion());
                // alert('检测版本更新');
                // console.log("App Version", DeviceInfo.getVersion()); // e.g. 1.1.0
                break;
            default:
                break;
        }
    }
}

openAppStore: ()=> {
    var url = '';
    if (Platform.OS === 'ios') {
      url = 'itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&onlyLatestVersion=true&pageNumber=0&sortOrdering=1&id=1156814163';
    } else {
      url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.girtu.girtu'
    }
  
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  },
  
  checkoutUpdate =  ()=> {
    let setLaterUpdateTime = (time) => {
      AsyncStorage.setItem('update_time', time);
    }
  
    let getLaterUpdateTime = () => {
      return AsyncStorage.getItem('update_time')
    }
  
    // 点击了稍后更新, 保存当前时间
    let laterUpdate = ()=> {
      setLaterUpdateTime(new Date().toString())
    }
  
    // 点击立即下载只是跳转到商店,本地不做处理,如果没有更新,下次进入依然提醒
    // 点击稍后下载,本地记录时间,10天后再次提醒
    let showAlert = ()=> {
      Alert.alert('有新版本发布, 是否更新', '', [
        {text: '马上下载', onPress: ()=>module.exports.openAppStore()},
        {text: '稍后更新', onPress: ()=>laterUpdate()}
      ])
    }
  
    // 计算时间差, 如果大于10天就显示alert, 否则什么都不做
    let calculateDateDiff = (oldDate)=> {
      oldDate = new Date(oldDate)
      let newDate = new Date(); //结束时间
      let differDate = newDate.getTime() - oldDate.getTime(); //时间差的毫秒数
      let days = Math.floor(differDate / (24 * 3600 * 1000)); ////计算出相差天数
      if(days >= 10) {
        showAlert()
      }
    }
  
    setTimeout(()=> {
      // 假设获取到版本号后
      let newVersion = '2.3.3';
      let oldVersion = DeviceInfo.getVersion();
      if (newVersion > oldVersion) {
        getLaterUpdateTime()
          .then((oldDate)=> {
            // 如果有时间就计算时间差, 没有时间就直接显示
            if (oldDate) {
              calculateDateDiff(oldDate)
              // calculateDateDiff(1489075200000)
            } else {
              showAlert()
            }
          })
          .catch((e)=> {
            showAlert()
          })
      }
    }, 2000)
  }

const MineCell = ({title, imageName, style, onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.cellStyle}
            onPress={()=>onPress(title)}>
            <Image style={{width: 20, height: 20, marginHorizontal: 15}} source={imageName}></Image>
            <View style={[styles.rightViewStyle, style]}>
                <Text style={{color: 'gray'}}>{title}</Text>
                <Image style={{width: 20, height: 20}} source={require('./../../Images/ic_my_right.png')}></Image>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    cellStyle: {
        flexDirection: 'row',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightViewStyle: {
        flex: 1,
        height: 46,
        borderColor: '#d9d9d9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15
    },
    cellContainerStyle: {
        borderColor: Color.kSeparatorColor,
        backgroundColor: 'white'
    },
    bgImageStyle: {
        width: Space.kScreenWidth,
        height: 230,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    settingIconStyle: {
        width: 20,
        height: 20
    },
    headerStyle: {
        width: Space.kScreenWidth,
        height: Platform.OS === 'ios' ? 44 : 50,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avaterStyle: {
        width: 80,
        height: 80,
    },
    avaterContainerStyle: {

    }
});