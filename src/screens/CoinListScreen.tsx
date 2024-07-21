import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { RootState, AppDispatch } from '../redux';
import { fetchCoins } from '../redux/features/coin/coinSlice';
import { useNavigation } from '@react-navigation/native';
import {
  websocketConnect,
  websocketDisconnect,
  updateCoinSymbols,
} from '../redux/features/websocket/websocketSlice';
import CoinItem from '../components/CoinItem';
import { RootStackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

type CoinListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CoinListScreen'
>;

const CoinListScreen: React.FC = () => {
  const navigation = useNavigation<CoinListScreenNavigationProp>();

  const dispatch: AppDispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.coin.coins);

  const websocketPrices = useSelector(
    (state: RootState) => state.websocket.prices
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [viewableItems, setViewableItems] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchCoins());
    dispatch(websocketConnect());

    return () => {
      dispatch(websocketDisconnect());
    };
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const symbols = viewableItems.map(
      (item) => item.item.symbol.toUpperCase() + 'USDT'
    );
    dispatch(updateCoinSymbols(symbols));
  }, []);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  // Update updatedCoins whenever coins or websocketPrices change
  useEffect(() => {
    const updatedCoinValues = coins.map((coin) => ({
      ...coin,
      current_price:
        websocketPrices[`${coin.symbol.toUpperCase()}USDT`] ||
        coin.current_price,
    }));
    setViewableItems(updatedCoinValues);
  }, [coins, websocketPrices]);

  const handlePressCoinItem = (coin) => {
    navigation.navigate('CoinDetailScreen', {
      coinName: coin.name,
      coinImage: coin.image,
      item: coin,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.text}>Trending Topics</Text>
      <FlatList
        data={viewableItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinItem
            name={item.name}
            symbol={item.symbol}
            price={item.current_price}
            percentageChange24h={item.price_change_percentage_24h}
            image={item.image}
            onPress={() => handlePressCoinItem(item)} // Pass onPress handler
          />
        )}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  safeArea: {
    backgroundColor: '#F8F9FA',
    flex: 1, // Set your desired background color
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 30,
    marginLeft: 20,
    marginTop: 20,
  },
});

export default CoinListScreen;
