import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native';
import { Container,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Badge} from 'native-base';
import logo from '../asset/pics/logo.png';
import {withNavigation} from 'react-navigation';

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


class HomeScreen extends React.Component {
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
                                    <Text note>โรงอาหารวิศวะจุฬา</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <StyledImage source={require('../asset/pics/test_img.jpg')}/>
                        </CardItem>
                        <CardItem style={{backgroundColor:'#ffcc5c'}}>
                            <Left>
                                    <Badge danger style={{width:100}}>
                                    {/* <Badge danger style={{width:100}} onPress={() => navigate('Stat')}> */}
                                        <Text onPress={() => navigate('Stat')}>Full</Text>
                                    </Badge>
                            </Left>
                            <Body style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                                <Icon name="md-people" style={{fontSize: 20}}/>
                                <Text style={{fontSize: 15}}>30 people</Text>
                            </Body>
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

export default withNavigation(HomeScreen)