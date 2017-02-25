/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Button,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native';
import Menu from "./menu";

var widths=Dimensions.get('window').width;
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedTab:'blueTab',
            notifCount:0,

        }
    }
    jump(){
        var _this = this;
        this.props.navigator.push({
            name: 'menu',
            component: Menu,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <Text style={styles.text}>酒坛香榭</Text>
                </View>
                <Image
                    style={styles.logo}
                    source={require("../../restrant.png")}
                />
                <View style={styles.menuList}>
                    <TouchableOpacity style={styles.button} onPress={this.jump.bind(this)}>
                        <Text style={styles.menu}>主菜单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.menu}>主厨推荐</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.menu}>今日热门</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.jump.bind(this)}>
                        <Text style={styles.menu}>会员专属</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.menu}>积分兑换</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.menu}>我的积分</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.menu}>包厢预定</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.jump.bind(this)}>
                        <Text style={styles.menu}>食客评论</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.menu}>我要评价</Text>
                    </TouchableOpacity>
                </View>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    nav:{
        height:80,
        backgroundColor:"brown",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize:30,
        color:"white",
    },
    menuList:{
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"wrap"
    },
    button:{
        width:widths/4,
        height:widths/6,
        backgroundColor:"green",
        margin:10,

    },
    menu:{
        color:"white",
        fontSize:15,
        textAlign:"center",
        lineHeight:widths/6
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        borderBottomColor:"black",
        borderBottomWidth:2
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    logo:{
        height:200,
        width:380,
    },
    input:{
        height:80,
        borderWidth:1,
        borderColor:"#ccc",
    }

});

/**
 * Created by lanou on 2017/2/9.
 */
