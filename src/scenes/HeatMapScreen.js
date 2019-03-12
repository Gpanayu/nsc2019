import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native';
import { Container,Content, Card, CardItem, Thumbnail, Text, Segment, Left, Body, Right, Button} from 'native-base';
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

const url = "35.187.253.190:5000";
class HeatMapScreen extends React.Component {
    constructor(props){
        super(props);
        time = this.props.navigation.state.params.time;
        const query = time.split(".").join("")+".jpg";
        this.state = {
            showOrdinary: true,
        };
        this.oriImg = `http://${url}/getNowPicture?time=${query}`
        this.heatImg = `http://${url}/getHeatMap?time=${query}`
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <Container style={{backgroundColor:'#eeeeee'}}>
                <Content style={{margin:10}}>
                    <Card>
                        <CardItem style={{backgroundColor:'white'}}>
                            <Left>
                                <Thumbnail source={require('../asset/pics/logo.png')}/>
                                <Body>
                                    <Text>Icanteen</Text>
                                    <Text note>โรงอาหารวิศวฯจุฬาฯ</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <StyledImage source={{uri: this.state.showOrdinary ? this.oriImg : this.heatImg}}/>
                        </CardItem>
                        <CardItem style={{flex:1,justifyContent:'center'}}>
                            <Segment>
                                <Button 
                                    first active={this.state.showOrdinary} 
                                    onPress={()=>{this.setState({showOrdinary:true})}}
                                >
                                    <Text>Orinary</Text>
                                </Button>
                                <Button 
                                    last active={!this.state.showOrdinary} 
                                    onPress={()=>{this.setState({showOrdinary:false})}}
                                >
                                    <Text>Heatmap</Text>
                                </Button>
                            </Segment>
                        </CardItem>
                        <CardItem style={{backgroundColor:'white'}}>
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