import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform,
    FlatList
 } from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }

        setMySkills(oldState => [... oldState, data]);        
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if(currentHour < 12) {
            setGretting('Good morning');
        } else if(currentHour >= 12 && currentHour < 18) {
            setGretting('Good afternoon');
        } else {
            setGretting('Good night');
        }

    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome, Leandro
            </Text> 

            <Text style={styles.greetings}>
                { gretting }
            </Text>       

            <TextInput
                style={styles.input}
                placeholder="New skill" 
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />

            <Button 
                title="Add"
                onPress={handleAddNewSkill} 
            />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList 
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard skill={item.name} />
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#121025',
        paddingHorizontal: 30,
        paddingVertical: 70        
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1e25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    },
    greetings: {
        color: '#FFF',
    }
});