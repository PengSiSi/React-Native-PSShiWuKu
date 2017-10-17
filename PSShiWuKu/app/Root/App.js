/**
 * Created by 思思 on 17/8/13.
 */
import React, {
    Component
} from 'react';
import {
    StatusBar
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom
} from 'react-navigation';

import Login from './../Sections/Login/Login';
import Splash from './../Sections/Splash/Splash';
import HomeScreen from './../Sections/Home/Home';
import FeedScreen from './../Sections/Feed/Feed';
import MineScreen from './../Sections/Mine/Mine';
import Setting from './../Sections/Setting/Setting';
import TabBarItem from './../Common/TabBarItem';
import Color from './../Config/Color';
import RegisterPage from './../Sections/Login/Register';
import HomeTypeList from './../Sections/Home/HomeTypeList';
import FeedDetail from './../Sections/Feed/FeedDetail';
import MyPhotoPage from './../Sections/Mine/MyPhotoPage';
import MyReceiveZanPage from './../Sections/Mine/ReceiveZanPage';
import MyCollectPage from './../Sections/Mine/MyCollectPage';
import FeedDetailWebView from './../Sections/Feed/FeedDetailWebView';

export default class APP extends Component {

    // 全局设置状态栏样式
    constructor() {
        super()
        StatusBar.setBarStyle('light-content')
    }

    render() {
        // return ( < Navigator onNavigationStateChange = {
        //         (prevState, currentState) => {
        //             const currentScene = getCurrentRouteName(currentState);
        //             const previousScene = getCurrentRouteName(prevState);
        //             if (previousScene !== currentScene) {
        //                 if (lightContentScenes.indexOf(currentScene) >= 0) {
        //                     StatusBar.setBarStyle('light-content')
        //                 } else {
        //                     StatusBar.setBarStyle('dark-content')
        //                 }
        //             }
        //         }
        //     }
        //     />
        // );
        return(
             <Navigator/>
        );
    }
}

//// 为了实现登录的modal效果,所以将Main页面单独拆分出来.
const MineStack = StackNavigator({
    Mine: {
        screen: MineScreen,
        navigationOptions: ({
            navigation
        }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({
                focused,
                tintColor
            }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./../Images/ic_tab_homepage.png')}
                    selectedImage={require('./../Images/ic_tab_homepage_select.png')}
                />
            )
        }),
    },
    Login: {
        screen: Login,
        headerBackTitle: false,
        // 这里需要设置和Mine一样的navigationOptions,否则Modal到登录页底部的TabbarItem会消失
        navigationOptions: ({
            navigation
        }) => ({
            tabBarLabel: '登录',
            tabBarIcon: ({
                focused,
                tintColor
            }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./../Images/ic_tab_shop.png')}
                    selectedImage={require('./../Images/ic_tab_search_select.png')}
                />
            )
        }),
    }
}, {
    mode: 'modal',
});

const Tab = TabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: ({
                navigation
            }) => ({
                tabBarLabel: '食物百科',
                tabBarIcon: ({
                    focused,
                    tintColor
                }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./../Images/ic_tab_search.png')}
                        selectedImage={require('./../Images/ic_tab_search_select.png')}
                    />
                )
            }),
        },
        Feed: {
            screen: FeedScreen,
            navigationOptions: ({
                navigation
            }) => ({
                tabBarLabel: '逛吃',
                tabBarIcon: ({
                    focused,
                    tintColor
                }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./../Images/ic_tab_homepage.png')}
                        selectedImage={require('./../Images/ic_tab_homepage_select.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScreen,
            navigationOptions: ({
                navigation
            }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({
                    focused,
                    tintColor
                }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./../Images/ic_tab_my.png')}
                        selectedImage={require('./../Images/ic_tab_my_select.png')}
                    />
                )
            }),
        },
    }, {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: Color.kMainColor,
            inactiveTintColor: '#979797',
            style: {
                backgroundColor: Color.background
            },
        },
    }

);

const Navigator = StackNavigator({
    Tab: {
        screen: Tab
    },
    LoginScreen: {
        screen: Login
    },
    SplashScreen: {
        screen: Splash
    },
    SettingScreen: {
        screen: Setting
    },
    RegisterScreen: {
        screen: RegisterPage
    },
    HomeTypeListScreen: {
        screen: HomeTypeList
    },
    FeedDetailScreen: {
        screen: FeedDetail
    },
    MyPhotoPageScreen: {
        screen: MyPhotoPage
    },
    MyReceiveZanPageScreen: {
        screen: MyReceiveZanPage
    },
    MyCollectPageScreen: {
        screen: MyCollectPage
    },
    FeedDetailWebViewScreen: {
        screen: FeedDetailWebView
    }
}, {
    navigationOptions: {
        // headerStyle: { backgroundColor: color.theme }
        headerBackTitle: null,
        headerTintColor: '#333333',
        showIcon: true,
        initialRouteName: 'SplashScreen'
    },
});