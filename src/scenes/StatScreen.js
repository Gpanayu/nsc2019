import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native';
import { Container,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Badge} from 'native-base';
import logo from '../asset/pics/logo.png'
import {withNavigation} from 'react-navigation';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import {TouchableOpacity} from 'react-native';

class StatScreen extends React.Component {
    constructor(props){
        super(props);
        var date = new Date();
        var hour = date.getHours();
        if(hour.toString.length == 1){
            hour = "0" + hour
        }
        else{
            hour = "" + hour
        }
        var minute = date.getMinutes();
        if(minute.toString.length == 1){
            minute = "0"+ minute
        }
        else{
            minute = "" + minute
        }
        var timeNow = hour + minute
        // Wait for backend server to finish

        // axios.get("http://localhost:500/getFivePoints&time="+timeNow).then((response) => {
            // console.log(response.data);
            // this.state = {
            //     plottedData: response.data
            // };
        // });
        this.state = {
                plottedData: [
                    { x: "13.00", y: 2 },
                    { x: "13.01", y: 3 },
                    { x: "13.02", y: 5 },
                    { x: "13.03", y: 4 },
                    { x: "13.04", y: 7 }
                ],
                avg: ((2+3+5+4+7) / 5) | 0
            };
        // This is for refreshing the screen to become real-time app
        // setInterval(() => (
            //GET data from the backend server
        //   ), 60000);
    }
    render(){
        const {navigate} = this.props.navigation;
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
                                    <TouchableOpacity onPress={() => navigate('Home')}>
                                        <CardItem style = {{backgroundColor:'#ffcc5c'}} onClick={() => navigate('Home')}>
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