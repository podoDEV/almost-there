// source from https://github.com/veizz/react-native-picker-scrollview
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Platform } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default class ScrollPicker extends Component {
  constructor(props) {
    super(props);
    this.itemHeight = 35;
    this.wrapperHeight = 105;
    this.state = {
      selectedIndex: props.selectedIndex ? props.selectedIndex : 0
    };
  }

  componentDidMount() {
    if (this.props.selectedIndex) {
      setTimeout(() => {
        this.scrollToIndex(this.props.selectedIndex);
      }, 0);
    }
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const { header, footer } = this.renderPlaceHolder();
    const highlightWidth = (this.props.style ? this.props.style.width : 0) || deviceWidth;
    const highlightColor = '#0099ED';
    const wrapperStyle = {
      height: this.wrapperHeight,
      flex: 1,
      backgroundColor: '#fff',
      overflow: 'hidden',
      margin: 10
    };

    const highlightStyle = {
      position: 'absolute',
      top: (this.wrapperHeight - this.itemHeight) / 2,
      height: this.itemHeight,
      width: highlightWidth,
      borderTopColor: highlightColor,
      borderBottomColor: highlightColor,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth
    };

    return (
      <View style={wrapperStyle}>
        <View style={highlightStyle}></View>
        <ScrollView
          ref={(sview) => {
            this.sview = sview;
          }}
          bounces={true}
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}
        >
          {header}
          {this.props.dataSource && this.props.dataSource.map(this.renderItem)}
          {footer}
        </ScrollView>
      </View>
    );
  }

  renderPlaceHolder() {
    const h = (this.wrapperHeight - this.itemHeight) / 2;
    const header = <View style={{ height: h, flex: 1 }}></View>;
    const footer = <View style={{ height: h, flex: 1 }}></View>;
    return { header, footer };
  }

  renderItem = (data, index) => {
    const isSelected = index === this.state.selectedIndex;

    return (
      <View style={[styles.itemWrapper, { height: this.itemHeight }]} key={index}>
        <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>
          {data}
        </Text>
      </View>
    );
  };

  scrollFix(e) {
    let y = 0;
    const h = this.itemHeight;
    if (e.nativeEvent.contentOffset) {
      y = e.nativeEvent.contentOffset.y;
    }
    const selectedIndex = Math.round(y / h);
    const _y = selectedIndex * h;
    if (_y !== y) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === 'ios') {
        this.isScrollTo = true;
      }
      this.sview.scrollTo({ y: _y });
    }

    if (this.state.selectedIndex === selectedIndex) {
      return;
    }

    if (this.props.onValueChange) {
      let selectedValue = this.props.dataSource[selectedIndex];
      this.setState({ selectedIndex }, () => {
        this.props.onValueChange(selectedValue, selectedIndex);
      });
    }
  }

  onScrollBeginDrag = () => {
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    this.timer && clearTimeout(this.timer);
  };

  onScrollEndDrag = (e) => {
    this.dragStarted = false;
    // if not used, event will be garbaged
    const _e = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y
        }
      }
    };
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this.scrollFix(_e);
      }
    }, 100);
  };

  onMomentumScrollBegin = () => {
    this.momentumStarted = true;
    this.timer && clearTimeout(this.timer);
  };

  onMomentumScrollEnd = (e) => {
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this.scrollFix(e);
    }
  };

  scrollToIndex(ind) {
    this.setState({
      selectedIndex: ind
    });
    const y = this.itemHeight * ind;
    this.sview.scrollTo({ y });
  }

  getSelected() {
    const selectedIndex = this.state.selectedIndex;
    return this.props.dataSource[selectedIndex];
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'scdream'
  },
  itemText: {
    color: '#999',
    fontFamily: 'scdream',
    fontSize: 16
  },
  itemTextSelected: {
    color: '#333',
    fontFamily: 'scdream',
    fontSize: 16
  }
});
