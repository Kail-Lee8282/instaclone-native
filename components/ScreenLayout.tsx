import React from 'react';
import { ActivityIndicator, View } from 'react-native';

type TScreenLayout = {
    loading: boolean;
    children: React.ReactNode;
}
export default function ScreenLayout({ loading, children }: TScreenLayout) {
    return (
        <View style={{
            backgroundColor: "black", 
            flex: 1,
        }}>
            {loading ? <ActivityIndicator color="white" size="large" /> : children}
        </View>

    );
}