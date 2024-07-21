# **zCoins App**

## **Overview**

zCoins App is a crypto tracker mobile application designed to provide users with real-time cryptocurrency data and detailed insights into various coins. The app features three primary screens: **Onboarding**, **Coin List**, and **Coin Detail**. It utilizes **Redux** and **Redux-Saga** for state management and side effects, and offers dynamic visualizations including animated onboarding and line charts for price trends.

Expo Android Apk Url : https://expo.dev/artifacts/eas/dHgjEwAVBavwehHyi9wv2W.apk

https://github.com/user-attachments/assets/6ac10cb1-8db4-47c2-8c55-1a329fe6be2c


## **Screens**

### **Onboarding Screen**

The onboarding screen introduces users to the app, featuring a visually appealing animated introduction. It includes animations for logo and image elements to enhance user engagement. The onboarding sequence provides a smooth and engaging entry point into the app.

### **Coin List Screen**

The Coin List screen displays a comprehensive list of cryptocurrencies. Each item in the list includes essential information such as:
- Coin name and symbol
- Current price
- 24-hour price change percentage
- A line graph showing the coin’s price trend over the past 24 hours

The screen is designed to provide a quick overview of the market, allowing users to tap on any coin to view detailed information.

### **Coin Detail Screen**

The Coin Detail screen provides an in-depth view of a selected cryptocurrency. It includes:
- Coin name and image
- Current price and 24-hour percentage change
- A detailed line graph showing price trends over various intervals (1h, 1w, 1m, 6m, 1y, all)

The screen is designed with a custom back button that includes the coin's image and name, making navigation intuitive and visually consistent.

## **Technical Stack**

- **React Native**: The core framework for building the mobile app.
- **TypeScript**: Provides type safety and better development experience.
- **Redux**: Manages the application state in a predictable manner.
- **Redux-Saga**: Handles side effects such as API calls and WebSocket connections.
- **React Navigation**: Manages navigation between screens.
- **React Native Chart Kit**: Provides charting components for visualizing data.

## **Features**

- **Real-time Price Updates**: Uses WebSocket for real-time price updates.
- **Dynamic Line Graphs**: Displays price trends with customizable intervals.
- **Custom Animations**: Animated onboarding and dynamic UI elements.
- **Responsive Design**: Adapts to different screen sizes and orientations.

## **Setup**

```bash
# Clone the repository
git clone https://github.com/ergulemre/zCoin.git

# Navigate into the project directory
cd zCoin

# Install dependencies
npm install

# Start the development server
npx expo start
```

1. **Run on Emulator or Device**

Follow the instructions provided by Expo CLI to run the app on an emulator or physical device.

## **Contributing**
Feel free to submit issues, feature requests, or pull requests. Contributions are welcome!

## **License**
This project is licensed under the MIT License - see the LICENSE file for details.
