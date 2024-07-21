import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface CoinItem {
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  market_cap: number;
}

type RootStackParamList = {
  Onboarding: undefined;
  CoinListScreen: undefined;
  CoinItemScreen: undefined;
  CoinDetailScreen: {
    coinName: string;
    coinImage: string;
    item: CoinItem;
  };
};

type OnboardingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;
type CoinListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CoinListScreen'
>;
type CoinItemScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CoinItemScreen'
>;
type CoinDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CoinDetailScreen'
>;
type CoinDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CoinDetailScreen'
>;

export type {
  CoinListScreenNavigationProp,
  CoinDetailScreenNavigationProp,
  CoinDetailScreenRouteProp,
  CoinItemScreenNavigationProp,
  OnboardingNavigationProp,
  RootStackParamList,
};
