import React, { useLayoutEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  CoinDetailScreenNavigationProp,
  CoinDetailScreenRouteProp,
} from '../../types';
import { convertAndFormatPrice } from '../utils/formatPrice';
import LineChartComponent from '../components/LineChartComponent';
import CoinSvg from '../assets/back.svg';
import MarketCap from '../assets/marketCap.svg';
import VolumeSvg from '../assets/volume.svg';
import CirculatingSupplySvg from '../assets/circulatingSupply.svg';
import Popularity from '../assets/popularity.svg';

import { formatMarketCap } from '../utils/formatMarketCap';
import colors from '../constants/colors';

const CoinDetailScreen: React.FC = () => {
  const navigation = useNavigation<CoinDetailScreenNavigationProp>();
  const route = useRoute<CoinDetailScreenRouteProp>();

  const { coinName, coinImage, item } = route.params;
  //console.log('item ', item);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <CoinSvg />
          <Image source={{ uri: coinImage }} style={styles.coinImage} />
          <Text style={styles.coinName}>
            {coinName.length > 10
              ? `${coinName.substring(0, 10)}...`
              : coinName}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, coinName, coinImage]);

  return (
    <View style={styles.container}>
      <View style={styles.priceAndPercentageView}>
        <Text style={styles.coinPrice}>
          ${convertAndFormatPrice(item.current_price)}
        </Text>
        <Text></Text>
        <Text
          style={[
            styles.percentageChange,
            item.price_change_percentage_24h >= 0
              ? styles.positiveChange
              : styles.negativeChange,
          ]}
        >
          {item.price_change_percentage_24h >= 0 ? '+' : '-'}{' '}
          {item.price_change_24h} ({item.price_change_percentage_24h.toFixed(2)}
          %)
        </Text>
      </View>
      <View style={styles.lineCharHeight}>
        <LineChartComponent />
      </View>
      <View style={styles.marketStatsView}>
        <Text style={styles.marketStatsLeftBlockText}>Market Stats</Text>
        <View style={styles.marketStatsItem}>
          <View style={styles.marketStatsItemLeftBlock}>
            <MarketCap />
            <Text style={styles.marketStatsItemText}>Market Cap</Text>
          </View>
          <Text style={styles.marketStatsRighttBlockText}>
            {formatMarketCap(item.market_cap)}
          </Text>
        </View>
        <View style={styles.marketStatsItem}>
          <View style={styles.marketStatsItemLeftBlock}>
            <VolumeSvg />
            <Text style={styles.marketStatsItemText}>Volume</Text>
          </View>
          <Text style={styles.marketStatsRighttBlockText}>
            {formatMarketCap(item.total_volume)}
          </Text>
        </View>
        <View style={styles.marketStatsItem}>
          <View style={styles.marketStatsItemLeftBlock}>
            <CirculatingSupplySvg />
            <Text style={styles.marketStatsItemText}>Circulating Supply</Text>
          </View>
          <Text style={styles.marketStatsRighttBlockText}>
            {formatMarketCap(item.total_supply)}
          </Text>
        </View>
        <View style={styles.marketStatsItem}>
          <View style={styles.marketStatsItemLeftBlock}>
            <Popularity />
            <Text style={styles.marketStatsItemText}>Popularity</Text>
          </View>
          <Text style={styles.marketStatsRighttBlockText}>
            {item.market_cap_rank}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  coinImage: {
    height: 24,
    marginLeft: 15,
    marginRight: 8,
    width: 24,
  },
  coinName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  coinPrice: {
    fontSize: 24,
    fontWeight: '500',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  lineCharHeight: {
    height: 320,
  },
  marketStatsItem: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  marketStatsItemLeftBlock: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  marketStatsItemText: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    textAlign: 'center',
  },
  marketStatsLeftBlockText: {
    fontSize: 20,
    fontWeight: '500',
  },
  marketStatsRighttBlockText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 15,
  },
  marketStatsView: {
    marginLeft: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  negativeChange: {
    color: colors.red,
  },
  percentageChange: {
    fontSize: 14,
    marginLeft: 5,
  },
  positiveChange: {
    color: colors.green,
  },
  priceAndPercentageView: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 15,
    marginTop: 15,
    textAlign: 'center',
  },
});

export default CoinDetailScreen;
