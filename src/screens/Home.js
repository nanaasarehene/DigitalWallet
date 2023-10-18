/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {COLORS} from '../constants/theme';
import {SIZES} from '../constants/theme';
import icons from '../constants/icons';
import {FONTS} from '../constants/theme';
import images from '../constants/images';

const Home = () => {
  const appFeaturesData = [
    {
      id: 1,
      icon: icons.reload,
      color: COLORS.purple,
      backgroundColor: COLORS.lightPurple,
      description: 'Top Up',
    },
    {
      id: 2,
      icon: icons.send,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightYellow,
      description: 'Transfer',
    },
    {
      id: 3,
      icon: icons.internet,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: 'Internet',
    },
    {
      id: 4,
      icon: icons.wallet,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: 'Wallet',
    },
    {
      id: 5,
      icon: icons.bill,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightYellow,
      description: 'Bill',
    },
    {
      id: 6,
      icon: icons.game,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: 'Games',
    },
    {
      id: 7,
      icon: icons.phone,
      color: COLORS.red,
      backgroundColor: COLORS.lightRed,
      description: 'Mobile Prepaid',
    },
    {
      id: 8,
      icon: icons.more,
      color: COLORS.purple,
      backgroundColor: COLORS.lightPurple,
      description: 'More',
    },
  ];

  const specialPromoData = [
    {
      id: 1,
      img: images.promoBanner,
      title: 'Bonus Cashback1',
      description: 'Dont miss it. Grab it',
    },
    {
      id: 2,
      img: images.promoBanner,
      title: 'Bonus Cashback2',
      description: 'Dont miss it. Grab it',
    },
    {
      id: 3,
      img: images.promoBanner,
      title: 'Bonus Cashback3',
      description: 'Dont miss it. Grab it',
    },
    {
      id: 4,
      img: images.promoBanner,
      title: 'Bonus Cashback4',
      description: 'Dont miss it. Grab it',
    },
  ];

  const [features, setFeatures] = React.useState(appFeaturesData);
  const [specialPromo, setSpecialPromo] = React.useState(specialPromoData);


  //render header function here 
  function renderHeader (){
    return(
      <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h1}}>Hello</Text>
          <Text style={{...FONTS.body2, color: COLORS.gray}}>dev_nana</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              backgroundColor: COLORS.lightGray,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image 
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.secondary
              }}
            />

            <View style={{position: 'absolute', top: -5, right: -5, height: 10, width: 10, backgroundColor: 'red', borderRadius: 5 }}>
              
            </View>
          </TouchableOpacity>
        </View>

      </View>


    )
  }

  //render Banner component 
  function renderBanner(){
    return(
      <View style={{height: 120, borderRadius: 20,}}>
        <Image 
          source={images.promoBanner}
          resizeMode='cover'
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
        />
      </View>
    )
  }

  //renderPromos function component here
  function renderPromos() {

        // this function holds the header component
      const HeaderComponent = () => {
        return(
          <View>
            {renderHeader()}
            {renderBanner()}
          </View>
        )
      }

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
        }}
        onPress={() => console.log(item.title)}>
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={images.promoBanner}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>

        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.lightGray,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text style={{...FONTS.h4}}>{item.title}</Text>
          <Text style={{...FONTS.body4}}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={specialPromo}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderPromos()}
    </SafeAreaView>
  );
};

export default Home;
