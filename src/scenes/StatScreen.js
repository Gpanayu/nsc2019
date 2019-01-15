import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native';
import { Container,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Badge} from 'native-base';
import logo from '../asset/pics/logo.png'
import {withNavigation} from 'react-navigation';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';

class StatScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            plottedData: [],
            avg: 0
        };
        // This is for refreshing the screen to become real-time app
        // setInterval(() => (
            //GET data from the backend server
        //   ), 60000);
    }
    componentWillMount(){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        if (hour < 11 || (hour == 11 && minute <= 5)){
            hour = 11;
            minute = 0;
        }
        else if(minute < 5){
            hour = hour - 1;
            minute = 60 - (5 - minute);
        }
        else{
            minute = minute - 5;
        }
        hour = "" + hour;
        minute = "" + minute;
        if(hour.length == 1){
            hour = "0" + hour;
        }
        if(minute.length == 1){
            minute = "0"+ minute;
        }
        var timeNow = hour + minute;
        axios.get("http://localhost:5000/getFivePoints?startTime="+timeNow+".jpg").then((response) => {
            console.log(response.data);
            let tmpPlottedData = [];
            let tmpAvg = 0;
            for(let key in response.data){
                let obj = {};
                obj.x = key.substring(0, 2)+"."+key.substring(2, 4);
                obj.y = response.data[key];
                tmpPlottedData.push(obj);
                tmpAvg += obj.y;
                console.log("let's see obj");
                console.log(obj);
                console.log("let's see obj");
            };
            tmpAvg = (tmpAvg / 5) | 0;
            console.log("let's see the plottedDATA");
            console.log(JSON.stringify(tmpPlottedData));
            console.log("let's see the plottedDATA");
            this.setState({plottedData: tmpPlottedData});
            this.setState({avg: tmpAvg});
        });
    }
    render(){
        const {navigate} = this.props.navigation;
        if(this.state.plottedData.length == 0){
            return (
                <Body style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                    <Text style={{fontSize: 20}}>Please wait a moment...</Text>
                </Body>
            );
        }
        return(
            <Container style={{backgroundColor:'#ffeead'}}>
                <Content style={{margin:10}}>
                    <Card>
                        <CardItem style={{backgroundColor:'#ffcc5c'}}>
                            <Left>
                                <Thumbnail source={require('../asset/pics/logo.png')}/>
                                <Body>
                                    <Text>Icanteen</Text>
                                    <Text note>โรงอาหารวิศวฯจุฬาฯ</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                        <VictoryChart
                            theme={VictoryTheme.material}
                        >
                        <VictoryLine
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                            }}
                            data={this.state.plottedData}
                        />
                        </VictoryChart>
                        </CardItem>
                        {
                            this.state.plottedData.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => navigate('HeatMap', {time: item.x, amount: item.y})}>
                                        <CardItem style = {{backgroundColor:'#ffcc5c'}}>
                                                <Left style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                                                    {/* <Icon name="md-people" style={{fontSize: 20}}/> */}
                                                    <Text>{item.x}</Text>
                                                </Left>
                                                <Right>
                                                    <Text style={{fontSize: 15}}>{item.y} people</Text>
                                                </Right>
                                        </CardItem>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <CardItem style = {{backgroundColor:'#FF8C00'}}>
                            <Left style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                                <Text style={{fontSize: 15}}>Approx.</Text>
                            </Left>
                            <Right>
                                <Text>{this.state.avg} people</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container >
        )
    }
}

export default withNavigation(StatScreen)