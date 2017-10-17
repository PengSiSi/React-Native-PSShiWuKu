import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	NetInfo
} from 'react-native';

// 参考博客： http://blog.csdn.net/zzx2436125/article/details/77482308
import App from './App';

class Root extends React.Component {

	//构造函数
	constructor(props) {
		super(props);
		this.state = {
		    isConnected: null,
		    connectionInfo: null
		};
	  }
     
	  //页面的组件渲染完毕（render）之后执行
	  componentDidMount() {

		//检测网络是否连接
		NetInfo.isConnected.fetch().done((isConnected) => {
		    this.setState({isConnected});
		});
     
		//检测网络连接信息
		NetInfo.fetch().done((connectionInfo) => {
		    this.setState({connectionInfo});
		//     alert(connectionInfo);
		});

		//监听网络变化事件
		NetInfo.addEventListener('change', (networkType) => {
		this.setState({isConnected: networkType})
			alert(networkType);
		})
	 }

	async componentWillMount() {
		let connect = false;
		const netChange = (isConnect) => {
		  // NetInfo.isConnected.removeEventListener('change', netChange);
		  connect = isConnect;
		}
		
		// RN获取网络状态(true/false)
		async function getNetWorkState() {
		  if (Platform.OS === 'ios') {
		    // alert(connect);
		    await NetInfo.isConnected.addEventListener('change', netChange);
		    return connect;
		  } else {
		    return await NetInfo.isConnected.fetch();
		  }
		}
		return await NetInfo.isConnected.addEventListener('change', netChange);
	}

	// 移除监听
	componentWillUnMount() {
		NetInfo.removeEventListener('change', netChange);
	}

	render() {
		return (
            <App />
		)
	}
}

export default Root;
