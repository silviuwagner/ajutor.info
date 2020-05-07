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
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
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
      // loading: true,
      // dataSource:[]
    };
    this.getSrv = this.getSrv.bind(this);
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  getSrv(srv) {
    <View style={styles.serviciu}>
      <Text style={styles.category}>{srv.serviciu}</Text>
    </View>
    // console.log(srv.serviciu);
  }

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    const judetServiciu = item.srv.forEach(this.getSrv);

    console.log(this.getSrv);

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
            <TouchableHighlight>
              <Text style={styles.category}>{item.region}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.judet}>
              <Text style={styles.category}>{item.jud[0].judet}</Text>
            </View>
              {judetServiciu}
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
