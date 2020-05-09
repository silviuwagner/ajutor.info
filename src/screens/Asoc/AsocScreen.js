import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../../styles';
import BackButton from '../../components/BackButton/BackButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class AsocScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    return (
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Image style={styles.image} source={{ uri: item.img }} />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.nume}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.judet}>
              <Text style={styles.category}>{item.jud[0].judet}</Text>
            </View>
            <View style={styles.serviciu}>
              <Text style={styles.category}>{item.srv[0].serviciu}</Text>
            </View>
          </View>

          <View style={styles.asocContainer}>
            <TouchableOpacity onPress={()=>{Linking.openURL(item.details.url_fb)}}>
              <Image style={styles.asocIcon} source={require('../../../assets/icons/facebook-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(item.details.url_site)}}>
              <Image style={styles.asocIcon} source={require('../../../assets/icons/website-icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.details.descriere}</Text>
            {/* <WebView 
              source={{html: item.details.descriere}}
            /> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}
