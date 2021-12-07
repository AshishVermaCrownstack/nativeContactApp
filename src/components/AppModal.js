import React, {useContext} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../assets/theme/colors';
import {ContactModelContext} from '../screens/Contacts/contacts';
import Icon from './Icon';
import PropTypes from 'prop-types';

export default function AppModal({
  modalVisible,
  setModalVisible,
  title,
  bodyContent,
  footerContent,
  closeOnTouchOutside,
}) {
  return (
    <Modal visible={modalVisible} transparent>
      <TouchableOpacity
        style={styles.modalWrapper}
        onPress={() => {
          if (closeOnTouchOutside) {
            setModalVisible(false);
          }
        }}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{position: 'absolute', left: 15}}>
                <Icon name="close" type="EvilIcons" size={27} />
              </TouchableOpacity>
              <Text style={{fontSize: 21}}>{title}</Text>
            </View>
            <View style={styles.seperator} />

            <View style={styles.body}>{bodyContent}</View>
            {footerContent ? (
              footerContent
            ) : (
              <View>
                <View style={styles.seperator} />

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Privacy Policy</Text>
                  <View style={styles.termsView} />
                  <Text style={styles.footerText}>Terms of Service</Text>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

AppModal.propTypes = {
  closeOnTouchOutside: PropTypes.bool,
};

AppModal.defaultProps = {
  closeOnTouchOutside: true,
};

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    minHeight: 300,
    marginHorizontal: 20,
    borderRadius: 4,
  },
  seperator: {
    height: 0.5,
    backgroundColor: colors.grey,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  body: {
    minHeight: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  footer: {
    justifyContent: 'space-evenly',
    paddingVertical: 7,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
  termsView: {
    height: 5,
    width: 5,
    borderRadius: 100,
    backgroundColor: colors.grey,
  },
  footerText: {
    fontSize: 12,
  },
});
