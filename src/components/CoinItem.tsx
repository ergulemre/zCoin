import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { formatPrice } from '../utils/formatPrice'; // Adjust the import path as needed

interface CoinItemProps {
  name: string;
  symbol: string;
  price: number;
  percentageChange24h: number;
  image: string; // Add image prop
}

const CoinItem: React.FC<CoinItemProps> = ({
  name,
  symbol,
  price,
  percentageChange24h,
  image,
}) => {
  const [previousPrice, setPreviousPrice] = useState(price);
  const [highlight, setHighlight] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    if (price !== previousPrice) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 1000); // highlight for 1 second
      return () => clearTimeout(timer);
    }
    setPreviousPrice(price);
  }, [price, previousPrice]);

  useEffect(() => {
    getChartData(symbol);
  }, []);

  const getChartData = async (symbol) => {
    try {
      const response = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}USDT&interval=1h&limit=24`
      );
      console.log(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const closingPrices = response.data.map((item: any) => {
        // Ensure the closing price is a valid number
        const price = parseFloat(item[4]);
        return isNaN(price) ? 0 : price; // Replace invalid numbers with 0
      });
      setChartData(closingPrices);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setChartData([]);
    }
  };

  const hasValidData =
    chartData.length > 0 && chartData.every((val) => !isNaN(val));
  const data = hasValidData ? chartData : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Default data
  const chartColor = hasValidData
    ? percentageChange24h >= 0
      ? 'green'
      : 'red'
    : 'gray';

  // Convert price to number
  const convertToNumber = (price: string | number | undefined): number => {
    if (typeof price === 'number') {
      return price;
    }
    const num = parseFloat(String(price));
    return isNaN(num) ? 0 : num; // Return 0 if conversion fails
  };

  // Ensure price is a valid number before formatting
  const formattedPrice = formatPrice(convertToNumber(price));

  // Truncate long coin names
  const truncatedName = name.length > 10 ? name.substring(0, 10) + '...' : name;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: image }} style={styles.coinImage} />
        <View>
          <Text style={styles.longName}>{truncatedName}</Text>
          <Text style={styles.shortName}>{symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: [], // Provide empty labels
            datasets: [
              {
                data: data,
                color: () => chartColor,
                strokeWidth: 1.5,
              },
            ],
          }}
          width={Dimensions.get('window').width / 4.3} // Adjust the width accordingly
          height={60}
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: () => chartColor,
          }}
          bezier
          style={styles.chart}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={[styles.price, highlight && styles.highlight]}>
          ${formattedPrice}
        </Text>
        <Text
          style={[
            styles.percentageChange,
            percentageChange24h >= 0
              ? styles.positiveChange
              : styles.negativeChange,
          ]}
        >
          {percentageChange24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingRight: 20,
  },
  chartContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  coinImage: {
    height: 40,
    marginRight: 10,
    width: 40,
  },
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    height: 72,
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: Dimensions.get('window').width - 40, // For Android shadow
  },
  // eslint-disable-next-line react-native/no-color-literals
  highlight: {
    backgroundColor: 'yellow',
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  longName: {
    fontSize: 14,
    fontWeight: '600',
  },
  // eslint-disable-next-line react-native/no-color-literals
  negativeChange: {
    color: 'red',
  },
  percentageChange: {
    fontSize: 14,
  },
  // eslint-disable-next-line react-native/no-color-literals
  positiveChange: {
    color: 'green',
  },
  price: {
    fontSize: 16,
  },
  rightContainer: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  shortName: {
    color: '#6C757D',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CoinItem;
