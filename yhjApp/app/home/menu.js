/**
 * Created by lanou on 2017/2/10.
 */
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
    Dimensions,
    ListView,
    TouchableHighlight,
    AlertIOS,
    ActivityIndicator,
    RefreshControl,
    Video
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Mock from "mockjs";
import config from "../util/config";
import request from "../util/request";
import sideMenu from "react-native-side-menu";

var widths=Dimensions.get('window').width;
class Item1 extends Component{
    constructor(props){
        super(props);
        this.state={
           press:false
        }
    }
    display1(){
        var press=this.state.press;
        this.setState({
            press:!this.state.press
        })
    }
    render(){
        return (
            <View style={[styles.leftList,this.state.press?styles.press:null]}>
                <Text onPress={this.display1.bind(this)} style={[styles.leftListText,this.state.press?styles.leftListTextPress:null]}>比萨(纯珍小装)</Text>
            </View>
        )
    }
}

class Item2 extends Component{
    constructor(props){
        super(props);
        this.state={
            press:false
        }
    }
    display2(){
        var press=this.state.press;
        this.setState({
            press:!this.state.press
        })
    }
    render(){
        return (
            <View style={[styles.leftList,this.state.press?styles.press:null]}>
                <Text onPress={this.display2.bind(this)} style={[styles.leftListText,this.state.press?styles.leftListTextPress:null]}>新品尝鲜</Text>
            </View>
        )
    }
}

export default class Menu extends Component {
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
    //返回之前的页面
    pop(){
        this.props.navigator.pop()
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
                    console.log(list)
                    console.log(data.total)
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
    //上拉加载
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

    renderRow(row){
        return (
                <TouchableHighlight>

                    <View>
                        <View style={styles.data}>
                            <Image
                                style={styles.logo}
                                source={{uri:row.source}}
                            />
                            <Text style={styles.title}>{row.title}</Text>

                            <View style={styles.count}>
                                <Text style={styles.price1}>
                                    <Text>
                                        <Text style={styles.price}>{row.price}</Text>
                                        <Text style={styles.single}>元/份</Text>
                                    </Text>
                                </Text>
                                <Text style={styles.count1}>
                                    <Icon
                                        name="ios-remove-circle-outline"
                                        size={15}
                                    />
                                    <Text style={styles.count2}>{row.count}</Text>
                                    <Icon
                                        style={{color:"orange"}}
                                        name="ios-add-circle-outline"
                                        size={15}
                                    />
                                </Text>
                            </View>

                        </View>
                    </View>
                </TouchableHighlight>
        )
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Icon
                        style={styles.back}
                        onPress={this.pop.bind(this)}
                        name="ios-arrow-back"
                        size={35}
                        color="white"
                    />
                    <Text style={styles.headerText}>益麦萌</Text>
                     <Icon
                        style={styles.more}
                        name="ios-more"
                        size={35}
                        color="white"
                     />
                </View>
                <View style={styles.top}>
                    <View style={styles.topText}>
                            <Text style={styles.topText1}>餐厅评分</Text>
                        <Text style={styles.topText3}>
                            <Text style={styles.topText2}>5.3</Text>
                            <Text style={styles.topText1}>分</Text>
                        </Text>
                    </View>
                    <View style={styles.topText}>
                        <Text style={styles.topText1}>平均送餐速度</Text>
                        <Text style={styles.topText3}>
                            <Text style={styles.topText2}>48</Text>
                            <Text style={styles.topText1}>分</Text>
                        </Text>
                    </View>
                    <View style={styles.topText}>
                        <Text style={styles.topText1}>及时送达率</Text>
                        <Text style={styles.topText3}>
                            <Text style={styles.topText2}>60</Text>
                            <Text style={styles.topText1}>%</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.content}>

                    <View style={styles.left}>
                        <Item1></Item1>
                        <Item2></Item2>


                        <View style={styles.leftList}>
                            <Text style={styles.leftListText}>比萨(纯珍普装)</Text>
                        </View>
                        <View style={styles.leftList}>
                            <Text style={styles.leftListText}>比萨(纯珍大装)</Text>
                        </View>
                        <View style={styles.leftList}>
                            <Text style={styles.leftListText}>饭食</Text>
                        </View>
                        <View style={styles.leftList}>
                            <Text style={styles.leftListText}>意面</Text>
                        </View>
                        <View style={styles.leftList}>
                            <Text style={styles.leftListText}>奶茶</Text>
                        </View>

                    </View>
                    <View style={styles.right}>
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

            </View>

        );
    }
}

const styles = StyleSheet.create({
    image:{
         width:widths,
        height:widths*2,

    },
    button:{
        padding: 20,
        backgroundColor:"black",
        margin:10,
        width:widths/5,
        position:"absolute",
        bottom:200,
        right:20

    },
    menu:{
        color:"white",
        fontSize:15,
        textAlign:"center",

    },
    header:{
        width:widths,
        height:40,
        backgroundColor:"black",
        marginTop:20,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    back:{
       marginLeft:20
    },
    more:{
        marginRight:20
    },
    headerText:{
        color:"white",
        fontSize:20,
        lineHeight:40
    },
    top:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"#ccc"
    },
    topText:{
        width:widths/3-0.5,
        backgroundColor:"white",

    },
    topText1:{
        textAlign:"center",
        fontSize:15,
        paddingTop:10
    },
    topText2:{
        color:"red",
        fontSize:20,

    },
    topText3:{
        textAlign:"center"
    },
    content:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"#ccc",
        borderTopColor:"#ccc",
        borderTopWidth:1,
        width:widths,
    },
    left:{
        width:widths/3-0.5,
        backgroundColor:"#EDEEEF"
    },
    right:{
        width:widths*2/3-0.5,
        backgroundColor:"white"
    },
    logo:{
        width:widths/6,
        height:widths/6,
        margin:5
    },
    data:{
        borderBottomWidth:1,
        borderBottomColor:"#ccc",
    },
    title:{
        fontSize:10,
        position:"absolute",
        top:5,
        left:widths/6+10
    },
    price:{
        fontSize:12,
        color:"red"
    },
    single:{
        fontSize:10
    },
    price1:{
        marginLeft:5
    },
    count:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    count1:{
        marginRight:5
    },
    count2:{
        fontSize:10,
        paddingLeft:5,
        paddingRight:5,
        lineHeight:15
    },
    leftList:{
        height:widths/6,
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        backgroundColor:"#EDEEEF"
    },
    press:{
        backgroundColor:"white",
    },
    leftListText:{
        fontSize:15,
        textAlign:"center",
        lineHeight:widths/6-2
    },
    leftListTextPress:{
        color:"orange",
        fontSize:15,
        textAlign:"center",
        lineHeight:widths/6-2
    }
});

