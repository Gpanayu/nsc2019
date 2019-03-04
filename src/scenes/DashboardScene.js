import React from 'react'
import styled from 'styled-components/native'
import { vw, vh } from 'react-native-expo-viewport-units';
import { Text,Icon,Segment,Button,Thumbnail } from 'native-base';
import { View,Image } from 'react-native'
import { withNavigation } from 'react-navigation';
import Orientation from 'react-native-orientation';
import axios from 'axios';

const Background = styled.View`
    position: absolute;
    background-color: #eeeeee;
    height: ${vh(100)};
    width: ${vw(100)};
`
const Container = styled.View`
    display: flex;
    padding: 15px;
`
const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 7.5px 0 7.5px 0;
`
const Card = styled.View`
    display: flex;
    justify-content: space-between;
    border-radius: 3;
    background-color: white;
    height: ${vh(15)};
    width: ${vh(20)}; 
    padding: 20px;
`
const StatusView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    
`
const UpdateBar = styled.View`
    border-radius: 3;
    background-color: white;
    height: ${vh(8)};
    width: 100%;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`
const SampleCard = styled.View`
    border-radius: 3;
    background-color: white;
    height: ${vh(35)};
    width: 100%; 
`
const RobotoText = styled.Text`
    font-family: 'Roboto
`
const StyledImage = styled.Image`
    width: 100%;
    height: 80%;
`
const ButtonGroup = styled.View`
    display: flex;
    padding: 5px;
    justify-content: center;
    flex-direction: row;
`
const PlaceBar = styled.View`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    border-radius: 3;
    background-color: white;
    width: 100%;
    padding: 10px;
`
const url = "localhost:5000";
class DashboardScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showOrdinary: true,
            countPeople: '',
            status: ''
        }
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        if (hour <= 11 && minute > 5){
            hour = 11;
        }
        else if (hour <= 11  && minute <= 5){
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
        const query = "" + hour + minute + ".jpg";
        
        this.date = date
        this.updatedTime = date.getHours() + ":" + date.getMinutes()
    }

    componentDidMount() {
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        if (hour <= 11 && minute > 5){
            hour = 11;
        }
        else if (hour <= 11  && minute <= 5){
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
        const query = "" + hour + minute + ".jpg";
        
        this.date = date
        this.updatedTime = date.getHours() + ":" + date.getMinutes()

        this.oriImg = `http://${url}/getNowPicture?time=${query}`
        this.heatImg = `http://${url}/getHeatMap?time=${query}`

        axios.get(`http://${url}/getFivePoints?startTime=${query}`).then((res)=>{
            keysObj = Object.keys(res.data);
            this.setState({countPeople : res.data[keysObj[keysObj.length-1]][0] , status : res.data[keysObj[keysObj.length-1]][1]})
        });
        Orientation.addOrientationListener(() => Orientation.lockToPortrait());
    }

    async componentWillMount() {
        
    }
    render(){
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Background/>
                <Row>
                    <PlaceBar>
                        <Thumbnail source={require('../asset/pics/logo.png')}/>
                        <View style={{width:10}}/>
                        <View>
                            <RobotoText>Icanteen</RobotoText>
                            <Text note>โรงอาหารวิศวฯจุฬาฯ</Text>
                        </View>
                        <Button style={{marginLeft:'auto'}} transparent dark>
                            <Icon style={{fontSize:30}} onPress={()=>navigate('Stat')} name='graph-trend' type='Foundation'/>
                        </Button>
                    </PlaceBar>
                </Row>
                <Row>
                    <Card>
                        <RobotoText>People Count</RobotoText>
                        <StatusView>
                            <Icon name='people-outline' type='MaterialIcons'/>
                            <View style={{width:10,marginTop:'auto'}}/>
                            <RobotoText style={{fontSize:40}}>{this.state.countPeople}</RobotoText>
                        </StatusView>
                    </Card>
                    <Card>
                        <RobotoText>Status</RobotoText>
                        <StatusView>
                            <RobotoText style={{fontSize:30}}>
                                {this.state.status}
                            </RobotoText>
                        </StatusView>
                    </Card>
                </Row>
                <Row>
                    <SampleCard>
                        
                        <StyledImage source={{uri: this.state.showOrdinary ? this.oriImg : this.heatImg}}/>
                        <ButtonGroup>
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
                        </ButtonGroup>
                    </SampleCard>
                </Row>
                <Row>
                    <UpdateBar>
                        <RobotoText>Last Update:</RobotoText>
                        <RobotoText>{this.date.toLocaleTimeString()}</RobotoText>
                    </UpdateBar>
                </Row>
            </Container>
        )
    }
}

export default withNavigation(DashboardScreen)