import React, { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import colors from '../constants/colors';
import generateLabels from '../utils/generateLabels';

const fetchChartData = async (interval: string) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=24`
    );
    const data = response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((item: any) => ({
      time: new Date(item[0]).toLocaleTimeString(), // Convert timestamp to readable time
      close: parseFloat(item[4]),
    }));
  } catch (error) {
    //console.error('Error fetching chart data:', error);
    return [];
  }
};

const LineChartComponent: React.FC = () => {
  const [data, setData] = useState<{ time: string; close: number }[]>([]);
  const [selectedInterval, setSelectedInterval] = useState<string>('1h');
  const labels = ['04:16', '06:54', '09:18', '14:57', '16:29'];

  const intervals = ['1h', '24h', '1w', '1m', '6m', '1y'];

  useEffect(() => {
    const fetchData = async () => {
      const chartData = await fetchChartData(selectedInterval);
      setData(chartData);
    };
    fetchData();
  }, [selectedInterval]);

  const hasValidData = data.length > 0 && data.every((d) => !isNaN(d.close));
  const chartData = hasValidData
    ? {
        labels: generateLabels(selectedInterval),
        datasets: [
          {
            data: data.map((d) => d.close),
            color: () => '#0063F5', // Line color
            strokeWidth: 2, // Line thickness
          },
        ],
      }
    : {
        labels: Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            strokeWidth: 2,
          },
        ],
      };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width} // Full width of the screen
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        withShadow={false}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLabels={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        chartConfig={{
          backgroundColor: '#ffffff', // Chart background color
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: () => '#0063F5',
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0', // Hide dots
          },
        }}
        bezier={false}
        style={styles.lineChartStyle}
      />
      <View style={styles.buttonContainer}>
        {intervals.map((interval) => (
          <TouchableOpacity
            key={interval}
            style={[
              styles.button,
              selectedInterval === interval && styles.selectedButton,
            ]}
            onPress={() => setSelectedInterval(interval)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedInterval == interval && styles.selectedButtonText,
              ]}
            >
              {interval}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.lineChartButtonBackground,
    borderColor: colors.lineChartButtonBorder,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonText: {
    color: colors.lineChartIntervalDefaultButtonText,
    fontSize: 14,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1, // Ensure the container background is white
  },
  lineChartStyle: {
    borderRadius: 16,
    marginVertical: 8,
  },
  selectedButton: {
    backgroundColor: colors.lineChartIntervalSelectedButtonBackground,
    borderColor: colors.lineChart006,
  },
  selectedButtonText: {
    color: colors.lineChart006,
  },
});

export default LineChartComponent;
