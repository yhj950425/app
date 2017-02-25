/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  Image,
  View,
  Button,
  TouchableOpacity,
  Navigator
} from 'react-native';
import HomeList from "./app/home";
import LocationList from "./app/location";
var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

export default class yhjApp extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab:'blueTab',
      notifCount:0,

    }
  }
  render() {
    return (
        <TabBarIOS
            unselectedTintColor="black"
            tintColor="yellow"
            barTintColor="#ccc">
          <TabBarIOS.Item
              title="首页"
              icon={require('./first.png')}
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}>

              <Navigator
                  initialRoute={{ name: 'HomeList', component: HomeList ,params:{
                      name:"yhj",
                      password:"123"
                  }}}
                  configureScene={(route) => {
                      //VerticalDownSwipeJump:页面跳转的效果
                      return Navigator.SceneConfigs.FadeAndroid;
                  }}
                  renderScene={(route, navigator) => {
                      let Components = route.component;
                      return <Components {...route.params} navigator={navigator} />
                  }} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
              icon={require('./localtion.png')}
              title="餐厅位置"
              //badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                  notifCount: this.state.notifCount + 1,
                });
              }}>
              <Navigator
                  initialRoute={{ name: 'LocationList', component: LocationList ,params:{
                      name:"yhj",
                      password:"123"
                  }}}
                  configureScene={(route) => {
                      //VerticalDownSwipeJump:页面跳转的效果
                      return Navigator.SceneConfigs.FadeAndroid;
                  }}
                  renderScene={(route, navigator) => {
                      let Components = route.component;
                      return <Components {...route.params} navigator={navigator} />
                  }} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
              icon={require('./pack.png')}
              //selectedIcon={require('./relay.png')}
              renderAsOriginal
              title="在线订餐"
              selected={this.state.selectedTab === 'blackTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blackTab',
                  presses: this.state.presses + 1
                });
              }}>
            <View style={styles.container}>
              <Text>我是third</Text>
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
              icon={require('./share.png')}
              //selectedIcon={require('./relay.png')}
              renderAsOriginal
              title="分享"
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                  presses: this.state.presses + 1
                });
              }}>
            <View style={styles.container}>
              <Text>我是third</Text>
            </View>
          </TabBarIOS.Item>

        </TabBarIOS>

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
  button:{
    padding: 20,
    backgroundColor:"green",
    margin:10,
  },
  menu:{
    color:"white",
    fontSize:15
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
  }
});

AppRegistry.registerComponent('yhjApp', () => yhjApp);
