import React from 'react'
import styled from 'styled-components/native'
import { vw, vh } from 'react-native-expo-viewport-units';
import { Text,Icon,Segment,Button,Thumbnail } from 'native-base';
import { View,Image } from 'react-native'
import { withNavigation } from 'react-navigation';
import axios from 'axios'

const Background = styled.View`
    position: absolute;
    background-color: #eeeeee;
    height: ${vh(100)};
    width: ${vw(100)};
`
const Container = styled.View`
    display: flex;
    background-color: #eeeeee;
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
// const ImageCard = styled.View``
class DashboardScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showOrdinary: true,
        }
        date = new Date()
        query = "" + date.getHours() + date.getMinutes() + ".jpg";
        this.updatedTime = date.getHours() + ":" + date.getMinutes()
        this.oriImg = `http://localhost:5000/getNowPicture?time=${query}`
        this.heatImg = `http://localhost:5000/getHeatMap?time=${query}`
        // date = new Date()
        // query = "" + date.getHours() + date.getMinutes() + ".jpg";

    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        // const oriImg = await axios.get(`localhost:5000:/getNowPicture?time=${query}`).data
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
                            <RobotoText style={{fontSize:40}}>300</RobotoText>
                        </StatusView>
                    </Card>
                    <Card>
                        <RobotoText>Status</RobotoText>
                        <StatusView>
                            <RobotoText style={{fontSize:40,color:'red'}}>
                                Full
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
<<<<<<< Updated upstream
                        <RobotoText>Last Update:</RobotoText>
                        <RobotoText>16/1/1</RobotoText>
=======
                        <RobotoText>Last Updated:</RobotoText>
                        <RobotoText>{this.updatedTime}</RobotoText>
>>>>>>> Stashed changes
                    </UpdateBar>
                </Row>
            </Container>
        )
    }
}

export default withNavigation(DashboardScreen)