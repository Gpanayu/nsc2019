import React from 'react'
import styled from 'styled-components/native'
import { vw, vh } from 'react-native-expo-viewport-units';
import { Text,Icon,Segment,Button } from 'native-base';
import { View,Image } from 'react-native'
import { withNavigation } from 'react-navigation';

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
// const ImageCard = styled.View``
class DashboardScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showOrdinary: true,
            ordinaryURL: '../asset/pics/test_img.jpg',
            heatmapURL: '../asset/pics/test_heat.jpg',
            url: '../asset/pics/test_img.jpg'
        }
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }
    render(){
        return (
            <Container>
                <Background/>
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
                        
                        <StyledImage source={require('../asset/pics/test_img.jpg')}/>
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
                        <RobotoText>16/1/1</RobotoText>
                    </UpdateBar>
                </Row>
            </Container>
        )
    }
}

export default withNavigation(DashboardScreen)