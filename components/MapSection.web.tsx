import React from 'react';
import { StyleSheet } from 'react-native';

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
        border: string;
    };
    colorScheme: 'light' | 'dark';
    onDirections: (lat: number, lng: number) => void;
};

export default function MapSection({ kiosks, theme, onDirections }: Props) {
    const first = kiosks[0];

    return (
        <View style={[styles.placeholder, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>Map view is not available on web.</Text>
            <Text style={[styles.body, { color: theme.text }]}>Use the list view or open the app on iOS/Android.</Text>
            {first ? (
                <Text
                    style={[styles.link, { color: theme.primary }]}
                    onPress={() => onDirections(first.lat, first.lng)}
                >
                    Open the nearest station in maps
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    placeholder: {
        width: '92%',
        marginTop: 120,
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    body: {
        fontSize: 13,
        textAlign: 'center',
    },
    link: {
        fontSize: 13,
        fontWeight: '600',
    },
});
