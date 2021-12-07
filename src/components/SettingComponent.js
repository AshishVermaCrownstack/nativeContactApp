import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../assets/theme/colors';
import AppModal from './AppModal';
import Icon from './Icon';
const SettingComponent = ({
  settingsOption,
  modalVisible,
  setModalVisible,
  prefOptions,
}) => {
  return (
    <>
      <AppModal
        closeOnTouchOutside={false}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="Sort Contacts By"
        bodyContent={prefOptions.map(({name, selected, onPress}) => (
          <TouchableOpacity
            key={name}
            style={styles.sortItems}
            onPress={onPress}>
            {selected && (
              <Icon
                style={styles.checkIcon}
                name="check"
                type="MaterialIcon"
                size={20}
              />
            )}
            <Text style={{marginLeft: 30, fontSize: 17}}>{name}</Text>
          </TouchableOpacity>
        ))}
        footerContent={<></>}
      />
      <View style={{backgroundColor: colors.white, flex: 1}}>
        <FlatList
          data={settingsOption}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.item} onPress={item.onPress}>
              <Text style={styles.title}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              )}
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View style={{height: 0.5, backgroundColor: colors.grey}} />
          )}
        />
      </View>
    </>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  title: {fontSize: 17},

  subtitle: {fontSize: 14, opacity: 0.6, paddingTop: 5},

  sortItems: {flexDirection: 'row', paddingVertical: 5, alignItems: 'center'},

  checkIcon: {
    position: 'absolute',
  },
});
