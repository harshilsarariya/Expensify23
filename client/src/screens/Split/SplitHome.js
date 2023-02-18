import { View, Text } from 'react-native'
import React from 'react'
import Balance from '../../components/split/Balance';
import GroupChat from './GroupChat';
import GroupList from '../../components/split/GroupList';
import { ScrollView } from 'react-native';

const SplitHome = ({navigation}) => {
  return (
    <ScrollView className="p-4 mb-20">
      <Balance/>
      <GroupList />
    </ScrollView>
  )
}

export default SplitHome;