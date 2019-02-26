import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';


export default class ProgressiveImage extends React.Component {
    thumbnailAnimated = new Animated.Value(0);
    imageAnimated = new Animated.Value(0);
    
    handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {
            toValue: 1,
        }).start();
    }

    onImageLoad = () => {
        Animated.timing(this.imageAnimated, {
            toValue: 1,
            duration: 5000
        }).start();
    }

    render() {
        const {
            thumbnailSource,
            source,
            style,
            ...props
        } = this.props;

        return (
            <View style={[styles.container, style]}>
                <Animated.Image
                    {...props}
                    source={thumbnailSource}
                    style={[style, { opacity: this.thumbnailAnimated}]}
                    onLoad={this.handleThumbnailLoad}
                    blurRadius={2}
                />
                <Animated.Image
                    {...props}
                    source={source}
                    style={[styles.imageOverlay, { opacity: this.imageAnimated}, style]}
                    onLoad={this.onImageLoad}
                    
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    container: {
      backgroundColor: '#e1e4e8',
    },
  });