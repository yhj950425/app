/**
 * Created by lanou on 2017/2/10.
 */
/**
 * Created by lanou on 2017/2/9.
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
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
var widths=Dimensions.get("window").width;
import  Video from "react-native-video";
import Button from "react-native-button";
//export default:默认导出
export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            row:this.props.row,
            pause:false,
            videoEnd:false,
            progress:0.01,
            modalVisible:false
        }
        console.log(this.props.row)
    }
    pop(){
        this.props.navigator.pop();
    }
    progress(data){
        var currentTime=data.currentTime;
        var seekableDuration=data.seekableDuration;
        var progress=(currentTime/seekableDuration).toFixed(2);
        if(!this.state.viewEnd){
            this.setState({
                progress:progress
            })
        }
    }
    close(){
        if(this.state.videoEnd){
            this.refs.videoPlayer.seek(0);
            this.setState({
                videoEnd:false
            })
        }else{
            this.setState({
                pause:!this.state.pause
            })
        }
    }
    onEnd(){
        this.setState({
            videoEnd:true
        })
    }
    inputs(){
        this.setState({
            modalVisible:false
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.pop.bind(this)}
                                      style={styles.backBox}
                    >
                        <Icon
                            name="ios-arrow-back"
                            style={styles.backIcon}
                            size={25}
                            color="#676767"

                        ></Icon>
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>视频详情页</Text>
                </View>
                <TouchableOpacity onPress={this.close.bind(this)}>
                    <Video
                        source={{uri:"HTML5.mp4"}}
                        style={styles.video}
                        paused={this.state.pause}
                        onEnd={this.onEnd.bind(this)}
                        ref="videoPlayer"
                        onProgress={this.progress.bind(this)}
                    ></Video>
                    {(this.state.pause || this.state.videoEnd)? <Icon
                        name="ios-play"
                        size={28}
                        style={styles.play}
                    />:null}
                    <View style={styles.progressBox}>
                        <View style={[styles.progress,{width:widths*this.state.progress}]}></View>
                    </View>

                </TouchableOpacity>
                <TextInput
                    style={{height: 60, borderColor: 'gray', borderWidth: 1,marginTop:10}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder={"评论"}
                    multiline={true}
                    returnKeyType="done"
                    onFocus={this.inputs.bind(this)}
                />
                <Modal
                    visible={this.state.modalVisible}
                    //transparent={true}
                    style={{backgroundColor:"red"}}
                >
                    <Text>哈哈</Text>
                    <Button>评论</Button>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',

    },
    header: {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:widths,
        height:64,
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth:1,
        borderBottomColor:"#ccc",
        backgroundColor:"white"
    },
    backBox:{
        position:"absolute",
        left:12,
        top:32,
        width:50,
        flexDirection:"row",
        alignItems:"center",
    },
    backText:{
        color:"#676767",
        marginLeft:4
    },
    headerTitle:{
        width:widths-120,
        textAlign:"center",
        fontSize:20
    },
    video:{
        width:widths,
        height:widths*0.56
    },
    play:{
        position:'absolute',
        bottom:14,
        right:14,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:"transparent",
        borderColor:"#fff",
        borderWidth:1,
        borderRadius:23,
        color:"#ed7b66",
        backgroundColor:"transparent",
        //overflow:"hidden"

    },
    progressBox:{
        width:widths,
        height:2,
        backgroundColor:"#ccc"
    },
    progress:{
        width:1,
        height:2,
        backgroundColor:"orange"
    }
});
module.exports=Detail;
/**
 * Created by lanou on 2017/2/9.
 */
