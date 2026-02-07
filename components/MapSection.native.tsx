import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { Text, View } from '@/components/Themed';

type MapKiosk = {
    id: number;
    title: string;
    description: string;
    lat: number;
    lng: number;
    category: string[];
    rating: number;
    hours: string;
};

type Props = {
    kiosks: MapKiosk[];
    theme: {
        primary: string;
        card: string;
        text: string;
    };
    colorScheme: 'light' | 'dark';
    onDirections: (lat: number, lng: number) => void;
};

export default function MapSection({ kiosks, theme, colorScheme, onDirections }: Props) {
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.12,
                longitudeDelta: 0.12,
            }}
            showsUserLocation={true}
            userInterfaceStyle={colorScheme}
        >
            {kiosks.map((kiosk) => {
                let pinColor = theme.primary;
                if (kiosk.category.includes('E-Waste')) pinColor = 'blue';
                if (kiosk.category.includes('Textiles')) pinColor = 'green';
                if (kiosk.category.includes('Glass/Plastic')) pinColor = 'orange';

                return (
                    <Marker
                        key={kiosk.id}
                        coordinate={{ latitude: kiosk.lat, longitude: kiosk.lng }}
                        title={kiosk.title}
                        description={kiosk.description}
                        pinColor={pinColor}
                    >
                        <Callout tooltip onPress={() => onDirections(kiosk.lat, kiosk.lng)}>
                            <View style={[styles.callout, { backgroundColor: theme.card }]}>
                                <View style={styles.calloutHeader}>
                                    <Text style={[styles.calloutTitle, { color: theme.text }]}>{kiosk.title}</Text>
                                    <View style={styles.ratingRow}>
                                        <Text style={[styles.ratingValue, { color: theme.text }]}>{kiosk.rating}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.calloutDesc, { color: theme.text }]}>{kiosk.description}</Text>
                                <Text style={styles.calloutHours}>{kiosk.hours}</Text>

                                <View style={[styles.calloutButton, { backgroundColor: theme.primary }]}>
                                    <Text style={styles.calloutButtonText}>Get Directions</Text>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                );
            })}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    callout: {
        padding: 12,
        borderRadius: 12,
        width: 180,
    },
    calloutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    calloutTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        width: '75%',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        fontSize: 10,
        marginLeft: 2,
    },
    calloutDesc: {
        fontSize: 12,
        marginBottom: 2,
    },
    calloutHours: {
        fontSize: 10,
        color: '#9CA3AF',
    },
    calloutButton: {
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: 'center',
    },
    calloutButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
