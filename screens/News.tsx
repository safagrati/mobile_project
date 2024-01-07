import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios, { AxiosResponse } from 'axios';

const NewsComponent = () => {
    const [news, setNews] = useState([]);
    const apiKey = '954abda5991d4b3081c611d663618053';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response: AxiosResponse = await axios.get(apiUrl);
                setNews(response.data.articles.slice(0, 5)); // Limit to 5 articles
            } catch (error) {
                console.error('Error with API:', error);
            }
        };

        fetchNews();
    }, []);

    const renderNewsItem = ({ item }: { item: { title: string; description: string; url: string } }) => (
        <View style={styles.newsItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>


        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Latest Finance News</Text>
            <FlatList
                data={news}
                keyExtractor={(item) => item.url}
                renderItem={renderNewsItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 1,
        paddingVertical: 5,
        backgroundColor: '#f9f9f9',

    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 80,
        marginBottom: 30,

        textAlign: 'center',
        color: 'red',

    },
    newsItem: {
        width: '100%',
        borderWidth: 3,
        marginRight: 3,
        marginLeft: -1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        minHeight: 80,
        margin: 5,
    },

    title: {

        fontSize: 19,
        fontWeight: 'bold',

    },
    description: {
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold',
    }
});

export default NewsComponent;
