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
    Dimensions,
    ListView,
    RefreshControl,
    TouchableHighlight,
    AlertIOS,
    ActivityIndicator,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Mock from "mockjs";
import config from "../util/config";
import request from "../util/request";
import Detail from "./detail"
var widths=Dimensions.get('window').width;
export default class Home extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: ds.cloneWithRows([]),
            press:false,
            isloading:false,
            total:0,
        }
    }
    componentDidMount(){
        this.fetchData(0);
    }
    //造假数据
    fetchData(page){
        this.setState({
            isloading:true
        })
        var url=config.api.base+config.api.videoList;
        request.get(url,{
            accessToken:"yhj",
            page:page
        })
        //fetch('http://rap.taobao.org/mockjs/13596/yhj/videoList')
        // .then((response) => response.json())
            .then((data) => {
                //var data=Mock.mock(responseJson);
                if(data.success){
                    var list=this.state.list;
                    if(page!=0){
                        for(var i=0;i<data.params.length;i++){
                            list.push(data.params[i]);
                        }
                    }else{
                        list=data.params;
                    }
                    page++;
                    this.setState({
                        list:list,
                        page:page,
                        isloading:false,
                        total:data.total,
                        dataSource:this.state.dataSource.cloneWithRows(list)
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    下拉刷新
    onRefresh(){
        this.fetchData(0);
    }
    //封装的一个条件
    hasMore(){
        return !(this.state.total>0 &&this.state.total<=this.state.list.length)
    }
    //下拉加载
    fetchMore(){
        if(this.hasMore()&& !this.state.isloading){
            this.fetchData(this.state.page);
        }
    }
    renderFooter(){
        if(!this.hasMore()){
            return (
                <View style={{height:200}}>
                    <Text>没有更多了...</Text>
                </View>
            )
        }else{
            return(
                <View>
                    <ActivityIndicator
                        animating={true}
                        style={{height:60}}
                        color="red"
                        size="large"
                    />
                </View>
            )
        }
    }
    jump2(){
        var _this = this;
        console.log(_this)
        this.props.navigator.push({
            name: 'detail',
            component: Detail,
        })
    }
    renderRow(row){
        return (
            <TouchableHighlight onPress={this.jump2.bind(this)}>

                <View>
                    <View style={styles.data}>
                        <Image
                            style={styles.logo}
                            source={{uri:row.source}}
                        />
                        <Text style={styles.title}>{row.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.ltop}>
                    <TextInput style={styles.input}
                               onChangeText={(text)=>this.setState({text})}
                               value={this.state.text}
                               placeholder={"search"}
                    >
                    </TextInput>
                    <Image
                        style={styles.llogo}
                        source={require('./llogo.png')}
                    />
                </View>
                <View style={styles.lbottom}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        automaticallyAdjustContentInsets={false}
                        enableEmptySections={true}
                        onEndReached={this.fetchMore.bind(this)}
                        renderFooter={this.renderFooter.bind(this)}
                        onEndReachedThreshold={20}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.onRefresh.bind(this)}
                                tintColor="#ff0000"
                                title="Loading..."
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                            />
                        }
                    />
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        borderBottomColor:"black",
        borderBottomWidth:2
    },
    llogo:{
        height:200,
        width:380,
    },
    ltop:{
        backgroundColor:"#666",
        marginTop:20,
        height:widths*0.7
    },
    input:{
        height:40,
        borderWidth:1,
        borderColor:"#ccc",
        backgroundColor:"white",
        marginTop:8
    },
    lbottom:{
        width:widths,
        backgroundColor:"brown",
    },
    logo:{
        width:widths/6,
        height:widths/6,
        margin:5
    },
    title:{
        fontSize:10,
        position:"absolute",
        top:5,
        left:widths/6+10
    },

});

/**
 * Created by lanou on 2017/2/9.
 */
