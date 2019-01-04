import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native';
import { Container,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Badge} from 'native-base';
import logo from '../asset/pics/logo.png'
import {withNavigation} from 'react-navigation';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

// const StyledImage = styled.Image`
//     height: 200;
//     width: null;
//     flex: 1;
// `
// const MyCard = styled.View`
//     width: 95%;
//     height: 300px;
//     border-width: 2px;
//     border-color: #ffcc5c;
//     border-radius: 5px;
// `

class StatScreen extends React.Component {
    render(){
        console.log("hello from the stat sideeeeee");
        return(
            <Container style={{backgroundColor:'#ffeead'}}>
                <Content style={{margin:10}}>
                    <Card>
                        <CardItem style={{backgroundColor:'#ffcc5c'}}>
                            <Left>
                                <Thumbnail source={require('../asset/pics/logo.png')}/>
                                <Body>
                                    <Text>Statistics</Text>
                                    <Text note>โรงอาหารวิศวะจุฬา</Text>
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
                            data={[
                            { x: 1, y: 2 },
                            { x: 2, y: 3 },
                            { x: 3, y: 5 },
                            { x: 4, y: 4 },
                            { x: 5, y: 7 }
                            ]}
                        />
                        </VictoryChart>
                        </CardItem>
                        <CardItem style={{backgroundColor:'#ffcc5c'}}>
                            <Left style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                                <Icon name="md-people" style={{fontSize: 20}}/>
                                <Text style={{fontSize: 15}}>30 people</Text>
                            </Left>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container >
        )
    }
}

console.log("before export default statcreen")
export default StatScreen
console.log("after export default statcreen")