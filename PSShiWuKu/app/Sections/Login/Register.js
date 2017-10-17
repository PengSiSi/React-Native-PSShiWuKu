/**
 * Created by 思思 on 17/5/7.
 */
import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import Color from './../../Config/Color';
import Space from './../../Config/Space';
import LCCountDownButton from './../../Common/LCCountDownButton';

export default class  extends PureComponent {

    static navigationOptions = ({navigation,screenProps}) => ({  
        headerTitle: '注册', 
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
            telephone: '', // 手机号
            verifyCode: '' // 验证码
        }
    }

    render() {
        return (
            <View style={styles.container}>
               <View style={{width: Space.kScreenWidth * 0.9, marginBottom: 20, marginTop: 20, flexDirection: 'row', borderColor: 'gray', 
               borderWidth: StyleSheet.hairlineWidth,
               borderRadius: 20,backgroundColor: 'white'}}>
                    <Image source={require('./../../Images/icon_phone.png')}
                           style={styles.tipImageStyle}>
                    </Image>
                   <TextInput
                        style={styles.TextInputStyle}
                        onChangeText={(text) => this.setState({telephone: text})}
                        value={this.state.telephone}
                        // 这两个属性只有android能用
                        inlineImageLeft={require('./../../Images/ic_template_default.png')}
                        inlineImagePadding={10}
                        placeholder='手机号'>
                    </TextInput>
               </View>
               <View style={{width: Space.kScreenWidth * 0.9,marginBottom: 20, marginTop: 20, flexDirection: 'row', borderColor: 'gray', 
                     borderWidth: StyleSheet.hairlineWidth,
                     borderRadius: 20,backgroundColor: 'white'}}>
                    <Image source={require('./../../Images/icon_password.png')}
                    style={styles.tipImageStyle}>
                    </Image>
                    <TextInput
                        style={styles.TextInputStyle}
                        // onChangeText={(text) => this.setState({telephone: text})}
                        // value={this.state.telephone}
                        inlineImageLeft={require('./../../Images/ic_template_default.png')}
                        placeholder='验证码'>
                        {/*<TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.fetchVerifyCodeStyle}
                            onPress={this.fetchVerifyCodeAction.bind(this)}>
                            <Text style={{fontSize: 16, color: 'white'}}>获取验证码</Text>
                        </TouchableOpacity>*/}
                    </TextInput>
                    <LCCountDownButton frameStyle={styles.countDownStyle}
                    beginText='获取验证码'
                    endText='再次获取验证码'
                    count={60}
                    pressAction={()=>{this.countDownButton.startCountDown()}}
                    changeWithCount={(count)=> count + 's后重新获取'}
                    id='register'   
                    ref={(e)=>{this.countDownButton=e}}
                    />
               </View>
               <View style={{marginTop: 20}}>
                 <Text style={{textAlign: 'center', fontSize: 13, color: 'gray'}}>仅支持中国大陆手机号注册,港,澳,台及海外用户请使用邮箱</Text>
               </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.registerBtnStyle}
                    onPress={this.nextAction.bind(this)}>
                    <Text style={{fontSize: 16, color: 'white'}}>下一步</Text>
                 </TouchableOpacity>
            </View>
        );
    }

    nextAction() {

    }

    fetchVerifyCodeAction() {

    }

    // 这个方法就是上面pressAction触发
    _countDownButtonPressed(){
        // 1s 后触发倒计时  例如做网络请求后的再读秒
    this.timer = setTimeout(this._triggerCount.bind(this),1000);
}

    // 拿到按钮，开始倒计时
    _triggerCount(){
        let button = this.countDownButton;
        button.startCountDown();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
    },
    registerBtnStyle: {
        backgroundColor: '#fc5c63',
        width: Space.kScreenWidth * 0.7,
        marginTop: 20,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    TextInputStyle: {
        height: 40, 
        fontSize: 13,
        marginLeft: 10
    },
    fetchVerifyCodeStyle: {
        backgroundColor: '#53d769',
        width: 100,
        height: 40,
        borderRadius: 20,
        // justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute'
    },
    tipImageStyle: {
        width: 15,
        height: 30,
        marginLeft: 10,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countDownStyle: {
        top:3,
        right:5,
        width:120,
        height:36,
        position:'absolute',
        borderRadius: 20
    }
});