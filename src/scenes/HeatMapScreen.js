import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native';
import { Container,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Badge} from 'native-base';
import logo from '../asset/pics/logo.png';
import {withNavigation} from 'react-navigation';
import { View } from 'react-native'

const StyledImage = styled.Image`
    height: 200;
    width: null;
    flex: 1;
`
const MyCard = styled.View`
    width: 95%;
    height: 300px;
    border-width: 2px;
    border-color: #ffcc5c;
    border-radius: 5px;
`


class HeatMapScreen extends React.Component {
    constructor(props){
        super(props);
        time = this.props.navigation.state.params.time;
        time = time.split(".").join("")+".jpg";
        this.state = {
            url: "http://localhost:5000/getHeatMap?time="+time
        };
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
                            <StyledImage source={{uri: this.state.url}}/>
                        </CardItem>
                        <CardItem style={{backgroundColor:'#ffcc5c'}}>
                            <Left>
                                    <Body style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                                        <Text>{this.props.navigation.state.params.time}</Text>
                                    </Body>
                            </Left>
                            <Right>
                                <Text style={{fontSize: 15}}>{this.props.navigation.state.params.amount} people</Text> 
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container >
        )
    }
}

export default withNavigation(HeatMapScreen)